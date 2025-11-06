'use client';

/**
 * NavigationGrid - 题目导航网格组件
 *
 * 功能：
 * - 显示所有题号的网格
 * - 区分已答/未答/当前题状态
 * - 点击跳转到指定题目
 */

import { Card, Button } from 'antd';
import type { Question } from '@/services/questions';
import type { AnswerValue } from '@/components/exam/AnswerInput';

// ============================================================================
// 类型定义
// ============================================================================

export interface NavigationGridProps {
  /** 所有题目 */
  questions: Question[];
  /** 当前题目索引（从0开始） */
  currentIndex: number;
  /** 所有答案 */
  answers: Record<string, AnswerValue>;
  /** 跳转回调 */
  onJumpTo: (index: number) => void;
}

// ============================================================================
// 组件实现
// ============================================================================

export function NavigationGrid({
  questions,
  currentIndex,
  answers,
  onJumpTo,
}: NavigationGridProps) {
  // --------------------------------------------------------------------------
  // 渲染 JSX
  // --------------------------------------------------------------------------

  return (
    <Card title="题目导航" size="small" className="nav-grid-card">
      <div className="grid grid-cols-3 gap-2">
        {questions.map((q, index) => {
          // 判断是否已答
          const isAnswered = answers[q.id]?.selectedOptions?.length || answers[q.id]?.textAnswer;
          // 是否为当前题
          const isCurrent = index === currentIndex;

          return (
            <Button
              key={q.id}
              size="small"
              type={isCurrent ? 'primary' : 'default'}
              onClick={() => onJumpTo(index)}
              className={`nav-button ${isAnswered && !isCurrent ? 'answered-button' : ''}`}
            >
              {index + 1}
            </Button>
          );
        })}
      </div>

      {/* ====================================================================== */}
      {/* CSS样式定义 */}
      {/* ====================================================================== */}
      <style jsx global>{`
        /* 导航卡片样式 */
        .nav-grid-card {
          position: sticky;
          top: 100px;
        }

        /* 导航按钮基础样式 */
        .nav-button {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease !important;
        }

        /* 已回答按钮样式 */
        .answered-button {
          border-color: #52c41a !important;
          color: #52c41a !important;
          background-color: #f6ffed !important;
        }

        .answered-button:hover {
          border-color: #73d13d !important;
          color: #73d13d !important;
          background-color: #f6ffed !important;
        }

        /* 导航按钮波纹效果 */
        .nav-button::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(102, 126, 234, 0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .nav-button:active::after {
          width: 100px;
          height: 100px;
        }

        /* 导航按钮悬停效果 */
        .nav-button:hover {
          transform: scale(1.1);
        }
      `}</style>
    </Card>
  );
}
