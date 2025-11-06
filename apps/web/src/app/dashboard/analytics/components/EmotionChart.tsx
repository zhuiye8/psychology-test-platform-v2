/**
 * 情绪分布图表组件
 *
 * 展示AI分析的情绪状态分布饼图
 */

import { Card } from 'antd';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// ============================================================================
// 类型定义
// ============================================================================

export interface EmotionData {
  emotion: string;
  count: number;
  percentage: number;
}

export interface EmotionChartProps {
  data: EmotionData[];
}

// ============================================================================
// 常量定义
// ============================================================================

const COLORS = ['#52c41a', '#1890ff', '#faad14', '#f5222d'];

// ============================================================================
// 主组件
// ============================================================================

export function EmotionChart({ data }: EmotionChartProps) {
  const hasData = data.some((d) => d.count > 0);

  return (
    <Card title="情绪状态分布（AI分析）" className="h-96">
      {hasData ? (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ emotion, percentage }) => `${emotion} ${percentage}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="count"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-full flex items-center justify-center text-gray-400">
          <div className="text-center">
            <p>暂无AI分析数据</p>
            <p className="text-sm mt-2">需要启用摄像头和AI分析功能</p>
          </div>
        </div>
      )}
    </Card>
  );
}
