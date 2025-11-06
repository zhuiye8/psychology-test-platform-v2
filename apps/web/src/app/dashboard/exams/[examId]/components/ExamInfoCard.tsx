/**
 * Exam Info Card Component
 *
 * 考试信息卡片（基本信息 + 操作按钮）
 */

import { Card, Descriptions, Space, Button, Tag, Popconfirm, Typography, App } from 'antd';
import {
  ReloadOutlined,
  CopyOutlined,
  EditOutlined,
  DeleteOutlined,
  InboxOutlined,
  LinkOutlined,
} from '@ant-design/icons';

const { Link } = Typography;
import { type Exam, ExamStatus } from '@/services/exams';

// ============================================================================
// 类型定义
// ============================================================================

export interface ExamInfoCardProps {
  exam: Exam;
  loading: boolean;
  onRefresh: () => void;
  onCopyPublicUrl: () => void;
  onEdit: () => void;
  onPublish: () => void;
  onMarkSuccess: () => void;
  onStop: () => void;
  onArchive: () => void;
  onDelete: () => void;
}

// ============================================================================
// 主组件
// ============================================================================

export function ExamInfoCard({
  exam,
  loading,
  onRefresh,
  onCopyPublicUrl,
  onEdit,
  onPublish,
  onMarkSuccess,
  onStop,
  onArchive,
  onDelete,
}: ExamInfoCardProps) {
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
  return (
    <Card
      title="考试信息"
      className="mb-6"
      extra={
        <Space>
          <Button icon={<ReloadOutlined />} onClick={onRefresh} loading={loading}>
            刷新
          </Button>
          {exam.status === ExamStatus.PUBLISHED && (
            <Button icon={<CopyOutlined />} onClick={handleCopyLink}>
              复制考试链接
            </Button>
          )}
          {exam.status === ExamStatus.DRAFT && (
            <>
              <Button icon={<EditOutlined />} onClick={onEdit}>
                编辑
              </Button>
              <Button type="primary" onClick={onPublish}>
                发布考试
              </Button>
            </>
          )}
          {exam.status === ExamStatus.PUBLISHED && (
            <>
              <Button onClick={onMarkSuccess}>正常结束</Button>
              <Button onClick={onStop}>停止并回到草稿</Button>
            </>
          )}
          {exam.status === ExamStatus.SUCCESS && (
            <Button icon={<InboxOutlined />} onClick={onArchive}>
              归档
            </Button>
          )}
          {exam.status === ExamStatus.ARCHIVED && (
            <Popconfirm
              title="确定删除这个考试吗？"
              description="删除后无法恢复"
              onConfirm={onDelete}
              okText="确定"
              cancelText="取消"
            >
              <Button danger icon={<DeleteOutlined />}>
                删除
              </Button>
            </Popconfirm>
          )}
        </Space>
      }
    >
      <Descriptions column={2} bordered>
        <Descriptions.Item label="考试名称">{exam.title}</Descriptions.Item>
        <Descriptions.Item label="试卷">
          {exam.paper?.title || '-'}
        </Descriptions.Item>
        {exam.status === ExamStatus.PUBLISHED && publicUrl && (
          <Descriptions.Item label="公开访问链接" span={2}>
            <Space>
              <LinkOutlined />
              <Link href={publicUrl} target="_blank" copyable>
                {publicUrl}
              </Link>
            </Space>
          </Descriptions.Item>
        )}
        <Descriptions.Item label="考试描述" span={2}>
          {exam.description || '-'}
        </Descriptions.Item>
        <Descriptions.Item label="开始时间">
          {exam.startTime
            ? new Date(exam.startTime).toLocaleString('zh-CN')
            : '立即开始'}
        </Descriptions.Item>
        <Descriptions.Item label="结束时间">
          {exam.endTime
            ? new Date(exam.endTime).toLocaleString('zh-CN')
            : '不限时'}
        </Descriptions.Item>
        <Descriptions.Item label="时长限制">
          {exam.timeLimit ? `${exam.timeLimit} 分钟` : '无限制'}
        </Descriptions.Item>
        <Descriptions.Item label="访问码">
          {exam.accessCode || '无需访问码'}
        </Descriptions.Item>
        <Descriptions.Item label="最大尝试次数">
          {exam.maxAttempts} 次
        </Descriptions.Item>
        <Descriptions.Item label="启用摄像头">
          <Tag color={exam.requireCamera ? 'red' : 'default'}>
            {exam.requireCamera ? '是' : '否'}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="启用麦克风">
          <Tag color={exam.requireMicrophone ? 'red' : 'default'}>
            {exam.requireMicrophone ? '是' : '否'}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="启用AI分析">
          <Tag color={exam.enableAIAnalysis ? 'purple' : 'default'}>
            {exam.enableAIAnalysis ? '是' : '否'}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="创建时间">
          {new Date(exam.createdAt).toLocaleString('zh-CN')}
        </Descriptions.Item>
        <Descriptions.Item label="更新时间">
          {new Date(exam.updatedAt).toLocaleString('zh-CN')}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
}
