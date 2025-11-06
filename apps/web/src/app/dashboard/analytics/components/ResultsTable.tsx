/**
 * Analytics结果表格组件
 *
 * 展示详细考试结果列表
 */

import { Card, Table } from 'antd';
import { columns, type ExamResult } from './columns';

// ============================================================================
// 类型定义
// ============================================================================

export interface ResultsTableProps {
  data: ExamResult[];
}

// ============================================================================
// 主组件
// ============================================================================

export function ResultsTable({ data }: ResultsTableProps) {
  return (
    <Card title="详细考试结果">
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{
          total: data.length,
          showTotal: (total) => `共 ${total} 条记录`,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />
    </Card>
  );
}
