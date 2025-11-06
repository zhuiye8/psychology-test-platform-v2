'use client';

/**
 * GlobalLoading - 全局加载遮罩组件
 *
 * 功能：
 * - 全屏半透明遮罩
 * - 居中显示加载动画和提示文字
 * - 阻止用户操作
 */

import { Spin } from 'antd';

// ============================================================================
// 类型定义
// ============================================================================

export interface GlobalLoadingProps {
  /** 是否显示 */
  visible: boolean;
  /** 提示文字 */
  tip?: string;
}

// ============================================================================
// 组件实现
// ============================================================================

export function GlobalLoading({ visible, tip = '加载中...' }: GlobalLoadingProps) {
  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm"
      style={{ animation: 'fadeIn 0.2s ease-out' }}
    >
      {/* 加载卡片 */}
      <div
        className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center space-y-4"
        style={{ animation: 'scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
      >
        {/* 旋转图标 */}
        <Spin size="large" />

        {/* 提示文字 */}
        <p className="text-lg font-medium text-gray-700 m-0">{tip}</p>
      </div>

      {/* CSS动画定义 */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
