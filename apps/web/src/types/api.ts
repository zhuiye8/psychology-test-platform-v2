/**
 * 通用API类型定义
 *
 * 用于定义所有API响应的统一格式
 * 后端字段使用snake_case，需要通过transformer转换为前端camelCase
 */

/**
 * 统一API响应结构
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp?: string;
}

/**
 * 分页响应结构
 */
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * API错误响应
 */
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

/**
 * 分页请求参数
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
}

/**
 * 搜索参数
 */
export interface SearchParams {
  search?: string;
}

/**
 * 排序参数
 */
export interface SortParams {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
