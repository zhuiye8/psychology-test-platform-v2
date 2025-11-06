/**
 * Analytics结果表格列定义
 *
 * 定义详细考试结果表格的列配置
 */

import { Progress } from 'antd';
import type { ColumnsType } from 'antd/es/table';

// ============================================================================
// 类型定义
// ============================================================================

export interface ExamResult {
  id: string;
  studentName: string;
  examTitle: string;
  score: number;
  emotionScore: number;
  attentionScore: number;
  completionTime: number;
  submitTime: string;
  aiAnalysisStatus: 'completed' | 'processing' | 'failed';
}

// ============================================================================
// 辅助函数
// ============================================================================

const getAiStatusText = (status: string) => {
  switch (status) {
    case 'completed':
      return '已完成';
    case 'processing':
      return '分析中';
    case 'failed':
      return '失败';
    default:
      return status;
  }
};

// ============================================================================
// 表格列定义
// ============================================================================

export const columns: ColumnsType<ExamResult> = [
  {
    title: '学生姓名',
    dataIndex: 'studentName',
    key: 'studentName',
  },
  {
    title: '考试名称',
    dataIndex: 'examTitle',
    key: 'examTitle',
  },
  {
    title: '考试分数',
    dataIndex: 'score',
    key: 'score',
    render: (score) => (
      <span
        className={
          score >= 80
            ? 'text-green-600 font-medium'
            : score >= 60
            ? 'text-orange-600'
            : 'text-red-600'
        }
      >
        {score}
      </span>
    ),
  },
  {
    title: '情绪得分',
    dataIndex: 'emotionScore',
    key: 'emotionScore',
    render: (score) => (
      <div>
        <Progress
          percent={score}
          size="small"
          strokeColor={
            score >= 80 ? '#52c41a' : score >= 60 ? '#faad14' : '#f5222d'
          }
        />
      </div>
    ),
  },
  {
    title: '注意力得分',
    dataIndex: 'attentionScore',
    key: 'attentionScore',
    render: (score) => (
      <div>
        <Progress
          percent={score}
          size="small"
          strokeColor={
            score >= 80 ? '#52c41a' : score >= 60 ? '#faad14' : '#f5222d'
          }
        />
      </div>
    ),
  },
  {
    title: '完成时间',
    dataIndex: 'completionTime',
    key: 'completionTime',
    render: (time) => `${time} 分钟`,
  },
  {
    title: 'AI分析状态',
    dataIndex: 'aiAnalysisStatus',
    key: 'aiAnalysisStatus',
    render: (status) => (
      <span
        className={`px-2 py-1 rounded text-xs ${
          status === 'completed'
            ? 'bg-green-100 text-green-700'
            : status === 'processing'
            ? 'bg-blue-100 text-blue-700'
            : 'bg-red-100 text-red-700'
        }`}
      >
        {getAiStatusText(status)}
      </span>
    ),
  },
];
