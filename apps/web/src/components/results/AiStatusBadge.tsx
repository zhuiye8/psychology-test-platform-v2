/**
 * AI状态徽章组件
 *
 * 功能：
 * - 显示AI分析状态（无数据、处理中、已完成、失败）
 * - 支持Tooltip显示详细信息
 */

import { Tag, Tooltip } from 'antd';
import {
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';

// ============================================================================
// 类型定义
// ============================================================================

export type AiStatus = 'none' | 'processing' | 'completed' | 'failed';

export interface AiStatusBadgeProps {
  status: AiStatus;
  /** 异常数量（可选） */
  anomalyCount?: number;
  /** 详细信息（可选） */
  tooltip?: string;
}

// ============================================================================
// 主组件
// ============================================================================

export function AiStatusBadge({
  status,
  anomalyCount,
  tooltip,
}: AiStatusBadgeProps) {
  // 根据状态返回配置
  const getConfig = () => {
    switch (status) {
      case 'completed':
        return {
          color: 'success',
          icon: <CheckCircleOutlined />,
          text: anomalyCount !== undefined ? `已完成 (${anomalyCount}个异常)` : '已完成',
          defaultTooltip: 'AI分析已完成',
        };
      case 'processing':
        return {
          color: 'processing',
          icon: <SyncOutlined spin />,
          text: '分析中',
          defaultTooltip: 'AI正在分析中...',
        };
      case 'failed':
        return {
          color: 'error',
          icon: <CloseCircleOutlined />,
          text: '失败',
          defaultTooltip: 'AI分析失败',
        };
      case 'none':
      default:
        return {
          color: 'default',
          icon: <MinusCircleOutlined />,
          text: '无数据',
          defaultTooltip: '未开启AI监控或无AI数据',
        };
    }
  };

  const config = getConfig();

  return (
    <Tooltip title={tooltip || config.defaultTooltip}>
      <Tag color={config.color} icon={config.icon}>
        {config.text}
      </Tag>
    </Tooltip>
  );
}
