/**
 * Papers详情页题目表格列定义
 *
 * 定义题目列表表格的列配置
 */

import { Tag } from 'antd';
import { DragOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { type Question, QuestionType } from '@/services/questions';

// ============================================================================
// 常量定义
// ============================================================================

// 题型显示配置
export const QUESTION_TYPE_CONFIG: Record<
  QuestionType,
  { text: string; color: string }
> = {
  [QuestionType.SINGLE_CHOICE]: { text: '单选题', color: 'blue' },
  [QuestionType.MULTIPLE_CHOICE]: { text: '多选题', color: 'purple' },
  [QuestionType.TEXT]: { text: '文本题', color: 'green' },
  [QuestionType.ESSAY]: { text: '问答题', color: 'orange' },
};

// ============================================================================
// 表格列定义
// ============================================================================

export const columns: ColumnsType<Question> = [
  {
    title: '排序',
    dataIndex: 'order',
    key: 'order',
    width: 80,
    render: (order) => (
      <div className="flex items-center">
        <DragOutlined className="mr-2 text-gray-400 cursor-move hover:text-blue-500" />
        <span className="font-medium">{order}</span>
      </div>
    ),
  },
  {
    title: '题目',
    dataIndex: 'title',
    key: 'title',
    render: (text, record) => (
      <div>
        <div className="font-medium text-gray-900 mb-1">{text}</div>
        {record.description && (
          <div className="text-sm text-gray-500">{record.description}</div>
        )}
      </div>
    ),
  },
  {
    title: '题型',
    dataIndex: 'type',
    key: 'type',
    width: 100,
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
    title: '必答',
    dataIndex: 'required',
    key: 'required',
    width: 80,
    render: (required) => (
      <Tag color={required ? 'red' : 'default'}>
        {required ? '是' : '否'}
      </Tag>
    ),
  },
  {
    title: '选项数',
    key: 'optionsCount',
    width: 90,
    render: (_, record) => {
      if (
        record.type === QuestionType.TEXT ||
        record.type === QuestionType.ESSAY
      ) {
        return <span className="text-gray-400">-</span>;
      }
      return <span>{record.options?.length || 0}</span>;
    },
  },
];
