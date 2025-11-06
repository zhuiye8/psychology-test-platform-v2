/**
 * Kanban看板布局组件
 * 管理所有泳道的容器组件
 */

import { useCallback } from 'react';
import type { Exam, ExamStatus } from '../../services/exams';
import { KanbanLane } from './KanbanLane';
import { kanbanDisplayStatuses } from './kanbanUtils';

// ============================================================================
// 类型定义
// ============================================================================

interface KanbanLayoutProps {
  examsByStatus: Record<ExamStatus, Exam[]>;
  expandedLane: ExamStatus;
  setExpandedLane: (lane: ExamStatus) => void;
  currentPage: Record<ExamStatus, number>;
  setCurrentPage: (pages: Record<ExamStatus, number>) => void;
  onExamCardClick?: (exam: Exam) => void;
  onEdit?: (exam: Exam) => void;
  onDelete?: (exam: Exam) => void;
  onViewParticipants?: (exam: Exam) => void;
  onStatusChange?: (exam: Exam, newStatus: ExamStatus) => void;
  onCopyLink?: (exam: Exam) => void;
}

// ============================================================================
// 组件实现
// ============================================================================

export function KanbanLayout({
  examsByStatus,
  expandedLane,
  setExpandedLane,
  currentPage,
  setCurrentPage,
  onExamCardClick,
  onEdit,
  onDelete,
  onViewParticipants,
  onStatusChange,
  onCopyLink,
}: KanbanLayoutProps) {
  // 获取按状态分组的考试
  const getExamsByStatus = useCallback(
    (status: ExamStatus) => {
      return examsByStatus[status] || [];
    },
    [examsByStatus]
  );

  // 处理泳道切换
  const handleLaneChange = useCallback(
    (status: ExamStatus) => {
      setExpandedLane(status);
      // 重置到第一页
      setCurrentPage({
        ...currentPage,
        [status]: 1,
      });
    },
    [setExpandedLane, currentPage, setCurrentPage]
  );

  // 处理分页变化
  const handlePageChange = useCallback(
    (status: ExamStatus, page: number) => {
      setCurrentPage({
        ...currentPage,
        [status]: page,
      });
    },
    [currentPage, setCurrentPage]
  );

  // 泳道顺序（只显示3个泳道：草稿、进行中、已完成）
  const statusOrder = kanbanDisplayStatuses;

  return (
    <div
      style={{
        display: 'flex',
        height: '600px',
        width: '100%',
        border: '1px solid #f0f0f0',
        borderRadius: '16px',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #fafafa 0%, #ffffff 100%)',
        padding: '8px',
        gap: '8px',
      }}
    >
      {statusOrder.map((status) => {
        const exams = getExamsByStatus(status);
        const isExpanded = expandedLane === status;
        const currentPageNum = currentPage[status] || 1;

        return (
          <KanbanLane
            key={status}
            status={status}
            exams={exams}
            isExpanded={isExpanded}
            currentPage={currentPageNum}
            onLaneClick={handleLaneChange}
            onPageChange={(page) => handlePageChange(status, page)}
            onExamCardClick={onExamCardClick}
            onEdit={onEdit}
            onDelete={onDelete}
            onViewParticipants={onViewParticipants}
            onStatusChange={onStatusChange}
            onCopyLink={onCopyLink}
          />
        );
      })}
    </div>
  );
}
