// ============================================================================
// WebRTC模块
// ============================================================================

import { Module } from '@nestjs/common';
import { WebrtcController } from './webrtc.controller';
import { WebrtcService } from './webrtc.service';

/**
 * WebRTC模块
 *
 * 提供WebRTC流管理和WHIP/WHEP代理功能
 * 用于学生端AI监控的音视频传输
 */
@Module({
  controllers: [WebrtcController],
  providers: [WebrtcService],
  exports: [WebrtcService],
})
export class WebrtcModule {}
