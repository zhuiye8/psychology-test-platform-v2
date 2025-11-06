'use client';

/**
 * ExamStatusBadge - 考试状态徽章组件
 *
 * 显示考试的5种状态：DRAFT/PUBLISHED/SUCCESS/ARCHIVED/DELETED
 */

import { Tag } from 'antd';
import type { TagProps } from 'antd';
import {
  EditOutlined,
  PlayCircleOutlined,
  CheckCircleOutlined,
  InboxOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { ExamStatus } from '../../services/exams';

// ============================================================================
// 类型定义
// ============================================================================

export interface ExamStatusBadgeProps {
  /** 考试状态 */
  status: ExamStatus;
  /** 是否显示图标 */
  showIcon?: boolean;
}

// ============================================================================
// 常量定义
// ============================================================================

/** 状态配置映射 */
const STATUS_CONFIG: Record<
  ExamStatus,
  {
    color: TagProps['color'];
    text: string;
    icon: React.ReactNode;
  }
> = {
  [ExamStatus.DRAFT]: {
    color: 'default',
    text: '草稿',
    icon: <EditOutlined />,
  },
  [ExamStatus.PUBLISHED]: {
    color: 'processing',
    text: '进行中',
    icon: <PlayCircleOutlined />,
  },
  [ExamStatus.SUCCESS]: {
    color: 'success',
    text: '已完成',
    icon: <CheckCircleOutlined />,
  },
  [ExamStatus.ARCHIVED]: {
    color: 'warning',
    text: '已归档',
    icon: <InboxOutlined />,
  },
  [ExamStatus.DELETED]: {
    color: 'error',
    text: '已删除',
    icon: <DeleteOutlined />,
  },
};

// ============================================================================
// 组件实现
// ============================================================================

export function ExamStatusBadge({ status, showIcon = true }: ExamStatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  return (
    <Tag color={config.color} icon={showIcon ? config.icon : undefined}>
      {config.text}
    </Tag>
  );
}

export default ExamStatusBadge;
