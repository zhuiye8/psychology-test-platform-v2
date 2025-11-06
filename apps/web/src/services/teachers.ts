/**
 * Teachers API Service
 *
 * 教师管理API调用封装
 */

import apiClient from '../utils/api';
import type { ApiResponse, PaginatedResponse } from '../types/api';

// ============================================================================
// 类型定义
// ============================================================================

/** 教师信息（API原始数据 - snake_case） */
export interface TeacherApiModel {
  id: string;
  username: string;
  email: string;
  name: string;
  phone_number?: string;
  department?: string;
  title?: string;
  is_active: boolean;
  last_login_at?: string;
  created_at: string;
  updated_at: string;
  _count?: {
    papers: number;
    exams: number;
  };
}

/** 教师信息（前端使用 - camelCase） */
export interface Teacher {
  id: string;
  username: string;
  email: string;
  name: string;
  phoneNumber?: string;
  department?: string;
  title?: string;
  isActive: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    papers: number;
    exams: number;
  };
}

/** 教师统计数据（API原始数据） */
export interface TeacherStatsApiModel {
  total_teachers: number;
  active_teachers: number;
  inactive_teachers: number;
  recently_created: number;
}

/** 教师统计数据（前端使用） */
export interface TeacherStats {
  totalTeachers: number;
  activeTeachers: number;
  inactiveTeachers: number;
  recentlyCreated: number;
}

/** 创建教师DTO（API参数 - snake_case） */
export interface CreateTeacherDto {
  username: string;
  email: string;
  name: string;
  password: string;
  phone_number?: string;
  department?: string;
  title?: string;
}

/** 更新教师DTO（API参数 - snake_case） */
export interface UpdateTeacherDto {
  email?: string;
  name?: string;
  phone_number?: string;
  department?: string;
  title?: string;
  is_active?: boolean;
  password?: string;
}

/** 重置密码DTO（API参数） */
export interface ResetPasswordDto {
  new_password: string;
}

/** 查询教师参数 */
export interface QueryTeachersParams {
  page?: number;
  limit?: number;
  search?: string;
  is_active?: boolean;
}

// ============================================================================
// 数据转换函数
// ============================================================================

/** API数据 → 前端数据 */
function transformTeacher(apiData: TeacherApiModel): Teacher {
  return {
    id: apiData.id,
    username: apiData.username,
    email: apiData.email,
    name: apiData.name,
    phoneNumber: apiData.phone_number,
    department: apiData.department,
    title: apiData.title,
    isActive: apiData.is_active,
    lastLoginAt: apiData.last_login_at,
    createdAt: apiData.created_at,
    updatedAt: apiData.updated_at,
    _count: apiData._count,
  };
}

/** 统计数据转换 */
function transformStats(apiData: TeacherStatsApiModel): TeacherStats {
  return {
    totalTeachers: apiData.total_teachers,
    activeTeachers: apiData.active_teachers,
    inactiveTeachers: apiData.inactive_teachers,
    recentlyCreated: apiData.recently_created,
  };
}

// ============================================================================
// API 调用封装
// ============================================================================

const teachersApi = {
  /**
   * 获取教师列表（分页）
   */
  async findAll(params?: QueryTeachersParams): Promise<PaginatedResponse<Teacher>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<TeacherApiModel>>>('/teachers', {
      params,
    });

    return {
      data: response.data.data.data.map(transformTeacher),
      meta: response.data.data.meta,
    };
  },

  /**
   * 获取教师统计数据
   */
  async getStatistics(): Promise<TeacherStats> {
    const response = await apiClient.get<ApiResponse<TeacherStatsApiModel>>('/teachers/statistics');
    return transformStats(response.data.data);
  },

  /**
   * 根据ID获取教师详情
   */
  async getById(id: string): Promise<Teacher> {
    const response = await apiClient.get<ApiResponse<TeacherApiModel>>(`/teachers/${id}`);
    return transformTeacher(response.data.data);
  },

  /**
   * 创建教师
   */
  async create(data: CreateTeacherDto): Promise<Teacher> {
    const response = await apiClient.post<ApiResponse<TeacherApiModel>>('/teachers', data);
    return transformTeacher(response.data.data);
  },

  /**
   * 更新教师信息
   */
  async update(id: string, data: UpdateTeacherDto): Promise<Teacher> {
    const response = await apiClient.put<ApiResponse<TeacherApiModel>>(`/teachers/${id}`, data);
    return transformTeacher(response.data.data);
  },

  /**
   * 删除教师（软删除）
   */
  async delete(id: string): Promise<void> {
    await apiClient.delete(`/teachers/${id}`);
  },

  /**
   * 切换教师启用/禁用状态
   */
  async toggleStatus(id: string): Promise<{ id: string; isActive: boolean }> {
    const response = await apiClient.patch<ApiResponse<{ id: string; is_active: boolean }>>(
      `/teachers/${id}/status`
    );
    return {
      id: response.data.data.id,
      isActive: response.data.data.is_active,
    };
  },

  /**
   * 重置教师密码
   */
  async resetPassword(id: string, data: ResetPasswordDto): Promise<void> {
    await apiClient.patch(`/teachers/${id}/password`, data);
  },
};

export default teachersApi;
