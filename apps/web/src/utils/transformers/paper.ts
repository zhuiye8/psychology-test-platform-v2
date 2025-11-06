/**
 * Paper数据转换工具
 *
 * 用于在后端API数据（snake_case）和前端视图模型（camelCase）之间进行转换
 */

import type { Paper, PaperApiModel } from '../../services/papers';

/**
 * 将后端API返回的Paper数据转换为前端视图模型
 *
 * @param apiData 后端返回的Paper数据（可能是snake_case或camelCase）
 * @returns 前端视图模型（camelCase）
 */
export function transformPaperFromApi(apiData: any): Paper {
  // 如果后端已经返回camelCase，直接使用
  // 否则从snake_case转换
  return {
    id: apiData.id,
    title: apiData.title,
    description: apiData.description,
    category: apiData.category,
    timeLimit: apiData.timeLimit ?? apiData.time_limit,
    allowRetake: apiData.allowRetake ?? apiData.allow_retake,
    showResultsImmediately: apiData.showResultsImmediately ?? apiData.show_results_immediately,
    randomizeQuestions: apiData.randomizeQuestions ?? apiData.randomize_questions,
    teacherId: apiData.teacherId ?? apiData.teacher_id,
    isActive: apiData.isActive ?? apiData.is_active,
    createdAt: apiData.createdAt ?? apiData.created_at,
    updatedAt: apiData.updatedAt ?? apiData.updated_at,
    deletedAt: apiData.deletedAt ?? apiData.deleted_at,
    _count: apiData._count,
  };
}

/**
 * 将前端视图模型转换为后端API需要的格式
 *
 * @param paper 前端视图模型（camelCase）
 * @returns 后端API格式（根据后端配置可能是snake_case或camelCase）
 */
export function transformPaperToApi(paper: Partial<Paper>): Partial<PaperApiModel> {
  // 目前后端接受camelCase，所以直接返回
  // 如果未来后端要求snake_case，在这里转换
  return {
    id: paper.id,
    title: paper.title,
    description: paper.description,
    category: paper.category,
    time_limit: paper.timeLimit,
    allow_retake: paper.allowRetake,
    show_results_immediately: paper.showResultsImmediately,
    randomize_questions: paper.randomizeQuestions,
    teacher_id: paper.teacherId,
    is_active: paper.isActive,
    created_at: paper.createdAt,
    updated_at: paper.updatedAt,
    deleted_at: paper.deletedAt,
    _count: paper._count,
  };
}

/**
 * 批量转换Paper数组
 *
 * @param apiDataList 后端返回的Paper数组
 * @returns 前端视图模型数组
 */
export function transformPaperListFromApi(apiDataList: any[]): Paper[] {
  return apiDataList.map(transformPaperFromApi);
}
