/**
 * 生成AI分析报告DTO
 */

import { IsString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GenerateReportDto {
  @ApiProperty({
    description: '报告类型',
    enum: ['comprehensive', 'anomaly-focused', 'summary'],
    default: 'comprehensive',
  })
  @IsEnum(['comprehensive', 'anomaly-focused', 'summary'])
  reportType: 'comprehensive' | 'anomaly-focused' | 'summary';

  @ApiProperty({
    description: 'LLM模型名称（可选，使用环境变量默认值）',
    required: false,
  })
  @IsOptional()
  @IsString()
  model?: string;
}
