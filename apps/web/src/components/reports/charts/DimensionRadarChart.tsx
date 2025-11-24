'use client';

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { Card } from 'antd';
import type { DimensionScore } from '@/services/reports';

interface DimensionRadarChartProps {
  dimensionScores: DimensionScore[];
  title?: string;
}

/**
 * 维度雷达图组件
 *
 * 用于展示测试各维度的得分情况
 */
export function DimensionRadarChart({
  dimensionScores,
  title = '维度得分雷达图',
}: DimensionRadarChartProps) {
  // 转换数据格式
  const chartData = dimensionScores.map((score) => ({
    dimension: score.dimension_name,
    score: score.mean,
    percentage: score.percentage * 100,
  }));

  return (
    <Card title={title} className="mb-6">
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={chartData}>
          <PolarGrid />
          <PolarAngleAxis
            dataKey="dimension"
            tick={{ fill: '#666', fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 5]}
            tick={{ fill: '#666' }}
          />
          <Radar
            name="得分"
            dataKey="score"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.6}
          />
          <Tooltip
            formatter={(value: number, name: string) => {
              if (name === 'score') {
                return [`${value.toFixed(2)} 分`, '平均得分'];
              }
              return [value, name];
            }}
            labelFormatter={(label) => `维度: ${label}`}
          />
        </RadarChart>
      </ResponsiveContainer>
      <div className="mt-4 text-sm text-gray-600">
        <p>💡 提示：雷达图越向外扩展，表示该维度得分越高</p>
      </div>
    </Card>
  );
}
