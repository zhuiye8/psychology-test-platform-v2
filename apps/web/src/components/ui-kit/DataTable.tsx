'use client';

/**
 * DataTable - 通用数据表格组件
 *
 * 封装Ant Design Table，提供统一的分页、加载状态等功能
 */

import { Table } from 'antd';
import type { TableProps, TablePaginationConfig } from 'antd/es/table';
import type { ColumnsType } from 'antd/es/table';

// ============================================================================
// 类型定义
// ============================================================================

export interface DataTablePagination {
  /** 当前页码 */
  current: number;
  /** 每页条数 */
  pageSize: number;
  /** 总条数 */
  total: number;
}

export interface DataTableProps<T> extends Omit<TableProps<T>, 'pagination' | 'onChange'> {
  /** 表格列定义 */
  columns: ColumnsType<T>;
  /** 数据源 */
  dataSource: T[];
  /** 加载状态 */
  loading?: boolean;
  /** 分页配置 */
  pagination?: DataTablePagination;
  /** 是否显示分页 */
  showPagination?: boolean;
  /** 分页变化回调 */
  onPaginationChange?: (page: number, pageSize: number) => void;
}

// ============================================================================
// 组件实现
// ============================================================================

export function DataTable<T extends Record<string, any>>({
  columns,
  dataSource,
  loading = false,
  pagination,
  showPagination = true,
  onPaginationChange,
  rowKey = 'id',
  ...restProps
}: DataTableProps<T>) {
  // 构建分页配置
  const paginationConfig: TablePaginationConfig | false = showPagination && pagination
    ? {
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
        showTotal: (total) => `共 ${total} 条`,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['10', '20', '50', '100'],
      }
    : false;

  // 处理分页变化
  const handleTableChange = (newPagination: TablePaginationConfig) => {
    if (onPaginationChange && newPagination.current && newPagination.pageSize) {
      onPaginationChange(newPagination.current, newPagination.pageSize);
    }
  };

  return (
    <Table<T>
      columns={columns}
      dataSource={dataSource}
      rowKey={rowKey}
      loading={loading}
      pagination={paginationConfig}
      onChange={handleTableChange}
      {...restProps}
    />
  );
}

export default DataTable;
