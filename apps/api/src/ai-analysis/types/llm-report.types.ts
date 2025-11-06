/**
 * LLM报告生成类型定义
 */

import { QuestionAIFeatures, BaselineComparison } from './ai-analysis.types';
import { AnomalyReport } from './anomaly.types';

// ============================================================================
// LLM配置
// ============================================================================

export interface LLMConfig {
  provider: 'openrouter';
  model: string;
  apiKey: string;
  temperature?: number;
  maxTokens?: number;
  timeout?: number;
}

// ============================================================================
// 报告生成请求
// ============================================================================

export interface ReportGenerationRequest {
  examResultId: string;
  reportType: 'comprehensive' | 'summary' | 'anomaly-focused';
  includeRecommendations?: boolean;
  /** 可选：覆盖默认LLM模型 */
  model?: string;
}

// ============================================================================
// 报告内容
// ============================================================================

export interface GeneratedReport {
  examResultId: string;
  reportType: string;
  generatedAt: Date;

  // 执行摘要
  executiveSummary: string;

  // 题目级分析（仅comprehensive类型）
  questionAnalyses?: QuestionAnalysis[];

  // 异常分析
  anomalyInsights?: string;

  // 整体评估
  overallAssessment: {
    psychologicalProfile: string;
    keyFindings: string[];
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    recommendations: string[];
  };

  // 元数据
  metadata: {
    modelUsed: string;
    tokensConsumed: number;
    generationTime: number; // 毫秒
    confidenceScore: number; // 0-1
  };
}

export interface QuestionAnalysis {
  questionId: string;
  questionTitle: string;
  analysis: string;
  psychologicalSignificance: string;
  concerns?: string[];
}

// ============================================================================
// 生成进度
// ============================================================================

export interface ReportGenerationProgress {
  examResultId: string;
  status: 'queued' | 'analyzing' | 'generating' | 'completed' | 'failed';
  progress: number; // 0-100
  currentStep?: string;
  estimatedTimeRemaining?: number; // 秒
  error?: string;
}

// ============================================================================
// 缓存
// ============================================================================

export interface CachedReport {
  report: GeneratedReport;
  cachedAt: Date;
  expiresAt: Date;
}
