// ============================================================================
// StartStreamDto - 启动WebRTC流传输DTO
// ============================================================================

import { IsString, IsOptional, IsUUID } from 'class-validator';

/**
 * 启动WebRTC流传输请求DTO
 *
 * 用于学生端开始考试时，创建WebRTC推流会话
 * 流名称格式：{exam_uuid}_{participant_id}
 */
export class StartStreamDto {
  /**
   * 考试ID (支持cuid或UUID格式)
   * 用于生成唯一的流名称
   */
  @IsOptional()
  @IsString()
  exam_uuid?: string;

  /**
   * 参与者ID（学号）
   * 用于生成唯一的流名称和关联学生信息
   */
  @IsOptional()
  @IsString()
  participant_id?: string;
}
