'use client';

// ============================================================================
// 考试路由布局
// ============================================================================

/**
 * 考试路由布局组件
 *
 * 功能：
 * - 为所有考试相关页面提供MediaStreamProvider
 * - 确保设备流可以跨页面共享
 */

import React from 'react';
import { MediaStreamProvider } from '../../contexts/MediaStreamContext';

// ============================================================================
// 组件实现
// ============================================================================

export default function ExamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MediaStreamProvider>{children}</MediaStreamProvider>;
}
