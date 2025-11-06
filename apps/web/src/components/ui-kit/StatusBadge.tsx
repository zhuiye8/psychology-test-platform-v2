'use client';

/**
 * StatusBadge - 状态徽章组件
 *
 * 用于显示各种状态标签（如启用/禁用、成功/失败等）
 */

import { Tag } from 'antd';
import type { TagProps } from 'antd';

// ============================================================================
// 类型定义
// ============================================================================

export type StatusType = 'success' | 'warning' | 'error' | 'info' | 'default';

export interface StatusBadgeProps {
  /** 状态类型 */
  status: StatusType;
  /** 显示文本 */
  text: string;
  /** 是否显示图标 */
  icon?: boolean;
}

// ============================================================================
// 常量定义
// ============================================================================

const STATUS_COLOR_MAP: Record<StatusType, TagProps['color']> = {
  success: 'green',
  warning: 'orange',
  error: 'red',
  info: 'blue',
  default: 'default',
};

// ============================================================================
// 组件实现
// ============================================================================

export function StatusBadge({ status, text, icon }: StatusBadgeProps) {
  return (
    <Tag color={STATUS_COLOR_MAP[status]} icon={icon}>
      {text}
    </Tag>
  );
}

export default StatusBadge;
