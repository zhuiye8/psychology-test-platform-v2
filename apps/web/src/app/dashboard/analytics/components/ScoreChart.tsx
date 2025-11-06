/**
 * 分数分布图表组件
 *
 * 展示考试分数分布的柱状图
 */

import { Card } from 'antd';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// ============================================================================
// 类型定义
// ============================================================================

export interface ScoreDistribution {
  range: string;
  count: number;
}

export interface ScoreChartProps {
  data: ScoreDistribution[];
}

// ============================================================================
// 主组件
// ============================================================================

export function ScoreChart({ data }: ScoreChartProps) {
  return (
    <Card title="分数分布统计" className="h-96">
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#1890ff" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-full flex items-center justify-center text-gray-400">
          暂无数据
        </div>
      )}
    </Card>
  );
}
