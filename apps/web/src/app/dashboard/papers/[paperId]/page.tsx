'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Card,
  Button,
  Space,
  Tag,
  Descriptions,
  Table,
  App,
  Spin,
  Empty,
  Popconfirm,
} from 'antd';
import {
  ArrowLeftOutlined,
  PlusOutlined,
  SaveOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

// 组件和服务导入
import { PageHeader } from '@/components/ui-kit';
import papersApi, { type Paper } from '@/services/papers';
import questionsApi, { type Question } from '@/services/questions';
import { DraggableRow } from './components/DraggableQuestionRow';
import { QuestionStatsCard } from './components/QuestionStatsCard';
import { columns } from './components/columns';

// ============================================================================
// 主组件
// ============================================================================

export default function PaperDetailPage() {
  const { message } = App.useApp();

  // --------------------------------------------------------------------------
  // Hooks
  // --------------------------------------------------------------------------

  const router = useRouter();
  const params = useParams();
  const paperId = params.paperId as string;

  // --------------------------------------------------------------------------
  // State 状态管理
  // --------------------------------------------------------------------------

  const [paper, setPaper] = useState<Paper | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOrderChanged, setIsOrderChanged] = useState(false);
  const [isSavingOrder, setIsSavingOrder] = useState(false);

  // --------------------------------------------------------------------------
  // DnD 配置
  // --------------------------------------------------------------------------

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // --------------------------------------------------------------------------
  // 数据加载函数
  // --------------------------------------------------------------------------

  /** 加载试卷详情和题目列表 */
  const loadPaperData = async () => {
    try {
      setLoading(true);
      const [paperData, questionsData] = await Promise.all([
        papersApi.getById(paperId),
        questionsApi.findAllByPaper(paperId),
      ]);
      setPaper(paperData);
      setQuestions(questionsData.sort((a, b) => a.order - b.order));
    } catch (error) {
      message.error('加载试卷数据失败');
      console.error('加载失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------------------------------
  // 生命周期 Effects
  // --------------------------------------------------------------------------

  /** 初始化加载数据 */
  useEffect(() => {
    if (paperId) {
      loadPaperData();
    }
  }, [paperId]);

  // --------------------------------------------------------------------------
  // 事件处理函数
  // --------------------------------------------------------------------------

  /** 返回列表 */
  const handleBack = () => {
    router.push('/dashboard/papers');
  };

  /** 编辑试卷 */
  const handleEditPaper = () => {
    router.push(`/dashboard/papers?edit=${paperId}`);
  };

  /** 删除试卷 */
  const handleDeletePaper = async () => {
    try {
      await papersApi.delete(paperId);
      message.success('试卷删除成功');
      router.push('/dashboard/papers');
    } catch (error) {
      message.error('删除失败，请重试');
    }
  };

  /** 添加题目 */
  const handleAddQuestion = () => {
    router.push(`/dashboard/questions?paperId=${paperId}`);
  };

  /** 拖拽结束处理 */
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setQuestions((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);
        const newItems = arrayMove(items, oldIndex, newIndex);

        // 更新order字段
        const updatedItems = newItems.map((item, index) => ({
          ...item,
          order: index + 1,
        }));

        setIsOrderChanged(true);
        return updatedItems;
      });
    }
  };

  /** 保存排序 */
  const handleSaveOrder = async () => {
    try {
      setIsSavingOrder(true);
      const questionIds = questions.map((q) => q.id);
      await questionsApi.updateOrder(paperId, questionIds);
      message.success('排序保存成功');
      setIsOrderChanged(false);
      loadPaperData();
    } catch (error) {
      message.error('保存排序失败，请重试');
    } finally {
      setIsSavingOrder(false);
    }
  };

  /** 重置排序 */
  const handleResetOrder = () => {
    loadPaperData();
    setIsOrderChanged(false);
  };

  // --------------------------------------------------------------------------
  // 渲染条件
  // --------------------------------------------------------------------------

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" tip="加载中...">
          <div />
        </Spin>
      </div>
    );
  }

  if (!paper) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Empty description="试卷不存在" />
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 渲染 JSX
  // --------------------------------------------------------------------------

  return (
    <div className="space-y-6">
      {/* 页面头部 */}
      <PageHeader
        title={
          <Space>
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={handleBack}
            />
            <span>{paper.title}</span>
          </Space>
        }
        description="查看和管理试卷的题目"
        extra={
          <Space>
            <Button
              icon={<PlusOutlined />}
              onClick={handleAddQuestion}
              type="primary"
            >
              添加题目
            </Button>
            <Button icon={<EditOutlined />} onClick={handleEditPaper}>
              编辑试卷
            </Button>
            <Popconfirm
              title="确定要删除这个试卷吗？"
              description="删除后该试卷及所有题目将无法恢复"
              onConfirm={handleDeletePaper}
              okText="确定"
              cancelText="取消"
            >
              <Button danger icon={<DeleteOutlined />}>
                删除试卷
              </Button>
            </Popconfirm>
          </Space>
        }
      />

      {/* 试卷信息卡片 */}
      <Card title="试卷信息" className="shadow-sm">
        <Descriptions column={2} bordered>
          <Descriptions.Item label="试卷名称">
            {paper.title}
          </Descriptions.Item>
          <Descriptions.Item label="分类">
            {paper.category || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="试卷描述" span={2}>
            {paper.description || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="时间限制">
            {paper.timeLimit ? `${paper.timeLimit} 分钟` : '无限制'}
          </Descriptions.Item>
          <Descriptions.Item label="题目数量">
            {questions.length} 题
          </Descriptions.Item>
          <Descriptions.Item label="总分">
            {questions.reduce((sum, q) => sum + q.points, 0)} 分
          </Descriptions.Item>
          <Descriptions.Item label="允许重考">
            <Tag color={paper.allowRetake ? 'green' : 'red'}>
              {paper.allowRetake ? '是' : '否'}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="立即显示结果">
            <Tag color={paper.showResultsImmediately ? 'green' : 'orange'}>
              {paper.showResultsImmediately ? '是' : '否'}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="随机题序">
            <Tag color={paper.randomizeQuestions ? 'blue' : 'default'}>
              {paper.randomizeQuestions ? '是' : '否'}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="状态">
            <Tag color={paper.isActive ? 'success' : 'error'}>
              {paper.isActive ? '启用' : '禁用'}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="创建时间">
            {new Date(paper.createdAt).toLocaleString('zh-CN')}
          </Descriptions.Item>
          <Descriptions.Item label="更新时间">
            {new Date(paper.updatedAt).toLocaleString('zh-CN')}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* 题目统计卡片 */}
      <QuestionStatsCard questions={questions} />

      {/* 题目列表卡片 */}
      <Card
        title={
          <Space>
            <span>题目列表</span>
            <Tag color="blue">{questions.length} 题</Tag>
            {isOrderChanged && <Tag color="orange">排序已修改</Tag>}
          </Space>
        }
        className="shadow-sm"
        extra={
          <Space>
            {isOrderChanged && (
              <>
                <Button
                  type="default"
                  onClick={handleResetOrder}
                  disabled={isSavingOrder}
                >
                  重置
                </Button>
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  onClick={handleSaveOrder}
                  loading={isSavingOrder}
                >
                  保存排序
                </Button>
              </>
            )}
            <Button
              type="link"
              icon={<PlusOutlined />}
              onClick={handleAddQuestion}
            >
              添加题目
            </Button>
          </Space>
        }
      >
        {questions.length > 0 ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={questions.map((q) => q.id)}
              strategy={verticalListSortingStrategy}
            >
              <Table
                columns={columns}
                dataSource={questions}
                rowKey="id"
                pagination={false}
                scroll={{ x: 1000 }}
                components={{
                  body: {
                    row: DraggableRow,
                  },
                }}
              />
            </SortableContext>
          </DndContext>
        ) : (
          <Empty
            description="暂无题目"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddQuestion}
            >
              添加第一道题目
            </Button>
          </Empty>
        )}
      </Card>
    </div>
  );
}
