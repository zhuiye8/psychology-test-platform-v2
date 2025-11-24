'use client';

/**
 * AI报告页面（2.0版本）
 *
 * 功能：
 * - 生成AI分析报告（调用LLM）
 * - 展示维度得分雷达图
 * - 展示AI情绪/心率分析
 * - 支持打印和PDF导出
 */

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Button,
  Space,
  Card,
  Spin,
  Typography,
  Divider,
  App,
  Alert,
  Progress,
} from 'antd';
import {
  ArrowLeftOutlined,
  PrinterOutlined,
  DownloadOutlined,
  ReloadOutlined,
  FileTextOutlined,
  RocketOutlined,
} from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import dayjs from 'dayjs';
import { reportsApi, type Report } from '@/services/reports';
import {
  DimensionRadarChart,
  EmotionPieChart,
  HeartRateBarChart,
} from '@/components/reports/charts';

const { Title, Text } = Typography;

// ============================================================================
// 主组件
// ============================================================================

export default function ReportPage() {
  const { message } = App.useApp();
  const params = useParams();
  const router = useRouter();
  const resultId = params.resultId as string;

  // State
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [report, setReport] = useState<Report | null>(null);
  const [printing, setPrinting] = useState(false);

  // 页面加载时尝试获取已生成的报告
  useEffect(() => {
    loadExistingReport();
  }, [resultId]);

  // 加载已存在的报告
  const loadExistingReport = async () => {
    try {
      setLoading(true);
      const data = await reportsApi.getReport(resultId);
      setReport(data);
    } catch (error: any) {
      // 404说明报告未生成，正常情况
      if (error.response?.status !== 404) {
        console.error('加载报告错误:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  // 生成新报告
  const handleGenerate = async () => {
    try {
      setGenerating(true);
      message.info('正在调用LLM生成报告，请稍候...');

      const data = await reportsApi.generateReport(resultId);
      setReport(data);
      message.success('报告生成成功！');
    } catch (error: any) {
      message.error(error.response?.data?.message || '报告生成失败');
      console.error('生成报告错误:', error);
    } finally {
      setGenerating(false);
    }
  };

  // 打印报告
  const handlePrint = () => {
    setPrinting(true);
    setTimeout(() => {
      window.print();
      setPrinting(false);
    }, 100);
  };

  // 导出PDF
  const handleExportPDF = () => {
    message.info('请在打印对话框中选择"保存为PDF"');
    handlePrint();
  };

  // 返回详情页
  const handleBack = () => {
    router.push(`/dashboard/results/${resultId}`);
  };

  // 加载中状态
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" tip="加载报告中...">
          <div />
        </Spin>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 工具栏（打印时隐藏） */}
      <div className="print:hidden bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Space>
              <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
                返回
              </Button>
              <Divider type="vertical" />
              <Text strong className="text-lg">
                <FileTextOutlined className="mr-2" />
                AI心理分析报告
              </Text>
            </Space>

            <Space>
              {!report ? (
                <Button
                  type="primary"
                  icon={<RocketOutlined />}
                  onClick={handleGenerate}
                  loading={generating}
                  size="large"
                >
                  生成AI报告
                </Button>
              ) : (
                <>
                  <Button
                    icon={<ReloadOutlined />}
                    onClick={handleGenerate}
                    loading={generating}
                  >
                    重新生成
                  </Button>
                  <Button
                    icon={<PrinterOutlined />}
                    onClick={handlePrint}
                    loading={printing}
                  >
                    打印
                  </Button>
                  <Button
                    type="primary"
                    icon={<DownloadOutlined />}
                    onClick={handleExportPDF}
                  >
                    导出PDF
                  </Button>
                </>
              )}
            </Space>
          </div>
        </div>
      </div>

      {/* 报告内容 */}
      <div className="max-w-7xl mx-auto px-4 py-6 print:px-0 print:py-0">
        {/* 未生成报告 */}
        {!report && !generating && (
          <Card>
            <div className="text-center py-12">
              <FileTextOutlined className="text-6xl text-gray-300 mb-4" />
              <Title level={3}>尚未生成AI分析报告</Title>
              <Text type="secondary" className="block mb-6">
                点击"生成AI报告"按钮，系统将调用LLM分析学生的答题数据和AI行为数据
              </Text>
              <Button
                type="primary"
                size="large"
                icon={<RocketOutlined />}
                onClick={handleGenerate}
              >
                生成AI报告
              </Button>
            </div>
          </Card>
        )}

        {/* 生成中 */}
        {generating && (
          <Card>
            <div className="text-center py-12">
              <Spin size="large" />
              <Title level={4} className="mt-4">
                正在生成报告...
              </Title>
              <Text type="secondary" className="block mt-2">
                LLM正在分析数据，请稍候（预计30-60秒）
              </Text>
              <Progress percent={50} status="active" className="mt-4 max-w-md mx-auto" showInfo={false} />
            </div>
          </Card>
        )}

        {/* 已生成报告 */}
        {report && (
          <>
            {/* 打印页眉 */}
            <div className="hidden print:block mb-6">
              <Title level={2} className="text-center mb-2">
                心理测评AI分析报告
              </Title>
              <Text type="secondary" className="block text-center">
                {report.paper_title}
              </Text>
              <Divider />
            </div>

            {/* 基本信息卡片 */}
            <Card className="mb-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Text type="secondary" className="block text-sm">学生姓名</Text>
                  <Text strong className="text-lg">{report.student_name}</Text>
                </div>
                <div>
                  <Text type="secondary" className="block text-sm">学号</Text>
                  <Text strong className="text-lg">{report.student_id}</Text>
                </div>
                <div>
                  <Text type="secondary" className="block text-sm">测试名称</Text>
                  <Text strong className="text-lg">{report.paper_title}</Text>
                </div>
                <div>
                  <Text type="secondary" className="block text-sm">完成时间</Text>
                  <Text strong className="text-lg">
                    {dayjs(report.completed_at).format('YYYY-MM-DD HH:mm')}
                  </Text>
                </div>
              </div>
            </Card>

            {/* 答题表现统计 */}
            <Card title="答题表现统计" className="mb-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {report.answer_performance.total_score}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">总得分</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {(report.answer_performance.percentage * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600 mt-1">得分率</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">
                    {Math.floor(report.answer_performance.time_spent / 60)}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">答题时长（分钟）</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">
                    {(report.answer_performance.correct_rate * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600 mt-1">正确率</div>
                </div>
              </div>
            </Card>

            {/* 维度/题型得分图表 */}
            {report.dimension_scores.length > 0 && (
              <DimensionRadarChart
                dimensionScores={report.dimension_scores}
                title={report.has_dimensions ? '维度得分雷达图' : '题型得分分布'}
              />
            )}

            {/* AI行为分析图表 */}
            {report.ai_analysis.available && (
              <>
                {/* 数据质量提示 */}
                {report.ai_analysis.data_quality !== undefined &&
                  report.ai_analysis.data_quality < 0.5 && (
                    <Alert
                      message="数据质量提示"
                      description={`AI数据质量较低（${(report.ai_analysis.data_quality * 100).toFixed(1)}%），分析结果仅供参考`}
                      type="warning"
                      showIcon
                      className="mb-6"
                    />
                  )}

                {/* 情绪分布饼图 */}
                {report.ai_analysis.emotion_distribution && (
                  <EmotionPieChart
                    emotionDistribution={report.ai_analysis.emotion_distribution}
                  />
                )}

                {/* 心率分析柱状图 */}
                {report.ai_analysis.avg_heart_rate !== undefined &&
                  report.ai_analysis.avg_heart_rate > 0 && (
                    <HeartRateBarChart
                      avgHeartRate={report.ai_analysis.avg_heart_rate}
                      heartRateVariability={
                        report.ai_analysis.heart_rate_variability || 0
                      }
                    />
                  )}
              </>
            )}

            {/* LLM生成的Markdown报告 */}
            <Card title="AI综合分析报告" className="mb-6">
              <div className="markdown-content prose max-w-none">
                <ReactMarkdown>{report.markdown_content}</ReactMarkdown>
              </div>
            </Card>

            {/* 报告元数据（仅屏幕显示） */}
            <Card className="print:hidden">
              <div className="text-center text-gray-500 text-sm">
                <Space split={<Divider type="vertical" />} wrap>
                  <Text type="secondary">
                    报告生成时间：{dayjs(report.generated_at).format('YYYY-MM-DD HH:mm:ss')}
                  </Text>
                  <Text type="secondary">
                    {report.ai_analysis.available ? '包含AI行为数据' : '仅答题数据'}
                  </Text>
                  <Text type="secondary">
                    {report.has_dimensions ? '维度分析' : '题型分析'}
                  </Text>
                </Space>
              </div>
            </Card>
          </>
        )}
      </div>

      {/* 打印样式 */}
      <style jsx global>{`
        @media print {
          body {
            background: white;
            margin: 0;
            padding: 0;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:block {
            display: block !important;
          }
          .ant-card {
            page-break-inside: avoid;
            break-inside: avoid;
            box-shadow: none;
            border: 1px solid #e8e8e8;
          }
        }

        /* Markdown样式 */
        .markdown-content h2 {
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-size: 1.5rem;
          font-weight: 600;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 0.5rem;
        }
        .markdown-content h3 {
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          font-size: 1.25rem;
          font-weight: 600;
        }
        .markdown-content ul,
        .markdown-content ol {
          margin-left: 1.5rem;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .markdown-content li {
          margin-bottom: 0.25rem;
        }
        .markdown-content p {
          margin-bottom: 1rem;
          line-height: 1.75;
        }
        .markdown-content strong {
          font-weight: 600;
          color: #1f2937;
        }
        .markdown-content blockquote {
          border-left: 4px solid #3b82f6;
          padding-left: 1rem;
          margin: 1rem 0;
          color: #4b5563;
          font-style: italic;
        }
      `}</style>
    </div>
  );
}
