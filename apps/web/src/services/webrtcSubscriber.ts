// ============================================================================
// WebRTC WHEP订阅器
// ============================================================================

/**
 * WebRTC WHEP协议订阅器
 *
 * 职责：
 * - 使用WHEP协议从MediaMTX拉取流
 * - 接收视频/音频轨道
 * - 状态管理和错误处理
 * - 资源清理
 *
 * 关键差异（vs WHIP推流）：
 * - direction: 'recvonly'（只接收，不发送）
 * - 通过ontrack事件获取远端流
 * - 不需要getUserMedia
 * - 不需要设置编码参数
 *
 * 技术要点：
 * - ⚠️ 必须添加recvonly transceiver
 * - ⚠️ ontrack事件必须正确处理（区分video/audio）
 * - ⚠️ 状态管理和超时处理
 */

import type {
  SubscriberState,
  SubscriberOptions,
  SubscriberStartResult,
} from '../types/webrtc';

// ============================================================================
// WebRTC订阅器类
// ============================================================================

export class WebRTCSubscriber {
  // RTCPeerConnection实例
  private pc: RTCPeerConnection | null = null;

  // 远端媒体流
  private remoteStream: MediaStream | null = null;

  // WHEP资源URL（用于DELETE清理）
  private resourceUrl: string = '';

  // 当前状态
  private state: SubscriberState = 'idle';

  // 状态变化回调
  private onState?: (state: SubscriberState) => void;

  // --------------------------------------------------------------------------
  // 状态管理
  // --------------------------------------------------------------------------

  /**
   * 设置状态变化回调
   *
   * @param callback 状态变化回调函数
   */
  onStateChange(callback: (state: SubscriberState) => void) {
    this.onState = callback;
  }

  /**
   * 更新状态并触发回调
   *
   * @param newState 新状态
   */
  private setState(newState: SubscriberState) {
    this.state = newState;
    if (this.onState) {
      this.onState(newState);
    }
  }

  /**
   * 获取当前状态
   *
   * @returns 当前状态
   */
  getState(): SubscriberState {
    return this.state;
  }

  // --------------------------------------------------------------------------
  // 启动拉流
  // --------------------------------------------------------------------------

  /**
   * 启动WHEP拉流
   *
   * 流程：
   * 1. 建立RTCPeerConnection
   * 2. 添加recvonly transceiver（video + audio）
   * 3. 创建Offer并设置LocalDescription
   * 4. 等待ICE gathering完成
   * 5. 发送WHEP请求（通过后端代理）
   * 6. 设置RemoteDescription
   * 7. 等待ontrack事件获取远端流
   *
   * @param opts 订阅选项
   * @returns 远端流
   */
  async start(opts: SubscriberOptions): Promise<SubscriberStartResult> {
    const { streamName, timeout = 10000, maxRetries = 3 } = opts;

    try {
      this.setState('connecting');
      console.log('[Subscriber] 启动拉流:', { streamName, timeout, maxRetries });

      // 1. 建立RTCPeerConnection
      this.pc = new RTCPeerConnection({
        iceServers: [], // LAN环境不需要STUN/TURN
        bundlePolicy: 'max-bundle',
        rtcpMuxPolicy: 'require',
      } as any);

      // 2. 添加recvonly transceiver
      this.pc.addTransceiver('video', { direction: 'recvonly' });
      this.pc.addTransceiver('audio', { direction: 'recvonly' });
      console.log('[Subscriber] 已添加transceiver (video + audio, recvonly)');

      // 3. 监听远端轨道
      const trackPromise = new Promise<MediaStream>((resolve, reject) => {
        const receivedTracks: MediaStreamTrack[] = [];
        const timeoutId = setTimeout(() => {
          reject(new Error('等待远端轨道超时'));
        }, timeout);

        this.pc!.addEventListener('track', (event) => {
          console.log('[Subscriber] 收到远端轨道:', event.track.kind);
          receivedTracks.push(event.track);

          // 组装远端流
          if (!this.remoteStream) {
            this.remoteStream = new MediaStream();
          }
          this.remoteStream.addTrack(event.track);

          // 视频 + 音频都到了，解除promise
          const hasVideo = receivedTracks.some((t) => t.kind === 'video');
          const hasAudio = receivedTracks.some((t) => t.kind === 'audio');
          if (hasVideo && hasAudio) {
            clearTimeout(timeoutId);
            resolve(this.remoteStream);
          }
        });
      });

      // 4. 创建Offer并设置LocalDescription
      const offer = await this.pc.createOffer();
      await this.pc.setLocalDescription(offer);
      console.log('[Subscriber] 已创建Offer');

      // 5. 等待ICE gathering完成（1s timeout）
      await new Promise<void>((resolve) => {
        if (!this.pc) return resolve();
        const timer = setTimeout(resolve, 1000);
        const handler = () => {
          if (this.pc?.iceGatheringState === 'complete') {
            clearTimeout(timer);
            resolve();
          }
        };
        this.pc.addEventListener('icegatheringstatechange', handler, {
          once: true,
        });
      });
      console.log('[Subscriber] ICE gathering完成');

      // 6. 发送WHEP请求
      const sdp = this.pc.localDescription?.sdp || '';
      const whepUrl = `/api/webrtc/whep?stream=${encodeURIComponent(streamName)}`;
      console.log('[Subscriber] 发送WHEP请求:', whepUrl);

      const whepResp = await fetch(whepUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/sdp',
          Accept: 'application/sdp',
        },
        body: sdp,
      });

      if (!whepResp.ok) {
        const errorText = await whepResp.text();
        console.error('[Subscriber] WHEP请求失败:', {
          status: whepResp.status,
          errorText,
        });

        // 特殊处理：流不存在
        if (whepResp.status === 404) {
          throw new Error('视频流不存在（可能学生未开始推流）');
        }

        throw new Error(`WHEP失败: ${whepResp.status} ${errorText}`);
      }

      const answerSdp = await whepResp.text();
      const location = whepResp.headers.get('Location') || '';
      this.resourceUrl = location;
      console.log('[Subscriber] WHEP响应成功, Location:', location);

      // 7. 设置RemoteDescription
      await this.pc.setRemoteDescription({ type: 'answer', sdp: answerSdp });
      console.log('[Subscriber] 已设置RemoteDescription');

      // 8. 等待远端流到达
      this.setState('connected');
      const stream = await trackPromise;
      console.log('[Subscriber] 远端流已接收:', {
        videoTracks: stream.getVideoTracks().length,
        audioTracks: stream.getAudioTracks().length,
      });

      this.setState('playing');
      return { streamName, remoteStream: stream };
    } catch (error) {
      console.error('[Subscriber] 启动失败:', error);
      this.setState('failed');

      // 清理资源
      if (this.pc) {
        this.pc.close();
        this.pc = null;
      }

      throw error;
    }
  }

  // --------------------------------------------------------------------------
  // 停止拉流
  // --------------------------------------------------------------------------

  /**
   * 停止拉流并清理资源
   *
   * 流程：
   * 1. 关闭RTCPeerConnection
   * 2. 移除远端流引用
   * 3. DELETE WHEP资源（可选）
   */
  async stop(): Promise<void> {
    try {
      console.log('[Subscriber] 停止拉流');
      this.setState('stopped');

      // 1. 关闭PeerConnection
      if (this.pc) {
        this.pc.close();
        this.pc = null;
      }

      // 2. 停止远端流（实际不需要，因为是远端的）
      if (this.remoteStream) {
        // 远端流不需要stop，只需要移除引用
        this.remoteStream = null;
      }

      // 3. DELETE WHEP资源
      if (this.resourceUrl) {
        try {
          // ✅ 使用完整API URL（resourceUrl是相对路径）
          const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001';
          const fullUrl = `${API_BASE_URL}${this.resourceUrl}`;

          const deleteResp = await fetch(fullUrl, { method: 'DELETE' });
          if (deleteResp.ok) {
            console.log('[Subscriber] WHEP资源已删除');
          } else if (deleteResp.status === 404) {
            console.log('[Subscriber] WHEP资源已不存在（可能已被清理）');
          } else {
            console.warn('[Subscriber] DELETE返回非预期状态:', deleteResp.status);
          }
        } catch (e) {
          // 网络错误静默处理，不影响停止流程
          console.warn('[Subscriber] 删除WHEP资源失败（忽略）:', e);
        }
        this.resourceUrl = '';
      }

      console.log('[Subscriber] 停止完成');
    } catch (error) {
      console.warn('[Subscriber] 停止时出错:', error);
    }
  }
}

// ============================================================================
// 导出工厂函数（推荐使用）
// ============================================================================

/**
 * 创建WebRTC订阅器实例
 *
 * 推荐每次使用都创建新实例，避免状态污染
 *
 * @returns WebRTC订阅器实例
 */
export function createSubscriber(): WebRTCSubscriber {
  return new WebRTCSubscriber();
}

// 默认导出类（用于单例场景）
export default WebRTCSubscriber;
