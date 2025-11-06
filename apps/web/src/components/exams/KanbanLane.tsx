/**
 * Kanban泳道组件
 * 渲染单个状态泳道及其考试卡片
 */

import { useCallback } from 'react';
import { Space, Typography, Row, Col, Pagination, Badge, Progress, Empty } from 'antd';
import { RightOutlined, DownOutlined } from '@ant-design/icons';
import type { Exam, ExamStatus } from '../../services/exams';
import { CompactExamCard } from './CompactExamCard';
import {
  calculateLaneWidth,
  getPaginatedExams,
  getTotalPages,
  calculateCardLayout,
  laneConfig,
} from './kanbanUtils';

const { Text } = Typography;

// ============================================================================
// 类型定义
// ============================================================================

interface KanbanLaneProps {
  status: ExamStatus;
  exams: Exam[];
  isExpanded: boolean;
  currentPage: number;
  onLaneClick: (status: ExamStatus) => void;
  onPageChange: (page: number) => void;
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

export function KanbanLane({
  status,
  exams,
  isExpanded,
  currentPage,
  onLaneClick,
  onPageChange,
  onExamCardClick,
  onEdit,
  onDelete,
  onViewParticipants,
  onStatusChange,
  onCopyLink,
}: KanbanLaneProps) {
  const config = laneConfig[status];
  const { title, color, bgColor, Icon } = config;

  const paginatedExams = getPaginatedExams(exams, currentPage);
  const totalPages = getTotalPages(exams);
  const { columns, rows } = calculateCardLayout();

  const handleLaneHeaderClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isExpanded) {
        onLaneClick(status);
      }
    },
    [isExpanded, onLaneClick, status]
  );

  return (
    <div
      style={{
        width: calculateLaneWidth(isExpanded),
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        flexShrink: 0,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      className="kanban-lane"
      onClick={() => !isExpanded && onLaneClick(status)}
    >
      {/* 泳道头部 */}
      <div
        style={{
          background: isExpanded ? bgColor : '#fafafa',
          padding: isExpanded ? '16px' : '12px',
          borderRadius: isExpanded ? '12px 12px 0 0' : '12px',
          border: `2px solid ${isExpanded ? color : '#f0f0f0'}`,
          borderBottom: isExpanded ? 'none' : `2px solid #f0f0f0`,
          cursor: isExpanded ? 'default' : 'pointer',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: isExpanded ? `0 0 0 4px ${color}20` : 'none',
          height: isExpanded ? 'auto' : '100px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
        className={`kanban-lane-header ${isExpanded ? 'expanded' : 'collapsed'}`}
        onClick={handleLaneHeaderClick}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: isExpanded ? 8 : 6,
            flexDirection: 'row',
          }}
        >
          <Space size={8} direction="horizontal">
            <Icon
              style={{
                fontSize: isExpanded ? '24px' : '20px',
                color: isExpanded ? color : '#8c8c8c',
                transition: 'all 0.3s ease',
              }}
            />
            <Text
              style={{
                fontSize: isExpanded ? '18px' : '14px',
                fontWeight: 600,
                color: isExpanded ? color : '#8c8c8c',
                transition: 'all 0.3s ease',
              }}
            >
              {title}
            </Text>
          </Space>

          <Space size={8} direction="horizontal">
            <Badge
              count={exams.length}
              showZero
              style={{
                backgroundColor: color,
                fontSize: isExpanded ? '12px' : '11px',
              }}
            />
            {isExpanded ? (
              <DownOutlined style={{ fontSize: 12, color }} />
            ) : (
              <RightOutlined style={{ fontSize: 12, color: '#bfbfbf' }} />
            )}
          </Space>
        </div>

        {/* 展开状态：进度信息 */}
        {isExpanded && exams.length > 0 && (
          <div style={{ marginTop: '12px' }}>
            <Progress
              percent={Math.min(100, (paginatedExams.length / exams.length) * 100)}
              strokeColor={color}
              trailColor={`${color}20`}
              showInfo={false}
              size={4}
            />
            <div style={{ marginTop: '4px', textAlign: 'center' }}>
              <Text type="secondary" style={{ fontSize: '11px' }}>
                显示 {paginatedExams.length} / {exams.length} 项
              </Text>
            </div>
          </div>
        )}
      </div>

      {/* 展开内容区域 */}
      {isExpanded && (
        <div
          style={{
            background: '#ffffff',
            border: `2px solid ${color}`,
            borderTop: 'none',
            borderRadius: '0 0 12px 12px',
            padding: '16px',
            minHeight: '300px',
            flex: 1,
            overflowY: 'auto',
            boxShadow: `0 0 0 4px ${color}20`,
          }}
        >
          {exams.length > 0 ? (
            <>
              {/* 卡片网格 */}
              <Row gutter={[12, 12]} style={{ marginBottom: totalPages > 1 ? '16px' : 0 }}>
                {paginatedExams.map((exam) => (
                  <Col key={exam.id} span={8}>
                    <CompactExamCard
                      exam={exam}
                      onClick={onExamCardClick}
                      onEdit={onEdit}
                      onDelete={onDelete}
                      onViewParticipants={onViewParticipants}
                      onStatusChange={onStatusChange}
                      onCopyLink={onCopyLink}
                    />
                  </Col>
                ))}
              </Row>

              {/* 分页器 */}
              {totalPages > 1 && (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '12px 0',
                    borderTop: '1px solid #f0f0f0',
                  }}
                >
                  <Pagination
                    current={currentPage}
                    total={exams.length}
                    pageSize={columns * rows}
                    size="small"
                    showSizeChanger={false}
                    showQuickJumper={false}
                    showTotal={(total, range) => `${range[0]}-${range[1]} / ${total} 个考试`}
                    onChange={onPageChange}
                  />
                </div>
              )}
            </>
          ) : (
            <Empty
              description={`暂无${title}考试`}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              className="my-12"
            >
              <Icon style={{ fontSize: '48px', color: '#d9d9d9', marginBottom: '16px' }} />
            </Empty>
          )}
        </div>
      )}
    </div>
  );
}
