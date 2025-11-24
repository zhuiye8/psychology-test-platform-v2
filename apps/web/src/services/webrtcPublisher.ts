// ============================================================================
// WebRTC WHIP推流器
// ============================================================================

/**
 * WebRTC WHIP协议推流器
 *
 * 职责：
 * - 使用WHIP协议推流到MediaMTX
 * - 优先使用已有流（避免重复权限请求）
 * - 编码参数优化（码率/帧率/分辨率保持）
 * - 状态管理和资源清理
 *
 * 技术要点：
 * - ⚠️ 编码参数必须在createOffer之前设置
 * - degradationPreference: 'maintain-resolution'（保持分辨率）
 * - ICE gathering等待（1s timeout）
 * - 通过后端代理WHIP握手
 */

import type {
  PublisherState,
  PublisherOptions,
  PublisherStartResult,
} from '../types/webrtc';
import { webrtcApi } from './webrtc';

// ============================================================================
// WebRTC推流器类
// ============================================================================

export class WebRTCPublisher {
  // RTCPeerConnection实例
  private pc: RTCPeerConnection | null = null;

  // 本地媒体流
  private localStream: MediaStream | null = null;

  // WHIP资源URL（用于DELETE清理）
  private resourceUrl: string = '';

  // 当前状态
  private state: PublisherState = 'idle';

  // 状态变化回调
  private onState?: (state: PublisherState) => void;

  // --------------------------------------------------------------------------
  // 状态管理
  // --------------------------------------------------------------------------

  /**
   * 设置状态变化回调
   *
   * @param callback 状态变化回调函数
   */
  onStateChange(callback: (state: PublisherState) => void) {
    this.onState = callback;
  }

  /**
   * 更新状态并触发回调
   *
   * @param newState 新状态
   */
  private setState(newState: PublisherState) {
    this.state = newState;
    if (this.onState) {
      this.onState(newState);
    }
  }

  // --------------------------------------------------------------------------
  // 启动推流
  // --------------------------------------------------------------------------

  /**
   * 启动WHIP推流
   *
   * 流程：
   * 1. 获取流名与WHIP端点
   * 2. 建立RTCPeerConnection
   * 3. 注入轨道（优先使用已有流）
   * 4. 设置Codec优先级
   * 5. ⚠️ 设置编码参数（BEFORE createOffer）
   * 6. 创建Offer并设置LocalDescription
   * 7. 等待ICE gathering完成
   * 8. 发送WHIP请求（通过后端代理）
   * 9. 设置RemoteDescription
   *
   * @param opts 推流选项
   * @returns 流名称
   */
  async start(opts: PublisherOptions = {}): Promise<PublisherStartResult> {
    try {
      this.setState('connecting');
      console.log('[Publisher] 启动推流:', opts);

      // 1. 获取流名与WHIP端点
      console.log('[Publisher] ===== 调用后端startStream API =====');
      console.log('[Publisher]   examUuid:', opts.examUuid);
      console.log('[Publisher]   participantId:', opts.participantId);

      const resp = await webrtcApi.startStream({
        exam_uuid: opts.examUuid,
        participant_id: opts.participantId,
      });

      console.log('[Publisher] ===== 后端响应 =====');
      console.log('[Publisher]   success:', resp.success);
      console.log('[Publisher]   data:', resp.data);
      console.log('[Publisher]   error:', resp.error);

      if (!resp.success) {
        const errorMsg = resp.error || '启动流失败：后端返回success=false';
        console.error('[Publisher] 启动流失败:', errorMsg);
        throw new Error(errorMsg);
      }

      if (!resp.data) {
        const errorMsg = '启动流失败：后端返回数据为空（resp.data=undefined）';
        console.error('[Publisher] 数据验证失败:', errorMsg);
        console.error('[Publisher] 完整响应:', JSON.stringify(resp, null, 2));
        throw new Error(errorMsg);
      }

      const { streamName, whipUrl } = resp.data;

      if (!streamName || !whipUrl) {
        const errorMsg = `启动流失败：数据字段缺失 (streamName=${streamName}, whipUrl=${whipUrl})`;
        console.error('[Publisher] 数据字段验证失败:', errorMsg);
        console.error('[Publisher] resp.data内容:', JSON.stringify(resp.data, null, 2));
        throw new Error(errorMsg);
      }

      console.log('[Publisher] ===== 数据验证通过 =====');
      console.log('[Publisher]   streamName:', streamName);
      console.log('[Publisher]   whipUrl:', whipUrl);
      console.log('[Publisher] ========================');

      // 2. 建立RTCPeerConnection
      this.pc = new RTCPeerConnection({
        iceServers: [], // LAN环境不需要STUN/TURN
        bundlePolicy: 'max-bundle',
        rtcpMuxPolicy: 'require',
      } as any);

      // 3. 注入轨道
      if (opts.streams?.video || opts.streams?.audio) {
        // 优先使用已有流（避免重复权限请求）
        this.localStream = new MediaStream();
        if (opts.streams.video) {
          opts.streams.video
            .getVideoTracks()
            .forEach((t) => this.localStream!.addTrack(t));
        }
        if (opts.streams.audio) {
          opts.streams.audio
            .getAudioTracks()
            .forEach((t) => this.localStream!.addTrack(t));
        }
        console.log('[Publisher] 使用已有流');
      } else {
        // 降级：获取最小可用流
        console.log('[Publisher] 降级获取新流');
        this.localStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            frameRate: { ideal: 15 },
          },
          audio: true,
        });
      }

      const tracks = this.localStream.getTracks();
      tracks.forEach((t) => this.pc!.addTrack(t, this.localStream!));
      console.log('[Publisher] 已添加轨道:', tracks.map((t) => t.kind));

      // 4. 设置Codec优先级
      try {
        const tcv = this.pc
          .getTransceivers()
          .find((t) => t.receiver?.track?.kind === 'video');
        const codecs = RTCRtpReceiver.getCapabilities('video')?.codecs || [];
        const prefer = opts.preferCodec || 'VP8';
        const preferMime = prefer === 'H264' ? 'video/H264' : 'video/VP8';
        const preferred = codecs.filter((c) => c.mimeType === preferMime);
        const others = codecs.filter((c) => c.mimeType !== preferMime);
        if (tcv && preferred.length) {
          tcv.setCodecPreferences([...preferred, ...others]);
          console.log('[Publisher] Codec优先级:', prefer);
        }
      } catch (e) {
        console.warn('[Publisher] 设置Codec优先级失败:', e);
      }

      // 5. ⚠️ 设置编码参数（BEFORE createOffer）
      try {
        const sender = this.pc.getSenders().find((s) => s.track?.kind === 'video');
        if (sender) {
          const params = sender.getParameters();
          if (!params.encodings || params.encodings.length === 0) {
            params.encodings = [{}];
          }
          params.encodings[0]!.maxBitrate = opts.maxBitrate ?? 6_000_000; // 6Mbps
          params.encodings[0]!.maxFramerate = opts.maxFramerate ?? 60;
          params.encodings[0]!.scaleResolutionDownBy = 1; // 不降分辨率
          (params as any).degradationPreference = 'maintain-resolution'; // 保持分辨率
          await sender.setParameters(params);
          console.log('[Publisher] 编码参数已设置');
        }
      } catch (e) {
        console.warn('[Publisher] 设置编码参数失败:', e);
      }

      // 6. 创建Offer并设置LocalDescription
      const offer = await this.pc.createOffer({
        offerToReceiveAudio: false,
        offerToReceiveVideo: false,
      } as any);
      await this.pc.setLocalDescription(offer);
      console.log('[Publisher] 已创建Offer');

      // 7. 等待ICE gathering完成（1s timeout）
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
      console.log('[Publisher] ICE gathering完成');

      // 8. 发送WHIP请求（通过后端代理）
      const sdp = this.pc.localDescription?.sdp || '';
      console.log('[Publisher] ===== 发送WHIP请求 =====');
      console.log('[Publisher]   目标URL:', whipUrl);
      console.log('[Publisher]   SDP长度:', sdp.length, 'bytes');

      const whipResp = await fetch(whipUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/sdp',
          Accept: 'application/sdp',
        },
        body: sdp,
      });

      console.log('[Publisher]   WHIP响应状态:', whipResp.status, whipResp.statusText);

      if (!whipResp.ok) {
        const errorText = await whipResp.text();
        console.error('[Publisher] WHIP请求失败:', {
          status: whipResp.status,
          statusText: whipResp.statusText,
          errorText,
          url: whipUrl,
        });
        throw new Error(`WHIP失败: ${whipResp.status} ${errorText}`);
      }

      const answerSdp = await whipResp.text();
      const location = whipResp.headers.get('Location') || '';
      this.resourceUrl = location;

      console.log('[Publisher]   Answer SDP长度:', answerSdp.length, 'bytes');
      console.log('[Publisher]   Location header:', location || 'N/A');
      console.log('[Publisher] WHIP响应成功');
      console.log('[Publisher] ========================');

      // 9. 设置RemoteDescription
      await this.pc.setRemoteDescription({ type: 'answer', sdp: answerSdp });
      console.log('[Publisher] 推流已建立，连接状态:', this.pc.connectionState);

      this.setState('connected');
      return { streamName };
    } catch (error) {
      console.error('[Publisher] 启动失败:', error);
      this.setState('failed');
      throw error;
    }
  }

  // --------------------------------------------------------------------------
  // 停止推流
  // --------------------------------------------------------------------------

  /**
   * 停止推流并清理资源
   *
   * 流程：
   * 1. 关闭RTCPeerConnection
   * 2. 停止本地流的所有轨道
   * 3. DELETE WHIP资源（可选）
   */
  async stop(): Promise<void> {
    try {
      console.log('[Publisher] 停止推流');
      this.setState('stopped');

      // 1. 关闭PeerConnection
      if (this.pc) {
        this.pc.close();
        this.pc = null;
      }

      // 2. 停止本地流
      if (this.localStream) {
        this.localStream.getTracks().forEach((t) => t.stop());
        this.localStream = null;
      }

      // 3. DELETE WHIP资源（可选）
      if (this.resourceUrl) {
        try {
          await fetch(this.resourceUrl, { method: 'DELETE' });
          console.log('[Publisher] WHIP资源已删除');
        } catch (e) {
          console.warn('[Publisher] 删除WHIP资源失败:', e);
        }
        this.resourceUrl = '';
      }

      console.log('[Publisher] 停止完成');
    } catch (error) {
      console.warn('[Publisher] 停止时出错:', error);
    }
  }
}

// ============================================================================
// 导出单例
// ============================================================================

/**
 * WebRTC推流器单例
 *
 * 全局复用，避免重复创建
 */
export default new WebRTCPublisher();
