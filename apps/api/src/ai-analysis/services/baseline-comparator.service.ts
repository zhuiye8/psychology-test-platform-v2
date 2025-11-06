/**
 * 基线对比服务
 *
 * 职责：
 * - 计算基线指标（考试开始前或前20%数据）
 * - 对比题目特征与基线
 * - 判断变化显著性
 */

import { Injectable } from '@nestjs/common';
import { FeatureExtractorService } from './feature-extractor.service';
import {
  WindowedAIData,
  QuestionAIFeatures,
  BaselineMetrics,
  BaselineComparison,
} from '../types/ai-analysis.types';

@Injectable()
export class BaselineComparatorService {
  constructor(private readonly featureExtractor: FeatureExtractorService) {}

  // ==========================================================================
  // 公开方法
  // ==========================================================================

  /**
   * 计算基线指标
   */
  calculateBaseline(baselineData: WindowedAIData): BaselineMetrics {
    const baseline: BaselineMetrics = {
      heartRate: { mean: 0, stddev: 0 },
      emotion: { distribution: {} },
    };

    // 心率基线
    if (baselineData.heartRates.length > 0) {
      const hrValues = baselineData.heartRates.map((d) => d.payload.heart_rate);
      baseline.heartRate.mean = this.calculateMean(hrValues);
      baseline.heartRate.stddev = this.calculateStdDev(hrValues, baseline.heartRate.mean);
    }

    // 情绪分布基线
    if (baselineData.videoEmotions.length > 0) {
      const emotionCounts: Record<string, number> = {};
      baselineData.videoEmotions.forEach((e) => {
        const emotion = e.payload.dominant_emotion;
        emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
      });

      const total = baselineData.videoEmotions.length;
      Object.keys(emotionCounts).forEach((emotion) => {
        baseline.emotion.distribution[emotion] = (emotionCounts[emotion] / total) * 100;
      });
    }

    return baseline;
  }

  /**
   * 对比题目特征与基线
   */
  compareWithBaseline(
    questionId: string,
    questionFeatures: QuestionAIFeatures,
    baseline: BaselineMetrics,
  ): BaselineComparison {
    const comparison: BaselineComparison = {
      questionId,
      heartRateChange: this.calculateHeartRateChange(questionFeatures, baseline),
      emotionShift: this.calculateEmotionShift(questionFeatures, baseline),
    };

    return comparison;
  }

  // ==========================================================================
  // 私有方法
  // ==========================================================================

  /**
   * 计算心率变化
   */
  private calculateHeartRateChange(
    features: QuestionAIFeatures,
    baseline: BaselineMetrics,
  ): BaselineComparison['heartRateChange'] {
    if (!features.heartRate || baseline.heartRate.mean === 0) {
      return { absolute: 0, percentage: 0, significance: 'low' };
    }

    const questionMean = features.heartRate.timeDomain.mean;
    const absolute = questionMean - baseline.heartRate.mean;
    const percentage = (absolute / baseline.heartRate.mean) * 100;

    // 计算z-score判断显著性
    const zScore =
      baseline.heartRate.stddev > 0 ? Math.abs(absolute) / baseline.heartRate.stddev : 0;

    let significance: 'low' | 'medium' | 'high';
    if (zScore >= 2.0) {
      significance = 'high'; // p < 0.05
    } else if (zScore >= 1.0) {
      significance = 'medium';
    } else {
      significance = 'low';
    }

    return { absolute, percentage, significance };
  }

  /**
   * 计算情绪转变
   */
  private calculateEmotionShift(
    features: QuestionAIFeatures,
    baseline: BaselineMetrics,
  ): BaselineComparison['emotionShift'] {
    if (!features.videoEmotion || Object.keys(baseline.emotion.distribution).length === 0) {
      return {
        dominant_before: 'unknown',
        dominant_during: 'unknown',
        shift_magnitude: 0,
      };
    }

    // 基线主导情绪
    const dominant_before = Object.keys(baseline.emotion.distribution).reduce((a, b) =>
      baseline.emotion.distribution[a] > baseline.emotion.distribution[b] ? a : b,
    );

    // 题目期间主导情绪
    const dominant_during = features.videoEmotion.features.dominant_emotion;

    // 计算情绪分布的变化幅度（KL散度简化版）
    const shift_magnitude = this.calculateDistributionDifference(
      baseline.emotion.distribution,
      features.videoEmotion.features.emotion_distribution,
    );

    return {
      dominant_before,
      dominant_during,
      shift_magnitude,
    };
  }

  /**
   * 计算分布差异（0-1，越大表示变化越大）
   */
  private calculateDistributionDifference(
    dist1: Record<string, number>,
    dist2: Record<string, number>,
  ): number {
    const allEmotions = new Set([...Object.keys(dist1), ...Object.keys(dist2)]);
    let totalDiff = 0;

    allEmotions.forEach((emotion) => {
      const p1 = dist1[emotion] || 0;
      const p2 = dist2[emotion] || 0;
      totalDiff += Math.abs(p1 - p2);
    });

    // 归一化到0-1（最大差异为200%，当一个分布为100%某情绪，另一个为100%其他情绪）
    return Math.min(totalDiff / 200, 1);
  }

  /**
   * 计算均值
   */
  private calculateMean(values: number[]): number {
    return values.reduce((sum, v) => sum + v, 0) / values.length;
  }

  /**
   * 计算标准差
   */
  private calculateStdDev(values: number[], mean: number): number {
    const variance = values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length;
    return Math.sqrt(variance);
  }
}
