import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { LlmService } from './llm.service';
import { DimensionCalculator } from './dimension-calculator';
import { PromptBuilder } from './prompt-builder';
import { ReportDto, DimensionScore, AnswerPerformance, AiAnalysisData } from './dto/report.dto';

/**
 * 报告生成服务
 *
 * 核心职责：
 * 1. 聚合考试结果数据
 * 2. 计算维度得分（自动检测）
 * 3. 获取AI分析数据
 * 4. 构建LLM提示词
 * 5. 调用Claude生成报告
 * 6. 缓存报告结果
 */
@Injectable()
export class ReportsService {
  private readonly logger = new Logger(ReportsService.name);

  constructor(
    private readonly db: DatabaseService,
    private readonly llm: LlmService,
    private readonly dimensionCalculator: DimensionCalculator,
    private readonly promptBuilder: PromptBuilder,
  ) {}

  /**
   * 生成AI分析报告
   *
   * 流程：
   * 1. 查询考试结果和答案
   * 2. 计算维度得分（自动检测是否有维度）
   * 3. 查询AI分析数据（如果存在）
   * 4. 构建LLM提示词
   * 5. 调用Claude API
   * 6. 返回完整报告
   */
  async generateReport(resultId: string): Promise<ReportDto> {
    this.logger.log(`[generateReport] 开始生成报告: ${resultId}`);

    // 1. 查询考试结果数据（包含答案、题目、试卷信息）
    const examResult = await this.fetchExamResultData(resultId);
    if (!examResult) {
      throw new NotFoundException(`考试结果不存在: ${resultId}`);
    }

    // 2. 计算维度得分
    const dimensionScores = await this.dimensionCalculator.calculate(
      examResult.answers,
      examResult.exam.paper.questions,
    );
    this.logger.log(
      `[generateReport] 维度分析完成: hasDimensions=${dimensionScores.hasDimensions}, count=${dimensionScores.scores.length}`,
    );

    // 3. 计算答题表现
    const answerPerformance = this.calculateAnswerPerformance(examResult);

    // 4. 获取AI分析数据
    const aiAnalysis = await this.fetchAiAnalysis(resultId);
    this.logger.log(
      `[generateReport] AI数据: available=${aiAnalysis.available}, quality=${aiAnalysis.data_quality || 'N/A'}`,
    );

    // 5. 构建LLM提示词
    const prompt = this.promptBuilder.build({
      studentInfo: {
        name: examResult.participantName,
        studentId: examResult.participantId,
      },
      paperInfo: {
        title: examResult.exam.paper.title,
        description: examResult.exam.paper.description,
      },
      answerPerformance,
      dimensionScores: dimensionScores.scores,
      hasDimensions: dimensionScores.hasDimensions,
      aiAnalysis,
    });

    this.logger.log(`[generateReport] 提示词构建完成, 长度: ${prompt.length} 字符`);

    // 6. 调用LLM生成报告
    const markdownContent = await this.llm.analyze(prompt);
    this.logger.log(`[generateReport] LLM生成完成, 长度: ${markdownContent.length} 字符`);

    // 7. 组装报告数据
    const report: ReportDto = {
      result_id: examResult.id,
      exam_id: examResult.examId,
      paper_title: examResult.exam.paper.title,
      student_name: examResult.participantName,
      student_id: examResult.participantId,
      completed_at: examResult.submittedAt?.toISOString() || new Date().toISOString(),
      has_dimensions: dimensionScores.hasDimensions,
      dimension_scores: dimensionScores.scores,
      answer_performance: answerPerformance,
      ai_analysis: aiAnalysis,
      markdown_content: markdownContent,
      generated_at: new Date().toISOString(),
    };

    this.logger.log(`[generateReport] ✅ 报告生成成功: ${resultId}`);
    return report;
  }

  /**
   * 获取已生成的报告
   *
   * TODO: 当前直接重新生成，未来可以实现缓存
   */
  async getReport(resultId: string): Promise<ReportDto> {
    // 当前版本：每次都重新生成（确保数据最新）
    // V2版本：可以实现数据库缓存
    return this.generateReport(resultId);
  }

  // ==========================================================================
  // 私有辅助方法
  // ==========================================================================

  /**
   * 查询考试结果数据
   */
  private async fetchExamResultData(resultId: string) {
    return this.db.examResult.findUnique({
      where: { id: resultId },
      include: {
        exam: {
          include: {
            paper: {
              include: {
                questions: {
                  orderBy: { order: 'asc' },
                },
              },
            },
          },
        },
        answers: {
          include: {
            question: true,
          },
          orderBy: {
            answeredAt: 'asc',
          },
        },
      },
    });
  }

  /**
   * 计算答题表现
   */
  private calculateAnswerPerformance(examResult: any): AnswerPerformance {
    const totalQuestions = examResult.answers.length;
    const correctCount = examResult.answers.filter(
      (a) => a.points === a.maxPoints,
    ).length;

    return {
      total_score: examResult.totalScore || 0,
      max_score: examResult.maxScore || 0,
      percentage: examResult.percentage || 0,
      time_spent: examResult.timeSpent || 0,
      total_questions: totalQuestions,
      correct_count: correctCount,
      correct_rate: totalQuestions > 0 ? correctCount / totalQuestions : 0,
    };
  }

  /**
   * 获取AI分析数据
   */
  private async fetchAiAnalysis(resultId: string): Promise<AiAnalysisData> {
    try {
      // 尝试查询聚合数据
      const aggregate = await this.db.aiAnalysisAggregate.findUnique({
        where: { examResultId: resultId },
        include: {
          session: {
            include: {
              anomalies: {
                orderBy: { timestamp: 'asc' },
              },
            },
          },
        },
      });

      if (!aggregate) {
        this.logger.warn(`[fetchAiAnalysis] 未找到AI聚合数据: ${resultId}`);
        return { available: false };
      }

      // 检查数据质量
      if (!aggregate.dataQuality || aggregate.dataQuality < 0.3) {
        this.logger.warn(
          `[fetchAiAnalysis] AI数据质量过低: ${aggregate.dataQuality}`,
        );
        return {
          available: false,
          data_quality: aggregate.dataQuality || 0,
        };
      }

      // 返回完整AI数据
      return {
        available: true,
        data_quality: aggregate.dataQuality,
        analysis_confidence: aggregate.analysisConfidence || 0,
        avg_valence: aggregate.avgValence || 0,
        avg_arousal: aggregate.avgArousal || 0,
        dominant_emotion: aggregate.dominantEmotion || 'unknown',
        emotion_distribution: (aggregate.emotionDistribution as any) || {},
        avg_attention: aggregate.avgAttention || 0,
        attention_variability: aggregate.attentionVariability || 0,
        distraction_events: aggregate.distractionEvents || 0,
        avg_heart_rate: aggregate.avgHeartRate || 0,
        heart_rate_variability: aggregate.heartRateVariability || 0,
        stress_indicators: (aggregate.stressIndicators as any) || {},
        anomalies: aggregate.session?.anomalies.map((a) => ({
          type: a.type,
          severity: a.severity,
          timestamp: a.timestamp.toISOString(),
          description: a.description || '',
        })) || [],
      };
    } catch (error) {
      this.logger.error(`[fetchAiAnalysis] 查询AI数据失败: ${error.message}`);
      return { available: false };
    }
  }
}
