// ============================================================================
// StopStreamDto - 停止WebRTC流传输DTO
// ============================================================================

import { IsString, IsOptional, IsUUID } from 'class-validator';

/**
 * 停止WebRTC流传输请求DTO
 *
 * 用于学生端提交考试或异常退出时，停止WebRTC推流
 */
export class StopStreamDto {
  /**
   * 考试ID (支持cuid或UUID格式)
   * 用于定位需要停止的流
   */
  @IsOptional()
  @IsString()
  exam_uuid?: string;

  /**
   * 参与者ID（学号）
   * 用于定位需要停止的流
   */
  @IsOptional()
  @IsString()
  participant_id?: string;

  /**
   * 数据库会话ID（AI服务使用）
   * 用于精确定位AI服务中的RTSP消费者
   * 优先级高于exam_uuid + participant_id组合
   */
  @IsOptional()
  @IsString()
  session_id?: string;
}
