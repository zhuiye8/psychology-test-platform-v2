/**
 * AI分析主服务
 *
 * 职责：
 * - 整合checkpoint读取、时间窗口匹配、特征提取、基线对比
 * - 提供高层API供controller调用
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CheckpointReaderService } from './services/checkpoint-reader.service';
import { TimeWindowMatcherService } from './services/time-window-matcher.service';
import { FeatureExtractorService } from './services/feature-extractor.service';
import { BaselineComparatorService } from './services/baseline-comparator.service';
import { AnomalyReportGeneratorService } from './services/anomaly-report-generator.service';
import { LLMReportGeneratorService } from './services/llm-report-generator.service';
import {
  QuestionAIFeatures,
  BaselineMetrics,
  BaselineComparison,
  TimeWindow,
} from './types/ai-analysis.types';
import { AnomalyReport } from './types/anomaly.types';
import {
  GeneratedReport,
  ReportGenerationRequest,
  ReportGenerationProgress,
} from './types/llm-report.types';

@Injectable()
export class AiAnalysisService {
  constructor(
    private readonly db: DatabaseService,
    private readonly checkpointReader: CheckpointReaderService,
    private readonly windowMatcher: TimeWindowMatcherService,
    private readonly featureExtractor: FeatureExtractorService,
    private readonly baselineComparator: BaselineComparatorService,
    private readonly anomalyReportGenerator: AnomalyReportGeneratorService,
    private readonly llmReportGenerator: LLMReportGeneratorService,
  ) {}

  // ==========================================================================
  // 公开方法
  // ==========================================================================

  /**
   * 分析单个考试结果的所有题目
   *
   * @returns 包含每个题目的AI特征和基线对比
   */
  async analyzeExamResult(examResultId: string): Promise<{
    baseline: BaselineMetrics;
    questions: Array<{
      features: QuestionAIFeatures;
      comparison: BaselineComparison;
    }>;
  }> {
    // 1. 获取考试结果和答题数据
    const examResult = await this.db.examResult.findUnique({
      where: { id: examResultId },
      include: {
        answers: {
          include: { question: true },
          orderBy: { question: { order: 'asc' } },
        },
        exam: true,
      },
    });

    if (!examResult) {
      throw new NotFoundException(`Exam result not found: ${examResultId}`);
    }

    // 2. 读取checkpoint数据
    const checkpointData = await this.checkpointReader.readByExamResultId(examResultId);

    // 3. 计算基线（考试开始前或开始时的数据）
    const baselineData = this.windowMatcher.calculateBaseline(
      checkpointData,
      examResult.startedAt,
    );
    const baseline = this.baselineComparator.calculateBaseline(baselineData);

    // 4. 分析每个题目
    const questions = await Promise.all(
      examResult.answers
        .filter((answer) => answer.questionDisplayedAt) // 只分析有时间戳的题目
        .map(async (answer) => {
          // 构建时间窗口
          const timeWindow: TimeWindow = {
            start: answer.questionDisplayedAt!,
            end: answer.answeredAt,
            preBuffer: 5000, // 前5秒
            postBuffer: 2000, // 后2秒
          };

          // 过滤AI数据
          const windowedData = this.windowMatcher.filterByWindow(checkpointData, timeWindow);

          // 提取特征
          const features = this.featureExtractor.extractQuestionFeatures(
            answer.questionId,
            windowedData,
            timeWindow,
          );

          // 对比基线
          const comparison = this.baselineComparator.compareWithBaseline(
            answer.questionId,
            features,
            baseline,
          );

          return { features, comparison };
        }),
    );

    return { baseline, questions };
  }

  /**
   * 分析单个题目的AI数据
   */
  async analyzeQuestion(
    examResultId: string,
    questionId: string,
  ): Promise<{
    features: QuestionAIFeatures;
    comparison: BaselineComparison;
  }> {
    // 获取答案数据
    const answer = await this.db.answer.findUnique({
      where: {
        examResultId_questionId: { examResultId, questionId },
      },
    });

    if (!answer?.questionDisplayedAt) {
      throw new NotFoundException(
        `Answer with timing data not found for question: ${questionId}`,
      );
    }

    // 读取checkpoint数据
    const checkpointData = await this.checkpointReader.readByExamResultId(examResultId);

    // 获取考试开始时间
    const examResult = await this.db.examResult.findUnique({
      where: { id: examResultId },
      select: { startedAt: true },
    });

    if (!examResult) {
      throw new NotFoundException(`Exam result not found: ${examResultId}`);
    }

    // 计算基线
    const baselineData = this.windowMatcher.calculateBaseline(
      checkpointData,
      examResult.startedAt,
    );
    const baseline = this.baselineComparator.calculateBaseline(baselineData);

    // 构建时间窗口
    const timeWindow: TimeWindow = {
      start: answer.questionDisplayedAt,
      end: answer.answeredAt,
      preBuffer: 5000,
      postBuffer: 2000,
    };

    // 过滤数据并提取特征
    const windowedData = this.windowMatcher.filterByWindow(checkpointData, timeWindow);
    const features = this.featureExtractor.extractQuestionFeatures(
      questionId,
      windowedData,
      timeWindow,
    );

    // 对比基线
    const comparison = this.baselineComparator.compareWithBaseline(questionId, features, baseline);

    return { features, comparison };
  }

  /**
   * 生成异常报告
   */
  async generateAnomalyReport(examResultId: string): Promise<AnomalyReport> {
    return this.anomalyReportGenerator.generateReport(examResultId);
  }

  /**
   * 生成LLM心理分析报告
   */
  async generateLLMReport(
    request: ReportGenerationRequest,
  ): Promise<GeneratedReport> {
    return this.llmReportGenerator.generateReport(request);
  }

  /**
   * 获取LLM报告生成进度
   */
  getLLMReportProgress(examResultId: string): ReportGenerationProgress | null {
    return this.llmReportGenerator.getProgress(examResultId);
  }

  /**
   * 清除缓存
   */
  clearCache(sessionId?: string): void {
    this.checkpointReader.clearCache(sessionId);
    this.llmReportGenerator.clearCache(sessionId);
  }
}
