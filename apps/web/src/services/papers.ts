import apiClient from '../utils/api';
import type { ApiResponse, PaginatedResponse, PaginationParams, SearchParams } from '../types/api';

// ============================================================================
// API原始类型定义（后端返回的snake_case格式）
// ============================================================================

/**
 * 后端API返回的试卷原始数据结构（snake_case）
 */
export interface PaperApiModel {
  id: string;
  title: string;
  description?: string;
  category?: string;
  time_limit?: number;
  allow_retake?: boolean;
  show_results_immediately?: boolean;
  randomize_questions?: boolean;
  teacher_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  _count?: {
    questions: number;
    exams: number;
  };
}

// ============================================================================
// 前端视图模型类型定义（前端使用的camelCase格式）
// ============================================================================

/**
 * 前端使用的试卷数据模型（camelCase）
 */
export interface Paper {
  id: string;
  title: string;
  description?: string;
  category?: string;
  timeLimit?: number;
  allowRetake?: boolean;
  showResultsImmediately?: boolean;
  randomizeQuestions?: boolean;
  teacherId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  _count?: {
    questions: number;
    exams: number;
  };
}

// ============================================================================
// 请求参数类型定义
// ============================================================================

/**
 * 试卷列表查询参数
 */
export interface PaperListParams extends PaginationParams, SearchParams {
  category?: string;
}

/**
 * 创建试卷请求参数
 */
export interface CreatePaperDto {
  title: string;
  description?: string;
  category?: string;
  timeLimit?: number;
  allowRetake?: boolean;
  showResultsImmediately?: boolean;
  randomizeQuestions?: boolean;
}

/**
 * 更新试卷请求参数
 */
export interface UpdatePaperDto extends Partial<CreatePaperDto> {}

// ============================================================================
// API响应类型定义
// ============================================================================

/**
 * 试卷列表响应
 */
export type PaperListResponse = PaginatedResponse<Paper>;

// ============================================================================
// API服务方法定义
// ============================================================================

export const papersApi = {
  /**
   * 获取试卷列表
   */
  async list(params?: PaperListParams): Promise<PaperListResponse> {
    const response = await apiClient.get<ApiResponse<PaperListResponse>>('/papers', {
      params,
    });
    return response.data.data;
  },

  /**
   * 获取试卷详情
   */
  async getById(id: string): Promise<Paper> {
    const response = await apiClient.get<ApiResponse<Paper>>(`/papers/${id}`);
    return response.data.data;
  },

  /**
   * 创建试卷
   */
  async create(data: CreatePaperDto): Promise<Paper> {
    const response = await apiClient.post<ApiResponse<Paper>>('/papers', data);
    return response.data.data;
  },

  /**
   * 更新试卷
   */
  async update(id: string, data: UpdatePaperDto): Promise<Paper> {
    const response = await apiClient.put<ApiResponse<Paper>>(`/papers/${id}`, data);
    return response.data.data;
  },

  /**
   * 删除试卷
   */
  async delete(id: string): Promise<void> {
    await apiClient.delete<ApiResponse<void>>(`/papers/${id}`);
  },

  /**
   * 批量删除试卷
   */
  async bulkDelete(ids: string[]): Promise<void> {
    await apiClient.post<ApiResponse<void>>('/papers/bulk-delete', { ids });
  },

  /**
   * 复制试卷
   */
  async duplicate(id: string): Promise<Paper> {
    const response = await apiClient.post<ApiResponse<Paper>>(`/papers/${id}/duplicate`);
    return response.data.data;
  },

  /**
   * 获取分类列表
   */
  async getCategories(): Promise<string[]> {
    const response = await apiClient.get<ApiResponse<string[]>>('/papers/categories');
    return response.data.data;
  },
};

export default papersApi;
