'use client';

// ============================================================================
// AI监测状态面板组件
// ============================================================================

/**
 * AI监测状态面板组件
 *
 * 功能：
 * - 显示AI服务状态
 * - 颜色编码状态指示器
 */

import React from 'react';
import { Card, Typography } from 'antd';

// ============================================================================
// 类型定义
// ============================================================================

interface AIStatusPanelProps {
  /** 是否启用AI监控 */
  aiEnabled: boolean;
  /** AI服务是否可用 */
  aiAvailable: boolean | null;
  /** AI配置加载中 */
  aiConfigLoading: boolean;
}

// ============================================================================
// 组件实现
// ============================================================================

export function AIStatusPanel({
  aiEnabled,
  aiAvailable,
  aiConfigLoading,
}: AIStatusPanelProps) {
  // --------------------------------------------------------------------------
  // 状态文本
  // --------------------------------------------------------------------------

  const statusText = !aiEnabled
    ? '未启用（已跳过）'
    : aiConfigLoading
    ? '检测中…'
    : aiAvailable
    ? '正常'
    : '服务不可用';

  // --------------------------------------------------------------------------
  // 状态颜色
  // --------------------------------------------------------------------------

  const { bg, color } = !aiEnabled
    ? { bg: 'rgba(156,163,175,0.2)', color: '#4b5563' } // 灰色（未启用）
    : aiConfigLoading
    ? { bg: 'rgba(245, 158, 11, 0.12)', color: '#92400e' } // 橙色（加载中）
    : aiAvailable
    ? { bg: 'rgba(16, 185, 129, 0.12)', color: '#065f46' } // 绿色（正常）
    : { bg: 'rgba(248,113,113,0.15)', color: '#991b1b' }; // 红色（不可用）

  // --------------------------------------------------------------------------
  // 渲染
  // --------------------------------------------------------------------------

  return (
    <Card
      style={{
        marginBottom: 16,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        borderRadius: 16,
      }}
      styles={{ body: { padding: 16 } }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography.Text strong style={{ fontSize: 14 }}>
          AI监测状态
        </Typography.Text>
        <span
          style={{
            padding: '4px 10px',
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 600,
            background: bg,
            color,
          }}
        >
          {statusText}
        </span>
      </div>
    </Card>
  );
}
