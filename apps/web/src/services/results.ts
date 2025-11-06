import apiClient from '../utils/api';
import type { ApiResponse, PaginatedResponse } from '../types/api';
import type { Question } from './questions';

// ============================================================================
// 类型定义
// ============================================================================

/**
 * 考试结果
 */
export interface ExamResult {
  id: string;
  examId: string;
  participantId: string;
  participantName: string;
  startedAt: string;
  submittedAt?: string;
  timeSpent?: number;
  score?: number;
  passed?: boolean;
  answers: ExamAnswer[];
  exam?: {
    id: string;
    title: string;
    timeLimit?: number;
  };
}

/**
 * 答案记录
 */
export interface ExamAnswer {
  id: string;
  questionId: string;
  selectedOptions?: string[];
  textAnswer?: string;
  isCorrect?: boolean;
  score?: number;
}

/**
 * 结果详情（含题目信息）
 */
export interface ResultDetail extends ExamResult {
  answers: AnswerDetail[];
}

/**
 * 答案详情（含题目信息）
 */
export interface AnswerDetail extends ExamAnswer {
  question: Question;
}

/**
 * 结果统计数据
 */
export interface ResultStats {
  totalResults: number;
  totalParticipants: number;
  averageScore: number;
  passRate: number;
  averageTimeSpent: number;
  scoreDistribution: {
    range: string;
    count: number;
  }[];
}

/**
 * 开始考试响应
 */
export interface StartExamResponse {
  examResult: ExamResult;
  questions: Question[];
  exam: {
    id: string;
    title: string;
    description?: string;
    timeLimit?: number;
    requireCamera: boolean;
    requireMicrophone: boolean;
  };
}

// ============================================================================
// 请求参数类型定义
// ============================================================================

/**
 * 开始考试请求
 */
export interface StartExamDto {
  participantId: string;
  participantName: string;
  accessCode?: string;
}

/**
 * 提交单个答案请求
 */
export interface SubmitAnswerDto {
  questionId: string;
  selectedOptions?: string[];
  textAnswer?: string;
}

/**
 * 提交整个考试请求
 */
export interface SubmitExamDto {
  answers: SubmitAnswerDto[];
}

/**
 * 结果列表查询参数（教师端）
 */
export interface ResultsListParams {
  page?: number;
  limit?: number;
  examId?: string;
  participantId?: string;
  participantName?: string;
  startDate?: string;
  endDate?: string;
  passed?: boolean;
  isCompleted?: boolean;
  sortBy?: 'score' | 'timeSpent' | 'submittedAt';
  sortOrder?: 'asc' | 'desc';
}

/**
 * 结果列表响应
 */
export interface ResultsListResponse {
  data: ExamResult[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ============================================================================
// API服务方法定义
// ============================================================================

export const resultsApi = {
  /**
   * 开始考试（学生端-公开接口）
   */
  async startExam(examId: string, data: StartExamDto): Promise<StartExamResponse> {
    const response = await apiClient.post<ApiResponse<StartExamResponse>>(
      `/results/exam/${examId}/start`,
      data
    );
    return response.data.data;
  },

  /**
   * 提交单个答案（学生端-公开接口）
   */
  async submitAnswer(
    examResultId: string,
    data: SubmitAnswerDto
  ): Promise<void> {
    await apiClient.post<ApiResponse<void>>(
      `/results/${examResultId}/answer`,
      data
    );
  },

  /**
   * 提交整个考试（学生端-公开接口）
   */
  async submitExam(
    examResultId: string,
    data: SubmitExamDto
  ): Promise<ExamResult> {
    const response = await apiClient.post<ApiResponse<ExamResult>>(
      `/results/${examResultId}/submit`,
      data
    );
    return response.data.data;
  },

  /**
   * 清理考试会话（学生端-公开接口）
   * 用于：离开页签、大屏断开、提交失败
   */
  async cleanupExamSession(examResultId: string): Promise<void> {
    await apiClient.delete<ApiResponse<void>>(
      `/results/${examResultId}/cleanup`
    );
  },

  /**
   * 获取考试结果详情（学生端-公开接口）
   */
  async getResult(examResultId: string): Promise<ExamResult> {
    const response = await apiClient.get<ApiResponse<ExamResult>>(
      `/results/${examResultId}`
    );
    return response.data.data;
  },

  // ==========================================================================
  // 教师端API（需要认证）
  // ==========================================================================

  /**
   * 获取所有结果列表（教师端，支持分页和筛选）
   */
  async getResultsList(params?: ResultsListParams): Promise<ResultsListResponse> {
    const response = await apiClient.get<ApiResponse<ResultsListResponse>>(
      '/results',
      { params }
    );
    return response.data.data;
  },

  /**
   * 获取考试的所有结果列表（教师端）
   */
  async getExamResults(examId: string): Promise<ExamResult[]> {
    const response = await apiClient.get<ApiResponse<ExamResult[]>>(
      `/results/exam/${examId}`
    );
    return response.data.data;
  },

  /**
   * 获取结果详情（教师端，含完整答题信息）
   */
  async getResultDetail(resultId: string): Promise<ResultDetail> {
    const response = await apiClient.get<ApiResponse<ResultDetail>>(
      `/results/${resultId}`
    );
    return response.data.data;
  },

  /**
   * 获取结果统计数据（教师端）
   */
  async getResultStats(examId?: string): Promise<ResultStats> {
    const response = await apiClient.get<ApiResponse<ResultStats>>(
      '/results/stats',
      { params: { examId } }
    );
    return response.data.data;
  },

  /**
   * 导出结果为Excel（教师端）
   */
  async exportResults(params?: ResultsListParams): Promise<Blob> {
    const response = await apiClient.get('/results/export', {
      params,
      responseType: 'blob',
    });
    return response.data;
  },

  /**
   * 删除考试结果（教师端）
   */
  async deleteResult(examResultId: string): Promise<void> {
    await apiClient.delete<ApiResponse<void>>(`/results/${examResultId}`);
  },
};

export default resultsApi;
