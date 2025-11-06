/**
 * AI数据写入DTO
 * 用于AI服务向后端API写入分析数据
 */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsObject,
  IsISO8601,
  Min,
  Max,
  IsBoolean,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

// ============================================================================
// 枚举类型（与Prisma Schema一致）
// ============================================================================

export enum AiSessionStatus {
  CREATED = 'CREATED',
  ANALYZING = 'ANALYZING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export enum AnomalyType {
  MULTIPLE_FACES = 'MULTIPLE_FACES',
  NO_FACE_DETECTED = 'NO_FACE_DETECTED',
  UNUSUAL_MOVEMENT = 'UNUSUAL_MOVEMENT',
  ATTENTION_DROP = 'ATTENTION_DROP',
  EMOTIONAL_SPIKE = 'EMOTIONAL_SPIKE',
  TECHNICAL_ISSUE = 'TECHNICAL_ISSUE',
}

export enum AnomalySeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

// ============================================================================
// 创建AI会话DTO
// ============================================================================

export class CreateAiSessionDto {
  @ApiProperty({ description: '会话ID（由AI服务生成）' })
  @IsString()
  session_id: string;

  @ApiPropertyOptional({ description: '考试结果ID' })
  @IsString()
  @IsOptional()
  exam_result_id?: string;

  @ApiPropertyOptional({ description: '客户端信息（JSON）' })
  @IsObject()
  @IsOptional()
  client_info?: Record<string, any>;

  @ApiPropertyOptional({ description: '流信息（JSON）' })
  @IsObject()
  @IsOptional()
  stream_info?: Record<string, any>;
}

// ============================================================================
// 更新会话状态DTO
// ============================================================================

export class UpdateSessionStatusDto {
  @ApiProperty({ description: '会话状态', enum: AiSessionStatus })
  @IsEnum(AiSessionStatus)
  status: AiSessionStatus;

  @ApiPropertyOptional({ description: '结束时间（ISO 8601）' })
  @IsISO8601()
  @IsOptional()
  end_time?: string;
}

// ============================================================================
// 更新会话文件信息DTO（新架构：JSON文件存储）
// ============================================================================

export class UpdateSessionFileInfoDto {
  @ApiProperty({ description: '检查点文件相对路径（例如：2025/01/21/session_id_data.json）' })
  @IsString()
  checkpoint_file_path: string;

  @ApiProperty({ description: '检查点数据点数量' })
  @IsNumber()
  @Min(0)
  checkpoint_count: number;

  @ApiProperty({ description: '文件大小（字节）' })
  @IsNumber()
  @Min(0)
  file_size: number;
}

// ============================================================================
// 保存聚合分析结果DTO
// ============================================================================

export class SaveAggregateDto {
  @ApiProperty({ description: '会话ID' })
  @IsString()
  session_id: string;

  @ApiPropertyOptional({ description: '考试结果ID' })
  @IsString()
  @IsOptional()
  exam_result_id?: string;

  // 情绪分析
  @ApiPropertyOptional({ description: '平均效价（-1到1）', minimum: -1, maximum: 1 })
  @IsNumber()
  @Min(-1)
  @Max(1)
  @IsOptional()
  avg_valence?: number;

  @ApiPropertyOptional({ description: '平均唤醒度（0到1）', minimum: 0, maximum: 1 })
  @IsNumber()
  @Min(0)
  @Max(1)
  @IsOptional()
  avg_arousal?: number;

  @ApiPropertyOptional({ description: '主导情绪' })
  @IsString()
  @IsOptional()
  dominant_emotion?: string;

  @ApiPropertyOptional({ description: '情绪分布（JSON）' })
  @IsObject()
  @IsOptional()
  emotion_distribution?: Record<string, number>;

  // 注意力分析
  @ApiPropertyOptional({ description: '平均注意力（0到1）', minimum: 0, maximum: 1 })
  @IsNumber()
  @Min(0)
  @Max(1)
  @IsOptional()
  avg_attention?: number;

  @ApiPropertyOptional({ description: '注意力变异性（标准差）', minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  attention_variability?: number;

  @ApiPropertyOptional({ description: '分心事件次数', minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  distraction_events?: number;

  @ApiPropertyOptional({ description: '参与度评分（0-100）', minimum: 0, maximum: 100 })
  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  engagement_score?: number;

  @ApiPropertyOptional({ description: '一致性评分（0-100）', minimum: 0, maximum: 100 })
  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  consistency_score?: number;

  // 心率分析
  @ApiPropertyOptional({ description: '平均心率（bpm）', minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  avg_heart_rate?: number;

  @ApiPropertyOptional({ description: '心率变异性（HRV）', minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  heart_rate_variability?: number;

  @ApiPropertyOptional({ description: '压力指标（JSON）' })
  @IsObject()
  @IsOptional()
  stress_indicators?: Record<string, any>;

  // 数据质量
  @ApiPropertyOptional({ description: '数据质量（0-1）', minimum: 0, maximum: 1 })
  @IsNumber()
  @Min(0)
  @Max(1)
  @IsOptional()
  data_quality?: number;

  @ApiPropertyOptional({
    description: '分析置信度（0-1）',
    minimum: 0,
    maximum: 1,
  })
  @IsNumber()
  @Min(0)
  @Max(1)
  @IsOptional()
  analysis_confidence?: number;
}

// ============================================================================
// 保存异常事件DTO
// ============================================================================

export class SaveAnomalyDto {
  @ApiProperty({ description: '会话ID' })
  @IsString()
  session_id: string;

  @ApiProperty({ description: '异常类型', enum: AnomalyType })
  @IsEnum(AnomalyType)
  type: AnomalyType;

  @ApiProperty({ description: '严重程度', enum: AnomalySeverity })
  @IsEnum(AnomalySeverity)
  severity: AnomalySeverity;

  @ApiProperty({ description: '时间戳（ISO 8601）' })
  @IsISO8601()
  timestamp: string;

  @ApiPropertyOptional({ description: '持续时间（秒）', minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  duration?: number;

  @ApiPropertyOptional({ description: '置信度（0-1）', minimum: 0, maximum: 1 })
  @IsNumber()
  @Min(0)
  @Max(1)
  @IsOptional()
  confidence?: number;

  @ApiProperty({ description: '描述' })
  @IsString()
  description: string;

  @ApiPropertyOptional({ description: '元数据（JSON）' })
  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;
}
