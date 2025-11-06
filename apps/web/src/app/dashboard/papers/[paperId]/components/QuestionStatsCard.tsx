/**
 * 题目统计卡片组件
 *
 * 展示试卷的题目统计数据（总数、总分、必答/选答、各题型数量）
 */

import { Card, Row, Col, Statistic } from 'antd';
import { FileTextOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { type Question, QuestionType } from '@/services/questions';

// ============================================================================
// 类型定义
// ============================================================================

export interface QuestionStatsCardProps {
  questions: Question[];
}

interface QuestionStats {
  totalQuestions: number;
  totalScore: number;
  requiredCount: number;
  optionalCount: number;
  typeStats: Record<QuestionType, number>;
}

// ============================================================================
// 辅助函数
// ============================================================================

/** 计算题目统计数据 */
const getQuestionStats = (questions: Question[]): QuestionStats => {
  const totalQuestions = questions.length;
  const totalScore = questions.reduce((sum, q) => sum + q.points, 0);
  const requiredCount = questions.filter((q) => q.required).length;
  const optionalCount = totalQuestions - requiredCount;

  const typeStats = {
    [QuestionType.SINGLE_CHOICE]: 0,
    [QuestionType.MULTIPLE_CHOICE]: 0,
    [QuestionType.TEXT]: 0,
    [QuestionType.ESSAY]: 0,
  };

  questions.forEach((q) => {
    if (typeStats[q.type] !== undefined) {
      typeStats[q.type]++;
    }
  });

  return {
    totalQuestions,
    totalScore,
    requiredCount,
    optionalCount,
    typeStats,
  };
};

// ============================================================================
// 主组件
// ============================================================================

export function QuestionStatsCard({ questions }: QuestionStatsCardProps) {
  const stats = getQuestionStats(questions);

  return (
    <Card title="题目统计" className="shadow-sm">
      <Row gutter={[16, 16]}>
        <Col xs={12} sm={8} md={6}>
          <Statistic
            title="题目总数"
            value={stats.totalQuestions}
            suffix="题"
            prefix={<FileTextOutlined />}
          />
        </Col>
        <Col xs={12} sm={8} md={6}>
          <Statistic
            title="总分"
            value={stats.totalScore}
            suffix="分"
            valueStyle={{ color: '#1890ff' }}
          />
        </Col>
        <Col xs={12} sm={8} md={6}>
          <Statistic
            title="必答题"
            value={stats.requiredCount}
            suffix="题"
            prefix={<CheckCircleOutlined />}
            valueStyle={{ color: '#52c41a' }}
          />
        </Col>
        <Col xs={12} sm={8} md={6}>
          <Statistic
            title="选答题"
            value={stats.optionalCount}
            suffix="题"
            prefix={<CloseCircleOutlined />}
            valueStyle={{ color: '#faad14' }}
          />
        </Col>
        <Col xs={12} sm={8} md={6}>
          <Statistic
            title="单选题"
            value={stats.typeStats[QuestionType.SINGLE_CHOICE]}
            suffix="题"
            valueStyle={{ color: '#1890ff' }}
          />
        </Col>
        <Col xs={12} sm={8} md={6}>
          <Statistic
            title="多选题"
            value={stats.typeStats[QuestionType.MULTIPLE_CHOICE]}
            suffix="题"
            valueStyle={{ color: '#722ed1' }}
          />
        </Col>
        <Col xs={12} sm={8} md={6}>
          <Statistic
            title="文本题"
            value={stats.typeStats[QuestionType.TEXT]}
            suffix="题"
            valueStyle={{ color: '#52c41a' }}
          />
        </Col>
        <Col xs={12} sm={8} md={6}>
          <Statistic
            title="问答题"
            value={stats.typeStats[QuestionType.ESSAY]}
            suffix="题"
            valueStyle={{ color: '#fa8c16' }}
          />
        </Col>
      </Row>
    </Card>
  );
}
