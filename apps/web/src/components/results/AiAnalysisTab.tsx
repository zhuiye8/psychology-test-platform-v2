'use client';

/**
 * AI分析Tab组件
 *
 * 展示考试结果的AI分析数据，包括情绪、注意力、生理指标和异常事件
 */

import { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Statistic,
  Tag,
  Divider,
  Typography,
  Progress,
  Timeline,
  Empty,
  Spin,
  Space,
  App,
} from 'antd';
import {
  HeartOutlined,
  SmileOutlined,
  EyeOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import aiApi, { type AiAggregate, type AiAnomaly } from '../../services/ai';

const { Text, Title } = Typography;

// ============================================================================
// 类型定义
// ============================================================================

export interface AiAnalysisTabProps {
  resultId: string;
}

// ============================================================================
// 主组件
// ============================================================================

export function AiAnalysisTab({ resultId }: AiAnalysisTabProps) {
  const { message } = App.useApp();

  // --------------------------------------------------------------------------
  // State 状态管理
  // --------------------------------------------------------------------------

  const [loading, setLoading] = useState(true);
  const [aiData, setAiData] = useState<AiAggregate | null>(null);
  const [anomalies, setAnomalies] = useState<AiAnomaly[]>([]);
  const [hasAiData, setHasAiData] = useState(false);

  // --------------------------------------------------------------------------
  // 数据加载
  // --------------------------------------------------------------------------

  useEffect(() => {
    loadAiAnalysisData();
  }, [resultId]);

  const loadAiAnalysisData = async () => {
    try {
      setLoading(true);

      // ✅ 修复：先检查是否有AI会话（即是否启用了AI监控）
      const checkResult = await aiApi.checkAiAnalysis(resultId);
      setHasAiData(checkResult.hasAiAnalysis);

      if (!checkResult.hasAiAnalysis) {
        // 真正未启用AI监控
        setLoading(false);
        return;
      }

      // ✅ 修复：尝试获取AI聚合数据（可能还未生成）
      try {
        const aggregate = await aiApi.getAggregateByResultId(resultId);
        setAiData(aggregate);
      } catch (error) {
        // Aggregate数据还未生成（考试刚结束，AI服务正在处理）
        console.warn('AI聚合数据还未生成:', error);
        setAiData(null);
        // 继续执行，不中断流程
      }

      // 获取异常事件
      try {
        const session = await aiApi.getSessionByResultId(resultId);
        const anomaliesList = await aiApi.getAnomaliesBySessionId(session.id);
        setAnomalies(anomaliesList);
      } catch (error) {
        console.error('加载异常事件失败:', error);
        // 异常事件加载失败不影响主数据展示
      }
    } catch (error) {
      message.error('加载AI分析数据失败');
      console.error('AI数据加载错误:', error);
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------------------------------
  // 辅助函数
  // --------------------------------------------------------------------------

  /** 获取异常类型显示文本 */
  const getAnomalyTypeText = (type: string): string => {
    const typeMap: Record<string, string> = {
      MULTIPLE_FACES: '检测到多人',
      NO_FACE_DETECTED: '未检测到人脸',
      UNUSUAL_MOVEMENT: '异常移动',
      ATTENTION_DROP: '注意力下降',
      EMOTIONAL_SPIKE: '情绪波动',
      TECHNICAL_ISSUE: '技术问题',
    };
    return typeMap[type] || type;
  };

  /** 获取异常类型颜色 */
  const getAnomalyTypeColor = (type: string): string => {
    const colorMap: Record<string, string> = {
      MULTIPLE_FACES: 'red',
      NO_FACE_DETECTED: 'orange',
      UNUSUAL_MOVEMENT: 'gold',
      ATTENTION_DROP: 'blue',
      EMOTIONAL_SPIKE: 'purple',
      TECHNICAL_ISSUE: 'default',
    };
    return colorMap[type] || 'default';
  };

  /** 获取严重程度颜色 */
  const getSeverityColor = (severity: string): string => {
    const colorMap: Record<string, string> = {
      CRITICAL: 'red',
      HIGH: 'orange',
      MEDIUM: 'gold',
      LOW: 'blue',
    };
    return colorMap[severity] || 'default';
  };

  /** 获取严重程度Timeline颜色 */
  const getSeverityTimelineColor = (severity: string): string => {
    const colorMap: Record<string, string> = {
      CRITICAL: 'red',
      HIGH: 'orange',
      MEDIUM: 'yellow',
      LOW: 'blue',
    };
    return colorMap[severity] || 'gray';
  };

  // --------------------------------------------------------------------------
  // 渲染 JSX
  // --------------------------------------------------------------------------

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spin size="large" tip="加载AI分析数据...">
          <div />
        </Spin>
      </div>
    );
  }

  // ✅ 修复：区分"未启用AI"和"数据处理中"两种情况

  // 真正未启用AI监控
  if (!hasAiData) {
    return (
      <Card>
        <Empty
          description={
            <div>
              <div className="text-base mb-2">该考试未启用AI监控</div>
              <Text type="secondary">
                需要在考试设置中启用摄像头和AI分析功能
              </Text>
            </div>
          }
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </Card>
    );
  }

  // 启用了AI监控但聚合数据还在处理中
  if (!aiData) {
    return (
      <Card>
        <Empty
          description={
            <div>
              <div className="text-base mb-2">AI分析数据处理中</div>
              <Text type="secondary">
                考试刚结束，分析结果将在1-2分钟内生成，请刷新页面查看
              </Text>
            </div>
          }
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* 整体评估卡片 */}
      <Card title={<span><SmileOutlined className="mr-2" />综合评估</span>}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Statistic
              title="参与度分数"
              value={
                aiData.engagementScore !== undefined && aiData.engagementScore !== null
                  ? Math.round(aiData.engagementScore * 100)
                  : 0
              }
              suffix="%"
              valueStyle={{
                color:
                  (aiData.engagementScore || 0) > 0.7
                    ? '#52c41a'
                    : (aiData.engagementScore || 0) > 0.4
                    ? '#faad14'
                    : '#f5222d',
              }}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Statistic
              title="行为一致性"
              value={
                aiData.consistencyScore !== undefined && aiData.consistencyScore !== null
                  ? Math.round(aiData.consistencyScore * 100)
                  : 0
              }
              suffix="%"
              valueStyle={{
                color:
                  (aiData.consistencyScore || 0) > 0.7
                    ? '#52c41a'
                    : (aiData.consistencyScore || 0) > 0.4
                    ? '#faad14'
                    : '#f5222d',
              }}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Statistic
              title="数据质量"
              value={Math.round(aiData.dataQuality * 100)}
              suffix="%"
              valueStyle={{
                color:
                  aiData.dataQuality > 0.7
                    ? '#52c41a'
                    : aiData.dataQuality > 0.4
                    ? '#faad14'
                    : '#f5222d',
              }}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Statistic
              title="分析置信度"
              value={Math.round(aiData.analysisConfidence * 100)}
              suffix="%"
              valueStyle={{
                color:
                  aiData.analysisConfidence > 0.7
                    ? '#52c41a'
                    : aiData.analysisConfidence > 0.4
                    ? '#faad14'
                    : '#f5222d',
              }}
            />
          </Col>
        </Row>
      </Card>

      {/* 情绪分析卡片 */}
      <Card title={<span><SmileOutlined className="mr-2" />情绪分析</span>}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <div className="mb-4">
              <Text strong>平均情绪效价 (Valence)</Text>
              <div className="mt-2">
                <Statistic
                  value={
                    aiData.avgValence !== undefined && aiData.avgValence !== null
                      ? aiData.avgValence.toFixed(2)
                      : 'N/A'
                  }
                  valueStyle={{ fontSize: '24px' }}
                />
                <Text type="secondary" className="block mt-1">
                  范围：-1（消极）~ +1（积极）
                </Text>
                {aiData.avgValence !== undefined && aiData.avgValence !== null && (
                  <Progress
                    percent={Math.round(((aiData.avgValence + 1) / 2) * 100)}
                    strokeColor={
                      aiData.avgValence > 0
                        ? '#52c41a'
                        : aiData.avgValence > -0.3
                        ? '#faad14'
                        : '#f5222d'
                    }
                    className="mt-2"
                  />
                )}
              </div>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="mb-4">
              <Text strong>平均唤醒度 (Arousal)</Text>
              <div className="mt-2">
                <Statistic
                  value={
                    aiData.avgArousal !== undefined && aiData.avgArousal !== null
                      ? aiData.avgArousal.toFixed(2)
                      : 'N/A'
                  }
                  valueStyle={{ fontSize: '24px' }}
                />
                <Text type="secondary" className="block mt-1">
                  范围：0（平静）~ 1（兴奋）
                </Text>
                {aiData.avgArousal !== undefined && aiData.avgArousal !== null && (
                  <Progress
                    percent={Math.round(aiData.avgArousal * 100)}
                    strokeColor="#1890ff"
                    className="mt-2"
                  />
                )}
              </div>
            </div>
          </Col>
        </Row>

        <Divider />

        <div>
          <Text strong>主导情绪：</Text>
          <Tag color="blue" className="ml-2 text-lg">
            {aiData.dominantEmotion || '未检测'}
          </Tag>
        </div>

        {aiData.emotionDistribution && (
          <div className="mt-4">
            <Text strong>情绪分布：</Text>
            <div className="mt-2">
              <Text type="secondary">
                {JSON.stringify(aiData.emotionDistribution, null, 2)}
              </Text>
            </div>
          </div>
        )}
      </Card>

      {/* 注意力分析卡片 */}
      <Card title={<span><EyeOutlined className="mr-2" />注意力分析</span>}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Statistic
              title="平均注意力水平"
              value={
                aiData.avgAttention !== undefined && aiData.avgAttention !== null
                  ? Math.round(aiData.avgAttention * 100)
                  : 0
              }
              suffix="%"
              valueStyle={{
                color:
                  (aiData.avgAttention || 0) > 0.7
                    ? '#52c41a'
                    : (aiData.avgAttention || 0) > 0.4
                    ? '#faad14'
                    : '#f5222d',
              }}
            />
            {aiData.avgAttention !== undefined && aiData.avgAttention !== null && (
              <Progress
                percent={Math.round(aiData.avgAttention * 100)}
                strokeColor={
                  aiData.avgAttention > 0.7
                    ? '#52c41a'
                    : aiData.avgAttention > 0.4
                    ? '#faad14'
                    : '#f5222d'
                }
                className="mt-2"
              />
            )}
          </Col>
          <Col xs={24} sm={12}>
            <Statistic
              title="分心事件次数"
              value={aiData.distractionEvents || 0}
              suffix="次"
              valueStyle={{
                color:
                  (aiData.distractionEvents || 0) === 0
                    ? '#52c41a'
                    : aiData.distractionEvents! < 5
                    ? '#faad14'
                    : '#f5222d',
              }}
            />
          </Col>
        </Row>

        <Divider />

        <div>
          <Text type="secondary">
            注意力变化性：
            {aiData.attentionVariability !== undefined &&
            aiData.attentionVariability !== null
              ? aiData.attentionVariability.toFixed(3)
              : 'N/A'}
          </Text>
        </div>
      </Card>

      {/* 生理指标卡片 */}
      <Card title={<span><HeartOutlined className="mr-2" />生理指标</span>}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Statistic
              title="平均心率"
              value={
                aiData.avgHeartRate !== undefined && aiData.avgHeartRate !== null
                  ? Math.round(aiData.avgHeartRate)
                  : 'N/A'
              }
              suffix="BPM"
              prefix={<HeartOutlined />}
              valueStyle={{
                color:
                  aiData.avgHeartRate && aiData.avgHeartRate > 60 && aiData.avgHeartRate < 100
                    ? '#52c41a'
                    : '#faad14',
              }}
            />
          </Col>
          <Col xs={24} sm={12}>
            <Statistic
              title="心率变异性 (HRV)"
              value={
                aiData.heartRateVariability !== undefined &&
                aiData.heartRateVariability !== null
                  ? aiData.heartRateVariability.toFixed(1)
                  : 'N/A'
              }
            />
          </Col>
        </Row>

        {aiData.stressIndicators && (
          <div className="mt-4">
            <Text strong>压力指标：</Text>
            <div className="mt-2">
              <Text type="secondary">
                {JSON.stringify(aiData.stressIndicators, null, 2)}
              </Text>
            </div>
          </div>
        )}
      </Card>

      {/* 异常事件记录卡片 */}
      <Card
        title={
          <span>
            <WarningOutlined className="mr-2" />
            异常事件记录
            {anomalies.length > 0 && (
              <Tag color="red" className="ml-2">
                {anomalies.length} 个事件
              </Tag>
            )}
          </span>
        }
      >
        {anomalies.length > 0 ? (
          <Timeline>
            {anomalies.map((anomaly) => (
              <Timeline.Item
                key={anomaly.id}
                color={getSeverityTimelineColor(anomaly.severity)}
              >
                <div>
                  <Space size="small" className="mb-2">
                    <Tag color={getAnomalyTypeColor(anomaly.type)}>
                      {getAnomalyTypeText(anomaly.type)}
                    </Tag>
                    <Tag color={getSeverityColor(anomaly.severity)}>
                      {anomaly.severity}
                    </Tag>
                    <Text type="secondary">
                      {dayjs(anomaly.timestamp).format('YYYY-MM-DD HH:mm:ss')}
                    </Text>
                  </Space>
                  <div className="text-gray-700">{anomaly.description}</div>
                  {anomaly.duration && (
                    <Text type="secondary" className="block mt-1">
                      持续时长：{anomaly.duration} 秒
                    </Text>
                  )}
                  {anomaly.confidence && (
                    <Text type="secondary" className="block">
                      置信度：{Math.round(anomaly.confidence * 100)}%
                    </Text>
                  )}
                </div>
              </Timeline.Item>
            ))}
          </Timeline>
        ) : (
          <Empty
            description="未检测到异常事件"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
      </Card>
    </div>
  );
}
