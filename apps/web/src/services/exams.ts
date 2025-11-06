import apiClient from '../utils/api';
import type { ApiResponse, PaginatedResponse, PaginationParams, SearchParams } from '../types/api';

// ============================================================================
// 枚举定义
// ============================================================================

/**
 * 考试状态枚举
 */
export enum ExamStatus {
  DRAFT = 'DRAFT',           // 草稿 - 可编辑
  PUBLISHED = 'PUBLISHED',   // 已发布 - 学生可参加
  SUCCESS = 'SUCCESS',       // 成功结束
  ARCHIVED = 'ARCHIVED',     // 已归档
  DELETED = 'DELETED',       // 已删除（软删除，7天后硬删除）
}

// ============================================================================
// API原始类型定义（后端返回的格式）
// ============================================================================

/**
 * 考试（API格式）
 */
export interface ExamApiModel {
  id: string;
  teacher_id: string;
  paper_id: string;
  title: string;
  description?: string;
  status: ExamStatus;
  start_time: string;
  end_time: string;
  time_limit?: number;
  access_code?: string;
  allowed_students?: string[];
  max_attempts: number;
  require_camera: boolean;
  require_microphone: boolean;
  enable_ai_analysis: boolean;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  _count?: {
    results: number;
  };
  paper?: {
    id: string;
    title: string;
  };
}

// ============================================================================
// 前端视图模型类型定义（camelCase格式）
// ============================================================================

/**
 * 考试（前端格式）
 */
export interface Exam {
  id: string;
  teacherId: string;
  paperId: string;
  title: string;
  description?: string;
  status: ExamStatus;
  startTime: string;
  endTime: string;
  timeLimit?: number;
  accessCode?: string;
  allowedStudents?: string[];
  maxAttempts: number;
  requireCamera: boolean;
  requireMicrophone: boolean;
  enableAIAnalysis: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  _count?: {
    results: number;
  };
  paper?: {
    id: string;
    title: string;
    questions?: Array<{
      id: string;
      type: string;
      text: string;
      order: number;
    }>;
  };
}

/**
 * 考试统计数据
 */
export interface ExamStatistics {
  totalParticipants: number;
  completedParticipants: number;
  averageScore: number;
  averageTimeSpent: number;
  passRate: number;
}

// ============================================================================
// 请求参数类型定义
// ============================================================================

/**
 * 创建考试请求参数
 */
export interface CreateExamDto {
  paperId: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  timeLimit?: number;
  accessCode?: string;
  allowedStudents?: string[];
  maxAttempts?: number;
  requireCamera?: boolean;
  requireMicrophone?: boolean;
  enableAIAnalysis?: boolean;
}

/**
 * 更新考试请求参数
 */
export interface UpdateExamDto extends Partial<CreateExamDto> {}

/**
 * 查询考试列表参数
 */
export interface QueryExamsDto extends PaginationParams, SearchParams {
  status?: ExamStatus;
  paperId?: string;
}

// ============================================================================
// API服务方法定义
// ============================================================================

export const examsApi = {
  /**
   * 获取考试列表（支持分页和筛选）
   */
  async findAll(query?: QueryExamsDto): Promise<PaginatedResponse<Exam>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Exam>>>(
      '/exams',
      { params: query }
    );
    return response.data.data;
  },

  /**
   * list方法别名，指向findAll（保持API一致性）
   */
  async list(query?: QueryExamsDto): Promise<PaginatedResponse<Exam>> {
    return this.findAll(query);
  },

  /**
   * 获取考试详情
   */
  async findById(id: string): Promise<Exam> {
    const response = await apiClient.get<ApiResponse<Exam>>(`/exams/${id}`);
    return response.data.data;
  },

  /**
   * 获取考试统计数据
   */
  async getStatistics(id: string): Promise<ExamStatistics> {
    const response = await apiClient.get<ApiResponse<ExamStatistics>>(
      `/exams/${id}/statistics`
    );
    return response.data.data;
  },

  /**
   * 创建考试
   */
  async create(data: CreateExamDto): Promise<Exam> {
    const response = await apiClient.post<ApiResponse<Exam>>('/exams', data);
    return response.data.data;
  },

  /**
   * 更新考试（仅DRAFT状态）
   */
  async update(id: string, data: UpdateExamDto): Promise<Exam> {
    const response = await apiClient.put<ApiResponse<Exam>>(`/exams/${id}`, data);
    return response.data.data;
  },

  /**
   * 删除考试（软删除，仅非PUBLISHED状态）
   */
  async delete(id: string): Promise<void> {
    await apiClient.delete<ApiResponse<void>>(`/exams/${id}`);
  },

  // ==========================================================================
  // 状态管理方法
  // ==========================================================================

  /**
   * 发布考试（DRAFT → PUBLISHED）
   */
  async publish(id: string): Promise<Exam> {
    const response = await apiClient.post<ApiResponse<Exam>>(`/exams/${id}/publish`);
    return response.data.data;
  },

  /**
   * 标记考试成功（PUBLISHED → SUCCESS）
   */
  async markSuccess(id: string): Promise<Exam> {
    const response = await apiClient.post<ApiResponse<Exam>>(`/exams/${id}/mark-success`);
    return response.data.data;
  },

  /**
   * 停止考试并回到草稿（PUBLISHED → DRAFT）
   */
  async stop(id: string): Promise<Exam> {
    const response = await apiClient.post<ApiResponse<Exam>>(`/exams/${id}/stop`);
    return response.data.data;
  },

  /**
   * 归档考试（SUCCESS → ARCHIVED）
   */
  async archive(id: string): Promise<Exam> {
    const response = await apiClient.post<ApiResponse<Exam>>(`/exams/${id}/archive`);
    return response.data.data;
  },

  /**
   * 恢复考试（ARCHIVED → SUCCESS）
   */
  async restore(id: string): Promise<Exam> {
    const response = await apiClient.post<ApiResponse<Exam>>(`/exams/${id}/restore`);
    return response.data.data;
  },
};

export default examsApi;
