// ============================================================================
// WebRTC服务
// ============================================================================

import { Injectable, Logger } from '@nestjs/common';
import { MediaMtxConfig, AiServiceConfig } from '../common/config/mediamtx.config';
import { StartStreamDto, StopStreamDto } from './dto';

/**
 * WebRTC流管理服务
 *
 * 职责：
 * - 生成唯一的流名称
 * - 管理WHIP/WHEP端点URL
 * - 通知AI服务启动/停止RTSP消费
 * - 提供流状态查询
 */
@Injectable()
export class WebrtcService {
  private readonly logger = new Logger(WebrtcService.name);

  // ============================================================================
  // 流名称管理
  // ============================================================================

  /**
   * 计算流名称
   *
   * 格式：{exam_uuid}_{participant_id}
   * 示例：550e8400-e29b-41d4-a716-446655440000_20240001
   *
   * @param examUuid 考试UUID
   * @param participantId 参与者ID
   * @returns 流名称
   */
  computeStreamName(examUuid?: string, participantId?: string): string {
    this.logger.log(`[computeStreamName] 输入参数: examUuid=${examUuid}, participantId=${participantId}`);

    if (!examUuid || !participantId) {
      // 降级：生成随机流名称
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(2, 8);
      const fallbackName = `stream_${timestamp}_${random}`;
      this.logger.warn(`[computeStreamName] 缺少参数，使用随机流名称: ${fallbackName}`);
      return fallbackName;
    }

    // 标准格式：exam_uuid + participant_id
    const cleanExamUuid = examUuid.replace(/-/g, '_');
    const cleanParticipantId = participantId.replace(/[^a-zA-Z0-9_]/g, '_');
    const streamName = `${cleanExamUuid}_${cleanParticipantId}`;
    this.logger.log(`[computeStreamName] 生成流名称: ${streamName}`);
    return streamName;
  }

  // ============================================================================
  // 流启动
  // ============================================================================

  /**
   * 启动WebRTC流
   *
   * 流程：
   * 1. 生成streamName
   * 2. 返回WHIP/WHEP端点URL
   * 3. （可选）通知AI服务准备消费RTSP
   *
   * @param dto 启动流DTO
   * @returns 流信息
   */
  async startStream(dto: StartStreamDto): Promise<{
    streamName: string;
    whipUrl: string;
    whepUrl: string;
    rtspUrl: string;
    aiRtspStarted: boolean;
  }> {
    const { exam_uuid, participant_id } = dto;

    // 1. 生成流名称
    const streamName = this.computeStreamName(exam_uuid, participant_id);
    this.logger.log(`[startStream] 流名称: ${streamName}`);

    // 2. 构建端点URL
    const whipUrl = MediaMtxConfig.buildWhipUrl(streamName);
    const whepUrl = MediaMtxConfig.buildWhepUrl(streamName);
    const rtspUrl = MediaMtxConfig.buildRtspUrl(streamName);

    this.logger.log(`[startStream] WHIP URL: ${whipUrl}`);
    this.logger.log(`[startStream] WHEP URL: ${whepUrl}`);
    this.logger.log(`[startStream] RTSP URL: ${rtspUrl}`);

    // 3. 通知AI服务（可选）
    let aiRtspStarted = false;
    if (AiServiceConfig.getAutoStartRtsp()) {
      aiRtspStarted = await this.notifyAiServiceStart(streamName, rtspUrl);
    }

    const result = {
      streamName,
      whipUrl,
      whepUrl,
      rtspUrl,
      aiRtspStarted,
    };

    this.logger.log(`[startStream] ===== 返回结果 =====`);
    this.logger.log(`[startStream]   streamName: ${streamName}`);
    this.logger.log(`[startStream]   whipUrl: ${whipUrl}`);
    this.logger.log(`[startStream]   whepUrl: ${whepUrl}`);
    this.logger.log(`[startStream]   rtspUrl: ${rtspUrl}`);
    this.logger.log(`[startStream]   aiRtspStarted: ${aiRtspStarted}`);
    this.logger.log(`[startStream] ========================`);

    return result;
  }

  // ============================================================================
  // 流停止
  // ============================================================================

  /**
   * 停止WebRTC流
   *
   * 流程：
   * 1. 计算streamName
   * 2. 通知AI服务停止RTSP消费
   *
   * @param dto 停止流DTO
   * @returns 停止结果
   */
  async stopStream(dto: StopStreamDto): Promise<{
    streamName: string;
    aiRtspStopped: boolean;
  }> {
    const { exam_uuid, participant_id, session_id } = dto;

    this.logger.log(`[stopStream] ===== 停止流请求 =====`);
    this.logger.log(`[stopStream]   exam_uuid: ${exam_uuid}`);
    this.logger.log(`[stopStream]   participant_id: ${participant_id}`);
    this.logger.log(`[stopStream]   session_id: ${session_id}`);

    // 1. 计算流名称
    const streamName = this.computeStreamName(exam_uuid, participant_id);
    this.logger.log(`[stopStream]   计算流名称: ${streamName}`);

    // 2. 通知AI服务停止（优先使用session_id）
    const aiRtspStopped = await this.notifyAiServiceStop(streamName, session_id);

    this.logger.log(`[stopStream]   AI停止结果: ${aiRtspStopped}`);
    this.logger.log(`[stopStream] ========================`);

    return {
      streamName,
      aiRtspStopped,
    };
  }

  // ============================================================================
  // AI服务通知
  // ============================================================================

  /**
   * 通知AI服务启动RTSP消费
   *
   * @param streamName 流名称
   * @param rtspUrl RTSP播放URL
   * @returns 是否成功
   */
  private async notifyAiServiceStart(
    streamName: string,
    rtspUrl: string,
  ): Promise<boolean> {
    try {
      const aiUrl = AiServiceConfig.getRtspStartUrl();
      this.logger.log(`[AI] 请求启动RTSP消费: ${streamName}`);

      const response = await fetch(aiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stream_name: streamName,
          rtsp_url: rtspUrl,
        }),
      });

      if (!response.ok) {
        this.logger.warn(
          `[AI] RTSP启动失败: ${response.status} ${response.statusText}`,
        );
        return false;
      }

      const result = await response.json().catch(() => ({}));
      const success = result?.success === true;

      this.logger.log(`[AI] RTSP启动${success ? '成功' : '失败'}: ${streamName}`);
      return success;
    } catch (error) {
      this.logger.error(`[AI] 通知AI服务失败: ${error.message}`, error.stack);
      return false;
    }
  }

  /**
   * 通知AI服务停止RTSP消费
   *
   * @param streamName 流名称
   * @param sessionId 数据库会话ID（优先使用，可精确定位consumer）
   * @returns 是否成功
   */
  private async notifyAiServiceStop(
    streamName: string,
    sessionId?: string,
  ): Promise<boolean> {
    try {
      const aiUrl = AiServiceConfig.getRtspStopUrl();

      this.logger.log(`[AI] ===== 通知AI停止RTSP =====`);
      this.logger.log(`[AI]   stream_name: ${streamName}`);
      this.logger.log(`[AI]   session_id: ${sessionId || '未提供'}`);
      this.logger.log(`[AI]   目标URL: ${aiUrl}`);

      // ✅ 构建请求体，优先传递session_id
      const requestBody: Record<string, string> = {
        stream_name: streamName,
      };

      if (sessionId) {
        requestBody.session_id = sessionId;
        this.logger.log(`[AI]   使用精确定位: session_id=${sessionId}`);
      } else {
        this.logger.warn(`[AI]   未提供session_id，仅使用stream_name可能定位失败`);
      }

      const response = await fetch(aiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      this.logger.log(`[AI]   响应状态: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        const errorText = await response.text().catch(() => '无法读取错误响应');
        this.logger.error(`[AI] RTSP停止失败: ${response.status} ${errorText}`);
        return false;
      }

      const result = await response.json().catch(() => ({}));
      const success = result?.success === true;

      this.logger.log(`[AI]   结果: ${success ? '✅ 成功' : '❌ 失败'}`);
      this.logger.log(`[AI] ========================`);
      return success;
    } catch (error) {
      this.logger.error(`[AI] 通知AI服务异常: ${error.message}`, error.stack);
      return false;
    }
  }

  // ============================================================================
  // WHIP/WHEP代理辅助
  // ============================================================================

  /**
   * 代理WHIP请求到MediaMTX
   *
   * @param streamName 流名称
   * @param offerSdp Offer SDP
   * @returns Answer SDP和Location头
   */
  async proxyWhipRequest(
    streamName: string,
    offerSdp: string,
  ): Promise<{
    answerSdp: string;
    location?: string;
  }> {
    const primaryUrl = MediaMtxConfig.getMediaMtxWhipUrl(streamName);
    const fallbackUrl = MediaMtxConfig.getMediaMtxWhipFallbackUrl(streamName);

    this.logger.log(`[WHIP] ===== 代理到MediaMTX =====`);
    this.logger.log(`[WHIP]   streamName: ${streamName}`);
    this.logger.log(`[WHIP]   主URL: ${primaryUrl}`);
    this.logger.log(`[WHIP]   备用URL: ${fallbackUrl}`);

    try {
      // 尝试新版端点
      this.logger.log(`[WHIP] 尝试主URL...`);
      let response = await this.sendWhipRequest(primaryUrl, offerSdp);
      this.logger.log(`[WHIP] 主URL响应: ${response.status} ${response.statusText}`);

      // 404则回退到旧版
      if (response.status === 404) {
        this.logger.log(`[WHIP] 新版端点404，尝试备用URL: ${fallbackUrl}`);
        response = await this.sendWhipRequest(fallbackUrl, offerSdp);
        this.logger.log(`[WHIP] 备用URL响应: ${response.status} ${response.statusText}`);
      }

      if (!response.ok) {
        const errorText = await response.text();
        this.logger.error(`[WHIP] MediaMTX返回错误: ${response.status} ${errorText}`);
        throw new Error(
          `MediaMTX WHIP failed: ${response.status} ${errorText}`,
        );
      }

      const answerSdp = await response.text();
      const location = response.headers.get('Location') || undefined;

      this.logger.log(`[WHIP] 代理成功`);
      this.logger.log(`[WHIP]   Answer SDP长度: ${answerSdp.length} bytes`);
      this.logger.log(`[WHIP]   Location: ${location || 'N/A'}`);
      this.logger.log(`[WHIP] ========================`);
      return { answerSdp, location };
    } catch (error) {
      this.logger.error(`[WHIP] 代理失败: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * 代理WHEP请求到MediaMTX
   *
   * @param streamName 流名称
   * @param offerSdp Offer SDP
   * @returns Answer SDP和Location头
   */
  async proxyWhepRequest(
    streamName: string,
    offerSdp: string,
  ): Promise<{
    answerSdp: string;
    location?: string;
  }> {
    const primaryUrl = MediaMtxConfig.getMediaMtxWhepUrl(streamName);
    const fallbackUrl = MediaMtxConfig.getMediaMtxWhepFallbackUrl(streamName);

    this.logger.log(`[WHEP] 代理请求: ${streamName}`);

    try {
      // 尝试新版端点
      let response = await this.sendWhipRequest(primaryUrl, offerSdp);

      // 404则回退到旧版
      if (response.status === 404) {
        this.logger.log(`[WHEP] 新版端点404，尝试旧版: ${fallbackUrl}`);
        response = await this.sendWhipRequest(fallbackUrl, offerSdp);
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `MediaMTX WHEP failed: ${response.status} ${errorText}`,
        );
      }

      const answerSdp = await response.text();
      const location = response.headers.get('Location') || undefined;

      this.logger.log(`[WHEP] 代理成功: ${streamName}`);
      return { answerSdp, location };
    } catch (error) {
      this.logger.error(`[WHEP] 代理失败: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * 发送WHIP/WHEP请求
   *
   * @param url 目标URL
   * @param sdp SDP内容
   * @returns HTTP响应
   */
  private async sendWhipRequest(url: string, sdp: string): Promise<Response> {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/sdp',
        Accept: 'application/sdp',
      },
      body: sdp,
    });
  }
}
