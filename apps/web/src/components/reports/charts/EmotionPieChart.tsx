'use client';

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { Card } from 'antd';

interface EmotionPieChartProps {
  emotionDistribution: Record<string, number>;
  title?: string;
}

/**
 * 情绪分布饼图组件
 *
 * 用于展示AI分析的情绪分布数据
 */
export function EmotionPieChart({
  emotionDistribution,
  title = 'AI情绪分布分析',
}: EmotionPieChartProps) {
  // 情绪中文映射
  const emotionNameMap: Record<string, string> = {
    neutral: '平静',
    happy: '快乐',
    sad: '悲伤',
    angry: '愤怒',
    fear: '恐惧',
    surprise: '惊讶',
    disgust: '厌恶',
    other: '其他',
  };

  // 情绪颜色映射
  const emotionColorMap: Record<string, string> = {
    neutral: '#94a3b8',   // 灰色
    happy: '#fbbf24',     // 黄色
    sad: '#3b82f6',       // 蓝色
    angry: '#ef4444',     // 红色
    fear: '#8b5cf6',      // 紫色
    surprise: '#f97316',  // 橙色
    disgust: '#10b981',   // 绿色
    other: '#6b7280',     // 深灰
  };

  // 转换数据格式
  const chartData = Object.entries(emotionDistribution)
    .map(([emotion, value]) => ({
      name: emotionNameMap[emotion] || emotion,
      value: value * 100, // 转换为百分比
      color: emotionColorMap[emotion] || '#6b7280',
    }))
    .filter((item) => item.value > 0) // 过滤掉0值
    .sort((a, b) => b.value - a.value); // 按值降序排序

  return (
    <Card title={title} className="mb-6">
      {chartData.length > 0 ? (
        <>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name} ${entry.value.toFixed(1)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => `${value.toFixed(2)}%`}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 text-sm text-gray-600">
            <p>💡 提示：数据来源于AI视频情绪识别分析</p>
          </div>
        </>
      ) : (
        <div className="h-64 flex items-center justify-center text-gray-500">
          暂无情绪分布数据
        </div>
      )}
    </Card>
  );
}
