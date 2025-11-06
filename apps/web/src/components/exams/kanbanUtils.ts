/**
 * Kanban看板工具函数
 * 提供泳道配置、宽度计算、分页计算等工具函数
 */

import {
  FileTextOutlined,
  PlayCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { ExamStatus } from '../../services/exams';

// ============================================================================
// 类型定义
// ============================================================================

export interface LaneConfig {
  title: string;
  color: string;
  bgColor: string;
  Icon: typeof FileTextOutlined;
}

// ============================================================================
// 泳道配置
// ============================================================================

/**
 * 看板显示的状态泳道（只显示3个：草稿、进行中、已完成）
 * 已归档通过单独按钮访问，已删除不可见
 */
export const kanbanDisplayStatuses: ExamStatus[] = [
  ExamStatus.DRAFT,
  ExamStatus.PUBLISHED,
  ExamStatus.SUCCESS,
];

export const laneConfig: Record<ExamStatus, LaneConfig> = {
  [ExamStatus.DRAFT]: {
    title: '草稿',
    color: '#8c8c8c',
    bgColor: '#fafafa',
    Icon: FileTextOutlined,
  },
  [ExamStatus.PUBLISHED]: {
    title: '进行中',
    color: '#1890ff',
    bgColor: '#e6f7ff',
    Icon: PlayCircleOutlined,
  },
  [ExamStatus.SUCCESS]: {
    title: '已完成',
    color: '#52c41a',
    bgColor: '#f6ffed',
    Icon: CheckCircleOutlined,
  },
  [ExamStatus.ARCHIVED]: {
    title: '已归档',
    color: '#faad14',
    bgColor: '#fffbe6',
    Icon: DeleteOutlined,
  },
  [ExamStatus.DELETED]: {
    title: '已删除',
    color: '#ff4d4f',
    bgColor: '#fff1f0',
    Icon: DeleteOutlined,
  },
};

// ============================================================================
// 工具函数
// ============================================================================

/**
 * 计算泳道宽度
 */
export function calculateLaneWidth(isExpanded: boolean): string {
  return isExpanded ? '75%' : '6%';
}

/**
 * 计算卡片布局（列数和行数）
 */
export function calculateCardLayout() {
  return {
    columns: 3, // 每行3列
    rows: 3,    // 每页3行
  };
}

/**
 * 计算总页数
 */
export function getTotalPages(exams: any[]): number {
  const { columns, rows } = calculateCardLayout();
  const pageSize = columns * rows;
  return Math.ceil(exams.length / pageSize);
}

/**
 * 获取分页后的考试数据
 */
export function getPaginatedExams<T>(exams: T[], currentPage: number): T[] {
  const { columns, rows } = calculateCardLayout();
  const pageSize = columns * rows;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return exams.slice(startIndex, endIndex);
}
