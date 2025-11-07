'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Card,
  Button,
  Space,
  Popconfirm,
  Input,
  Select,
  AutoComplete,
  Form,
  App,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
  SearchOutlined,
  FileTextOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

// 组件和服务导入
import { PageHeader, FormModal, DataTable, StatusBadge } from '../../../components/ui-kit';
import type { DataTablePagination } from '../../../components/ui-kit';
import papersApi, { type Paper, type CreatePaperDto } from '../../../services/papers';
import PaperPreviewModal from '../../../components/papers/PaperPreviewModal';

const { Search } = Input;

// ============================================================================
// 类型定义
// ============================================================================

// 当前文件无额外类型定义

// ============================================================================
// 主组件
// ============================================================================

export default function PapersPage() {
  const { message } = App.useApp();

  // --------------------------------------------------------------------------
  // Hooks
  // --------------------------------------------------------------------------

  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('edit');

  // --------------------------------------------------------------------------
  // State 状态管理
  // --------------------------------------------------------------------------

  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);
  const [previewPaperId, setPreviewPaperId] = useState<string | null>(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editorMode, setEditorMode] = useState<'create' | 'edit'>('create');
  const [editingPaper, setEditingPaper] = useState<Paper | undefined>();
  const [form] = Form.useForm<CreatePaperDto>();
  const [pagination, setPagination] = useState<DataTablePagination>({
    current: 1,
    pageSize: 20,
    total: 0,
  });

  // --------------------------------------------------------------------------
  // 数据加载函数
  // --------------------------------------------------------------------------

  /** 加载试卷列表 */
  const loadPapers = async () => {
    try {
      setLoading(true);
      const response = await papersApi.list({
        page: pagination.current,
        limit: pagination.pageSize,
        search: searchText || undefined,
        category: categoryFilter === 'all' ? undefined : categoryFilter,
      });

      setPapers(response.data);
      setPagination((prev) => ({
        ...prev,
        total: response.meta.total,
      }));
    } catch (error) {
      message.error('加载试卷列表失败');
    } finally {
      setLoading(false);
    }
  };

  /** 加载分类列表 */
  const loadCategories = async () => {
    try {
      const cats = await papersApi.getCategories();
      setCategories(cats);
    } catch (error) {
      console.error('加载分类失败:', error);
    }
  };

  // --------------------------------------------------------------------------
  // 生命周期 Effects
  // --------------------------------------------------------------------------

  /** 初始化加载和数据变化监听 */
  useEffect(() => {
    loadPapers();
    loadCategories();
  }, [pagination.current, pagination.pageSize, searchText, categoryFilter]);

  /** 处理URL中的edit参数 */
  useEffect(() => {
    if (editId && papers.length > 0) {
      const paper = papers.find((p) => p.id === editId);
      if (paper) {
        setEditorMode('edit');
        setEditingPaper(paper);
        form.setFieldsValue(paper);
        setIsModalVisible(true);
      }
    }
  }, [editId, papers]);

  // --------------------------------------------------------------------------
  // 事件处理函数
  // --------------------------------------------------------------------------

  /** 删除试卷 */
  const handleDelete = async (id: string) => {
    try {
      await papersApi.delete(id);
      message.success('试卷删除成功');
      loadPapers();
    } catch (error) {
      message.error('删除失败，请重试');
    }
  };

  /** 复制试卷 */
  const handleDuplicate = async (id: string) => {
    try {
      setLoading(true);
      await papersApi.duplicate(id);
      message.success('试卷复制成功');
      loadPapers();
    } catch (error) {
      message.error('复制失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  /** 创建/编辑试卷 */
  const handleFinish = async (values: CreatePaperDto) => {
    try {
      setLoading(true);
      if (editorMode === 'edit' && editingPaper) {
        await papersApi.update(editingPaper.id, values);
        message.success('试卷更新成功');
      } else {
        await papersApi.create(values);
        message.success('试卷创建成功');
      }
      setIsModalVisible(false);
      form.resetFields();
      setEditorMode('create');
      setEditingPaper(undefined);
      loadPapers();
      // 清除URL参数
      if (editId) {
        router.push('/dashboard/papers');
      }
    } catch (error) {
      message.error(editorMode === 'edit' ? '更新失败，请重试' : '创建失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  /** 打开创建对话框 */
  const handleCreate = () => {
    setEditorMode('create');
    setEditingPaper(undefined);
    form.resetFields();
    setIsModalVisible(true);
  };

  /** 分页变化处理 */
  const handlePaginationChange = (page: number, pageSize: number) => {
    setPagination({
      current: page,
      pageSize,
      total: pagination.total,
    });
  };

  // --------------------------------------------------------------------------
  // 表格列配置
  // --------------------------------------------------------------------------

  const columns: ColumnsType<Paper> = [
    {
      title: '试卷名称',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <div>
          <div className="font-medium text-gray-900">{text}</div>
          {record.description && (
            <div className="text-sm text-gray-500">{record.description}</div>
          )}
        </div>
      ),
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      width: 120,
      render: (category) => category || '-',
    },
    {
      title: '题目数量',
      dataIndex: '_count',
      key: 'questionCount',
      width: 100,
      render: (_count) => (
        <span className="font-medium">{_count?.questions || 0} 题</span>
      ),
    },
    {
      title: '时间限制',
      dataIndex: 'timeLimit',
      key: 'timeLimit',
      width: 100,
      render: (time) => <span>{time || '-'} 分钟</span>,
    },
    {
      title: '状态',
      dataIndex: 'isActive',
      key: 'isActive',
      width: 100,
      render: (isActive: boolean) => (
        <StatusBadge
          status={isActive ? 'success' : 'error'}
          text={isActive ? '启用' : '禁用'}
        />
      ),
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 180,
      render: (date: string) => new Date(date).toLocaleString('zh-CN'),
    },
    {
      title: '操作',
      key: 'actions',
      width: 250,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => {
              setPreviewPaperId(record.id);
              setIsPreviewVisible(true);
            }}
          >
            预览
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => router.push(`/dashboard/papers/${record.id}`)}
          >
            编辑
          </Button>
          <Button
            type="link"
            icon={<CopyOutlined />}
            onClick={() => handleDuplicate(record.id)}
          >
            复制
          </Button>
          <Popconfirm
            title="确定要删除这个试卷吗？"
            description="删除后该试卷将无法恢复"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
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
    <div className="space-y-6 modern-page-enter">
      {/* 页面头部 */}
      <PageHeader
        title="试卷管理"
        description="管理和编辑心理测试试卷"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreate}
            size="large"
          >
            创建试卷
          </Button>
        }
      />

      {/* 主内容区 */}
      <Card className="modern-card-enter border-0">
        {/* 搜索和筛选 */}
        <div className="mb-4 flex items-center justify-between">
          <Space size="middle">
            <Search
              placeholder="搜索试卷名称或描述"
              allowClear
              style={{ width: 300 }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onSearch={loadPapers}
              prefix={<SearchOutlined />}
            />
            <Select
              value={categoryFilter}
              onChange={setCategoryFilter}
              style={{ width: 150 }}
            >
              <Select.Option value="all">全部分类</Select.Option>
              {categories.map((cat) => (
                <Select.Option key={cat} value={cat}>
                  {cat}
                </Select.Option>
              ))}
            </Select>
          </Space>
        </div>

        {/* 数据表格 */}
        <DataTable
          columns={columns}
          dataSource={papers}
          loading={loading}
          pagination={pagination}
          onPaginationChange={handlePaginationChange}
        />
      </Card>

      {/* 创建/编辑试卷对话框 */}
      <FormModal
        title={editorMode === 'create' ? '创建新试卷' : '编辑试卷'}
        open={isModalVisible}
        form={form}
        loading={loading}
        okText={editorMode === 'create' ? '创建试卷' : '保存修改'}
        okIcon={<FileTextOutlined />}
        onCancel={() => {
          setIsModalVisible(false);
          setEditorMode('create');
          setEditingPaper(undefined);
          if (editId) {
            router.push('/dashboard/papers');
          }
        }}
        onFinish={handleFinish}
      >
        <Form.Item
          label="试卷名称"
          name="title"
          rules={[{ required: true, message: '请输入试卷名称' }]}
        >
          <Input placeholder="请输入试卷名称" />
        </Form.Item>

        <Form.Item label="试卷描述" name="description">
          <Input.TextArea rows={3} placeholder="请输入试卷描述（可选）" />
        </Form.Item>

        <Form.Item
          label="试卷分类"
          name="category"
          tooltip="可选择已有分类或输入新分类"
        >
          <AutoComplete
            placeholder="选择或输入分类（可选）"
            options={categories.map(cat => ({
              value: cat,
              label: cat
            }))}
            allowClear
            filterOption={(inputValue, option) =>
              option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
          />
        </Form.Item>

        <Form.Item
          label="时间限制（分钟）"
          name="timeLimit"
          initialValue={30}
        >
          <Input
            type="number"
            min={5}
            max={180}
            placeholder="30"
            addonAfter="分钟"
          />
        </Form.Item>
      </FormModal>

      {/* 预览试卷对话框 */}
      <PaperPreviewModal
        paperId={previewPaperId}
        open={isPreviewVisible}
        onCancel={() => setIsPreviewVisible(false)}
      />
    </div>
  );
}