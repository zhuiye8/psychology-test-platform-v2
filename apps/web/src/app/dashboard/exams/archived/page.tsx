'use client';

/**
 * 归档考试页面
 * 显示所有已归档的考试，支持恢复和永久删除操作
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button, Space, Input, App, Table, Tag, Popconfirm, Empty } from 'antd';
import { ArrowLeftOutlined, SearchOutlined, ReloadOutlined, CheckCircleOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { PageHeader } from '../../../../components/ui-kit';
import examsApi, { type Exam, ExamStatus } from '../../../../services/exams';
import { useDebouncedValue } from '../../../../hooks/useDebounce';

const { Search } = Input;

// ============================================================================
// 主组件
// ============================================================================

export default function ArchivedExamsPage() {
  const { message } = App.useApp();

  const router = useRouter();

  // --------------------------------------------------------------------------
  // State 状态管理
  // --------------------------------------------------------------------------

  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  // 防抖搜索文本（300ms延迟）
  const debouncedSearchText = useDebouncedValue(searchText, 300);

  // --------------------------------------------------------------------------
  // 数据加载函数
  // --------------------------------------------------------------------------

  /** 加载归档考试列表 */
  const loadArchivedExams = async () => {
    try {
      setLoading(true);
      const response = await examsApi.findAll({
        status: ExamStatus.ARCHIVED,
        search: debouncedSearchText || undefined,
        limit: 1000,
      });
      setExams(response.data);
    } catch (error) {
      message.error('加载归档考试失败');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------------------------------
  // 生命周期 Effects
  // --------------------------------------------------------------------------

  useEffect(() => {
    loadArchivedExams();
  }, [debouncedSearchText]);

  // --------------------------------------------------------------------------
  // 事件处理函数
  // --------------------------------------------------------------------------

  /** 恢复考试到已完成 */
  const handleRestore = async (exam: Exam) => {
    try {
      await examsApi.restore(exam.id);
      message.success('考试已恢复到已完成');
      loadArchivedExams();
    } catch (error) {
      message.error('恢复失败，请重试');
    }
  };

  /** 永久删除考试（软删除到DELETED，7天后硬删除） */
  const handleDelete = async (exam: Exam) => {
    try {
      await examsApi.delete(exam.id);
      message.success('考试已删除，7天后将永久清除');
      loadArchivedExams();
    } catch (error) {
      message.error('删除失败，请重试');
    }
  };

  /** 查看考试详情 */
  const handleView = (exam: Exam) => {
    router.push(`/dashboard/exams/${exam.id}`);
  };

  /** 查看参与者 */
  const handleViewParticipants = (exam: Exam) => {
    router.push(`/dashboard/results?examId=${exam.id}`);
  };

  // --------------------------------------------------------------------------
  // 表格列定义
  // --------------------------------------------------------------------------

  const columns = [
    {
      title: '考试名称',
      dataIndex: 'title',
      key: 'title',
      width: '30%',
      render: (text: string, record: Exam) => (
        <Button type="link" onClick={() => handleView(record)}>
          {text}
        </Button>
      ),
    },
    {
      title: '试卷',
      dataIndex: ['paper', 'title'],
      key: 'paper',
      width: '20%',
    },
    {
      title: '参与人数',
      dataIndex: ['_count', 'results'],
      key: 'results',
      width: '10%',
      render: (count: number) => (
        <Tag color={count > 0 ? 'green' : 'default'}>
          {count} 人
        </Tag>
      ),
    },
    {
      title: '考试时间',
      dataIndex: 'startTime',
      key: 'startTime',
      width: '20%',
      render: (startTime: string) => {
        const date = new Date(startTime);
        return date.toLocaleDateString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        });
      },
    },
    {
      title: '操作',
      key: 'actions',
      width: '20%',
      render: (_: any, record: Exam) => (
        <Space>
          <Button
            type="link"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleViewParticipants(record)}
          >
            参与者
          </Button>
          <Popconfirm
            title="恢复考试"
            description="确定要恢复这个考试到已完成状态吗？"
            onConfirm={() => handleRestore(record)}
            okText="确定"
            cancelText="取消"
          >
            <Button
              type="link"
              size="small"
              icon={<CheckCircleOutlined />}
            >
              恢复
            </Button>
          </Popconfirm>
          <Popconfirm
            title="永久删除"
            description="考试将被软删除，7天后自动永久清除。确定要删除吗？"
            onConfirm={() => handleDelete(record)}
            okText="确定删除"
            cancelText="取消"
            okButtonProps={{ danger: true }}
          >
            <Button
              type="link"
              size="small"
              danger
              icon={<DeleteOutlined />}
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // --------------------------------------------------------------------------
  // 渲染 JSX
  // --------------------------------------------------------------------------

  return (
    <div className="space-y-6">
      {/* 页面头部 */}
      <PageHeader
        title="📦 已归档考试"
        description="查看和管理已归档的考试，支持恢复或永久删除"
        extra={
          <Space>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => router.push('/dashboard/exams')}
            >
              返回考试管理
            </Button>
            <Button icon={<ReloadOutlined />} onClick={loadArchivedExams}>
              刷新
            </Button>
          </Space>
        }
      />

      {/* 搜索栏 */}
      <Card size="small">
        <Search
          placeholder="搜索考试名称或描述"
          allowClear
          style={{ width: 400 }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          prefix={<SearchOutlined />}
        />
      </Card>

      {/* 归档列表 */}
      <Card>
        <Table
          columns={columns}
          dataSource={exams}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 20,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条`,
          }}
          locale={{
            emptyText: (
              <Empty
                description="暂无归档考试"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            ),
          }}
        />
      </Card>
    </div>
  );
}
