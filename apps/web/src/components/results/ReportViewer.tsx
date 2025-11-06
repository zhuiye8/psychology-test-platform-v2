'use client';

/**
 * AI报告查看器组件
 *
 * 展示LLM生成的心理分析报告，包括执行摘要、题目级分析、异常洞察和综合评估
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  Descriptions,
  Tag,
  Typography,
  Divider,
  Space,
  Statistic,
  Row,
  Col,
  Alert,
  Spin,
  Empty,
  Button,
  App,
} from 'antd';
import {
  ReloadOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  InfoCircleOutlined,
  ClockCircleOutlined,
  FullscreenOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { aiReportsApi, type GeneratedReport } from '../../services/aiReports';
import { GenerateReportButton } from './GenerateReportButton';

const { Title, Paragraph, Text } = Typography;

// ============================================================================
// 类型定义
// ============================================================================

export interface ReportViewerProps {
  examResultId: string;
  /** 是否自动加载报告（默认true） */
  autoLoad?: boolean;
  /** 报告加载成功回调 */
  onReportLoad?: (report: GeneratedReport) => void;
}

// ============================================================================
// 主组件
// ============================================================================

export function ReportViewer({
  examResultId,
  autoLoad = true,
  onReportLoad,
}: ReportViewerProps) {
  const { message } = App.useApp();
  const router = useRouter();

  // --------------------------------------------------------------------------
  // State 状态管理
  // --------------------------------------------------------------------------

  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<GeneratedReport | null>(null);
  const [hasReport, setHasReport] = useState(false);
  const [checkingReport, setCheckingReport] = useState(true);

  // --------------------------------------------------------------------------
  // 数据加载
  // --------------------------------------------------------------------------

  useEffect(() => {
    if (autoLoad) {
      checkReportExists();
    }
  }, [examResultId, autoLoad]);

  /** 检查报告是否存在 */
  const checkReportExists = async () => {
    try {
      setCheckingReport(true);
      // TODO: 后端需要提供检查报告是否存在的API
      // 暂时通过尝试加载报告来判断
      await loadReport();
    } catch (error: any) {
      if (error.response?.status === 404) {
        setHasReport(false);
      } else {
        console.error('检查报告失败:', error);
      }
    } finally {
      setCheckingReport(false);
    }
  };

  /** 加载报告 */
  const loadReport = async () => {
    try {
      setLoading(true);
      // TODO: 后端需要提供获取已生成报告的API
      // 暂时使用getReportProgress来获取报告状态
      const progress = await aiReportsApi.getReportProgress(examResultId);

      if (progress.status === 'completed' && progress.result) {
        setReport(progress.result);
        setHasReport(true);
        onReportLoad?.(progress.result);
      } else {
        setHasReport(false);
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        setHasReport(false);
      } else {
        console.error('加载报告失败:', error);
        message.error('加载报告失败');
      }
    } finally {
      setLoading(false);
    }
  };

  /** 刷新报告 */
  const handleRefresh = () => {
    loadReport();
  };

  /** 报告生成成功回调 */
  const handleReportGenerated = () => {
    loadReport();
  };

  /** 全屏查看报告 */
  const handleFullscreen = () => {
    router.push(`/dashboard/results/${examResultId}/report`);
  };

  // --------------------------------------------------------------------------
  // 渲染辅助函数
  // --------------------------------------------------------------------------

  /** 渲染情绪状态标签 */
  const renderEmotionTag = (emotion: string) => {
    const emotionColors: Record<string, string> = {
      happy: 'green',
      sad: 'blue',
      angry: 'red',
      surprised: 'orange',
      neutral: 'default',
      anxious: 'purple',
      stressed: 'volcano',
    };
    return <Tag color={emotionColors[emotion] || 'default'}>{emotion}</Tag>;
  };

  /** 渲染风险等级标签 */
  const renderRiskTag = (risk: string) => {
    const riskConfig: Record<string, { color: string; icon: React.ReactNode }> = {
      low: { color: 'success', icon: <CheckCircleOutlined /> },
      medium: { color: 'warning', icon: <InfoCircleOutlined /> },
      high: { color: 'error', icon: <WarningOutlined /> },
    };
    const config = riskConfig[risk] || riskConfig.medium;
    return (
      <Tag color={config.color} icon={config.icon}>
        {risk.toUpperCase()}
      </Tag>
    );
  };

  // --------------------------------------------------------------------------
  // 渲染 JSX
  // --------------------------------------------------------------------------

  if (checkingReport) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spin size="large" tip="检查报告状态...">
          <div />
        </Spin>
      </div>
    );
  }

  // 无报告时显示生成按钮
  if (!hasReport && !loading) {
    return (
      <Card>
        <Empty
          description={
            <div>
              <div className="text-base mb-4">尚未生成AI分析报告</div>
              <Text type="secondary" className="block mb-4">
                点击下方按钮生成基于LLM的心理分析报告
              </Text>
              <GenerateReportButton
                examResultId={examResultId}
                buttonText="立即生成报告"
                buttonType="primary"
                buttonSize="large"
                onSuccess={handleReportGenerated}
              />
            </div>
          }
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </Card>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spin size="large" tip="加载报告中...">
          <div />
        </Spin>
      </div>
    );
  }

  if (!report) {
    return (
      <Card>
        <Empty description="报告数据不可用" />
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* 报告头部 */}
      <Card>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Space direction="vertical" size="small" className="w-full">
              <Title level={3} className="mb-0">
                AI心理分析报告
              </Title>
              <Space>
                <Tag color="blue">{report.reportType === 'comprehensive' ? '完整报告' : report.reportType === 'anomaly-focused' ? '异常聚焦' : '摘要报告'}</Tag>
                <Text type="secondary">
                  <ClockCircleOutlined className="mr-1" />
                  生成时间：{dayjs(report.generatedAt).format('YYYY-MM-DD HH:mm:ss')}
                </Text>
              </Space>
            </Space>
          </div>
          <Space>
            <Button icon={<FullscreenOutlined />} onClick={handleFullscreen}>
              全屏查看
            </Button>
            <Button icon={<ReloadOutlined />} onClick={handleRefresh}>
              刷新
            </Button>
          </Space>
        </div>

        <Divider />

        {/* 报告元数据 */}
        <Descriptions column={2} size="small">
          <Descriptions.Item label="LLM模型">
            {report.metadata.model}
          </Descriptions.Item>
          <Descriptions.Item label="Token消耗">
            {report.metadata.tokensUsed.toLocaleString()} tokens
          </Descriptions.Item>
          <Descriptions.Item label="处理时间">
            {report.metadata.processingTimeMs.toLocaleString()} ms
          </Descriptions.Item>
          <Descriptions.Item label="报告版本">
            v{report.metadata.reportVersion}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* 执行摘要 */}
      <Card title={<Title level={4}>执行摘要</Title>}>
        <Paragraph className="whitespace-pre-wrap text-base">
          {report.executiveSummary}
        </Paragraph>
      </Card>

      {/* 综合评估 */}
      <Card title={<Title level={4}>综合评估</Title>}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Statistic
              title="总体风险等级"
              value={report.overallAssessment.overallRisk}
              valueRender={(value) => renderRiskTag(value as string)}
            />
          </Col>
          <Col xs={24} sm={8}>
            <Statistic
              title="主导情绪"
              value={report.overallAssessment.dominantEmotion}
              valueRender={(value) => renderEmotionTag(value as string)}
            />
          </Col>
          <Col xs={24} sm={8}>
            <Statistic
              title="注意力水平"
              value={Math.round(report.overallAssessment.attentionLevel * 100)}
              suffix="%"
              valueStyle={{
                color:
                  report.overallAssessment.attentionLevel > 0.7
                    ? '#52c41a'
                    : report.overallAssessment.attentionLevel > 0.4
                    ? '#faad14'
                    : '#f5222d',
              }}
            />
          </Col>
        </Row>

        <Divider />

        <div className="space-y-4">
          <div>
            <Text strong className="block mb-2">关键发现：</Text>
            <ul className="list-disc list-inside space-y-1">
              {report.overallAssessment.keyFindings.map((finding, index) => (
                <li key={index} className="text-base">
                  {finding}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Text strong className="block mb-2">建议：</Text>
            <ul className="list-disc list-inside space-y-1">
              {report.overallAssessment.recommendations.map((rec, index) => (
                <li key={index} className="text-base">
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      {/* 题目级分析（仅comprehensive类型） */}
      {report.reportType === 'comprehensive' && report.questionAnalyses && report.questionAnalyses.length > 0 && (
        <Card title={<Title level={4}>题目级分析</Title>}>
          <div className="space-y-4">
            {report.questionAnalyses.map((qa, index) => (
              <Card
                key={qa.questionId}
                size="small"
                title={
                  <Space>
                    <Tag color="blue">Q{qa.questionNumber}</Tag>
                    <Text>{qa.questionTitle}</Text>
                  </Space>
                }
              >
                <div className="space-y-3">
                  <div>
                    <Text strong>情绪状态：</Text>
                    <div className="mt-1">
                      {qa.emotionDuringQuestion.map((emotion, i) => (
                        <Tag key={i} className="mb-1">
                          {emotion}
                        </Tag>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Text strong>注意力水平：</Text>
                    <Text className="ml-2">{Math.round(qa.attentionLevel * 100)}%</Text>
                  </div>

                  <div>
                    <Text strong>答题时间：</Text>
                    <Text className="ml-2">{qa.timeSpent}秒</Text>
                    {qa.isUnusualTiming && (
                      <Tag color="orange" className="ml-2">
                        时间异常
                      </Tag>
                    )}
                  </div>

                  <div>
                    <Text strong>心理解读：</Text>
                    <Paragraph className="mt-1 mb-0 whitespace-pre-wrap">
                      {qa.psychologicalInterpretation}
                    </Paragraph>
                  </div>

                  {qa.potentialConcerns && qa.potentialConcerns.length > 0 && (
                    <Alert
                      message="潜在关注点"
                      description={
                        <ul className="list-disc list-inside mb-0">
                          {qa.potentialConcerns.map((concern, i) => (
                            <li key={i}>{concern}</li>
                          ))}
                        </ul>
                      }
                      type="warning"
                      showIcon
                    />
                  )}
                </div>
              </Card>
            ))}
          </div>
        </Card>
      )}

      {/* 异常洞察（仅anomaly-focused类型） */}
      {report.reportType === 'anomaly-focused' && report.anomalyInsights && (
        <Card title={<Title level={4}>异常洞察</Title>}>
          <Alert
            message="异常行为分析"
            description={
              <Paragraph className="mb-0 whitespace-pre-wrap">
                {report.anomalyInsights}
              </Paragraph>
            }
            type="warning"
            showIcon
            icon={<WarningOutlined />}
          />
        </Card>
      )}
    </div>
  );
}
