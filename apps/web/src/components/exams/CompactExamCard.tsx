/**
 * 紧凑型考试卡片组件（完整版）
 * 用于Kanban泳道展开后的网格展示
 * 包含完整的操作按钮和状态显示
 */

import { Card, Space, Typography, Badge, Tag, Tooltip, Button, Popconfirm } from 'antd';
import {
  ClockCircleOutlined,
  UserOutlined,
  CalendarOutlined,
  LockOutlined,
  LinkOutlined,
  EditOutlined,
  PlayCircleOutlined,
  StopOutlined,
  CheckCircleOutlined,
  EyeOutlined,
  InboxOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import type { Exam } from '../../services/exams';
import { ExamStatus } from '../../services/exams';

const { Text } = Typography;

// ============================================================================
// 类型定义
// ============================================================================

interface CompactExamCardProps {
  exam: Exam;
  onClick?: (exam: Exam) => void;
  onEdit?: (exam: Exam) => void;
  onDelete?: (exam: Exam) => void;
  onViewParticipants?: (exam: Exam) => void;
  onStatusChange?: (exam: Exam, newStatus: ExamStatus) => void;
  onCopyLink?: (exam: Exam) => void;
}

// ============================================================================
// 辅助函数
// ============================================================================

/** 获取考试状态信息 */
function getExamInfo(exam: Exam) {
  const now = new Date();
  const endTime = exam.endTime ? new Date(exam.endTime) : null;
  const startTime = exam.startTime ? new Date(exam.startTime) : null;

  // 紧急：距离结束不足1小时
  const isUrgent = Boolean(
    endTime &&
    endTime.getTime() - now.getTime() < 60 * 60 * 1000 &&
    exam.status === ExamStatus.PUBLISHED
  );

  // 活跃：正在进行中
  const isActive = Boolean(
    exam.status === ExamStatus.PUBLISHED &&
    (!startTime || startTime <= now) &&
    (!endTime || endTime > now)
  );

  return { isUrgent, isActive };
}

/** 获取卡片背景渐变 */
function getCardBackground(exam: Exam, isUrgent: boolean, isActive: boolean) {
  if (exam.status === ExamStatus.DRAFT) {
    return 'linear-gradient(135deg, #fffaf0 0%, #fff8e1 50%, #ffffff 100%)';
  }
  if (isUrgent) {
    return 'linear-gradient(135deg, #fff2f0 0%, #fef1f0 50%, #ffffff 100%)';
  }
  if (isActive) {
    return 'linear-gradient(135deg, #f0faf0 0%, #f6ffed 50%, #ffffff 100%)';
  }
  if (exam.status === ExamStatus.SUCCESS) {
    return 'linear-gradient(135deg, #f0f5ff 0%, #e6f7ff 50%, #ffffff 100%)';
  }
  return 'linear-gradient(135deg, #ffffff 0%, #fafafa 50%, #ffffff 100%)';
}

// ============================================================================
// 组件实现
// ============================================================================

export function CompactExamCard({
  exam,
  onClick,
  onEdit,
  onDelete,
  onViewParticipants,
  onStatusChange,
  onCopyLink,
}: CompactExamCardProps) {
  const { isUrgent, isActive } = getExamInfo(exam);

  // 格式化时间
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card
      size="small"
      className="kanban-card cursor-pointer"
      onClick={() => onClick?.(exam)}
      style={{
        border: `2px solid ${isActive ? '#52c41a' : '#f0f0f0'}`,
        height: '240px',
        background: getCardBackground(exam, isUrgent, isActive),
        position: 'relative',
        overflow: 'hidden',
      }}
      styles={{
        body: {
          padding: '14px',
          height: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
      }}
      hoverable
    >
      {/* 紧急标识 */}
      {isUrgent && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 0,
            height: 0,
            borderLeft: '20px solid transparent',
            borderTop: '20px solid #ff4d4f',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-18px',
              right: '-2px',
              color: 'white',
              fontSize: '10px',
              fontWeight: 'bold',
            }}
          >
            !
          </div>
        </div>
      )}

      {/* 内容区域 */}
      <div>
        {/* 标题 */}
        <div
          className="font-semibold text-lg mb-2 overflow-hidden"
          style={{
            color: isActive ? '#52c41a' : '#262626',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
          title={exam.title}
        >
          {exam.title}
        </div>

        {/* 标签行 */}
        <div style={{ marginBottom: 10, display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {isUrgent && (
            <Tag color="red" style={{ fontSize: '12px', margin: 0, borderRadius: '10px' }}>
              🔥 急
            </Tag>
          )}
          {exam._count && exam._count.results > 0 && (
            <Tag color="green" style={{ fontSize: '12px', margin: 0, borderRadius: '10px' }}>
              👥 {exam._count.results}人
            </Tag>
          )}
        </div>

        {/* 时间信息 */}
        <div style={{ fontSize: '12px', color: '#8c8c8c', marginBottom: 6 }}>
          <Space size={8}>
            <span>
              <ClockCircleOutlined /> {formatDate(exam.startTime)}
            </span>
          </Space>
        </div>

        {/* 高级设置标签 */}
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {exam.accessCode && (
            <Tooltip title="需要访问码">
              <Tag
                icon={<LockOutlined />}
                color="orange"
                style={{ fontSize: '11px', margin: 0, borderRadius: '8px' }}
              >
                密码
              </Tag>
            </Tooltip>
          )}
        </div>
      </div>

      {/* 操作按钮条 */}
      <div
        style={{
          position: 'absolute',
          right: 10,
          bottom: 10,
          display: 'flex',
          gap: 8,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 已发布：复制链接、参与者、停止（回到草稿）、结束 */}
        {exam.status === ExamStatus.PUBLISHED && (
          <>
            <Tooltip title="复制链接">
              <Button
                type="text"
                size="small"
                icon={<LinkOutlined style={{ fontSize: 16 }} />}
                onClick={() => onCopyLink?.(exam)}
                style={{ color: '#52c41a', border: '1px solid #52c41a30', height: 30 }}
              />
            </Tooltip>
            <Tooltip title="参与者">
              <Button
                type="text"
                size="small"
                icon={<EyeOutlined style={{ fontSize: 16 }} />}
                onClick={() => onViewParticipants?.(exam)}
                style={{ color: '#595959', border: '1px solid #d9d9d980', height: 30 }}
              />
            </Tooltip>
            <Tooltip title="停止并回到草稿">
              <Button
                type="text"
                size="small"
                icon={<StopOutlined style={{ fontSize: 16 }} />}
                onClick={() => onStatusChange?.(exam, ExamStatus.DRAFT)}
                style={{ color: '#faad14', border: '1px solid #faad1430', height: 30 }}
              />
            </Tooltip>
            <Tooltip title="正常结束">
              <Button
                type="text"
                size="small"
                icon={<CheckCircleOutlined style={{ fontSize: 16 }} />}
                onClick={() => onStatusChange?.(exam, ExamStatus.SUCCESS)}
                style={{ color: '#1890ff', border: '1px solid #1890ff30', height: 30 }}
              />
            </Tooltip>
          </>
        )}

        {/* 草稿：编辑、发布、删除 */}
        {exam.status === ExamStatus.DRAFT && (
          <>
            <Tooltip title="编辑">
              <Button
                type="text"
                size="small"
                icon={<EditOutlined style={{ fontSize: 16 }} />}
                onClick={() => onEdit?.(exam)}
                style={{ color: '#faad14', border: '1px solid #faad1430', height: 30 }}
              />
            </Tooltip>
            <Tooltip title="发布">
              <Button
                type="text"
                size="small"
                icon={<PlayCircleOutlined style={{ fontSize: 16 }} />}
                onClick={() => onStatusChange?.(exam, ExamStatus.PUBLISHED)}
                style={{ color: '#52c41a', border: '1px solid #52c41a30', height: 30 }}
              />
            </Tooltip>
            <Popconfirm
              title="永久删除草稿"
              description="草稿将被永久删除，无法恢复。确定要删除吗？"
              onConfirm={() => onDelete?.(exam)}
              okText="确定删除"
              cancelText="取消"
              okButtonProps={{ danger: true }}
            >
              <Tooltip title="删除">
                <Button
                  type="text"
                  size="small"
                  icon={<DeleteOutlined style={{ fontSize: 16 }} />}
                  style={{ color: '#ff4d4f', border: '1px solid #ff4d4f30', height: 30 }}
                />
              </Tooltip>
            </Popconfirm>
          </>
        )}

        {/* 已完成：参与者、归档 */}
        {exam.status === ExamStatus.SUCCESS && (
          <>
            <Tooltip title="参与者">
              <Button
                type="text"
                size="small"
                icon={<EyeOutlined style={{ fontSize: 16 }} />}
                onClick={() => onViewParticipants?.(exam)}
                style={{ color: '#595959', border: '1px solid #d9d9d980', height: 30 }}
              />
            </Tooltip>
            <Tooltip title="归档">
              <Button
                type="text"
                size="small"
                icon={<InboxOutlined style={{ fontSize: 16 }} />}
                onClick={() => onStatusChange?.(exam, ExamStatus.ARCHIVED)}
                style={{ color: '#8c8c8c', border: '1px solid #d9d9d980', height: 30 }}
              />
            </Tooltip>
          </>
        )}

        {/* 已归档：恢复到已完成、删除（软删除到DELETED） */}
        {exam.status === ExamStatus.ARCHIVED && (
          <>
            <Tooltip title="恢复到已完成">
              <Button
                type="text"
                size="small"
                icon={<CheckCircleOutlined style={{ fontSize: 16 }} />}
                onClick={() => onStatusChange?.(exam, ExamStatus.DRAFT)}
                style={{ color: '#1890ff', border: '1px solid #1890ff30', height: 30 }}
              />
            </Tooltip>
            <Tooltip title="永久删除（7天后）">
              <Button
                type="text"
                size="small"
                icon={<DeleteOutlined style={{ fontSize: 16 }} />}
                onClick={() => onDelete?.(exam)}
                style={{ color: '#ff4d4f', border: '1px solid #ff4d4f30', height: 30 }}
              />
            </Tooltip>
          </>
        )}
      </div>
    </Card>
  );
}
