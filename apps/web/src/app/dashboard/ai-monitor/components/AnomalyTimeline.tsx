import { Card, Timeline, Tag, Typography, Space, Empty } from 'antd';
import {
  WarningOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import type { AiAnomaly } from '../../../../services/ai';

const { Text } = Typography;

// ============================================================================
// 类型定义
// ============================================================================

interface AnomalyWithParticipant extends AiAnomaly {
  participantName?: string;
}

interface AnomalyTimelineProps {
  anomalies: AnomalyWithParticipant[];
}

// ============================================================================
// 组件
// ============================================================================

export function AnomalyTimeline({ anomalies }: AnomalyTimelineProps) {
  if (anomalies.length === 0) {
    return (
      <Card title="异常事件时间线" className="shadow-sm">
        <Empty description="暂无异常事件" />
      </Card>
    );
  }

  // 按时间倒序排序
  const sortedAnomalies = [...anomalies].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return 'red';
      case 'HIGH':
        return 'orange';
      case 'MEDIUM':
        return 'gold';
      case 'LOW':
        return 'blue';
      default:
        return 'default';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
      case 'HIGH':
        return <WarningOutlined />;
      case 'MEDIUM':
        return <ExclamationCircleOutlined />;
      case 'LOW':
        return <InfoCircleOutlined />;
      default:
        return <InfoCircleOutlined />;
    }
  };

  const getTypeText = (type: string) => {
    const typeMap: Record<string, string> = {
      MULTIPLE_FACES: '多人入镜',
      NO_FACE_DETECTED: '无人脸检测',
      UNUSUAL_MOVEMENT: '异常移动',
      ATTENTION_DROP: '注意力下降',
      EMOTIONAL_SPIKE: '情绪异常',
      TECHNICAL_ISSUE: '技术问题',
    };
    return typeMap[type] || type;
  };

  const timelineItems = sortedAnomalies.slice(0, 20).map((anomaly) => ({
    dot: getSeverityIcon(anomaly.severity),
    color: getSeverityColor(anomaly.severity),
    children: (
      <div className="pb-4">
        <Space direction="vertical" size="small" className="w-full">
          <Space>
            <Tag color={getSeverityColor(anomaly.severity)}>
              {anomaly.severity}
            </Tag>
            <Tag>{getTypeText(anomaly.type)}</Tag>
            {anomaly.participantName && (
              <Text type="secondary">{anomaly.participantName}</Text>
            )}
          </Space>
          <Text>{anomaly.description}</Text>
          <Text type="secondary" className="text-xs">
            {dayjs(anomaly.timestamp).format('YYYY-MM-DD HH:mm:ss')} •{' '}
            {anomaly.duration ? `持续 ${anomaly.duration}秒` : '瞬时事件'} •{' '}
            置信度 {Math.round(anomaly.confidence * 100)}%
          </Text>
        </Space>
      </div>
    ),
  }));

  return (
    <Card
      title={`异常事件时间线 (最近 ${Math.min(20, anomalies.length)} 条)`}
      className="shadow-sm"
    >
      <Timeline items={timelineItems} />
      {anomalies.length > 20 && (
        <Text type="secondary" className="text-center block mt-4">
          还有 {anomalies.length - 20} 条异常事件未显示
        </Text>
      )}
    </Card>
  );
}
