import { Row, Col, Card, Statistic } from 'antd';
import {
  PlayCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  WarningOutlined,
  SmileOutlined,
  EyeOutlined,
} from '@ant-design/icons';

// ============================================================================
// 类型定义
// ============================================================================

interface RealtimeStatsCardsProps {
  activeSessions: number;
  completedSessions: number;
  failedSessions: number;
  totalAnomalies: number;
  criticalAnomalies: number;
  avgEmotionScore: number;
  avgAttentionScore: number;
}

// ============================================================================
// 组件
// ============================================================================

export function RealtimeStatsCards({
  activeSessions,
  completedSessions,
  failedSessions,
  totalAnomalies,
  criticalAnomalies,
  avgEmotionScore,
  avgAttentionScore,
}: RealtimeStatsCardsProps) {
  return (
    <Row gutter={[16, 16]}>
      {/* 会话统计 */}
      <Col xs={24} sm={12} lg={6}>
        <Card className="shadow-sm">
          <Statistic
            title="进行中会话"
            value={activeSessions}
            prefix={<PlayCircleOutlined className="text-blue-500" />}
            valueStyle={{ color: '#1890ff' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card className="shadow-sm">
          <Statistic
            title="已完成会话"
            value={completedSessions}
            prefix={<CheckCircleOutlined className="text-green-500" />}
            valueStyle={{ color: '#52c41a' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card className="shadow-sm">
          <Statistic
            title="失败会话"
            value={failedSessions}
            prefix={<CloseCircleOutlined className="text-red-500" />}
            valueStyle={{ color: '#ff4d4f' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card className="shadow-sm">
          <Statistic
            title="异常事件"
            value={totalAnomalies}
            suffix={<span className="text-sm text-gray-500">/ {criticalAnomalies} 严重</span>}
            prefix={<WarningOutlined className="text-orange-500" />}
            valueStyle={{ color: '#fa8c16' }}
          />
        </Card>
      </Col>

      {/* AI指标 */}
      <Col xs={24} sm={12} lg={12}>
        <Card className="shadow-sm">
          <Statistic
            title="平均情绪得分"
            value={avgEmotionScore || 0}
            suffix="/ 100"
            prefix={<SmileOutlined className="text-purple-500" />}
            valueStyle={{ color: avgEmotionScore > 60 ? '#52c41a' : '#fa8c16' }}
            precision={0}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={12}>
        <Card className="shadow-sm">
          <Statistic
            title="平均注意力得分"
            value={avgAttentionScore || 0}
            suffix="/ 100"
            prefix={<EyeOutlined className="text-cyan-500" />}
            valueStyle={{
              color: avgAttentionScore > 70 ? '#52c41a' : '#fa8c16',
            }}
            precision={0}
          />
        </Card>
      </Col>
    </Row>
  );
}
