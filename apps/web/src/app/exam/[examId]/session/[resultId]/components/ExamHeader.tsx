'use client';

/**
 * ExamHeader - 考试顶部栏组件
 *
 * 功能：
 * - 显示考试标题
 * - 显示答题进度
 * - 显示倒计时（如有）
 * - 提交按钮
 */

import { Card, Button, Progress, Space, Statistic, Typography, Tag, Affix } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Countdown } = Statistic;

// ============================================================================
// 类型定义
// ============================================================================

export interface ExamHeaderProps {
  /** 考试标题 */
  examTitle: string;
  /** 当前题号（从1开始） */
  currentQuestionNumber: number;
  /** 总题数 */
  totalQuestions: number;
  /** 已答题数 */
  answeredCount: number;
  /** 倒计时截止时间戳（毫秒，0表示无倒计时） */
  timeDeadline?: number;
  /** 提交中状态 */
  submitting: boolean;
  /** 提交按钮点击回调 */
  onSubmit: () => void;
  /** 时间到回调 */
  onTimeUp?: () => void;
}

// ============================================================================
// 组件实现
// ============================================================================

export function ExamHeader({
  examTitle,
  currentQuestionNumber,
  totalQuestions,
  answeredCount,
  timeDeadline = 0,
  submitting,
  onSubmit,
  onTimeUp,
}: ExamHeaderProps) {
  // --------------------------------------------------------------------------
  // 计算属性
  // --------------------------------------------------------------------------

  const progressPercent = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;

  // --------------------------------------------------------------------------
  // 渲染 JSX
  // --------------------------------------------------------------------------

  return (
    <Affix offsetTop={0}>
      <Card className="shadow-sm">
        {/* 主内容区 */}
        <div className="flex items-center justify-between">
          {/* 左侧：标题和题号 */}
          <div className="flex items-center space-x-4">
            <Title level={4} className="mb-0">
              {examTitle}
            </Title>
            <Tag color="blue">
              题目 {currentQuestionNumber} / {totalQuestions}
            </Tag>
          </div>

          {/* 右侧：进度、倒计时、提交按钮 */}
          <Space size="large">
            {/* 进度统计 */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">已答:</span>
              <span className="font-medium">
                {answeredCount} / {totalQuestions}
              </span>
            </div>

            {/* 倒计时 */}
            {timeDeadline > 0 && (
              <Countdown
                title={<ClockCircleOutlined />}
                value={timeDeadline}
                onFinish={onTimeUp}
                format="HH:mm:ss"
                valueStyle={{ fontSize: 18, color: '#1890ff' }}
              />
            )}

            {/* 提交按钮 */}
            <Button
              type="primary"
              size="large"
              icon={<CheckCircleOutlined />}
              onClick={onSubmit}
              loading={submitting}
            >
              提交考试
            </Button>
          </Space>
        </div>

        {/* 进度条 */}
        <Progress
          percent={Math.round(progressPercent)}
          status="active"
          className="mb-0 mt-2"
        />
      </Card>
    </Affix>
  );
}
