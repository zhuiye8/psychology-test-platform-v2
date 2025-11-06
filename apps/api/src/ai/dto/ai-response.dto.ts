import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ============================================================================
// AI会话响应DTO
// ============================================================================

export class AiSessionDto {
  @ApiProperty({ description: '会话ID' })
  id: string;

  @ApiProperty({ description: '会话唯一标识' })
  session_id: string;

  @ApiPropertyOptional({ description: '关联的考试结果ID' })
  exam_result_id?: string;

  @ApiProperty({ description: '会话状态', enum: ['CREATED', 'ACTIVE', 'COMPLETED', 'FAILED'] })
  status: string;

  @ApiProperty({ description: '开始时间' })
  start_time: Date;

  @ApiPropertyOptional({ description: '结束时间' })
  end_time?: Date;

  @ApiPropertyOptional({ description: '客户端IP' })
  client_ip?: string;

  @ApiPropertyOptional({ description: '用户代理' })
  user_agent?: string;

  @ApiPropertyOptional({ description: '客户端信息 (JSON)' })
  client_info?: any;

  @ApiPropertyOptional({ description: '流信息 (JSON)' })
  stream_info?: any;

  // 新架构：文件存储信息
  @ApiPropertyOptional({ description: '检查点文件相对路径（例如：2025/01/21/session_id_data.json）' })
  checkpoint_file_path?: string;

  @ApiPropertyOptional({ description: '检查点数据点数量' })
  checkpoint_count?: number;

  @ApiPropertyOptional({ description: '文件大小（字节）' })
  file_size?: number;

  @ApiProperty({ description: '创建时间' })
  created_at: Date;

  @ApiProperty({ description: '更新时间' })
  updated_at: Date;
}

// ============================================================================
// AI分析聚合数据响应DTO
// ============================================================================

export class AiAggregateDto {
  @ApiProperty({ description: '聚合数据ID' })
  id: string;

  @ApiProperty({ description: '会话ID' })
  session_id: string;

  @ApiProperty({ description: '考试结果ID' })
  exam_result_id: string;

  // 情绪指标
  @ApiPropertyOptional({ description: '平均情绪效价（-1到1）' })
  avg_valence?: number;

  @ApiPropertyOptional({ description: '平均情绪唤醒度（0到1）' })
  avg_arousal?: number;

  @ApiPropertyOptional({ description: '主导情绪' })
  dominant_emotion?: string;

  @ApiPropertyOptional({ description: '情绪分布' })
  emotion_distribution?: any;

  // 注意力指标
  @ApiPropertyOptional({ description: '平均注意力分数（0到1）' })
  avg_attention?: number;

  @ApiPropertyOptional({ description: '注意力变化性' })
  attention_variability?: number;

  @ApiPropertyOptional({ description: '分心事件次数' })
  distraction_events?: number;

  // 参与度指标
  @ApiPropertyOptional({ description: '整体参与度分数（0到1）' })
  engagement_score?: number;

  @ApiPropertyOptional({ description: '行为一致性分数（0到1）' })
  consistency_score?: number;

  // 生理指标
  @ApiPropertyOptional({ description: '平均心率（BPM）' })
  avg_heart_rate?: number;

  @ApiPropertyOptional({ description: '心率变异性' })
  heart_rate_variability?: number;

  @ApiPropertyOptional({ description: '压力指标' })
  stress_indicators?: any;

  // 质量指标
  @ApiProperty({ description: '数据质量（0到1）' })
  data_quality: number;

  @ApiProperty({ description: '分析置信度（0到1）' })
  analysis_confidence: number;

  @ApiProperty({ description: '创建时间' })
  created_at: Date;

  @ApiProperty({ description: '更新时间' })
  updated_at: Date;
}

// ============================================================================
// AI异常事件响应DTO
// ============================================================================

export class AiAnomalyDto {
  @ApiProperty({ description: '异常事件ID' })
  id: string;

  @ApiProperty({ description: '会话ID' })
  session_id: string;

  @ApiProperty({
    description: '异常类型',
    enum: [
      'MULTIPLE_FACES',
      'NO_FACE_DETECTED',
      'UNUSUAL_MOVEMENT',
      'ATTENTION_DROP',
      'EMOTIONAL_SPIKE',
      'TECHNICAL_ISSUE',
    ],
  })
  type: string;

  @ApiProperty({
    description: '严重程度',
    enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
  })
  severity: string;

  @ApiProperty({ description: '发生时间' })
  timestamp: Date;

  @ApiPropertyOptional({ description: '持续时长（秒）' })
  duration?: number;

  @ApiProperty({ description: '置信度（0到1）' })
  confidence: number;

  @ApiProperty({ description: '描述' })
  description: string;

  @ApiPropertyOptional({ description: '元数据' })
  metadata?: any;

  @ApiProperty({ description: '创建时间' })
  created_at: Date;
}

// ============================================================================
// AI会话指标响应DTO
// ============================================================================

export class AiSessionMetricsDto {
  @ApiProperty({ description: '会话ID' })
  session_id: string;

  @ApiProperty({ description: '会话状态' })
  status: string;

  @ApiProperty({ description: '会话时长（秒）' })
  duration: number;

  @ApiProperty({ description: '异常事件统计' })
  anomaly_counts: {
    total: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
  };

  @ApiPropertyOptional({ description: '聚合数据' })
  aggregate?: AiAggregateDto | null;
}

// ============================================================================
// AI分析状态批量检查响应DTO
// ============================================================================

export class AiBatchCheckDto {
  @ApiProperty({ description: 'AI分析状态映射（resultId -> hasAi）' })
  ai_status_map: Record<string, boolean>;
}
