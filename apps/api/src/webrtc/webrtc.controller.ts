// ============================================================================
// WebRTC控制器
// ============================================================================

import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  Query,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { WebrtcService } from './webrtc.service';
import { StartStreamDto, StopStreamDto } from './dto';

/**
 * WebRTC API控制器
 *
 * 提供WebRTC流管理和WHIP/WHEP代理端点
 * 所有端点均为公开接口（学生端使用）
 */
@Controller('webrtc')
export class WebrtcController {
  private readonly logger = new Logger(WebrtcController.name);

  constructor(private readonly webrtcService: WebrtcService) {}

  // ============================================================================
  // 流管理端点
  // ============================================================================

  /**
   * 启动WebRTC流
   *
   * POST /api/webrtc/start
   *
   * 用于学生端开始考试时创建推流会话
   * 返回WHIP/WHEP端点URL和流信息
   *
   * @param dto 启动流请求
   * @returns 流信息
   */
  @Post('start')
  async startStream(@Body() dto: StartStreamDto) {
    try {
      this.logger.log(
        `[POST /webrtc/start] examUuid=${dto.exam_uuid}, participantId=${dto.participant_id}`,
      );

      const result = await this.webrtcService.startStream(dto);

      // 直接返回结果，让TransformInterceptor统一包装
      return result;
    } catch (error) {
      this.logger.error(
        `[POST /webrtc/start] 失败: ${error.message}`,
        error.stack,
      );

      throw new HttpException(
        {
          success: false,
          error: error.message || 'Failed to start stream',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * 停止WebRTC流
   *
   * POST /api/webrtc/stop
   *
   * 用于学生端提交考试或异常退出时停止推流
   * 会通知AI服务停止RTSP消费
   *
   * @param dto 停止流请求
   * @returns 停止结果
   */
  @Post('stop')
  async stopStream(@Body() dto: StopStreamDto) {
    try {
      this.logger.log(`[POST /webrtc/stop] ===== 接收停止流请求 =====`);
      this.logger.log(`[POST /webrtc/stop]   exam_uuid: ${dto.exam_uuid}`);
      this.logger.log(`[POST /webrtc/stop]   participant_id: ${dto.participant_id}`);
      this.logger.log(`[POST /webrtc/stop]   session_id: ${dto.session_id || '未提供'}`);

      const result = await this.webrtcService.stopStream(dto);

      this.logger.log(`[POST /webrtc/stop]   结果: streamName=${result.streamName}, aiStopped=${result.aiRtspStopped}`);
      this.logger.log(`[POST /webrtc/stop] ========================`);

      // 直接返回结果，让TransformInterceptor统一包装
      return result;
    } catch (error) {
      this.logger.error(
        `[POST /webrtc/stop] ===== 停止流失败 =====`,
      );
      this.logger.error(
        `[POST /webrtc/stop]   错误: ${error.message}`,
      );
      this.logger.error(
        `[POST /webrtc/stop]   堆栈: ${error.stack}`,
      );
      this.logger.error(
        `[POST /webrtc/stop] ========================`,
      );

      throw new HttpException(
        {
          success: false,
          error: error.message || 'Failed to stop stream',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ============================================================================
  // WHIP/WHEP代理端点
  // ============================================================================

  /**
   * WHIP协议代理
   *
   * POST /api/webrtc/whip?stream={streamName}
   *
   * 代理浏览器的WHIP请求到MediaMTX服务器
   * 用于建立WebRTC推流连接
   *
   * 请求：
   * - Content-Type: application/sdp
   * - Body: Offer SDP
   *
   * 响应：
   * - Content-Type: application/sdp
   * - Body: Answer SDP
   * - Location: 资源URL（可选）
   *
   * @param stream 流名称
   * @param req HTTP请求
   * @param res HTTP响应
   */
  @Post('whip')
  async whipProxy(
    @Query('stream') stream: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      // 1. 验证请求
      // Express text() middleware parses application/sdp as string in req.body
      const sdpBody = req.body;

      if (!sdpBody || typeof sdpBody !== 'string') {
        this.logger.error('[WHIP] 缺少SDP body或格式错误');
        return res.status(400).json({
          success: false,
          error: 'Missing or invalid SDP in request body',
        });
      }

      if (req.get('Content-Type') !== 'application/sdp') {
        this.logger.error('[WHIP] Content-Type错误');
        return res.status(400).json({
          success: false,
          error: 'Content-Type must be application/sdp',
        });
      }

      if (!stream) {
        this.logger.error('[WHIP] 缺少stream参数');
        return res.status(400).json({
          success: false,
          error: 'Missing stream parameter',
        });
      }

      this.logger.log(`[WHIP] ===== WHIP代理请求 =====`);
      this.logger.log(`[WHIP]   stream参数: ${stream}`);

      // 2. 代理到MediaMTX
      const offerSdp = sdpBody;
      this.logger.log(`[WHIP]   SDP长度: ${offerSdp.length} bytes`);

      const result = await this.webrtcService.proxyWhipRequest(stream, offerSdp);

      // 3. 返回Answer SDP
      this.logger.log(`[WHIP]   Answer SDP长度: ${result.answerSdp.length} bytes`);
      this.logger.log(`[WHIP]   Location header: ${result.location || 'N/A'}`);
      this.logger.log(`[WHIP] ========================`);

      if (result.location) {
        res.setHeader('Location', result.location);
      }
      res.setHeader('Content-Type', 'application/sdp');
      return res.send(result.answerSdp);
    } catch (error) {
      this.logger.error(`[WHIP] 代理失败: ${error.message}`, error.stack);

      return res.status(500).json({
        success: false,
        error: 'WHIP proxy error',
        message: error.message,
      });
    }
  }

  /**
   * WHEP协议代理
   *
   * POST /api/webrtc/whep?stream={streamName}
   *
   * 代理浏览器的WHEP请求到MediaMTX服务器
   * 用于建立WebRTC拉流连接（用于监控页面播放）
   *
   * 请求/响应格式同WHIP
   *
   * @param stream 流名称
   * @param req HTTP请求
   * @param res HTTP响应
   */
  @Post('whep')
  async whepProxy(
    @Query('stream') stream: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      // 1. 验证请求
      // Express text() middleware parses application/sdp as string in req.body
      const sdpBody = req.body;

      if (!sdpBody || typeof sdpBody !== 'string') {
        this.logger.error('[WHEP] 缺少SDP body或格式错误');
        return res.status(400).json({
          success: false,
          error: 'Missing or invalid SDP in request body',
        });
      }

      if (req.get('Content-Type') !== 'application/sdp') {
        this.logger.error('[WHEP] Content-Type错误');
        return res.status(400).json({
          success: false,
          error: 'Content-Type must be application/sdp',
        });
      }

      if (!stream) {
        this.logger.error('[WHEP] 缺少stream参数');
        return res.status(400).json({
          success: false,
          error: 'Missing stream parameter',
        });
      }

      this.logger.log(`[WHEP] 代理请求: stream=${stream}`);

      // 2. 代理到MediaMTX
      const offerSdp = sdpBody;
      const result = await this.webrtcService.proxyWhepRequest(stream, offerSdp);

      // 3. 返回Answer SDP
      if (result.location) {
        res.setHeader('Location', result.location);
      }
      res.setHeader('Content-Type', 'application/sdp');
      return res.send(result.answerSdp);
    } catch (error) {
      this.logger.error(`[WHEP] 代理失败: ${error.message}`, error.stack);

      return res.status(500).json({
        success: false,
        error: 'WHEP proxy error',
        message: error.message,
      });
    }
  }
}
