/**
 * 注意力趋势图表组件
 *
 * 展示AI分析的注意力变化趋势折线图
 */

import { Card } from 'antd';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// ============================================================================
// 类型定义
// ============================================================================

export interface AttentionData {
  timeSlot: string;
  attentionLevel: number;
  participantCount: number;
}

export interface AttentionChartProps {
  data: AttentionData[];
}

// ============================================================================
// 主组件
// ============================================================================

export function AttentionChart({ data }: AttentionChartProps) {
  return (
    <Card title="注意力变化趋势（AI分析）" className="h-96">
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timeSlot" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="attentionLevel"
              stroke="#1890ff"
              strokeWidth={2}
              name="注意力水平"
            />
          </LineChart>
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
