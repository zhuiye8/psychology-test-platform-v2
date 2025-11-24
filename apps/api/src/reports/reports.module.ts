import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { LlmService } from './llm.service';
import { DimensionCalculator } from './dimension-calculator';
import { PromptBuilder } from './prompt-builder';

/**
 * AI报告生成模块
 *
 * 核心功能：
 * - 计算维度得分（自动检测是否有维度字段）
 * - 获取AI分析数据（情绪、心率、注意力）
 * - 调用LLM生成心理分析报告
 * - 支持PDF导出（浏览器打印）
 */
@Module({
  controllers: [ReportsController],
  providers: [ReportsService, LlmService, DimensionCalculator, PromptBuilder],
  exports: [ReportsService],
})
export class ReportsModule {}
