'use client';

/**
 * PageHeader - 页面头部组件
 *
 * 用于显示页面标题、描述和操作按钮
 */

import { Typography } from 'antd';
import type { ReactNode } from 'react';

const { Title, Paragraph } = Typography;

// ============================================================================
// 类型定义
// ============================================================================

export interface PageHeaderProps {
  /** 页面标题 */
  title: ReactNode;
  /** 页面描述 */
  description?: string;
  /** 额外操作按钮 */
  extra?: ReactNode;
  /** 标题级别 */
  level?: 1 | 2 | 3 | 4 | 5;
}

// ============================================================================
// 组件实现
// ============================================================================

export function PageHeader({
  title,
  description,
  extra,
  level = 2,
}: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <Title level={level} className="mb-2">
          {title}
        </Title>
        {description && (
          <Paragraph className="text-gray-600 mb-0">
            {description}
          </Paragraph>
        )}
      </div>
      {extra && <div>{extra}</div>}
    </div>
  );
}

export default PageHeader;
