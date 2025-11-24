import apiClient from '../utils/api';
import type { ApiResponse } from '../types/api';

// ============================================================================
// 类型定义
// ============================================================================

/**
 * 维度得分数据
 */
export interface DimensionScore {
  dimension_name: string;
  mean: number;
  total: number;
  max: number;
  count: number;
  percentage: number;
}

/**
 * 答题表现数据
 */
export interface AnswerPerformance {
  total_score: number;
  max_score: number;
  percentage: number;
  time_spent: number;
  total_questions: number;
  correct_count: number;
  correct_rate: number;
}

/**
 * AI分析数据
 */
export interface AiAnalysisData {
  available: boolean;
  data_quality?: number;
  analysis_confidence?: number;
  avg_valence?: number;
  avg_arousal?: number;
  dominant_emotion?: string;
  emotion_distribution?: Record<string, number>;
  avg_attention?: number;
  attention_variability?: number;
  distraction_events?: number;
  avg_heart_rate?: number;
  heart_rate_variability?: number;
  stress_indicators?: Record<string, any>;
  anomalies?: Array<{
    type: string;
    severity: string;
    timestamp: string;
    description: string;
  }>;
}

/**
 * 完整报告数据
 */
export interface Report {
  result_id: string;
  exam_id: string;
  paper_title: string;
  student_name: string;
  student_id: string;
  completed_at: string;
  has_dimensions: boolean;
  dimension_scores: DimensionScore[];
  answer_performance: AnswerPerformance;
  ai_analysis: AiAnalysisData;
  markdown_content: string;
  generated_at: string;
}

// ============================================================================
// API函数
// ============================================================================

/**
 * 生成AI分析报告
 */
export async function generateReport(resultId: string): Promise<Report> {
  const response = await apiClient.post<ApiResponse<Report>>(
    `/reports/${resultId}/generate`
  );
  return response.data.data;
}

/**
 * 获取已生成的报告
 */
export async function getReport(resultId: string): Promise<Report> {
  const response = await apiClient.get<ApiResponse<Report>>(
    `/reports/${resultId}`
  );
  return response.data.data;
}

// ============================================================================
// 导出 API 对象（可选，用于统一调用）
// ============================================================================

export const reportsApi = {
  generateReport,
  getReport,
};

export default reportsApi;
