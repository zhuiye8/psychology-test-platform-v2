import { Card, Table, Tag, Progress, Space, Tooltip } from 'antd';
import type { ColumnType } from 'antd/es/table';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
import type { AiSession, AiAggregate, AiAnomaly } from '../../../../services/ai';

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

// ============================================================================
// 类型定义
// ============================================================================

export interface SessionWithData {
  session: AiSession;
  aggregate?: AiAggregate;
  anomalies: AiAnomaly[];
  participantName?: string;
  examTitle?: string;
}

interface ActiveSessionsTableProps {
  sessions: SessionWithData[];
  onSelectSession?: (session: SessionWithData | null) => void;
}

// ============================================================================
// 组件
// ============================================================================

export function ActiveSessionsTable({ sessions, onSelectSession }: ActiveSessionsTableProps) {
  const columns: ColumnType<SessionWithData>[] = [
    {
      title: '参与者',
      dataIndex: 'participantName',
      key: 'participantName',
      width: 120,
      render: (name: string) => name || '-',
    },
    {
      title: '考试',
      dataIndex: 'examTitle',
      key: 'examTitle',
      width: 200,
      ellipsis: true,
      render: (title: string) => (
        <Tooltip title={title}>
          <span>{title || '-'}</span>
        </Tooltip>
      ),
    },
    {
      title: '会话状态',
      key: 'status',
      width: 100,
      render: (_, record) => {
        const statusMap = {
          CREATED: { color: 'default', text: '已创建' },
          ACTIVE: { color: 'processing', text: '进行中' },
          COMPLETED: { color: 'success', text: '已完成' },
          FAILED: { color: 'error', text: '失败' },
        };
        const status = statusMap[record.session.status as keyof typeof statusMap] || {
          color: 'default',
          text: record.session.status,
        };
        return <Tag color={status.color}>{status.text}</Tag>;
      },
    },
    {
      title: '情绪得分',
      key: 'emotionScore',
      width: 120,
      render: (_, record) => {
        if (!record.aggregate?.avgValence) return '-';
        const score = Math.round(((record.aggregate.avgValence + 1) / 2) * 100);
        return (
          <Space size="small">
            <Progress
              type="circle"
              percent={score}
              width={40}
              strokeColor={score > 60 ? '#52c41a' : '#fa8c16'}
            />
            <span>{score}</span>
          </Space>
        );
      },
    },
    {
      title: '注意力得分',
      key: 'attentionScore',
      width: 120,
      render: (_, record) => {
        if (!record.aggregate?.avgAttention) return '-';
        const score = Math.round(record.aggregate.avgAttention * 100);
        return (
          <Space size="small">
            <Progress
              type="circle"
              percent={score}
              width={40}
              strokeColor={score > 70 ? '#52c41a' : '#fa8c16'}
            />
            <span>{score}</span>
          </Space>
        );
      },
    },
    {
      title: '异常事件',
      key: 'anomalies',
      width: 100,
      render: (_, record) => {
        const total = record.anomalies.length;
        const critical = record.anomalies.filter((a) => a.severity === 'CRITICAL')
          .length;
        if (total === 0) return <span className="text-gray-400">0</span>;
        return (
          <Tooltip
            title={`${total} 个异常事件 (${critical} 个严重)`}
          >
            <Tag color={critical > 0 ? 'red' : 'orange'}>
              {total} {critical > 0 && `(${critical})`}
            </Tag>
          </Tooltip>
        );
      },
    },
    {
      title: '数据质量',
      key: 'dataQuality',
      width: 100,
      render: (_, record) => {
        if (!record.aggregate?.dataQuality) return '-';
        const quality = Math.round(record.aggregate.dataQuality * 100);
        return (
          <Progress
            percent={quality}
            size="small"
            strokeColor={quality > 80 ? '#52c41a' : quality > 50 ? '#fa8c16' : '#ff4d4f'}
          />
        );
      },
    },
    {
      title: '开始时间',
      key: 'startTime',
      width: 150,
      render: (_, record) => {
        if (!record.session.startTime) return '-';
        return (
          <Tooltip title={dayjs(record.session.startTime).format('YYYY-MM-DD HH:mm:ss')}>
            <span>{dayjs(record.session.startTime).fromNow()}</span>
          </Tooltip>
        );
      },
    },
    {
      title: '时长',
      key: 'duration',
      width: 100,
      render: (_, record) => {
        if (!record.session.startTime) return '-';
        const endTime = record.session.endTime
          ? dayjs(record.session.endTime)
          : dayjs();
        const startTime = dayjs(record.session.startTime);
        const durationMinutes = endTime.diff(startTime, 'minute');
        return `${durationMinutes}分钟`;
      },
    },
  ];

  return (
    <Card title="AI分析会话列表" className="shadow-sm">
      <Table
        dataSource={sessions}
        columns={columns}
        rowKey={(record) => record.session.id}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条`,
        }}
        scroll={{ x: 1200 }}
        onRow={(record) => ({
          onClick: () => {
            onSelectSession?.(record);
          },
          style: { cursor: 'pointer' },
        })}
      />
    </Card>
  );
}
