import { Button, Space, Tag, Popconfirm } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { StatusBadge } from '@/components/ui-kit';
import type { Question } from '@/services/questions';
import { QuestionType } from '@/services/questions';

// ============================================================================
// 题型配置
// ============================================================================

export const QUESTION_TYPE_CONFIG = {
  [QuestionType.SINGLE_CHOICE]: { text: '单选题', color: 'blue' },
  [QuestionType.MULTIPLE_CHOICE]: { text: '多选题', color: 'purple' },
  [QuestionType.TEXT]: { text: '文本题', color: 'green' },
  [QuestionType.ESSAY]: { text: '问答题', color: 'orange' },
} as const;

// ============================================================================
// 表格列配置
// ============================================================================

export interface QuestionTableHandlers {
  onEdit: (question: Question) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}

export function getQuestionColumns(handlers: QuestionTableHandlers): ColumnsType<Question> {
  return [
    {
      title: '题目内容',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <div>
          <div className="font-medium text-gray-900 line-clamp-2">{text}</div>
          {record.description && (
            <div className="text-sm text-gray-500 line-clamp-1 mt-1">
              {record.description}
            </div>
          )}
        </div>
      ),
    },
    {
      title: '题型',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      render: (type: QuestionType) => {
        const config = QUESTION_TYPE_CONFIG[type];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '分值',
      dataIndex: 'points',
      key: 'points',
      width: 80,
      render: (points) => <span className="font-medium">{points} 分</span>,
    },
    {
      title: '序号',
      dataIndex: 'order',
      key: 'order',
      width: 80,
      render: (order) => <span className="text-gray-500">{order}</span>,
    },
    {
      title: '必答',
      dataIndex: 'required',
      key: 'required',
      width: 80,
      render: (required: boolean) => (
        <StatusBadge
          status={required ? 'error' : 'default'}
          text={required ? '必答' : '选答'}
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
      width: 200,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handlers.onEdit(record)}
          >
            编辑
          </Button>
          <Button
            type="link"
            icon={<CopyOutlined />}
            onClick={() => handlers.onDuplicate(record.id)}
          >
            复制
          </Button>
          <Popconfirm
            title="确定要删除这个题目吗？"
            description="删除后该题目将无法恢复"
            onConfirm={() => handlers.onDelete(record.id)}
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
}
