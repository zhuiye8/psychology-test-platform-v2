/**
 * Analytics统计卡片组件
 *
 * 展示6个核心指标：总考试场次、参与学生、平均分、平均时间、AI覆盖率、AI数据数
 */

import { Card, Row, Col, Statistic } from 'antd';
import {
  BarChartOutlined,
  TrophyOutlined,
  ClockCircleOutlined,
  TeamOutlined,
} from '@ant-design/icons';

// ============================================================================
// 类型定义
// ============================================================================

export interface StatsCardsProps {
  totalExams: number;
  totalParticipants: number;
  averageScore: number;
  averageCompletionTime: number;
  aiAnalysisRate: number;
  aiDataCount: number;
  totalResults: number;
}

// ============================================================================
// 主组件
// ============================================================================

export function StatsCards({
  totalExams,
  totalParticipants,
  averageScore,
  averageCompletionTime,
  aiAnalysisRate,
  aiDataCount,
  totalResults,
}: StatsCardsProps) {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={8} lg={6} xl={4}>
        <Card>
          <Statistic
            title="总考试场次"
            value={totalExams}
            prefix={<BarChartOutlined />}
            suffix="场"
            valueStyle={{ color: '#1890ff' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={4}>
        <Card>
          <Statistic
            title="参与学生总数"
            value={totalParticipants}
            prefix={<TeamOutlined />}
            suffix="人"
            valueStyle={{ color: '#52c41a' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={4}>
        <Card>
          <Statistic
            title="平均分数"
            value={averageScore}
            prefix={<TrophyOutlined />}
            precision={1}
            suffix="分"
            valueStyle={{ color: '#faad14' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={4}>
        <Card>
          <Statistic
            title="平均完成时间"
            value={averageCompletionTime}
            prefix={<ClockCircleOutlined />}
            suffix="分钟"
            valueStyle={{ color: '#722ed1' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={4}>
        <Card>
          <Statistic
            title="AI分析覆盖率"
            value={aiAnalysisRate}
            precision={0}
            suffix="%"
            valueStyle={{ color: aiAnalysisRate > 70 ? '#52c41a' : '#faad14' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={4}>
        <Card>
          <Statistic
            title="AI数据条数"
            value={aiDataCount}
            suffix={`/ ${totalResults}`}
            valueStyle={{ color: '#13c2c2' }}
          />
        </Card>
      </Col>
    </Row>
  );
}
