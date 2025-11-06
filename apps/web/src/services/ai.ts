import apiClient from '../utils/api';
import type { ApiResponse } from '../types/api';

// ============================================================================
// 类型定义
// ============================================================================

/**
 * 流信息（存储在 AiSession.streamInfo）
 */
export interface StreamInfo {
  stream_name: string;
  participant_id: string;
}

/**
 * 客户端信息（存储在 AiSession.clientInfo）
 */
export interface ClientInfo {
  user_agent: string;
  platform: string;
  timestamp: string;
}

/**
 * AI会话
 */
export interface AiSession {
  id: string;
  sessionId: string;
  examResultId?: string;
  status: 'ACTIVE' | 'COMPLETED' | 'FAILED';  // ✅ 简化为3状态
  startTime: string;
  endTime?: string;
  clientIp?: string;
  userAgent?: string;
  // 类型化 JSON 字段
  clientInfo?: ClientInfo;
  streamInfo?: StreamInfo;
  // 新架构：文件存储信息
  checkpointFilePath?: string;
  checkpointCount?: number;
  fileSize?: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * AI分析聚合数据
 */
export interface AiAggregate {
  id: string;
  sessionId: string;
  examResultId: string;

  // 情绪指标
  avgValence?: number;
  avgArousal?: number;
  dominantEmotion?: string;
  emotionDistribution?: any;

  // 注意力指标
  avgAttention?: number;
  attentionVariability?: number;
  distractionEvents?: number;

  // 参与度指标
  engagementScore?: number;
  consistencyScore?: number;

  // 生理指标
  avgHeartRate?: number;
  heartRateVariability?: number;
  stressIndicators?: any;

  // 质量指标
  dataQuality: number;
  analysisConfidence: number;

  createdAt: string;
  updatedAt: string;
}

/**
 * AI异常事件
 */
export interface AiAnomaly {
  id: string;
  sessionId: string;
  type: 'MULTIPLE_FACES' | 'NO_FACE_DETECTED' | 'UNUSUAL_MOVEMENT' | 'ATTENTION_DROP' | 'EMOTIONAL_SPIKE' | 'TECHNICAL_ISSUE';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  timestamp: string;
  duration?: number;
  confidence: number;
  description: string;
  metadata?: any;
  createdAt: string;
}

/**
 * AI会话指标
 */
export interface AiSessionMetrics {
  sessionId: string;
  status: string;
  duration: number;
  anomalyCounts: {
    total: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  aggregate?: AiAggregate | null;
}

/**
 * AI分析状态检查结果
 */
export interface AiAnalysisCheck {
  resultId: string;
  hasAiAnalysis: boolean;
}

/**
 * AI分析批量检查结果
 */
export interface AiBatchCheckResult {
  aiStatusMap: Record<string, boolean>;
}

/**
 * AI会话（带考试结果信息）
 */
export interface AiSessionWithResult extends AiSession {
  examResult?: {
    id: string;
    studentName: string;
    studentId: string;
    examId: string;
    examTitle?: string;
  } | null;
}

// ============================================================================
// API原始响应类型（snake_case）
// ============================================================================

interface AiSessionApiModel {
  id: string;
  session_id: string;
  exam_result_id?: string;
  status: string;
  start_time: string;
  end_time?: string;
  client_ip?: string;
  user_agent?: string;
  client_info?: any;
  stream_info?: any;
  // 新架构：文件存储信息
  checkpoint_file_path?: string;
  checkpoint_count?: number;
  file_size?: number;
  created_at: string;
  updated_at: string;
}

interface AiAggregateApiModel {
  id: string;
  session_id: string;
  exam_result_id: string;
  avg_valence?: number;
  avg_arousal?: number;
  dominant_emotion?: string;
  emotion_distribution?: any;
  avg_attention?: number;
  attention_variability?: number;
  distraction_events?: number;
  engagement_score?: number;
  consistency_score?: number;
  avg_heart_rate?: number;
  heart_rate_variability?: number;
  stress_indicators?: any;
  data_quality: number;
  analysis_confidence: number;
  created_at: string;
  updated_at: string;
}

interface AiAnomalyApiModel {
  id: string;
  session_id: string;
  type: string;
  severity: string;
  timestamp: string;
  duration?: number;
  confidence: number;
  description: string;
  metadata?: any;
  created_at: string;
}

interface AiSessionMetricsApiModel {
  session_id: string;
  status: string;
  duration: number;
  anomaly_counts: {
    total: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  aggregate?: AiAggregateApiModel | null;
}

// ============================================================================
// 数据转换函数
// ============================================================================

function transformSession(apiData: AiSessionApiModel): AiSession {
  return {
    id: apiData.id,
    sessionId: apiData.session_id,
    examResultId: apiData.exam_result_id,
    status: apiData.status as any,
    startTime: apiData.start_time,
    endTime: apiData.end_time,
    clientIp: apiData.client_ip,
    userAgent: apiData.user_agent,
    clientInfo: apiData.client_info,
    streamInfo: apiData.stream_info,
    // 新架构：文件存储信息
    checkpointFilePath: apiData.checkpoint_file_path,
    checkpointCount: apiData.checkpoint_count,
    fileSize: apiData.file_size,
    createdAt: apiData.created_at,
    updatedAt: apiData.updated_at,
  };
}

function transformAggregate(apiData: AiAggregateApiModel): AiAggregate {
  return {
    id: apiData.id,
    sessionId: apiData.session_id,
    examResultId: apiData.exam_result_id,
    avgValence: apiData.avg_valence,
    avgArousal: apiData.avg_arousal,
    dominantEmotion: apiData.dominant_emotion,
    emotionDistribution: apiData.emotion_distribution,
    avgAttention: apiData.avg_attention,
    attentionVariability: apiData.attention_variability,
    distractionEvents: apiData.distraction_events,
    engagementScore: apiData.engagement_score,
    consistencyScore: apiData.consistency_score,
    avgHeartRate: apiData.avg_heart_rate,
    heartRateVariability: apiData.heart_rate_variability,
    stressIndicators: apiData.stress_indicators,
    dataQuality: apiData.data_quality,
    analysisConfidence: apiData.analysis_confidence,
    createdAt: apiData.created_at,
    updatedAt: apiData.updated_at,
  };
}

function transformAnomaly(apiData: AiAnomalyApiModel): AiAnomaly {
  return {
    id: apiData.id,
    sessionId: apiData.session_id,
    type: apiData.type as any,
    severity: apiData.severity as any,
    timestamp: apiData.timestamp,
    duration: apiData.duration,
    confidence: apiData.confidence,
    description: apiData.description,
    metadata: apiData.metadata,
    createdAt: apiData.created_at,
  };
}

function transformSessionMetrics(apiData: AiSessionMetricsApiModel): AiSessionMetrics {
  return {
    sessionId: apiData.session_id,
    status: apiData.status,
    duration: apiData.duration,
    anomalyCounts: apiData.anomaly_counts,
    aggregate: apiData.aggregate ? transformAggregate(apiData.aggregate) : null,
  };
}

// ============================================================================
// API方法
// ============================================================================

const aiApi = {
  /**
   * 根据考试结果ID获取AI会话详情
   */
  async getSessionByResultId(resultId: string): Promise<AiSession | null> {
    try {
      const response = await apiClient.get<ApiResponse<AiSessionApiModel>>(
        `/ai/sessions/result/${resultId}`
      );
      return transformSession(response.data.data);
    } catch (error: any) {
      // 404表示AI会话尚未创建，返回null
      if (error.response?.status === 404) {
        console.warn(`[aiApi] Session not found for resultId: ${resultId}`);
        return null;
      }
      // 其他错误继续抛出
      throw error;
    }
  },

  /**
   * 根据考试结果ID获取AI分析聚合数据
   */
  async getAggregateByResultId(resultId: string): Promise<AiAggregate | null> {
    try {
      const response = await apiClient.get<ApiResponse<AiAggregateApiModel>>(
        `/ai/aggregates/result/${resultId}`
      );
      return transformAggregate(response.data.data);
    } catch (error: any) {
      // 404表示AI数据尚未生成（考试刚开始），返回null
      if (error.response?.status === 404) {
        return null;
      }
      // 其他错误继续抛出
      throw error;
    }
  },

  /**
   * 根据会话ID获取异常事件列表
   */
  async getAnomaliesBySessionId(sessionId: string): Promise<AiAnomaly[]> {
    const response = await apiClient.get<ApiResponse<AiAnomalyApiModel[]>>(
      `/ai/anomalies/session/${sessionId}`
    );
    return response.data.data.map(transformAnomaly);
  },

  /**
   * 获取会话实时指标
   */
  async getSessionMetrics(sessionId: string): Promise<AiSessionMetrics> {
    const response = await apiClient.get<ApiResponse<AiSessionMetricsApiModel>>(
      `/ai/metrics/session/${sessionId}`
    );
    return transformSessionMetrics(response.data.data);
  },

  /**
   * 检查结果是否有AI分析数据
   */
  async checkAiAnalysis(resultId: string): Promise<AiAnalysisCheck> {
    const response = await apiClient.get<ApiResponse<{ result_id: string; has_ai_analysis: boolean }>>(
      `/ai/check/result/${resultId}`
    );
    return {
      resultId: response.data.data.result_id,
      hasAiAnalysis: response.data.data.has_ai_analysis,
    };
  },

  /**
   * 批量检查多个结果的AI分析状态
   */
  async batchCheckAiAnalysis(resultIds: string[]): Promise<AiBatchCheckResult> {
    const response = await apiClient.post<ApiResponse<{ ai_status_map: Record<string, boolean> }>>(
      '/ai/check/batch',
      { result_ids: resultIds }
    );
    return {
      aiStatusMap: response.data.data.ai_status_map,
    };
  },

  /**
   * 获取活跃AI会话列表
   * 用于AI实时大屏的学生监控模式
   */
  async getActiveSessions(): Promise<AiSessionWithResult[]> {
    const response = await apiClient.get<ApiResponse<any[]>>(
      '/ai/sessions?status=ACTIVE'
    );

    // 后端已修正为单层包装，直接访问response.data.data
    const sessions = response.data.data;

    // 简单的类型检查
    if (!Array.isArray(sessions)) {
      console.error('[aiApi.getActiveSessions] sessions is not an array:', sessions);
      return [];  // 降级返回空数组，避免循环报错
    }

    return sessions.map((s: any) => ({
      ...transformSession(s),
      examResult: s.exam_result ? {
        id: s.exam_result.id,
        studentName: s.exam_result.student_name,
        studentId: s.exam_result.student_id,
        examId: s.exam_result.exam_id,
        examTitle: s.exam_result.exam_title,
      } : null,
    }));
  },

  /**
   * 删除AI会话（仅用于本机检测清理）
   *
   * ⚠️ 注意：此方法只能删除examResultId为null的会话
   * 有examResultId的会话应使用 resultsApi.cleanupExamSession()
   */
  async deleteSession(sessionId: string): Promise<void> {
    await apiClient.delete(`/ai/sessions/${sessionId}`);
  },
};

export default aiApi;
