'use client';

/**
 * ExamCard - 考试卡片组件
 *
 * 用于看板视图中展示单个考试的信息和操作按钮
 */

import { Card, Space, Button, Dropdown, Typography, Tag, App } from 'antd';
import type { MenuProps } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  EyeOutlined,
  PlayCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  InboxOutlined,
  UndoOutlined,
  CalendarOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import { ExamStatusBadge } from './ExamStatusBadge';
import type { Exam } from '../../services/exams';
import { ExamStatus } from '../../services/exams';

const { Text, Paragraph } = Typography;

// ============================================================================
// 类型定义
// ============================================================================

export interface ExamCardProps {
  /** 考试数据 */
  exam: Exam;
  /** 编辑回调 */
  onEdit?: (exam: Exam) => void;
  /** 删除回调 */
  onDelete?: (id: string) => void;
  /** 查看详情回调 */
  onView?: (id: string) => void;
  /** 发布回调 */
  onPublish?: (id: string) => void;
  /** 标记成功回调 */
  onMarkSuccess?: (id: string) => void;
  /** 过期回调 */
  onExpire?: (id: string) => void;
  /** 归档回调 */
  onArchive?: (id: string) => void;
  /** 恢复回调 */
  onRestore?: (id: string) => void;
}

// ============================================================================
// 辅助函数
// ============================================================================

/** 格式化日期时间 */
function formatDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// ============================================================================
// 组件实现
// ============================================================================

export function ExamCard({
  exam,
  onEdit,
  onDelete,
  onView,
  onPublish,
  onMarkSuccess,
  onExpire,
  onArchive,
  onRestore,
}: ExamCardProps) {
  const { message } = App.useApp();

  // 生成公开访问链接
  const publicUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/exam/${exam.id}/join`
    : '';

  // 复制链接到剪贴板
  const handleCopyLink = () => {
    if (publicUrl) {
      navigator.clipboard.writeText(publicUrl);
      message.success('考试链接已复制到剪贴板');
    }
  };

  // 构建操作菜单项
  const menuItems: MenuProps['items'] = [];

  // 根据状态添加操作项
  if (exam.status === ExamStatus.DRAFT) {
    menuItems.push(
      {
        key: 'publish',
        icon: <PlayCircleOutlined />,
        label: '发布考试',
        onClick: () => onPublish?.(exam.id),
      },
      {
        key: 'edit',
        icon: <EditOutlined />,
        label: '编辑',
        onClick: () => onEdit?.(exam),
      },
      {
        key: 'delete',
        icon: <DeleteOutlined />,
        label: '删除',
        danger: true,
        onClick: () => onDelete?.(exam.id),
      }
    );
  }

  if (exam.status === ExamStatus.PUBLISHED) {
    menuItems.push(
      {
        key: 'copyLink',
        icon: <CopyOutlined />,
        label: '复制考试链接',
        onClick: handleCopyLink,
      },
      {
        key: 'markSuccess',
        icon: <CheckCircleOutlined />,
        label: '标记成功',
        onClick: () => onMarkSuccess?.(exam.id),
      },
      {
        key: 'expire',
        icon: <CloseCircleOutlined />,
        label: '过期',
        onClick: () => onExpire?.(exam.id),
      }
    );
  }

  if (exam.status === ExamStatus.SUCCESS) {
    menuItems.push({
      key: 'archive',
      icon: <InboxOutlined />,
      label: '归档',
      onClick: () => onArchive?.(exam.id),
    });
  }

  if (exam.status === ExamStatus.ARCHIVED) {
    menuItems.push({
      key: 'restore',
      icon: <UndoOutlined />,
      label: '恢复',
      onClick: () => onRestore?.(exam.id),
    });
  }

  // 添加查看详情（所有状态都可以）
  menuItems.unshift({
    key: 'view',
    icon: <EyeOutlined />,
    label: '查看详情',
    onClick: () => onView?.(exam.id),
  });

  return (
    <Card
      size="small"
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onView?.(exam.id)}
      extra={
        <Dropdown menu={{ items: menuItems }} trigger={['click']}>
          <Button
            type="text"
            icon={<MoreOutlined />}
            size="small"
            onClick={(e) => e.stopPropagation()}
          />
        </Dropdown>
      }
    >
      {/* 标题和状态 */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <Text strong className="text-base">
            {exam.title}
          </Text>
        </div>
        <ExamStatusBadge status={exam.status} />
      </div>

      {/* 试卷信息 */}
      {exam.paper && (
        <div className="mb-2">
          <Tag color="blue" className="text-xs">
            {exam.paper.title}
          </Tag>
        </div>
      )}

      {/* 描述 */}
      {exam.description && (
        <Paragraph
          ellipsis={{ rows: 2 }}
          className="text-sm text-gray-600 mb-3"
          style={{ marginBottom: 12 }}
        >
          {exam.description}
        </Paragraph>
      )}

      {/* 时间信息 */}
      <Space direction="vertical" size={4} className="w-full text-xs text-gray-500">
        <div className="flex items-center">
          <CalendarOutlined className="mr-1" />
          <span>
            {formatDateTime(exam.startTime)} ~ {formatDateTime(exam.endTime)}
          </span>
        </div>

        {/* 参与人数 */}
        {exam._count && (
          <div className="flex items-center">
            <TeamOutlined className="mr-1" />
            <span>{exam._count.results} 人参与</span>
          </div>
        )}

        {/* 时间限制 */}
        {exam.timeLimit && (
          <div className="flex items-center">
            <ClockCircleOutlined className="mr-1" />
            <span>时限 {exam.timeLimit} 分钟</span>
          </div>
        )}
      </Space>

      {/* 特性标签 */}
      <div className="mt-3 flex flex-wrap gap-1">
        {exam.requireCamera && <Tag color="orange">摄像头</Tag>}
        {exam.requireMicrophone && <Tag color="purple">麦克风</Tag>}
        {exam.enableAIAnalysis && <Tag color="cyan">AI分析</Tag>}
        {exam.accessCode && <Tag color="green">需访问码</Tag>}
      </div>
    </Card>
  );
}

export default ExamCard;
