/**
 * 特征提取服务
 *
 * 职责：
 * - 时间域特征（RMSSD, pNN50等）
 * - 频率域特征（VLF/LF/HF功率）
 * - 非线性特征（熵、Poincaré图）
 * - 情绪特征（分布、变化、趋势）
 */

import { Injectable } from '@nestjs/common';
import {
  WindowedAIData,
  TimeDomainFeatures,
  FrequencyDomainFeatures,
  NonlinearFeatures,
  EmotionFeatures,
  QuestionAIFeatures,
  TimeWindow,
} from '../types/ai-analysis.types';

@Injectable()
export class FeatureExtractorService {
  // ==========================================================================
  // 公开方法
  // ==========================================================================

  /**
   * 提取题目的完整AI特征
   */
  extractQuestionFeatures(
    questionId: string,
    windowedData: WindowedAIData,
    timeWindow: TimeWindow,
  ): QuestionAIFeatures {
    const features: QuestionAIFeatures = {
      questionId,
      timeWindow,
    };

    // 心率特征
    if (windowedData.heartRates.length > 0) {
      const hrValues = windowedData.heartRates.map((d) => d.payload.heart_rate);
      features.heartRate = {
        timeDomain: this.extractTimeDomainFeatures(hrValues),
        frequency: this.extractFrequencyDomainFeatures(hrValues),
        nonlinear: this.extractNonlinearFeatures(hrValues),
        dataPoints: hrValues.length,
      };
    }

    // 视频情绪特征
    if (windowedData.videoEmotions.length > 0) {
      features.videoEmotion = {
        features: this.extractEmotionFeatures(
          windowedData.videoEmotions.map((d) => ({
            emotion: d.payload.dominant_emotion,
            scores: d.payload.emotion_scores,
            confidence: d.confidence,
          })),
        ),
        dataPoints: windowedData.videoEmotions.length,
      };
    }

    // 音频情绪特征
    if (windowedData.audioEmotions.length > 0) {
      features.audioEmotion = {
        features: this.extractEmotionFeatures(
          windowedData.audioEmotions.map((d) => ({
            emotion: d.payload.dominant_emotion,
            scores: d.payload.emotion_scores,
            confidence: d.confidence,
          })),
        ),
        dataPoints: windowedData.audioEmotions.length,
      };
    }

    // 提取关键时间点（每5秒采样一次，最多20个点）
    features.keyPoints = this.extractKeyPoints(windowedData, 20);

    return features;
  }

  // ==========================================================================
  // 时间域特征
  // ==========================================================================

  private extractTimeDomainFeatures(values: number[]): TimeDomainFeatures {
    const n = values.length;
    if (n === 0) return this.getEmptyTimeDomainFeatures();

    const mean = this.calculateMean(values);
    const stddev = this.calculateStdDev(values, mean);
    const sorted = [...values].sort((a, b) => a - b);

    // 计算RMSSD (Root Mean Square of Successive Differences)
    const diffs = values.slice(1).map((v, i) => v - values[i]);
    const rmssd = Math.sqrt(this.calculateMean(diffs.map((d) => d * d)));

    // 计算pNN50 (percentage of successive differences > 50)
    const nn50 = diffs.filter((d) => Math.abs(d) > 50).length;
    const pnn50 = n > 1 ? (nn50 / (n - 1)) * 100 : 0;

    return {
      mean,
      stddev,
      min: sorted[0],
      max: sorted[n - 1],
      median: sorted[Math.floor(n / 2)],
      rmssd,
      pnn50,
    };
  }

  // ==========================================================================
  // 频率域特征（简化版Welch方法）
  // ==========================================================================

  private extractFrequencyDomainFeatures(values: number[]): FrequencyDomainFeatures {
    const n = values.length;
    if (n < 10) return this.getEmptyFrequencyDomainFeatures();

    // 去均值
    const mean = this.calculateMean(values);
    const detrended = values.map((v) => v - mean);

    // 计算功率谱（简化版：使用自相关函数估计）
    const powers = this.estimatePowerSpectrum(detrended);

    // VLF: 0.003-0.04 Hz, LF: 0.04-0.15 Hz, HF: 0.15-0.4 Hz
    // 假设采样率为1 Hz（心率数据通常是1Hz）
    const vlf = this.sumPowerInBand(powers, 0.003, 0.04, 1.0);
    const lf = this.sumPowerInBand(powers, 0.04, 0.15, 1.0);
    const hf = this.sumPowerInBand(powers, 0.15, 0.4, 1.0);
    const total_power = vlf + lf + hf;

    return {
      vlf,
      lf,
      hf,
      lfhf_ratio: hf > 0 ? lf / hf : 0,
      total_power,
    };
  }

  // ==========================================================================
  // 非线性特征
  // ==========================================================================

  private extractNonlinearFeatures(values: number[]): NonlinearFeatures {
    const n = values.length;
    if (n < 10) return this.getEmptyNonlinearFeatures();

    // Shannon熵
    const shannon_entropy = this.calculateShannonEntropy(values);

    // Sample熵（简化版）
    const sample_entropy = this.calculateSampleEntropy(values);

    // Poincaré图 SD1和SD2
    const { sd1, sd2 } = this.calculatePoincareMetrics(values);

    return {
      shannon_entropy,
      sample_entropy,
      sd1,
      sd2,
    };
  }

  // ==========================================================================
  // 情绪特征
  // ==========================================================================

  private extractEmotionFeatures(
    emotions: Array<{ emotion: string; scores: Record<string, number>; confidence: number }>,
  ): EmotionFeatures {
    const n = emotions.length;
    if (n === 0) return this.getEmptyEmotionFeatures();

    // 统计各情绪出现次数
    const emotionCounts: Record<string, number> = {};
    emotions.forEach((e) => {
      emotionCounts[e.emotion] = (emotionCounts[e.emotion] || 0) + 1;
    });

    // 找出主导情绪
    const dominant_emotion = Object.keys(emotionCounts).reduce((a, b) =>
      emotionCounts[a] > emotionCounts[b] ? a : b,
    );

    // 计算分布
    const emotion_distribution: Record<string, number> = {};
    Object.keys(emotionCounts).forEach((emotion) => {
      emotion_distribution[emotion] = (emotionCounts[emotion] / n) * 100;
    });

    // 平均置信度
    const avg_confidence = this.calculateMean(emotions.map((e) => e.confidence));

    // 情绪变化次数
    let emotion_changes = 0;
    for (let i = 1; i < n; i++) {
      if (emotions[i].emotion !== emotions[i - 1].emotion) {
        emotion_changes++;
      }
    }

    // 情绪价值趋势（简化版：正面情绪-负面情绪）
    const positiveEmotions = ['happy', 'neutral', 'surprise'];
    const positiveCount = emotions.filter((e) => positiveEmotions.includes(e.emotion)).length;
    const valence_trend = (positiveCount / n) * 2 - 1; // 映射到[-1, 1]

    return {
      dominant_emotion,
      emotion_distribution,
      avg_confidence,
      emotion_changes,
      valence_trend,
    };
  }

  // ==========================================================================
  // 关键点提取
  // ==========================================================================

  private extractKeyPoints(data: WindowedAIData, maxPoints: number) {
    const allPoints: Array<{
      timestamp: string;
      heartRate?: number;
      emotion?: string;
      confidence?: number;
    }> = [];

    // 合并所有数据源的时间点
    data.heartRates.forEach((hr) => {
      allPoints.push({
        timestamp: hr.timestamp,
        heartRate: hr.payload.heart_rate,
      });
    });

    data.videoEmotions.forEach((ve) => {
      const existing = allPoints.find((p) => p.timestamp === ve.timestamp);
      if (existing) {
        existing.emotion = ve.payload.dominant_emotion;
        existing.confidence = ve.confidence;
      } else {
        allPoints.push({
          timestamp: ve.timestamp,
          emotion: ve.payload.dominant_emotion,
          confidence: ve.confidence,
        });
      }
    });

    // 按时间排序
    allPoints.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    // 均匀采样
    if (allPoints.length <= maxPoints) {
      return allPoints;
    }

    const step = Math.floor(allPoints.length / maxPoints);
    return allPoints.filter((_, i) => i % step === 0).slice(0, maxPoints);
  }

  // ==========================================================================
  // 工具函数
  // ==========================================================================

  private calculateMean(values: number[]): number {
    return values.reduce((sum, v) => sum + v, 0) / values.length;
  }

  private calculateStdDev(values: number[], mean: number): number {
    const variance = values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length;
    return Math.sqrt(variance);
  }

  private estimatePowerSpectrum(values: number[]): number[] {
    // 简化版：使用自相关函数估计功率谱
    const n = values.length;
    const maxLag = Math.min(n - 1, 50);
    const powers: number[] = [];

    for (let lag = 0; lag <= maxLag; lag++) {
      let sum = 0;
      for (let i = 0; i < n - lag; i++) {
        sum += values[i] * values[i + lag];
      }
      powers.push(sum / (n - lag));
    }

    return powers;
  }

  private sumPowerInBand(powers: number[], fMin: number, fMax: number, fs: number): number {
    const n = powers.length;
    const indexMin = Math.floor((fMin * n) / (fs / 2));
    const indexMax = Math.ceil((fMax * n) / (fs / 2));

    return powers.slice(indexMin, indexMax + 1).reduce((sum, p) => sum + p, 0);
  }

  private calculateShannonEntropy(values: number[]): number {
    // 离散化数据为10个bin
    const bins = 10;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const binSize = (max - min) / bins;

    const histogram = new Array(bins).fill(0);
    values.forEach((v) => {
      const binIndex = Math.min(Math.floor((v - min) / binSize), bins - 1);
      histogram[binIndex]++;
    });

    const probabilities = histogram.map((count) => count / values.length);
    return -probabilities.reduce((sum, p) => (p > 0 ? sum + p * Math.log2(p) : sum), 0);
  }

  private calculateSampleEntropy(values: number[], m = 2, r = 0.2): number {
    // 简化版Sample Entropy
    const stddev = this.calculateStdDev(values, this.calculateMean(values));
    const tolerance = r * stddev;
    const n = values.length;

    let A = 0;
    let B = 0;

    for (let i = 0; i < n - m; i++) {
      for (let j = i + 1; j < n - m; j++) {
        const match = this.checkMatch(values, i, j, m, tolerance);
        if (match) {
          B++;
          const matchNext = this.checkMatch(values, i, j, m + 1, tolerance);
          if (matchNext) A++;
        }
      }
    }

    return B > 0 ? -Math.log(A / B) : 0;
  }

  private checkMatch(values: number[], i: number, j: number, m: number, tolerance: number): boolean {
    for (let k = 0; k < m; k++) {
      if (Math.abs(values[i + k] - values[j + k]) > tolerance) {
        return false;
      }
    }
    return true;
  }

  private calculatePoincareMetrics(values: number[]): { sd1: number; sd2: number } {
    const n = values.length;
    if (n < 2) return { sd1: 0, sd2: 0 };

    const diffs = values.slice(1).map((v, i) => v - values[i]);
    const sumDiffs = values.slice(1).map((v, i) => v + values[i]);

    const sd1 = this.calculateStdDev(diffs, this.calculateMean(diffs)) / Math.sqrt(2);
    const sd2 = this.calculateStdDev(sumDiffs, this.calculateMean(sumDiffs)) / Math.sqrt(2);

    return { sd1, sd2 };
  }

  private getEmptyTimeDomainFeatures(): TimeDomainFeatures {
    return { mean: 0, stddev: 0, min: 0, max: 0, median: 0, rmssd: 0, pnn50: 0 };
  }

  private getEmptyFrequencyDomainFeatures(): FrequencyDomainFeatures {
    return { vlf: 0, lf: 0, hf: 0, lfhf_ratio: 0, total_power: 0 };
  }

  private getEmptyNonlinearFeatures(): NonlinearFeatures {
    return { shannon_entropy: 0, sample_entropy: 0, sd1: 0, sd2: 0 };
  }

  private getEmptyEmotionFeatures(): EmotionFeatures {
    return {
      dominant_emotion: 'unknown',
      emotion_distribution: {},
      avg_confidence: 0,
      emotion_changes: 0,
      valence_trend: 0,
    };
  }
}
