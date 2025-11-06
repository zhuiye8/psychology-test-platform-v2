'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Card,
  Button,
  Space,
  Input,
  Select,
  Form,
  App,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  QuestionCircleOutlined,
  ArrowLeftOutlined,
  UploadOutlined,
} from '@ant-design/icons';

// 组件和服务导入
import { PageHeader, DataTable } from '@/components/ui-kit';
import { QuestionEditor } from '@/components/questions';
import questionsApi, {
  type Question,
  type CreateQuestionDto,
  QuestionType,
} from '@/services/questions';
import papersApi from '@/services/papers';
import { getQuestionColumns } from './columns';
import { ImportModal } from './ImportModal';

const { Search } = Input;

// ============================================================================
// 类型定义
// ============================================================================

// 当前文件无额外类型定义

// ============================================================================
// 主组件
// ============================================================================

export default function QuestionsPage() {
  const { message } = App.useApp();

  // --------------------------------------------------------------------------
  // Hooks
  // --------------------------------------------------------------------------

  const router = useRouter();
  const searchParams = useSearchParams();
  const urlPaperId = searchParams.get('paperId');
  const editId = searchParams.get('edit');

  // --------------------------------------------------------------------------
  // State 状态管理
  // --------------------------------------------------------------------------

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [paperFilter, setPaperFilter] = useState<string>(urlPaperId || 'all');
  const [papers, setPapers] = useState<Array<{ id: string; title: string }>>([]);
  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const [editorMode, setEditorMode] = useState<'create' | 'edit'>('create');
  const [editingQuestion, setEditingQuestion] = useState<Question | undefined>();
  const [form] = Form.useForm<CreateQuestionDto>();
  const [isImportModalVisible, setIsImportModalVisible] = useState(false);

  // 判断是否从试卷详情进入
  const isFromPaperDetail = !!urlPaperId;

  // --------------------------------------------------------------------------
  // 数据加载函数
  // --------------------------------------------------------------------------

  /** 加载试卷列表 */
  const loadPapers = async () => {
    try {
      const response = await papersApi.list({ limit: 100 });
      setPapers(response.data.map((p) => ({ id: p.id, title: p.title })));
    } catch (error) {
      console.error('加载试卷列表失败:', error);
    }
  };

  /** 加载题目列表 */
  const loadQuestions = async () => {
    if (paperFilter === 'all') {
      message.warning('请先选择一个试卷');
      setQuestions([]);
      return;
    }

    try {
      setLoading(true);
      const data = await questionsApi.findAllByPaper(paperFilter);

      // 前端筛选（按类型和搜索文本）
      let filteredData = data;
      if (typeFilter !== 'all') {
        filteredData = filteredData.filter((q) => q.type === typeFilter);
      }
      if (searchText) {
        filteredData = filteredData.filter((q) =>
          q.title.toLowerCase().includes(searchText.toLowerCase())
        );
      }

      setQuestions(filteredData);
    } catch (error) {
      message.error('加载题目列表失败');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------------------------------
  // 生命周期 Effects
  // --------------------------------------------------------------------------

  /** 初始化加载试卷列表 */
  useEffect(() => {
    loadPapers();
  }, []);

  /** 试卷变化时加载题目 */
  useEffect(() => {
    if (paperFilter !== 'all') {
      loadQuestions();
    }
  }, [paperFilter, typeFilter, searchText]);

  /** 监听 URL 参数变化 */
  useEffect(() => {
    if (urlPaperId) {
      setPaperFilter(urlPaperId);
    }
  }, [urlPaperId]);

  /** 自动打开编辑弹窗 */
  useEffect(() => {
    if (editId && questions.length > 0) {
      const question = questions.find(q => q.id === editId);
      if (question) {
        handleEdit(question);
      }
    }
  }, [editId, questions]);

  // --------------------------------------------------------------------------
  // 事件处理函数
  // --------------------------------------------------------------------------

  /** 返回试卷详情 */
  const handleBack = () => {
    if (urlPaperId) {
      router.push(`/dashboard/papers/${urlPaperId}`);
    }
  };

  /** 创建题目 */
  const handleCreate = () => {
    if (paperFilter === 'all') {
      message.warning('请先选择一个试卷');
      return;
    }
    setEditorMode('create');
    setEditingQuestion(undefined);
    form.resetFields();
    setIsEditorVisible(true);
  };

  /** 编辑题目 */
  const handleEdit = (question: Question) => {
    setEditorMode('edit');
    setEditingQuestion(question);
    setIsEditorVisible(true);
  };

  /** 删除题目 */
  const handleDelete = async (id: string) => {
    try {
      await questionsApi.delete(id);
      message.success('题目删除成功');
      loadQuestions();
    } catch (error) {
      message.error('删除失败，请重试');
    }
  };

  /** 复制题目 */
  const handleDuplicate = async (id: string) => {
    try {
      setLoading(true);
      await questionsApi.duplicate(id);
      message.success('题目复制成功');
      loadQuestions();
    } catch (error) {
      message.error('复制失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  /** 提交题目表单 */
  const handleFinish = async (values: CreateQuestionDto) => {
    try {
      setLoading(true);
      if (editorMode === 'create') {
        await questionsApi.create(paperFilter, values);
        message.success('题目创建成功');
      } else if (editingQuestion) {
        await questionsApi.update(editingQuestion.id, values);
        message.success('题目更新成功');
      }
      setIsEditorVisible(false);
      form.resetFields();
      loadQuestions();
    } catch (error) {
      message.error(editorMode === 'create' ? '创建失败，请重试' : '更新失败，请重试');
    } finally {
      setLoading(false);
    }
  };


  // --------------------------------------------------------------------------
  // 表格列配置
  // --------------------------------------------------------------------------

  const columns = getQuestionColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
    onDuplicate: handleDuplicate,
  });

  // --------------------------------------------------------------------------
  // 渲染 JSX
  // --------------------------------------------------------------------------

  return (
    <div className="space-y-6 modern-page-enter">
      {/* 页面头部 */}
      <PageHeader
        title={
          isFromPaperDetail ? (
            <Space>
              <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                onClick={handleBack}
              />
              <span>题目管理</span>
            </Space>
          ) : (
            '题目管理'
          )
        }
        description="管理试卷题目，支持单选、多选、文本和问答题型"
        extra={
          <Space>
            <Button
              icon={<UploadOutlined />}
              onClick={() => setIsImportModalVisible(true)}
              disabled={paperFilter === 'all'}
            >
              批量导入
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleCreate}
              size="large"
              disabled={paperFilter === 'all'}
            >
              创建题目
            </Button>
          </Space>
        }
      />

      {/* 主内容区 */}
      <Card className="modern-card-enter border-0">
        {/* 筛选和搜索 */}
        <div className="mb-4 flex items-center justify-between">
          <Space size="middle">
            {!isFromPaperDetail && (
              <Select
                value={paperFilter}
                onChange={setPaperFilter}
                style={{ width: 250 }}
                placeholder="选择试卷"
              >
                <Select.Option value="all">请选择试卷</Select.Option>
                {papers.map((paper) => (
                  <Select.Option key={paper.id} value={paper.id}>
                    {paper.title}
                  </Select.Option>
                ))}
              </Select>
            )}
            <Select
              value={typeFilter}
              onChange={setTypeFilter}
              style={{ width: 150 }}
            >
              <Select.Option value="all">全部题型</Select.Option>
              <Select.Option value={QuestionType.SINGLE_CHOICE}>单选题</Select.Option>
              <Select.Option value={QuestionType.MULTIPLE_CHOICE}>多选题</Select.Option>
              <Select.Option value={QuestionType.TEXT}>文本题</Select.Option>
              <Select.Option value={QuestionType.ESSAY}>问答题</Select.Option>
            </Select>
            <Search
              placeholder="搜索题目内容"
              allowClear
              style={{ width: 300 }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              prefix={<SearchOutlined />}
            />
          </Space>
        </div>

        {/* 数据表格 */}
        <DataTable
          columns={columns}
          dataSource={questions}
          loading={loading}
          showPagination={false}
        />
      </Card>

      {/* 题目编辑器 */}
      <QuestionEditor
        open={isEditorVisible}
        form={form}
        loading={loading}
        mode={editorMode}
        initialData={editingQuestion}
        availableQuestions={questions}
        currentQuestionId={editingQuestion?.id}
        onCancel={() => setIsEditorVisible(false)}
        onFinish={handleFinish}
      />

      {/* 批量导入模态框 */}
      <ImportModal
        open={isImportModalVisible}
        paperId={paperFilter}
        onCancel={() => setIsImportModalVisible(false)}
        onSuccess={loadQuestions}
      />
    </div>
  );
}
