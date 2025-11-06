/**
 * 异常上下文构建服务
 *
 * 职责：
 * - 读取数据库中的异常事件
 * - 构建完整的异常上下文（包含题目关联、AI数据）
 * - 为异常分析提供结构化数据
 */

import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { CheckpointReaderService } from './checkpoint-reader.service';
import { TimeWindowMatcherService } from './time-window-matcher.service';
import { AnomalyContext } from '../types/anomaly.types';
import { TimeWindow } from '../types/ai-analysis.types';

@Injectable()
export class AnomalyContextBuilderService {
  constructor(
    private readonly db: DatabaseService,
    private readonly checkpointReader: CheckpointReaderService,
    private readonly windowMatcher: TimeWindowMatcherService,
  ) {}

  // ==========================================================================
  // 公开方法
  // ==========================================================================

  /**
   * 构建单个异常的完整上下文
   */
  async buildContext(
    anomalyId: string,
    examResultId: string,
  ): Promise<AnomalyContext> {
    // 1. 读取异常事件
    const anomaly = await this.db.aiAnomaly.findUnique({
      where: { id: anomalyId },
    });

    if (!anomaly) {
      throw new Error(`Anomaly not found: ${anomalyId}`);
    }

    // 2. 查找相关题目（根据时间戳）
    const relatedQuestion = await this.findRelatedQuestion(
      anomaly.timestamp,
      examResultId,
    );

    // 3. 提取异常发生时的AI数据（3秒窗口）
    const aiFeatures = await this.extractAnomalyFeatures(
      anomaly.timestamp,
      examResultId,
    );

    return {
      anomalyId: anomaly.id,
      type: anomaly.type as any,
      severity: anomaly.severity as any,
      timestamp: anomaly.timestamp,
      duration: anomaly.duration || 0,
      confidence: anomaly.confidence,
      description: anomaly.description,
      relatedQuestion,
      aiFeatures,
    };
  }

  /**
   * 批量构建异常上下文
   */
  async buildContexts(examResultId: string): Promise<AnomalyContext[]> {
    // 读取该考试结果的所有异常
    const examResult = await this.db.examResult.findUnique({
      where: { id: examResultId },
      include: {
        aiSession: {
          include: {
            anomalies: {
              orderBy: { timestamp: 'asc' },
            },
          },
        },
      },
    });

    if (!examResult?.aiSession) {
      return [];
    }

    // 并行构建所有异常上下文
    return Promise.all(
      examResult.aiSession.anomalies.map((anomaly) =>
        this.buildContext(anomaly.id, examResultId),
      ),
    );
  }

  // ==========================================================================
  // 私有方法
  // ==========================================================================

  /**
   * 查找异常时间点关联的题目
   */
  private async findRelatedQuestion(
    anomalyTimestamp: Date,
    examResultId: string,
  ): Promise<AnomalyContext['relatedQuestion']> {
    // 查询所有答案的时间窗口
    const answers = await this.db.answer.findMany({
      where: { examResultId },
      include: { question: true },
      orderBy: { questionDisplayedAt: 'asc' },
    });

    // 找到包含异常时间的题目
    for (const answer of answers) {
      if (!answer.questionDisplayedAt) continue;

      const displayTime = answer.questionDisplayedAt.getTime();
      const answerTime = answer.answeredAt.getTime();
      const anomalyTime = anomalyTimestamp.getTime();

      // 异常发生在题目显示到回答之间（允许5秒后缓冲）
      if (anomalyTime >= displayTime && anomalyTime <= answerTime + 5000) {
        const timeOffset = (anomalyTime - displayTime) / 1000;

        return {
          questionId: answer.questionId,
          questionTitle: answer.question.title,
          questionType: answer.question.type,
          timeOffset,
        };
      }
    }

    return undefined;
  }

  /**
   * 提取异常发生时的AI特征（3秒窗口）
   */
  private async extractAnomalyFeatures(
    anomalyTimestamp: Date,
    examResultId: string,
  ): Promise<AnomalyContext['aiFeatures']> {
    try {
      // 读取checkpoint数据
      const checkpointData =
        await this.checkpointReader.readByExamResultId(examResultId);

      // 定义3秒窗口
      const window: TimeWindow = {
        start: new Date(anomalyTimestamp.getTime() - 1500), // 前1.5秒
        end: new Date(anomalyTimestamp.getTime() + 1500), // 后1.5秒
      };

      // 过滤数据
      const windowedData = this.windowMatcher.filterByWindow(
        checkpointData,
        window,
      );

      // 提取特征
      const features: AnomalyContext['aiFeatures'] = {};

      // 心率（取平均值）
      if (windowedData.heartRates.length > 0) {
        const hrValues = windowedData.heartRates.map(
          (d) => d.payload.heart_rate,
        );
        features.heartRate =
          hrValues.reduce((sum, v) => sum + v, 0) / hrValues.length;
      }

      // 情绪（取最近的一个）
      if (windowedData.videoEmotions.length > 0) {
        const latest =
          windowedData.videoEmotions[windowedData.videoEmotions.length - 1];
        features.emotion = latest.payload.dominant_emotion;
        features.emotionConfidence = latest.confidence;
      }

      return features;
    } catch (error) {
      // 如果读取失败（例如没有checkpoint文件），返回空特征
      return undefined;
    }
  }
}
