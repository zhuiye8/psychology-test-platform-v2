'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button, Space, Input, App, Popconfirm, Empty, Spin, Row, Col } from 'antd';
import { PlusOutlined, SearchOutlined, ReloadOutlined, InboxOutlined } from '@ant-design/icons';
import { Form } from 'antd';

// 组件和服务导入
import { PageHeader } from '../../../components/ui-kit';
import { ExamCard, ExamForm, KanbanLayout } from '../../../components/exams';
import examsApi, {
  type Exam,
  type CreateExamDto,
  ExamStatus,
} from '../../../services/exams';
import { useDebouncedValue } from '../../../hooks/useDebounce';
import { useMemo } from 'react';

const { Search } = Input;

// ============================================================================
// 主组件
// ============================================================================

export default function ExamsPage() {
  const { message } = App.useApp();

  // --------------------------------------------------------------------------
  // Hooks
  // --------------------------------------------------------------------------

  const router = useRouter();

  // --------------------------------------------------------------------------
  // State 状态管理
  // --------------------------------------------------------------------------

  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editorMode, setEditorMode] = useState<'create' | 'edit'>('create');
  const [editingExam, setEditingExam] = useState<Exam | undefined>();
  const [form] = Form.useForm<CreateExamDto>();

  // Kanban状态管理
  const [expandedLane, setExpandedLane] = useState<ExamStatus>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('examList_expandedLane');
      return (saved as ExamStatus) || ExamStatus.PUBLISHED;
    }
    return ExamStatus.PUBLISHED;
  });

  const [currentPage, setCurrentPage] = useState<Record<ExamStatus, number>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('examList_currentPage');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          // Ignore parse error
        }
      }
    }
    return {
      [ExamStatus.DRAFT]: 1,
      [ExamStatus.PUBLISHED]: 1,
      [ExamStatus.SUCCESS]: 1,
      [ExamStatus.ARCHIVED]: 1,
      [ExamStatus.DELETED]: 1,
    };
  });

  // 防抖搜索文本（300ms延迟）
  const debouncedSearchText = useDebouncedValue(searchText, 300);

  // 按状态分组考试（自动过期逻辑 + DELETED过滤）
  const examsByStatus = useMemo((): Record<ExamStatus, Exam[]> => {
    const now = new Date();

    return exams.reduce(
      (acc, exam) => {
        // 过滤掉DELETED状态的考试（不显示）
        if (exam.status === ExamStatus.DELETED) {
          return acc;
        }

        let status = exam.status as ExamStatus;

        // 自动过期逻辑：PUBLISHED且已过endTime的考试显示在SUCCESS泳道
        if (status === ExamStatus.PUBLISHED) {
          const endTime = new Date(exam.endTime);
          if (endTime < now) {
            status = ExamStatus.SUCCESS;
          }
        }

        if (!acc[status]) {
          acc[status] = [];
        }
        acc[status].push(exam);
        return acc;
      },
      {
        [ExamStatus.DRAFT]: [],
        [ExamStatus.PUBLISHED]: [],
        [ExamStatus.SUCCESS]: [],
        [ExamStatus.ARCHIVED]: [],
        [ExamStatus.DELETED]: [], // 保留以满足类型，但不显示
      } as Record<ExamStatus, Exam[]>
    );
  }, [exams]);

  // --------------------------------------------------------------------------
  // 数据加载函数
  // --------------------------------------------------------------------------

  /** 加载考试列表 */
  const loadExams = async () => {
    try {
      setLoading(true);
      const response = await examsApi.findAll({
        search: debouncedSearchText || undefined,
        limit: 1000, // 看板视图加载全部
      });
      setExams(response.data);
    } catch (error) {
      message.error('加载考试列表失败');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------------------------------
  // 生命周期 Effects
  // --------------------------------------------------------------------------

  /** 初始化加载 */
  useEffect(() => {
    loadExams();
  }, [debouncedSearchText]); // 使用防抖后的搜索文本

  /** 持久化展开状态 */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('examList_expandedLane', expandedLane);
    }
  }, [expandedLane]);

  /** 持久化分页状态 */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('examList_currentPage', JSON.stringify(currentPage));
    }
  }, [currentPage]);

  // --------------------------------------------------------------------------
  // 事件处理函数
  // --------------------------------------------------------------------------

  /** 创建考试 */
  const handleCreate = () => {
    setEditorMode('create');
    setEditingExam(undefined);
    form.resetFields();
    setIsFormVisible(true);
  };

  /** 编辑考试 */
  const handleEdit = (exam: Exam) => {
    setEditorMode('edit');
    setEditingExam(exam);
    setIsFormVisible(true);
  };

  /** 删除考试 */
  const handleDelete = async (id: string) => {
    try {
      await examsApi.delete(id);
      message.success('考试删除成功');
      loadExams();
    } catch (error) {
      message.error('删除失败，请重试');
    }
  };

  /** 提交表单 */
  const handleFinish = async (values: CreateExamDto) => {
    try {
      setLoading(true);
      if (editorMode === 'create') {
        await examsApi.create(values);
        message.success('考试创建成功');
      } else if (editingExam) {
        await examsApi.update(editingExam.id, values);
        message.success('考试更新成功');
      }
      setIsFormVisible(false);
      form.resetFields();
      loadExams();
    } catch (error) {
      message.error(editorMode === 'create' ? '创建失败，请重试' : '更新失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  /** 发布考试 */
  const handlePublish = async (id: string) => {
    try {
      await examsApi.publish(id);
      message.success('考试已发布');
      loadExams();
    } catch (error) {
      message.error('发布失败，请重试');
    }
  };

  /** 标记成功 */
  const handleMarkSuccess = async (id: string) => {
    try {
      await examsApi.markSuccess(id);
      message.success('考试已标记为成功');
      loadExams();
    } catch (error) {
      message.error('操作失败，请重试');
    }
  };

  /** 停止考试（回到草稿） */
  const handleStop = async (id: string) => {
    try {
      await examsApi.stop(id);
      message.success('考试已停止并回到草稿');
      loadExams();
    } catch (error) {
      message.error('操作失败，请重试');
    }
  };

  /** 归档考试 */
  const handleArchive = async (id: string) => {
    try {
      await examsApi.archive(id);
      message.success('考试已归档');
      loadExams();
    } catch (error) {
      message.error('操作失败，请重试');
    }
  };

  /** 恢复考试 */
  const handleRestore = async (id: string) => {
    try {
      await examsApi.restore(id);
      message.success('考试已恢复');
      loadExams();
    } catch (error) {
      message.error('操作失败，请重试');
    }
  };

  /** 查看详情 */
  const handleView = (id: string) => {
    // 导航到Exams详情页
    router.push(`/dashboard/exams/${id}`);
  };

  /** 统一状态变更处理 */
  const handleStatusChange = async (exam: Exam, newStatus: ExamStatus) => {
    try {
      switch (newStatus) {
        case ExamStatus.PUBLISHED:
          await examsApi.publish(exam.id);
          message.success('考试已发布');
          break;
        case ExamStatus.SUCCESS:
          await examsApi.markSuccess(exam.id);
          message.success('考试已标记为成功');
          break;
        case ExamStatus.ARCHIVED:
          await examsApi.archive(exam.id);
          message.success('考试已归档');
          break;
        case ExamStatus.DRAFT:
          // 从PUBLISHED停止 → DRAFT，或从ARCHIVED恢复 → SUCCESS
          if (exam.status === ExamStatus.PUBLISHED) {
            await examsApi.stop(exam.id);
            message.success('考试已停止并回到草稿');
          } else if (exam.status === ExamStatus.ARCHIVED) {
            await examsApi.restore(exam.id);
            message.success('考试已从归档恢复');
          }
          break;
        default:
          message.warning('未知的状态转换');
          return;
      }
      loadExams();
    } catch (error) {
      message.error('状态变更失败，请重试');
    }
  };

  /** 查看参与者 */
  const handleViewParticipants = (exam: Exam) => {
    // 导航到Results页面，并带上examId筛选
    router.push(`/dashboard/results?examId=${exam.id}`);
  };

  /** 复制考试链接 */
  const handleCopyLink = async (exam: Exam) => {
    try {
      const examUrl = `${window.location.origin}/exam/${exam.id}/join`;
      await navigator.clipboard.writeText(examUrl);
      message.success('考试链接已复制到剪贴板');
    } catch (error) {
      message.error('复制链接失败');
    }
  };

  /** 删除考试（适配Exam对象） */
  const handleDeleteExam = async (exam: Exam) => {
    try {
      await examsApi.delete(exam.id);
      message.success('考试删除成功');
      loadExams();
    } catch (error) {
      message.error('删除失败，请重试');
    }
  };

  // --------------------------------------------------------------------------
  // 渲染 JSX
  // --------------------------------------------------------------------------

  return (
    <div className="space-y-6">
      {/* 页面头部 */}
      <PageHeader
        title="考试管理"
        description="创建和管理考试，支持5状态生命周期管理"
        extra={
          <Space>
            <Button
              icon={<InboxOutlined />}
              onClick={() => router.push('/dashboard/exams/archived')}
            >
              📦 查看归档
            </Button>
            <Button icon={<ReloadOutlined />} onClick={loadExams}>
              刷新
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleCreate}
              size="large"
            >
              创建考试
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

      {/* Kanban看板视图 */}
      <Spin spinning={loading}>
        <KanbanLayout
          examsByStatus={examsByStatus}
          expandedLane={expandedLane}
          setExpandedLane={setExpandedLane}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onExamCardClick={(exam) => handleView(exam.id)}
          onEdit={handleEdit}
          onDelete={handleDeleteExam}
          onViewParticipants={handleViewParticipants}
          onStatusChange={handleStatusChange}
          onCopyLink={handleCopyLink}
        />
      </Spin>

      {/* 考试表单 */}
      <ExamForm
        open={isFormVisible}
        form={form}
        loading={loading}
        mode={editorMode}
        initialData={editingExam}
        onCancel={() => setIsFormVisible(false)}
        onFinish={handleFinish}
      />
    </div>
  );
}
