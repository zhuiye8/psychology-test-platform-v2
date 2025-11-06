/**
 * AI报告API服务
 *
 * 功能：
 * - 生成LLM心理分析报告
 * - 查询报告生成进度
 * - 获取异常检测报告
 * - 缓存管理
 */

import apiClient from '../utils/api';
import type { ApiResponse } from '../types/api';

// ============================================================================
// 类型定义
// ============================================================================

/**
 * 报告类型
 */
export type ReportType = 'comprehensive' | 'anomaly-focused' | 'summary';

/**
 * 报告生成请求
 */
export interface GenerateReportRequest {
  reportType: ReportType;
  model?: string;
}

/**
 * LLM生成的报告
 */
export interface GeneratedReport {
  examResultId: string;
  reportType: ReportType;
  generatedAt: Date;
  executiveSummary: string;
  questionAnalyses?: QuestionAnalysis[];
  anomalyInsights?: string;
  overallAssessment: OverallAssessment;
  metadata: ReportMetadata;
}

/**
 * 题目分析
 */
export interface QuestionAnalysis {
  questionId: string;
  questionTitle: string;
  psychologicalInsights: string;
  behaviorPatterns: string[];
  riskIndicators: string[];
  recommendations: string[];
}

/**
 * 整体评估
 */
export interface OverallAssessment {
  psychologicalProfile: string;
  keyFindings: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  recommendations: string[];
}

/**
 * 报告元数据
 */
export interface ReportMetadata {
  modelUsed: string;
  tokensConsumed: number;
  generationTime: number;
  confidenceScore: number;
}

/**
 * 报告生成进度
 */
export interface ReportGenerationProgress {
  examResultId: string;
  status: 'queued' | 'analyzing' | 'generating' | 'completed' | 'failed';
  progress: number;
  currentStep?: string;
  error?: string;
}

/**
 * 异常报告
 */
export interface AnomalyReport {
  examResultId: string;
  generatedAt: Date;
  summary: {
    totalAnomalies: number;
    byType: Record<string, number>;
    bySeverity: Record<string, number>;
  };
  analyses: AnomalyAnalysis[];
  patterns: AnomalyPattern[];
  overallAssessment: {
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    keyFindings: string[];
    recommendations: string[];
  };
}

/**
 * 异常分析
 */
export interface AnomalyAnalysis {
  anomaly: {
    id: string;
    type: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    timestamp: Date;
    description: string;
  };
  relatedQuestion?: {
    questionId: string;
    questionTitle: string;
    timeOffset: number;
  };
  aiFeatures?: any;
  psychologicalInterpretation: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  recommendations: string[];
}

/**
 * 异常模式
 */
export interface AnomalyPattern {
  type: 'recurring' | 'escalating' | 'clustered';
  description: string;
  anomalyIds: string[];
  significance: string;
}

// ============================================================================
// API服务方法
// ============================================================================

export const aiReportsApi = {
  /**
   * 生成LLM心理分析报告
   */
  async generateReport(
    examResultId: string,
    request: GenerateReportRequest
  ): Promise<GeneratedReport> {
    const response = await apiClient.post<ApiResponse<GeneratedReport>>(
      `/ai-analysis/reports/generate/${examResultId}`,
      request
    );
    return response.data.data;
  },

  /**
   * 查询报告生成进度
   */
  async getReportProgress(examResultId: string): Promise<ReportGenerationProgress> {
    const response = await apiClient.get<ApiResponse<ReportGenerationProgress>>(
      `/ai-analysis/reports/${examResultId}/progress`
    );
    return response.data.data;
  },

  /**
   * 获取异常检测报告（无LLM）
   */
  async getAnomalyReport(examResultId: string): Promise<AnomalyReport> {
    const response = await apiClient.get<ApiResponse<AnomalyReport>>(
      `/ai-analysis/anomalies/${examResultId}`
    );
    return response.data.data;
  },

  /**
   * 清除报告缓存
   */
  async clearCache(examResultId: string): Promise<void> {
    await apiClient.delete<ApiResponse<void>>(
      `/ai-analysis/cache/${examResultId}`
    );
  },
};

export default aiReportsApi;
