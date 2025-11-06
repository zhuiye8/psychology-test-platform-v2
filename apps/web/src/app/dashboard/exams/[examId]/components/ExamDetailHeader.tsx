/**
 * Exam Detail Header Component
 *
 * 考试详情页头部（返回按钮 + 标题 + 状态）
 */

import { Button, Space, Tag } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ExamStatus } from '@/services/exams';

// ============================================================================
// 类型定义
// ============================================================================

export interface ExamDetailHeaderProps {
  title: string;
  status: ExamStatus;
  onBack: () => void;
}

// ============================================================================
// 状态配置
// ============================================================================

const STATUS_CONFIG: Record<ExamStatus, { text: string; color: string }> = {
  [ExamStatus.DRAFT]: { text: '草稿', color: 'default' },
  [ExamStatus.PUBLISHED]: { text: '进行中', color: 'processing' },
  [ExamStatus.SUCCESS]: { text: '已完成', color: 'success' },
  [ExamStatus.ARCHIVED]: { text: '已归档', color: 'warning' },
  [ExamStatus.DELETED]: { text: '已删除', color: 'error' },
};

// ============================================================================
// 主组件
// ============================================================================

export function ExamDetailHeader({ title, status, onBack }: ExamDetailHeaderProps) {
  const statusConfig = STATUS_CONFIG[status];

  return (
    <div className="mb-6">
      <Space size="middle">
        <Button icon={<ArrowLeftOutlined />} onClick={onBack}>
          返回
        </Button>
        <h1 className="text-2xl font-bold mb-0">{title}</h1>
        <Tag color={statusConfig.color}>{statusConfig.text}</Tag>
      </Space>
    </div>
  );
}
