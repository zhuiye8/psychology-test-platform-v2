'use client';

/**
 * AI报告独立页面
 *
 * 全屏展示AI分析报告，优化打印和导出体验
 */

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Button,
  Space,
  Tooltip,
  Card,
  Spin,
  Typography,
  Divider,
  App,
} from 'antd';
import {
  ArrowLeftOutlined,
  PrinterOutlined,
  DownloadOutlined,
  ReloadOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { aiReportsApi, type GeneratedReport } from '../../../../../services/aiReports';
import { ReportViewer } from '../../../../../components/results/ReportViewer';

const { Title, Text } = Typography;

// ============================================================================
// 主组件
// ============================================================================

export default function ReportPage() {
  const { message } = App.useApp();

  const params = useParams();
  const router = useRouter();
  const resultId = params.resultId as string;

  // --------------------------------------------------------------------------
  // State 状态管理
  // --------------------------------------------------------------------------

  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<GeneratedReport | null>(null);
  const [printing, setPrinting] = useState(false);

  // --------------------------------------------------------------------------
  // 数据加载
  // --------------------------------------------------------------------------

  useEffect(() => {
    loadReport();
  }, [resultId]);

  const loadReport = async () => {
    try {
      setLoading(true);
      const progress = await aiReportsApi.getReportProgress(resultId);

      if (progress.status === 'completed' && progress.result) {
        setReport(progress.result);
      } else if (progress.status === 'failed') {
        message.error('报告生成失败');
        router.push(`/dashboard/results/${resultId}`);
      } else if (progress.status === 'processing') {
        message.info('报告正在生成中，请稍后刷新');
      } else {
        message.warning('报告尚未生成');
        router.push(`/dashboard/results/${resultId}`);
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        message.warning('报告不存在');
        router.push(`/dashboard/results/${resultId}`);
      } else {
        message.error('加载报告失败');
        console.error('加载报告错误:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------------------------------
  // 事件处理
  // --------------------------------------------------------------------------

  /** 返回详情页 */
  const handleBack = () => {
    router.push(`/dashboard/results/${resultId}`);
  };

  /** 打印报告 */
  const handlePrint = () => {
    setPrinting(true);
    // 等待样式应用
    setTimeout(() => {
      window.print();
      setPrinting(false);
    }, 100);
  };

  /** 导出PDF（使用浏览器打印功能） */
  const handleExportPDF = () => {
    message.info('请在打印对话框中选择"保存为PDF"');
    handlePrint();
  };

  /** 刷新报告 */
  const handleRefresh = () => {
    loadReport();
  };

  // --------------------------------------------------------------------------
  // 渲染 JSX
  // --------------------------------------------------------------------------

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" tip="加载报告中...">
          <div />
        </Spin>
      </div>
    );
  }

  if (!report) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 工具栏（打印时隐藏） */}
      <div className="print:hidden bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Space>
              <Button
                icon={<ArrowLeftOutlined />}
                onClick={handleBack}
              >
                返回
              </Button>
              <Divider type="vertical" />
              <Text strong className="text-lg">
                <FileTextOutlined className="mr-2" />
                AI心理分析报告
              </Text>
            </Space>

            <Space>
              <Tooltip title="刷新报告">
                <Button
                  icon={<ReloadOutlined />}
                  onClick={handleRefresh}
                >
                  刷新
                </Button>
              </Tooltip>
              <Tooltip title="打印报告">
                <Button
                  icon={<PrinterOutlined />}
                  onClick={handlePrint}
                  loading={printing}
                >
                  打印
                </Button>
              </Tooltip>
              <Tooltip title="导出为PDF">
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  onClick={handleExportPDF}
                >
                  导出PDF
                </Button>
              </Tooltip>
            </Space>
          </div>
        </div>
      </div>

      {/* 报告内容 */}
      <div className="max-w-7xl mx-auto px-4 py-6 print:px-0 print:py-0">
        {/* 打印页眉（仅打印时显示） */}
        <div className="hidden print:block mb-4">
          <Title level={2} className="text-center mb-2">
            AI心理分析报告
          </Title>
          <Text type="secondary" className="block text-center">
            生成时间：{dayjs(report.generatedAt).format('YYYY年MM月DD日 HH:mm:ss')}
          </Text>
          <Divider />
        </div>

        {/* ReportViewer组件 */}
        <ReportViewer
          examResultId={resultId}
          autoLoad={false}
          onReportLoad={setReport}
        />

        {/* 报告页脚（打印时显示） */}
        <Card className="mt-6 print:shadow-none">
          <div className="text-center text-gray-500 text-sm">
            <Divider />
            <Space split={<Divider type="vertical" />}>
              <Text type="secondary">
                报告生成时间：{dayjs(report.generatedAt).format('YYYY-MM-DD HH:mm:ss')}
              </Text>
              <Text type="secondary">
                LLM模型：{report.metadata.model}
              </Text>
              <Text type="secondary">
                Token消耗：{report.metadata.tokensUsed.toLocaleString()}
              </Text>
              <Text type="secondary">
                处理时间：{report.metadata.processingTimeMs.toLocaleString()}ms
              </Text>
              <Text type="secondary">
                报告版本：v{report.metadata.reportVersion}
              </Text>
            </Space>
            <Divider />
            <Text type="secondary" className="block mt-2">
              本报告由心理测试平台AI系统自动生成，仅供参考
            </Text>
          </div>
        </Card>
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
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:px-0 {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          .print\\:py-0 {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }
          /* 优化打印分页 */
          .ant-card {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          /* 去除不必要的阴影和边框 */
          .ant-card {
            box-shadow: none;
            border: 1px solid #e8e8e8;
          }
        }
      `}</style>
    </div>
  );
}
