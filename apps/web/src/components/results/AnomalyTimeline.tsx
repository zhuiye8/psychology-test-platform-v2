/**
 * 异常事件时间轴组件
 *
 * 功能：
 * - 展示检测到的异常事件
 * - 时间线可视化
 * - 显示异常类型、严重程度、描述
 */

'use client';

import { Timeline, Tag, Card, Empty } from 'antd';
import {
  ClockCircleOutlined,
  WarningOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import type { AnomalyAnalysis } from '../../services/aiReports';

// ============================================================================
// 类型定义
// ============================================================================

export interface AnomalyTimelineProps {
  anomalies: AnomalyAnalysis[];
  /** 是否显示心理解读（可选） */
  showInterpretation?: boolean;
}

// ============================================================================
// 主组件
// ============================================================================

export function AnomalyTimeline({
  anomalies,
  showInterpretation = false,
}: AnomalyTimelineProps) {
  // 无数据
  if (!anomalies || anomalies.length === 0) {
    return (
      <Empty
        description="未检测到异常事件"
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    );
  }

  // 根据严重程度返回颜色和图标
  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'critical':
        return { color: 'red', icon: <ExclamationCircleOutlined />, text: '严重' };
      case 'high':
        return { color: 'orange', icon: <WarningOutlined />, text: '高' };
      case 'medium':
        return { color: 'gold', icon: <InfoCircleOutlined />, text: '中' };
      case 'low':
      default:
        return { color: 'blue', icon: <InfoCircleOutlined />, text: '低' };
    }
  };

  // 格式化时间
  const formatTime = (timestamp: Date) => {
    return dayjs(timestamp).format('HH:mm:ss');
  };

  return (
    <div className="space-y-4">
      <Timeline>
        {anomalies.map((analysis, index) => {
          const severityConfig = getSeverityConfig(analysis.anomaly.severity);

          return (
            <Timeline.Item
              key={analysis.anomaly.id}
              dot={<ClockCircleOutlined />}
              color={severityConfig.color}
            >
              <Card size="small" className="mb-2">
                {/* 时间和严重程度 */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">
                    {formatTime(analysis.anomaly.timestamp)}
                  </span>
                  <Tag color={severityConfig.color} icon={severityConfig.icon}>
                    {severityConfig.text}
                  </Tag>
                </div>

                {/* 异常类型和描述 */}
                <div className="mb-2">
                  <Tag color="blue">{analysis.anomaly.type}</Tag>
                  <span className="text-sm">{analysis.anomaly.description}</span>
                </div>

                {/* 相关题目 */}
                {analysis.relatedQuestion && (
                  <div className="text-sm text-gray-600 mb-2">
                    相关题目：{analysis.relatedQuestion.questionTitle}
                  </div>
                )}

                {/* 心理解读（可选） */}
                {showInterpretation && analysis.psychologicalInterpretation && (
                  <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                    <div className="font-medium mb-1">心理解读：</div>
                    <div className="text-gray-700">
                      {analysis.psychologicalInterpretation}
                    </div>
                  </div>
                )}

                {/* 建议 */}
                {analysis.recommendations && analysis.recommendations.length > 0 && (
                  <div className="mt-2">
                    <div className="text-sm font-medium mb-1">建议：</div>
                    <ul className="text-sm text-gray-700 list-disc list-inside">
                      {analysis.recommendations.map((rec, idx) => (
                        <li key={idx}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card>
            </Timeline.Item>
          );
        })}
      </Timeline>
    </div>
  );
}
