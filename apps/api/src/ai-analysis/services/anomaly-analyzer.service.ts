/**
 * 异常分析服务
 *
 * 职责：
 * - 分析单个异常的心理学意义
 * - 评估风险等级
 * - 生成干预建议
 * - 识别异常模式
 */

import { Injectable } from '@nestjs/common';
import {
  AnomalyContext,
  AnomalyAnalysis,
  AnomalyPattern,
  AnomalyType,
} from '../types/anomaly.types';

@Injectable()
export class AnomalyAnalyzerService {
  // ==========================================================================
  // 单个异常分析
  // ==========================================================================

  /**
   * 分析单个异常事件
   */
  analyzeAnomaly(context: AnomalyContext): AnomalyAnalysis {
    const interpretation = this.generateInterpretation(context);
    const riskLevel = this.assessRiskLevel(context);
    const recommendations = this.generateRecommendations(context, riskLevel);

    return {
      anomaly: context,
      psychologicalInterpretation: interpretation,
      riskLevel,
      recommendations,
    };
  }

  /**
   * 批量分析异常
   */
  analyzeAnomalies(contexts: AnomalyContext[]): AnomalyAnalysis[] {
    return contexts.map((context) => this.analyzeAnomaly(context));
  }

  // ==========================================================================
  // 模式识别
  // ==========================================================================

  /**
   * 识别异常模式
   */
  identifyPatterns(contexts: AnomalyContext[]): AnomalyPattern[] {
    const patterns: AnomalyPattern[] = [];

    // 1. 识别重复性异常（同一类型出现3次以上）
    const recurringPattern = this.findRecurringPattern(contexts);
    if (recurringPattern) patterns.push(recurringPattern);

    // 2. 识别升级模式（严重程度递增）
    const escalatingPattern = this.findEscalatingPattern(contexts);
    if (escalatingPattern) patterns.push(escalatingPattern);

    // 3. 识别聚集模式（短时间内多个异常）
    const clusteredPatterns = this.findClusteredPatterns(contexts);
    patterns.push(...clusteredPatterns);

    return patterns;
  }

  // ==========================================================================
  // 私有方法：心理学解释
  // ==========================================================================

  private generateInterpretation(context: AnomalyContext): string {
    const { type, relatedQuestion, aiFeatures } = context;

    // 基础解释
    let interpretation = this.getBaseInterpretation(type);

    // 添加题目上下文
    if (relatedQuestion) {
      interpretation += ` 此异常发生在回答"${relatedQuestion.questionTitle}"时（${relatedQuestion.timeOffset.toFixed(1)}秒后）。`;
    }

    // 添加AI特征上下文
    if (aiFeatures) {
      if (aiFeatures.heartRate && aiFeatures.heartRate > 90) {
        interpretation += ` 心率显著升高（${Math.round(aiFeatures.heartRate)} bpm），表明学生处于高度紧张或焦虑状态。`;
      }
      if (aiFeatures.emotion) {
        interpretation += ` 检测到${this.translateEmotion(aiFeatures.emotion)}情绪。`;
      }
    }

    return interpretation;
  }

  private getBaseInterpretation(type: AnomalyType): string {
    const interpretations: Record<AnomalyType, string> = {
      MULTIPLE_FACES: '检测到多人同时出现在画面中，可能存在他人协助或作弊行为。',
      NO_FACE_DETECTED: '画面中未检测到人脸，学生可能离开了座位或遮挡了摄像头。',
      UNUSUAL_MOVEMENT: '检测到异常的肢体动作，可能表明学生焦虑不安或试图查看外部资料。',
      ATTENTION_DROP: '注意力显著下降，学生可能分心、疲劳或对题目感到困惑。',
      EMOTIONAL_SPIKE: '情绪出现剧烈波动，可能触及敏感话题或遇到极大困难。',
      TECHNICAL_ISSUE: '技术问题影响了数据采集，可能影响分析准确性。',
    };

    return interpretations[type] || '检测到异常行为。';
  }

  // ==========================================================================
  // 私有方法：风险评估
  // ==========================================================================

  private assessRiskLevel(
    context: AnomalyContext,
  ): 'low' | 'medium' | 'high' | 'critical' {
    // 基于严重程度
    if (context.severity === 'CRITICAL') return 'critical';
    if (context.severity === 'HIGH') return 'high';

    // 基于异常类型
    const highRiskTypes: AnomalyType[] = [
      'MULTIPLE_FACES',
      'EMOTIONAL_SPIKE',
    ];
    if (highRiskTypes.includes(context.type)) return 'high';

    // 基于持续时间
    if (context.duration > 30) return 'high';
    if (context.duration > 10) return 'medium';

    // 基于AI特征
    if (context.aiFeatures?.heartRate && context.aiFeatures.heartRate > 100) {
      return 'high';
    }

    return context.severity === 'MEDIUM' ? 'medium' : 'low';
  }

  // ==========================================================================
  // 私有方法：建议生成
  // ==========================================================================

  private generateRecommendations(
    context: AnomalyContext,
    riskLevel: string,
  ): string[] {
    const recommendations: string[] = [];

    // 基于异常类型的建议
    switch (context.type) {
      case 'MULTIPLE_FACES':
        recommendations.push('立即核查考试现场，确认是否存在违规行为');
        recommendations.push('如确认作弊，根据学校规定进行处理');
        break;

      case 'EMOTIONAL_SPIKE':
        if (context.relatedQuestion) {
          recommendations.push(
            `重点关注学生对"${context.relatedQuestion.questionTitle}"的反应`,
          );
        }
        recommendations.push('建议后续进行一对一心理辅导');
        if (riskLevel === 'critical' || riskLevel === 'high') {
          recommendations.push('考虑联系家长或专业心理咨询师');
        }
        break;

      case 'ATTENTION_DROP':
        recommendations.push('评估题目难度是否合适');
        recommendations.push('关注学生的学习疲劳程度');
        break;

      case 'NO_FACE_DETECTED':
        recommendations.push('检查学生的答题完整性');
        recommendations.push('必要时与学生沟通确认离开原因');
        break;

      case 'UNUSUAL_MOVEMENT':
        recommendations.push('审查答题过程的完整录像（如有）');
        recommendations.push('评估是否需要额外的诚信教育');
        break;

      default:
        recommendations.push('持续监测学生的后续表现');
    }

    // 基于风险等级的通用建议
    if (riskLevel === 'critical') {
      recommendations.push('🚨 立即采取行动，不可延误');
    } else if (riskLevel === 'high') {
      recommendations.push('建议在24小时内跟进处理');
    }

    return recommendations;
  }

  // ==========================================================================
  // 私有方法：模式识别
  // ==========================================================================

  private findRecurringPattern(
    contexts: AnomalyContext[],
  ): AnomalyPattern | null {
    // 统计各类型异常数量
    const typeCounts: Partial<Record<AnomalyType, AnomalyContext[]>> = {};

    contexts.forEach((ctx) => {
      if (!typeCounts[ctx.type]) typeCounts[ctx.type] = [];
      typeCounts[ctx.type]!.push(ctx);
    });

    // 找出出现3次以上的类型
    for (const [type, anomalies] of Object.entries(typeCounts)) {
      if (anomalies.length >= 3) {
        return {
          patternType: 'recurring',
          anomalies,
          description: `${type}异常重复出现${anomalies.length}次，显示出持续性问题`,
          overallRisk: this.calculatePatternRisk(anomalies),
        };
      }
    }

    return null;
  }

  private findEscalatingPattern(
    contexts: AnomalyContext[],
  ): AnomalyPattern | null {
    if (contexts.length < 2) return null;

    const severityOrder = { LOW: 1, MEDIUM: 2, HIGH: 3, CRITICAL: 4 };
    let isEscalating = true;

    for (let i = 1; i < contexts.length; i++) {
      const prevLevel = severityOrder[contexts[i - 1].severity];
      const currLevel = severityOrder[contexts[i].severity];
      if (currLevel < prevLevel) {
        isEscalating = false;
        break;
      }
    }

    if (isEscalating && contexts.length >= 2) {
      return {
        patternType: 'escalating',
        anomalies: contexts,
        description: '异常严重程度呈递增趋势，情况正在恶化',
        overallRisk: 'high',
      };
    }

    return null;
  }

  private findClusteredPatterns(contexts: AnomalyContext[]): AnomalyPattern[] {
    const patterns: AnomalyPattern[] = [];
    const threshold = 60000; // 1分钟内

    for (let i = 0; i < contexts.length; i++) {
      const cluster: AnomalyContext[] = [contexts[i]];
      const startTime = contexts[i].timestamp.getTime();

      // 找到时间接近的异常
      for (let j = i + 1; j < contexts.length; j++) {
        if (contexts[j].timestamp.getTime() - startTime <= threshold) {
          cluster.push(contexts[j]);
        } else {
          break;
        }
      }

      if (cluster.length >= 3) {
        patterns.push({
          patternType: 'clustered',
          anomalies: cluster,
          description: `在1分钟内连续发生${cluster.length}个异常，表明学生在该时段经历严重困扰`,
          overallRisk: this.calculatePatternRisk(cluster),
        });
        i += cluster.length - 1; // 跳过已处理的异常
      }
    }

    return patterns;
  }

  private calculatePatternRisk(
    anomalies: AnomalyContext[],
  ): 'low' | 'medium' | 'high' | 'critical' {
    const severityScores = { LOW: 1, MEDIUM: 2, HIGH: 3, CRITICAL: 4 };
    const avgScore =
      anomalies.reduce((sum, a) => sum + severityScores[a.severity], 0) /
      anomalies.length;

    if (avgScore >= 3.5) return 'critical';
    if (avgScore >= 2.5) return 'high';
    if (avgScore >= 1.5) return 'medium';
    return 'low';
  }

  // ==========================================================================
  // 工具函数
  // ==========================================================================

  private translateEmotion(emotion: string): string {
    const translations: Record<string, string> = {
      happy: '愉悦',
      sad: '悲伤',
      angry: '愤怒',
      fear: '恐惧',
      surprise: '惊讶',
      disgust: '厌恶',
      neutral: '平静',
      anxious: '焦虑',
    };
    return translations[emotion] || emotion;
  }
}
