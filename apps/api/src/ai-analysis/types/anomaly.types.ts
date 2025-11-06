/**
 * 异常分析类型定义
 *
 * 用于异常驱动的心理分析
 */

import { QuestionAIFeatures } from './ai-analysis.types';

// ============================================================================
// 数据库异常类型（来自Prisma schema）
// ============================================================================

export type AnomalyType =
  | 'MULTIPLE_FACES'
  | 'NO_FACE_DETECTED'
  | 'UNUSUAL_MOVEMENT'
  | 'ATTENTION_DROP'
  | 'EMOTIONAL_SPIKE'
  | 'TECHNICAL_ISSUE';

export type AnomalySeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

// ============================================================================
// 异常上下文
// ============================================================================

export interface AnomalyContext {
  // 异常基本信息
  anomalyId: string;
  type: AnomalyType;
  severity: AnomalySeverity;
  timestamp: Date;
  duration: number; // 秒
  confidence: number;
  description: string;

  // 关联的题目（可能没有）
  relatedQuestion?: {
    questionId: string;
    questionTitle: string;
    questionType: string;
    timeOffset: number; // 异常发生时距离题目显示的时间（秒）
  };

  // AI特征（异常发生时的3秒窗口）
  aiFeatures?: {
    heartRate?: number;
    emotion?: string;
    emotionConfidence?: number;
  };
}

// ============================================================================
// 异常分析结果
// ============================================================================

export interface AnomalyAnalysis {
  anomaly: AnomalyContext;

  // 心理学解释
  psychologicalInterpretation: string;

  // 严重程度评估
  riskLevel: 'low' | 'medium' | 'high' | 'critical';

  // 建议措施
  recommendations: string[];

  // 相关AI数据
  detailedFeatures?: QuestionAIFeatures;
}

// ============================================================================
// 异常模式
// ============================================================================

export interface AnomalyPattern {
  // 模式类型
  patternType: 'recurring' | 'escalating' | 'clustered' | 'isolated';

  // 涉及的异常
  anomalies: AnomalyContext[];

  // 模式描述
  description: string;

  // 触发因素
  triggers?: {
    questionTypes?: string[];
    topics?: string[];
    timePattern?: string; // 例如："考试后半段"
  };

  // 整体风险评估
  overallRisk: 'low' | 'medium' | 'high' | 'critical';
}

// ============================================================================
// 异常报告
// ============================================================================

export interface AnomalyReport {
  examResultId: string;
  generatedAt: Date;

  // 异常统计
  summary: {
    totalAnomalies: number;
    byType: Record<AnomalyType, number>;
    bySeverity: Record<AnomalySeverity, number>;
    criticalCount: number;
  };

  // 详细分析
  analyses: AnomalyAnalysis[];

  // 模式识别
  patterns: AnomalyPattern[];

  // 整体评估
  overallAssessment: {
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    keyFindings: string[];
    urgentActions: string[];
  };
}
