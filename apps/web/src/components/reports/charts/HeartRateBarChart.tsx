'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from 'recharts';
import { Card } from 'antd';

interface HeartRateBarChartProps {
  avgHeartRate: number;
  heartRateVariability: number;
  title?: string;
}

/**
 * 心率指标柱状图组件
 *
 * 用于展示AI分析的心率数据
 */
export function HeartRateBarChart({
  avgHeartRate,
  heartRateVariability,
  title = 'AI心率分析',
}: HeartRateBarChartProps) {
  // 准备图表数据
  const chartData = [
    {
      name: '平均心率',
      value: avgHeartRate,
      unit: 'BPM',
      normalRange: [60, 100],
    },
    {
      name: '心率变异性',
      value: heartRateVariability * 100,
      unit: '%',
      normalRange: [5, 15],
    },
  ];

  // 心率状态评估
  const getHeartRateStatus = (hr: number) => {
    if (hr < 60) return { text: '偏低', color: '#3b82f6' };
    if (hr > 100) return { text: '偏高', color: '#ef4444' };
    return { text: '正常', color: '#10b981' };
  };

  const hrStatus = getHeartRateStatus(avgHeartRate);

  return (
    <Card title={title} className="mb-6">
      {avgHeartRate > 0 ? (
        <>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value: number, name: string, props: any) => {
                  const item = props.payload;
                  return [`${value.toFixed(2)} ${item.unit}`, item.name];
                }}
              />
              <Legend />
              <Bar dataKey="value" fill="#3b82f6" name="测量值" />
            </BarChart>
          </ResponsiveContainer>

          {/* 心率状态提示 */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">平均心率</div>
                <div className="text-2xl font-bold">
                  {avgHeartRate.toFixed(1)} <span className="text-base font-normal">BPM</span>
                </div>
                <div className="text-sm mt-1">
                  <span
                    className="inline-block px-2 py-1 rounded"
                    style={{
                      backgroundColor: hrStatus.color + '20',
                      color: hrStatus.color,
                    }}
                  >
                    {hrStatus.text}
                  </span>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">心率变异性</div>
                <div className="text-2xl font-bold">
                  {(heartRateVariability * 100).toFixed(1)} <span className="text-base font-normal">%</span>
                </div>
                <div className="text-sm mt-1 text-gray-500">
                  {heartRateVariability < 0.05 ? '稳定' : heartRateVariability > 0.15 ? '波动较大' : '正常'}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <p>💡 参考范围：正常心率 60-100 BPM，心率变异性 5-15%</p>
            <p>⚠️ 注意：数据来源于AI PPG（光电容积描记法）分析，仅供参考</p>
          </div>
        </>
      ) : (
        <div className="h-64 flex items-center justify-center text-gray-500">
          暂无心率数据
        </div>
      )}
    </Card>
  );
}
