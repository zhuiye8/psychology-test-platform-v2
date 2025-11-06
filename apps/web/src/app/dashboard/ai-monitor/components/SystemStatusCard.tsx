import { Card, Row, Col, Badge, Typography, Space, Spin } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Text } = Typography;

// ============================================================================
// 类型定义
// ============================================================================

interface SystemStatusCardProps {
  aiServiceStatus: 'online' | 'offline' | 'error' | 'checking';
  mediaMtxStatus: 'online' | 'offline' | 'error' | 'checking';
  lastUpdateTime: string;
}

// ============================================================================
// 组件
// ============================================================================

export function SystemStatusCard({
  aiServiceStatus,
  mediaMtxStatus,
  lastUpdateTime,
}: SystemStatusCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online':
        return <Badge status="success" text="在线" />;
      case 'offline':
        return <Badge status="default" text="离线" />;
      case 'error':
        return <Badge status="error" text="错误" />;
      case 'checking':
        return <Badge status="processing" text="检查中..." />;
      default:
        return <Badge status="processing" text="未知" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircleOutlined className="text-green-500 text-2xl" />;
      case 'offline':
        return <CloseCircleOutlined className="text-gray-400 text-2xl" />;
      case 'error':
        return <CloseCircleOutlined className="text-red-500 text-2xl" />;
      case 'checking':
        return <LoadingOutlined className="text-blue-500 text-2xl" />;
      default:
        return <ClockCircleOutlined className="text-yellow-500 text-2xl" />;
    }
  };

  return (
    <Card title="系统状态" className="shadow-sm">
      <Row gutter={[24, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <Space size="middle">
            {getStatusIcon(aiServiceStatus)}
            <div>
              <div className="font-medium">AI分析服务</div>
              <div>{getStatusBadge(aiServiceStatus)}</div>
            </div>
          </Space>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Space size="middle">
            {getStatusIcon(mediaMtxStatus)}
            <div>
              <div className="font-medium">MediaMTX服务</div>
              <div>{getStatusBadge(mediaMtxStatus)}</div>
            </div>
          </Space>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Space size="middle">
            <ClockCircleOutlined className="text-blue-500 text-2xl" />
            <div>
              <div className="font-medium">最后更新</div>
              <Text type="secondary" className="text-sm">
                {dayjs(lastUpdateTime).format('HH:mm:ss')}
              </Text>
            </div>
          </Space>
        </Col>
      </Row>
    </Card>
  );
}
