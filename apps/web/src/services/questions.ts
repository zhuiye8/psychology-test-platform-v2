import apiClient from '../utils/api';
import type { ApiResponse, PaginationParams, SearchParams } from '../types/api';

// ============================================================================
// 枚举定义
// ============================================================================

/**
 * 题目类型枚举
 */
export enum QuestionType {
  SINGLE_CHOICE = 'SINGLE_CHOICE',     // 单选题
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE', // 多选题
  TEXT = 'TEXT',                       // 文本题（短答案）
  ESSAY = 'ESSAY',                     // 问答题（长文本）
}

// ============================================================================
// API原始类型定义（后端返回的格式）
// ============================================================================

/**
 * 题目选项（API格式）
 */
export interface QuestionOptionApiModel {
  id: string;
  text: string;
  /**
   * @deprecated 已废弃，请使用score字段进行评分
   * ⚠️ 此字段仅用于读取历史数据
   */
  is_correct?: boolean;
  score?: number;  // 选项分数（用于心理测试）
}

/**
 * 题目（API格式）
 */
export interface QuestionApiModel {
  id: string;
  paper_id: string;
  title: string;
  type: QuestionType;
  description?: string;
  dimension?: string;  // 题目维度（可选）
  explanation?: string;
  order: number;
  required: boolean;
  points: number;
  display_condition?: any;
  options?: QuestionOptionApiModel[];
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

// ============================================================================
// 前端视图模型类型定义（camelCase格式）
// ============================================================================

/**
 * 题目选项（前端格式）
 */
export interface QuestionOption {
  id: string;
  text: string;
  /**
   * @deprecated 已废弃，请使用score字段进行评分
   * ⚠️ 此字段仅用于读取历史数据，创建/更新题目时不应包含此字段
   * 后端DTO会拒绝包含isCorrect的请求（400错误）
   */
  isCorrect?: boolean;
  /** 选项分数（用于心理测试，0-100） */
  score?: number;
}

/**
 * 题目（前端格式）
 */
export interface Question {
  id: string;
  paperId: string;
  title: string;
  type: QuestionType;
  description?: string;
  /** 题目维度（可选，用于心理测试分类，如"家庭生活"、"学业表现"） */
  dimension?: string;
  explanation?: string;
  order: number;
  required: boolean;
  points: number;
  /** 显示条件（条件逻辑） */
  displayCondition?: any; // TODO: 定义DisplayCondition类型
  options?: QuestionOption[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

// ============================================================================
// 请求参数类型定义
// ============================================================================

/**
 * 创建题目请求参数
 */
export interface CreateQuestionDto {
  title: string;
  type: QuestionType;
  description?: string;
  /** 题目维度（可选，用于心理测试分类） */
  dimension?: string;
  explanation?: string;
  order?: number;
  required?: boolean;
  points?: number;
  displayCondition?: any;
  options?: QuestionOption[];
}

/**
 * 更新题目请求参数
 */
export interface UpdateQuestionDto extends Partial<CreateQuestionDto> {}

/**
 * 批量删除请求参数
 */
export interface BulkDeleteDto {
  ids: string[];
}

/**
 * 批量导入请求参数
 */
export interface BatchImportDto {
  questions: CreateQuestionDto[];
}

/**
 * 批量导入结果
 */
export interface BatchImportResult {
  successCount: number;
  failedCount: number;
  questionIds: string[];
  errors?: Array<{
    index: number;
    title: string;
    error: string;
  }>;
}

// ============================================================================
// API服务方法定义
// ============================================================================

export const questionsApi = {
  /**
   * 获取试卷的所有题目
   */
  async findAllByPaper(paperId: string): Promise<Question[]> {
    const response = await apiClient.get<ApiResponse<Question[]>>(
      `/questions/paper/${paperId}`
    );
    return response.data.data;
  },

  /**
   * 获取题目详情
   */
  async findById(id: string): Promise<Question> {
    const response = await apiClient.get<ApiResponse<Question>>(`/questions/${id}`);
    return response.data.data;
  },

  /**
   * 创建题目
   */
  async create(paperId: string, data: CreateQuestionDto): Promise<Question> {
    const response = await apiClient.post<ApiResponse<Question>>(
      `/questions/paper/${paperId}`,
      data
    );
    return response.data.data;
  },

  /**
   * 更新题目
   */
  async update(id: string, data: UpdateQuestionDto): Promise<Question> {
    const response = await apiClient.put<ApiResponse<Question>>(
      `/questions/${id}`,
      data
    );
    return response.data.data;
  },

  /**
   * 删除题目
   */
  async delete(id: string): Promise<void> {
    await apiClient.delete<ApiResponse<void>>(`/questions/${id}`);
  },

  /**
   * 批量删除题目
   */
  async bulkDelete(ids: string[]): Promise<void> {
    await apiClient.post<ApiResponse<void>>('/questions/bulk-delete', { ids });
  },

  /**
   * 复制题目
   */
  async duplicate(id: string): Promise<Question> {
    const response = await apiClient.post<ApiResponse<Question>>(
      `/questions/${id}/duplicate`
    );
    return response.data.data;
  },

  /**
   * 重新排序题目
   */
  async updateOrder(paperId: string, questionIds: string[]): Promise<void> {
    await apiClient.post<ApiResponse<void>>(
      `/questions/paper/${paperId}/reorder`,
      { questionIds }
    );
  },

  /**
   * 批量导入题目
   */
  async batchImport(paperId: string, data: BatchImportDto): Promise<BatchImportResult> {
    const response = await apiClient.post<ApiResponse<BatchImportResult>>(
      `/questions/paper/${paperId}/batch-import`,
      data
    );
    return response.data.data;
  },
};

export default questionsApi;
