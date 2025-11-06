/**
 * Exam Stats Component
 *
 * 考试统计卡片（参与人数、题目数、完成率等）
 */

import { Row, Col, Card, Statistic } from 'antd';
import {
  TeamOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';

// ============================================================================
// 类型定义
// ============================================================================

export interface ExamStatsProps {
  participantCount: number;
  questionCount: number;
  durationMinutes: number;
  completionRate: number;
}

// ============================================================================
// 主组件
// ============================================================================

export function ExamStats({
  participantCount,
  questionCount,
  durationMinutes,
  completionRate,
}: ExamStatsProps) {
  return (
    <Row gutter={16} className="mb-6">
      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic
            title="参与人数"
            value={participantCount}
            prefix={<TeamOutlined />}
            suffix="人"
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic
            title="题目数量"
            value={questionCount}
            prefix={<FileTextOutlined />}
            suffix="题"
            valueStyle={{ color: '#1890ff' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic
            title="考试时长"
            value={durationMinutes || '不限'}
            prefix={<ClockCircleOutlined />}
            suffix={durationMinutes ? '分钟' : ''}
            valueStyle={{ color: '#faad14' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic
            title="完成率"
            value={completionRate}
            prefix={<CheckCircleOutlined />}
            suffix="%"
            valueStyle={{ color: '#52c41a' }}
            precision={1}
          />
        </Card>
      </Col>
    </Row>
  );
}
