/**
 * Exam Results Table Component
 *
 * 考试参与者结果表格
 */

import { Card, Table, Button, Space, Tag, Typography } from 'antd';
import { EyeOutlined, DownloadOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { ExamResult } from '@/services/results';

const { Text } = Typography;

// ============================================================================
// 类型定义
// ============================================================================

export interface ExamResultsTableProps {
  results: ExamResult[];
  loading: boolean;
  onReload: () => void;
  onExport: () => void;
  onViewDetail: (result: ExamResult) => void;
}

// ============================================================================
// 辅助函数
// ============================================================================

/** 计算答题用时 */
function formatDuration(startedAt?: string, submittedAt?: string): React.ReactNode {
  if (!startedAt || !submittedAt) {
    return <Text type="secondary">未知</Text>;
  }

  const startTime = new Date(startedAt);
  const endTime = new Date(submittedAt);
  const durationMs = endTime.getTime() - startTime.getTime();
  const durationSeconds = Math.floor(durationMs / 1000);

  if (durationSeconds < 60) {
    const color = durationSeconds <= 10 ? '#ff4d4f' : '#52c41a';
    return <Text style={{ color }}>{durationSeconds}秒</Text>;
  } else if (durationSeconds < 3600) {
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = durationSeconds % 60;
    const color = minutes < 30 ? '#52c41a' : minutes < 60 ? '#faad14' : '#ff4d4f';
    return (
      <Text style={{ color }}>
        {minutes}分{seconds}秒
      </Text>
    );
  } else {
    const hours = Math.floor(durationSeconds / 3600);
    const minutes = Math.floor((durationSeconds % 3600) / 60);
    return (
      <Text style={{ color: '#ff4d4f' }}>
        {hours}小时{minutes}分
      </Text>
    );
  }
}

// ============================================================================
// 主组件
// ============================================================================

export function ExamResultsTable({
  results,
  loading,
  onReload,
  onExport,
  onViewDetail,
}: ExamResultsTableProps) {
  const columns: ColumnsType<ExamResult> = [
    {
      title: '学号',
      dataIndex: 'participantId',
      key: 'participantId',
      width: 120,
    },
    {
      title: '学生姓名',
      dataIndex: 'participantName',
      key: 'participantName',
      ellipsis: true,
    },
    {
      title: 'IP地址',
      dataIndex: 'ipAddress',
      key: 'ipAddress',
      width: 140,
    },
    {
      title: '开始时间',
      dataIndex: 'startedAt',
      key: 'startedAt',
      width: 160,
      render: (date: string | null) =>
        date
          ? new Date(date).toLocaleString('zh-CN', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            })
          : '未知',
    },
    {
      title: '提交时间',
      dataIndex: 'submittedAt',
      key: 'submittedAt',
      width: 160,
      render: (date: string) =>
        new Date(date).toLocaleString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }),
    },
    {
      title: '答题用时',
      key: 'duration',
      width: 120,
      render: (_, record: ExamResult) =>
        formatDuration(record.startedAt, record.submittedAt),
    },
    {
      title: '答题数量',
      key: 'answer_count',
      width: 100,
      render: (_, record: ExamResult) => {
        const count = Object.keys(record.answers || {}).length;
        return <Tag color={count > 0 ? 'blue' : 'default'}>{count} 题</Tag>;
      },
    },
    {
      title: '操作',
      key: 'actions',
      width: 100,
      render: (_, record: ExamResult) => (
        <Button
          type="link"
          size="small"
          icon={<EyeOutlined />}
          onClick={() => onViewDetail(record)}
        >
          查看
        </Button>
      ),
    },
  ];

  return (
    <Card
      title={
        <Space>
          <span>参与者结果</span>
          <Tag color="blue">{results.length} 人</Tag>
        </Space>
      }
      className="mb-6"
      extra={
        <Space>
          <Button icon={<DownloadOutlined />} onClick={onExport}>
            导出Excel
          </Button>
        </Space>
      }
    >
      <Table
        columns={columns}
        dataSource={results}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
        }}
        scroll={{ x: 1200 }}
      />
    </Card>
  );
}
