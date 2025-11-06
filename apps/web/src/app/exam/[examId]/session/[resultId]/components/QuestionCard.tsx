'use client';

/**
 * QuestionCard - 题目卡片组件
 *
 * 功能：
 * - 显示题目信息（标题、描述、必答标记、分数）
 * - 集成答题输入组件
 * - 上一题/下一题导航按钮
 */

import { Card, Button, Typography, Tag } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { AnswerInput, type AnswerValue } from '@/components/exam/AnswerInput';
import type { Question } from '@/services/questions';

const { Title, Paragraph } = Typography;

// ============================================================================
// 类型定义
// ============================================================================

export interface QuestionCardProps {
  /** 当前题目 */
  question: Question;
  /** 题号（从1开始） */
  questionNumber: number;
  /** 当前答案 */
  value?: AnswerValue;
  /** 答案变化回调 */
  onChange: (value: AnswerValue) => void;
  /** 是否为第一题 */
  isFirst: boolean;
  /** 是否为最后一题 */
  isLast: boolean;
  /** 上一题回调 */
  onPrevious: () => void;
  /** 下一题回调 */
  onNext: () => void;
}

// ============================================================================
// 组件实现
// ============================================================================

export function QuestionCard({
  question,
  questionNumber,
  value,
  onChange,
  isFirst,
  isLast,
  onPrevious,
  onNext,
}: QuestionCardProps) {
  // --------------------------------------------------------------------------
  // 渲染 JSX
  // --------------------------------------------------------------------------

  return (
    <Card>
      {/* 题目标题 */}
      <div className="mb-4">
        <Title level={5} className="mb-2">
          第 {questionNumber} 题
          {question.required && (
            <Tag color="red" className="ml-2">
              必答
            </Tag>
          )}
          <Tag className="ml-2">{question.points} 分</Tag>
        </Title>
        <Paragraph className="text-base whitespace-pre-wrap">
          {question.title}
        </Paragraph>
        {question.description && (
          <Paragraph className="text-sm text-gray-500">
            {question.description}
          </Paragraph>
        )}
      </div>

      {/* 答题区域 */}
      <div className="my-6">
        <AnswerInput
          question={question}
          value={value}
          onChange={onChange}
        />
      </div>

      {/* 导航按钮 */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t">
        <Button
          size="large"
          icon={<LeftOutlined />}
          onClick={onPrevious}
          disabled={isFirst}
        >
          上一题
        </Button>

        <Button
          size="large"
          type="primary"
          onClick={onNext}
          disabled={isLast}
        >
          下一题 <RightOutlined />
        </Button>
      </div>
    </Card>
  );
}
