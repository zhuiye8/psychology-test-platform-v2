/**
 * 可拖拽题目行组件
 *
 * 提供拖拽功能的表格行组件，支持视觉反馈
 */

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// ============================================================================
// 类型定义
// ============================================================================

interface DraggableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

// ============================================================================
// 主组件
// ============================================================================

export const DraggableRow: React.FC<DraggableRowProps> = ({
  children,
  ...props
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props['data-row-key'],
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'move',
    opacity: isDragging ? 0.5 : 1,
    backgroundColor: isDragging ? '#f0f0f0' : undefined,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      {...props}
    >
      {children}
    </tr>
  );
};
