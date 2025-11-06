/**
 * LLM报告生成服务
 *
 * 职责：
 * - 整合AI分析数据
 * - 调用LLM生成心理分析报告
 * - 管理生成进度和缓存
 */

import { Injectable, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { AnomalyReportGeneratorService } from './anomaly-report-generator.service';
import { LLMClientService } from './llm-client.service';
import { PromptBuilderService } from './prompt-builder.service';
import { ReportCacheService } from './report-cache.service';
import { CheckpointReaderService } from './checkpoint-reader.service';
import { TimeWindowMatcherService } from './time-window-matcher.service';
import { FeatureExtractorService } from './feature-extractor.service';
import { BaselineComparatorService } from './baseline-comparator.service';
import {
  GeneratedReport,
  ReportGenerationRequest,
  ReportGenerationProgress,
} from '../types/llm-report.types';
import { QuestionAIFeatures, BaselineComparison, TimeWindow } from '../types/ai-analysis.types';

@Injectable()
export class LLMReportGeneratorService {
  private readonly logger = new Logger(LLMReportGeneratorService.name);
  private progressMap = new Map<string, ReportGenerationProgress>();

  constructor(
    private readonly db: DatabaseService,
    private readonly checkpointReader: CheckpointReaderService,
    private readonly windowMatcher: TimeWindowMatcherService,
    private readonly featureExtractor: FeatureExtractorService,
    private readonly baselineComparator: BaselineComparatorService,
    private readonly anomalyGenerator: AnomalyReportGeneratorService,
    private readonly llmClient: LLMClientService,
    private readonly promptBuilder: PromptBuilderService,
    private readonly cache: ReportCacheService,
  ) {}

  // ==========================================================================
  // 公开方法
  // ==========================================================================

  /**
   * 生成报告（主入口）
   */
  async generateReport(
    request: ReportGenerationRequest,
  ): Promise<GeneratedReport> {
    const { examResultId, reportType } = request;

    // 检查缓存
    const cached = this.cache.get(examResultId, reportType);
    if (cached) {
      this.logger.log(`返回缓存的报告: ${examResultId}/${reportType}`);
      return cached;
    }

    // 检查LLM是否可用
    if (!this.llmClient.isAvailable()) {
      throw new Error('LLM服务未配置，请设置OPENROUTER_API_KEY环境变量');
    }

    // 初始化进度
    this.updateProgress(examResultId, {
      examResultId,
      status: 'analyzing',
      progress: 0,
      currentStep: '正在分析AI数据...',
    });

    try {
      let report: GeneratedReport;

      switch (reportType) {
        case 'comprehensive':
          report = await this.generateComprehensiveReport(examResultId);
          break;
        case 'anomaly-focused':
          report = await this.generateAnomalyFocusedReport(examResultId);
          break;
        case 'summary':
          report = await this.generateSummaryReport(examResultId);
          break;
        default:
          throw new Error(`不支持的报告类型: ${reportType}`);
      }

      // 缓存报告
      this.cache.set(examResultId, reportType, report);

      // 更新进度为完成
      this.updateProgress(examResultId, {
        examResultId,
        status: 'completed',
        progress: 100,
      });

      return report;
    } catch (error) {
      this.logger.error(`报告生成失败: ${error.message}`, error.stack);
      this.updateProgress(examResultId, {
        examResultId,
        status: 'failed',
        progress: 0,
        error: error.message,
      });
      throw error;
    }
  }

  /**
   * 获取生成进度
   */
  getProgress(examResultId: string): ReportGenerationProgress | null {
    return this.progressMap.get(examResultId) || null;
  }

  /**
   * 清除缓存
   */
  clearCache(examResultId?: string): void {
    if (examResultId) {
      this.cache.delete(examResultId);
    } else {
      this.cache.clear();
    }
  }

  // ==========================================================================
  // 私有方法：报告生成
  // ==========================================================================

  /**
   * 生成综合报告
   */
  private async generateComprehensiveReport(
    examResultId: string,
  ): Promise<GeneratedReport> {
    const startTime = Date.now();

    // 1. 分析考试结果（题目级）
    this.updateProgress(examResultId, {
      examResultId,
      status: 'analyzing',
      progress: 20,
      currentStep: '正在进行题目级AI分析...',
    });

    const aiAnalysisResult = await this.analyzeExamResultInternal(examResultId);

    // 2. 生成异常报告
    this.updateProgress(examResultId, {
      examResultId,
      status: 'analyzing',
      progress: 40,
      currentStep: '正在分析异常事件...',
    });

    const anomalyReport =
      await this.anomalyGenerator.generateReport(examResultId);

    // 3. 获取答案和题目信息
    const examResult = await this.db.examResult.findUnique({
      where: { id: examResultId },
      include: {
        answers: {
          include: { question: true },
          orderBy: { question: { order: 'asc' } },
        },
      },
    });

    if (!examResult) {
      throw new Error(`考试结果未找到: ${examResultId}`);
    }

    // 4. 构建Prompt
    this.updateProgress(examResultId, {
      examResultId,
      status: 'generating',
      progress: 60,
      currentStep: '正在生成心理分析报告...',
    });

    const questions = aiAnalysisResult.questions.map((q, idx) => ({
      questionTitle: examResult.answers[idx].question.title,
      questionType: examResult.answers[idx].question.type,
      answer: this.formatAnswer(examResult.answers[idx]),
      features: q.features,
      comparison: q.comparison,
    }));

    const { system, user } = this.promptBuilder.buildComprehensivePrompt(
      questions,
      anomalyReport.summary.totalAnomalies > 0 ? anomalyReport : undefined,
    );

    // 5. 调用LLM
    const llmResponse = await this.llmClient.complete(
      [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      {
        maxTokens: 8192,
        temperature: 0.7,
      },
    );

    // 6. 解析JSON响应
    const reportData = this.parseJSONResponse(llmResponse.content);

    const report: GeneratedReport = {
      examResultId,
      reportType: 'comprehensive',
      generatedAt: new Date(),
      ...reportData,
      metadata: {
        modelUsed: llmResponse.model,
        tokensConsumed: llmResponse.tokensUsed,
        generationTime: Date.now() - startTime,
        confidenceScore: 0.85, // 可以基于数据质量计算
      },
    };

    return report;
  }

  /**
   * 生成异常聚焦报告
   */
  private async generateAnomalyFocusedReport(
    examResultId: string,
  ): Promise<GeneratedReport> {
    const startTime = Date.now();

    // 1. 生成异常报告
    this.updateProgress(examResultId, {
      examResultId,
      status: 'analyzing',
      progress: 30,
      currentStep: '正在分析异常事件...',
    });

    const anomalyReport =
      await this.anomalyGenerator.generateReport(examResultId);

    if (anomalyReport.summary.totalAnomalies === 0) {
      throw new Error('未检测到任何异常事件，无法生成异常聚焦报告');
    }

    // 2. 获取相关题目的AI特征
    const aiAnalysisResult = await this.analyzeExamResultInternal(examResultId);

    const relatedQuestions = aiAnalysisResult.questions.map((q) => ({
      questionTitle: q.features.questionId,
      features: q.features,
    }));

    // 3. 构建Prompt
    this.updateProgress(examResultId, {
      examResultId,
      status: 'generating',
      progress: 60,
      currentStep: '正在生成异常分析报告...',
    });

    const { system, user } = this.promptBuilder.buildAnomalyFocusedPrompt(
      anomalyReport,
      relatedQuestions,
    );

    // 4. 调用LLM
    const llmResponse = await this.llmClient.complete(
      [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      {
        maxTokens: 4096,
        temperature: 0.7,
      },
    );

    // 5. 解析响应
    const anomalyInsights = this.parseJSONResponse(llmResponse.content);

    const report: GeneratedReport = {
      examResultId,
      reportType: 'anomaly-focused',
      generatedAt: new Date(),
      executiveSummary: anomalyInsights.riskAssessment,
      anomalyInsights: anomalyInsights.patternInterpretation,
      overallAssessment: {
        psychologicalProfile: anomalyInsights.riskAssessment,
        keyFindings: anomalyReport.overallAssessment.keyFindings,
        riskLevel: anomalyReport.overallAssessment.riskLevel,
        recommendations: [
          ...(anomalyInsights.interventionPlan?.immediate || []),
          ...(anomalyInsights.interventionPlan?.shortTerm || []),
        ],
      },
      metadata: {
        modelUsed: llmResponse.model,
        tokensConsumed: llmResponse.tokensUsed,
        generationTime: Date.now() - startTime,
        confidenceScore: 0.9,
      },
    };

    return report;
  }

  /**
   * 生成摘要报告（简化版）
   */
  private async generateSummaryReport(
    examResultId: string,
  ): Promise<GeneratedReport> {
    // 复用comprehensive逻辑，但只生成executiveSummary
    const fullReport = await this.generateComprehensiveReport(examResultId);

    return {
      ...fullReport,
      reportType: 'summary',
      questionAnalyses: undefined, // 移除题目级分析
    };
  }

  // ==========================================================================
  // 辅助方法
  // ==========================================================================

  /**
   * 内部AI分析方法（避免循环依赖）
   */
  private async analyzeExamResultInternal(examResultId: string): Promise<{
    baseline: any;
    questions: Array<{
      features: QuestionAIFeatures;
      comparison: BaselineComparison;
    }>;
  }> {
    // 获取考试结果和答题数据
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
      throw new Error(`考试结果未找到: ${examResultId}`);
    }

    // 读取checkpoint数据
    let checkpointData;
    try {
      checkpointData =
        await this.checkpointReader.readByExamResultId(examResultId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        // 将NotFoundException转换为BadRequestException，提供更友好的错误信息
        this.logger.warn(`考试结果 ${examResultId} 没有AI监控数据`);
        throw new BadRequestException(
          '该考试结果没有AI监控数据，无法生成报告。请确保考试已启用AI监控且学生已完成考试。',
        );
      }
      // 其他错误直接抛出
      throw error;
    }

    // 计算基线
    const baselineData = this.windowMatcher.calculateBaseline(
      checkpointData,
      examResult.startedAt,
    );
    const baseline = this.baselineComparator.calculateBaseline(baselineData);

    // 分析每个题目
    const questions = await Promise.all(
      examResult.answers
        .filter((answer) => answer.questionDisplayedAt)
        .map(async (answer) => {
          const timeWindow: TimeWindow = {
            start: answer.questionDisplayedAt!,
            end: answer.answeredAt,
            preBuffer: 5000,
            postBuffer: 2000,
          };

          const windowedData = this.windowMatcher.filterByWindow(
            checkpointData,
            timeWindow,
          );

          const features = this.featureExtractor.extractQuestionFeatures(
            answer.questionId,
            windowedData,
            timeWindow,
          );

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

  private updateProgress(
    examResultId: string,
    progress: Partial<ReportGenerationProgress>,
  ): void {
    const current = this.progressMap.get(examResultId) || {
      examResultId,
      status: 'queued' as const,
      progress: 0,
    };

    this.progressMap.set(examResultId, { ...current, ...progress });
  }

  private formatAnswer(answer: any): string {
    if (answer.selectedOptions && answer.selectedOptions.length > 0) {
      return `选项: ${answer.selectedOptions.join(', ')}`;
    }
    if (answer.textAnswer) {
      return answer.textAnswer;
    }
    return '未作答';
  }

  private parseJSONResponse(content: string): any {
    // 提取JSON代码块
    const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[1]);
    }

    // 尝试直接解析
    try {
      return JSON.parse(content);
    } catch {
      throw new Error('LLM响应不是有效的JSON格式');
    }
  }
}
