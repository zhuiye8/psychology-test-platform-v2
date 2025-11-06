'use client';

/**
 * Results管理页面
 *
 * 教师端：查看所有考试结果，支持筛选、排序、导出
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Space,
  Tag,
  Tooltip,
  App,
} from 'antd';
import {
  SearchOutlined,
  ReloadOutlined,
  DownloadOutlined,
  EyeOutlined,
  DeleteOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import type { ColumnsType } from 'antd/es/table';
import { PageHeader } from '../../../components/ui-kit/PageHeader';
import { DataTable } from '../../../components/ui-kit/DataTable';
import resultsApi, {
  type ExamResult,
  type ResultsListParams,
} from '../../../services/results';
import examsApi, { type Exam } from '../../../services/exams';
import aiApi from '../../../services/ai';
import { AiStatusBadge } from '../../../components/results/AiStatusBadge';
import { GenerateReportButton } from '../../../components/results/GenerateReportButton';

const { RangePicker } = DatePicker;

// ============================================================================
// 类型定义
// ============================================================================

interface FilterFormValues {
  examId?: string;
  participantName?: string;
  dateRange?: [dayjs.Dayjs, dayjs.Dayjs];
  passed?: boolean;
}

// ============================================================================
// 主组件
// ============================================================================

export default function ResultsPage() {
  const { message } = App.useApp();

  const router = useRouter();
  const [form] = Form.useForm<FilterFormValues>();

  // --------------------------------------------------------------------------
  // State 状态管理
  // --------------------------------------------------------------------------

  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [results, setResults] = useState<ExamResult[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [filters, setFilters] = useState<ResultsListParams>({
    isCompleted: true, // 默认只显示已完成的考试结果
  });
  // AI状态映射：resultId -> hasAiAnalysis
  // TODO: 优化为更详细的状态（processing/completed/failed + anomalyCount）
  const [aiStatusMap, setAiStatusMap] = useState<Record<string, boolean>>({});

  // --------------------------------------------------------------------------
  // 数据加载
  // --------------------------------------------------------------------------

  useEffect(() => {
    loadExams();
    loadResults();
  }, []);

  /** 加载考试列表（用于筛选） */
  const loadExams = async () => {
    try {
      const data = await examsApi.list();
      setExams(data.data);
    } catch (error) {
      console.error('加载考试列表失败:', error);
    }
  };

  /** 加载结果列表 */
  const loadResults = async (params?: ResultsListParams) => {
    try {
      setLoading(true);
      const mergedParams = {
        ...filters,
        ...params,
        page: params?.page || pagination.current,
        limit: params?.limit || pagination.pageSize,
      };

      const response = await resultsApi.getResultsList(mergedParams);
      setResults(response.data);
      setPagination({
        current: response.meta.page,
        pageSize: response.meta.limit,
        total: response.meta.total,
      });

      // 批量加载AI状态
      if (response.data.length > 0) {
        loadAiStatus(response.data.map((r) => r.id));
      }
    } catch (error) {
      message.error('加载结果列表失败');
    } finally {
      setLoading(false);
    }
  };

  /** 批量加载AI分析状态 */
  const loadAiStatus = async (resultIds: string[]) => {
    try {
      const { aiStatusMap } = await aiApi.batchCheckAiAnalysis(resultIds);
      setAiStatusMap(aiStatusMap);
    } catch (error) {
      console.error('加载AI状态失败:', error);
      // 不显示错误提示，静默失败
    }
  };

  // --------------------------------------------------------------------------
  // 事件处理函数
  // --------------------------------------------------------------------------

  /** 搜索/筛选 */
  const handleSearch = (values: FilterFormValues) => {
    const params: ResultsListParams = {
      isCompleted: true, // 保持只显示已完成的结果
      examId: values.examId,
      participantName: values.participantName,
      passed: values.passed,
      startDate: values.dateRange?.[0]?.toISOString(),
      endDate: values.dateRange?.[1]?.toISOString(),
      page: 1, // 重置到第一页
    };
    setFilters(params);
    loadResults(params);
  };

  /** 重置筛选 */
  const handleReset = () => {
    form.resetFields();
    const resetFilters = { isCompleted: true }; // 保留isCompleted过滤
    setFilters(resetFilters);
    loadResults({ ...resetFilters, page: 1 });
  };

  /** 分页变化 */
  const handleTableChange = (page: number, pageSize: number) => {
    loadResults({ page, limit: pageSize });
  };

  /** 查看详情 */
  const handleViewDetail = (record: ExamResult) => {
    router.push(`/dashboard/results/${record.id}`);
  };

  /** 删除结果 */
  const handleDelete = async (record: ExamResult) => {
    try {
      await resultsApi.deleteResult(record.id);
      message.success('删除成功');
      loadResults();
    } catch (error) {
      message.error('删除失败');
    }
  };

  /** 导出Excel */
  const handleExport = async () => {
    try {
      setExporting(true);
      const blob = await resultsApi.exportResults(filters);

      // 创建下载链接
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `考试结果_${dayjs().format('YYYYMMDD_HHmmss')}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      message.success('导出成功');
    } catch (error) {
      message.error('导出失败');
    } finally {
      setExporting(false);
    }
  };

  // --------------------------------------------------------------------------
  // 表格列定义
  // --------------------------------------------------------------------------

  const columns: ColumnsType<ExamResult> = [
    {
      title: '学生姓名',
      dataIndex: 'participantName',
      key: 'participantName',
      width: 120,
    },
    {
      title: '学号/编号',
      dataIndex: 'participantId',
      key: 'participantId',
      width: 150,
    },
    {
      title: '考试名称',
      dataIndex: ['exam', 'title'],
      key: 'examTitle',
      ellipsis: true,
    },
    {
      title: '分数',
      dataIndex: 'score',
      key: 'score',
      width: 100,
      render: (score?: number) => {
        if (score === undefined) return '-';
        const color = score >= 80 ? 'green' : score >= 60 ? 'orange' : 'red';
        return <Tag color={color}>{score} 分</Tag>;
      },
      sorter: true,
    },
    {
      title: '是否通过',
      dataIndex: 'passed',
      key: 'passed',
      width: 100,
      render: (passed?: boolean) => {
        if (passed === undefined) return '-';
        return (
          <Tag color={passed ? 'success' : 'error'}>
            {passed ? '通过' : '未通过'}
          </Tag>
        );
      },
    },
    {
      title: '用时(分钟)',
      dataIndex: 'timeSpent',
      key: 'timeSpent',
      width: 120,
      render: (timeSpent?: number) => {
        if (!timeSpent) return '-';
        const minutes = Math.floor(timeSpent / 60);
        const seconds = timeSpent % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
      },
      sorter: true,
    },
    {
      title: '开始时间',
      dataIndex: 'startedAt',
      key: 'startedAt',
      width: 180,
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '提交时间',
      dataIndex: 'submittedAt',
      key: 'submittedAt',
      width: 180,
      render: (date?: string) =>
        date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss') : '-',
      sorter: true,
    },
    {
      title: 'AI状态',
      key: 'aiStatus',
      width: 150,
      render: (_, record) => {
        const hasAiAnalysis = aiStatusMap[record.id] || false;
        return (
          <AiStatusBadge
            status={hasAiAnalysis ? 'completed' : 'none'}
            tooltip={hasAiAnalysis ? 'AI分析已完成' : '未开启AI监控或无AI数据'}
          />
        );
      },
    },
    {
      title: '操作',
      key: 'actions',
      width: 180,
      fixed: 'right',
      render: (_, record) => {
        const hasAiAnalysis = aiStatusMap[record.id] || false;
        const tooltipTitle = hasAiAnalysis
          ? '生成AI报告'
          : '未启用AI监控或无AI数据';

        return (
          <Space size="small">
            <Tooltip title="查看详情">
              <Button
                type="link"
                size="small"
                icon={<EyeOutlined />}
                onClick={() => handleViewDetail(record)}
              />
            </Tooltip>
            <Tooltip title={tooltipTitle}>
              <GenerateReportButton
                examResultId={record.id}
                buttonType="link"
                buttonSize="small"
                iconOnly
                disabled={!hasAiAnalysis}
                onSuccess={() => loadResults()}
              />
            </Tooltip>
            <Tooltip title="删除">
              <Button
                type="link"
                size="small"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(record)}
              />
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  // --------------------------------------------------------------------------
  // 渲染 JSX
  // --------------------------------------------------------------------------

  return (
    <div className="space-y-4 modern-page-enter">
      {/* 页面头部 */}
      <PageHeader
        title="考试结果管理"
        description="查看、筛选和管理所有考试结果"
      />

      {/* 筛选表单 */}
      <Card className="modern-card-enter border-0">
        <Form
          form={form}
          layout="inline"
          onFinish={handleSearch}
          className="mb-0"
        >
          <Form.Item name="examId" className="mb-2">
            <Select
              placeholder="选择考试"
              style={{ width: 200 }}
              allowClear
              showSearch
              optionFilterProp="children"
            >
              {exams.map((exam) => (
                <Select.Option key={exam.id} value={exam.id}>
                  {exam.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="participantName" className="mb-2">
            <Input
              placeholder="学生姓名"
              style={{ width: 150 }}
              allowClear
            />
          </Form.Item>

          <Form.Item name="dateRange" className="mb-2">
            <RangePicker
              placeholder={['开始日期', '结束日期']}
              format="YYYY-MM-DD"
            />
          </Form.Item>

          <Form.Item name="passed" className="mb-2">
            <Select
              placeholder="是否通过"
              style={{ width: 120 }}
              allowClear
            >
              <Select.Option value={true}>通过</Select.Option>
              <Select.Option value={false}>未通过</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item className="mb-2">
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SearchOutlined />}
              >
                搜索
              </Button>
              <Button icon={<FilterOutlined />} onClick={handleReset}>
                重置
              </Button>
              <Button icon={<ReloadOutlined />} onClick={() => loadResults()}>
                刷新
              </Button>
              <Button
                icon={<DownloadOutlined />}
                onClick={handleExport}
                loading={exporting}
              >
                导出Excel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      {/* 结果列表 */}
      <Card className="modern-card-enter border-0">
        <DataTable<ExamResult>
          columns={columns}
          dataSource={results}
          loading={loading}
          pagination={pagination}
          onPaginationChange={handleTableChange}
          rowKey="id"
          scroll={{ x: 1600 }}
        />
      </Card>
    </div>
  );
}
