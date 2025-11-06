/**
 * AI分析模块
 *
 * 提供AI数据相关性分析功能
 */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { AiAnalysisService } from './ai-analysis.service';
import { CheckpointReaderService } from './services/checkpoint-reader.service';
import { TimeWindowMatcherService } from './services/time-window-matcher.service';
import { FeatureExtractorService } from './services/feature-extractor.service';
import { BaselineComparatorService } from './services/baseline-comparator.service';
import { AnomalyContextBuilderService } from './services/anomaly-context-builder.service';
import { QuestionFinderService } from './services/question-finder.service';
import { AnomalyAnalyzerService } from './services/anomaly-analyzer.service';
import { AnomalyReportGeneratorService } from './services/anomaly-report-generator.service';
import { LLMClientService } from './services/llm-client.service';
import { PromptBuilderService } from './services/prompt-builder.service';
import { ReportCacheService } from './services/report-cache.service';
import { LLMReportGeneratorService } from './services/llm-report-generator.service';
import { AiAnalysisController } from './ai-analysis.controller';

@Module({
  imports: [ConfigModule, DatabaseModule],
  controllers: [AiAnalysisController],
  providers: [
    AiAnalysisService,
    CheckpointReaderService,
    TimeWindowMatcherService,
    FeatureExtractorService,
    BaselineComparatorService,
    AnomalyContextBuilderService,
    QuestionFinderService,
    AnomalyAnalyzerService,
    AnomalyReportGeneratorService,
    LLMClientService,
    PromptBuilderService,
    ReportCacheService,
    LLMReportGeneratorService,
  ],
  exports: [AiAnalysisService],
})
export class AiAnalysisModule {}
