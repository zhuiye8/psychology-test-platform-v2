import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Checkbox } from 'antd';
import { useState } from 'react';

// ============================================================================
// 类型定义
// ============================================================================

interface TrendDataPoint {
  timestamp: string; // 时间戳或时间标签
  audioEmotion?: number; // 语音情绪强度 0-1
  videoEmotion?: number; // 面部情绪强度 0-1
}

interface EmotionTrendChartProps {
  data: TrendDataPoint[];
  showAudio?: boolean;
  showVideo?: boolean;
  onClear?: () => void;
}

// ============================================================================
// 组件
// ============================================================================

export function EmotionTrendChart({
  data,
  showAudio: initialShowAudio = true,
  showVideo: initialShowVideo = true,
  onClear,
}: EmotionTrendChartProps) {
  const [showAudio, setShowAudio] = useState(initialShowAudio);
  const [showVideo, setShowVideo] = useState(initialShowVideo);

  // 自定义Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'rgba(0, 0, 0, 0.9)',
          border: '1px solid rgba(0, 255, 255, 0.5)',
          borderRadius: '6px',
          padding: '10px',
        }}>
          <p style={{ color: '#ffffff', margin: 0, marginBottom: '6px', fontSize: '12px' }}>
            {label}
          </p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color, margin: 0, fontSize: '11px' }}>
              {entry.name}: {(entry.value * 100).toFixed(1)}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 图表 */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis
              dataKey="timestamp"
              stroke="#cccccc"
              style={{ fontSize: '11px' }}
            />
            <YAxis
              domain={[0, 1]}
              stroke="#cccccc"
              style={{ fontSize: '11px' }}
              tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: '12px' }}
              iconType="line"
            />
            {showAudio && (
              <Line
                type="monotone"
                dataKey="audioEmotion"
                name="语音情绪"
                stroke="#667eea"
                strokeWidth={2}
                dot={{ fill: '#667eea', r: 3 }}
                activeDot={{ r: 5 }}
                connectNulls
              />
            )}
            {showVideo && (
              <Line
                type="monotone"
                dataKey="videoEmotion"
                name="面部情绪"
                stroke="#764ba2"
                strokeWidth={2}
                dot={{ fill: '#764ba2', r: 3 }}
                activeDot={{ r: 5 }}
                connectNulls
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 控制按钮 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '12px',
        background: 'rgba(0, 255, 255, 0.05)',
        borderRadius: '8px',
        marginTop: '12px',
      }}>
        <Checkbox
          checked={showAudio}
          onChange={(e) => setShowAudio(e.target.checked)}
          style={{ color: '#cccccc' }}
        >
          <i className="fas fa-microphone" style={{ marginRight: '6px', color: '#667eea' }}></i>
          <span style={{ color: '#cccccc', fontSize: '13px' }}>语音情绪</span>
        </Checkbox>
        <Checkbox
          checked={showVideo}
          onChange={(e) => setShowVideo(e.target.checked)}
          style={{ color: '#cccccc' }}
        >
          <i className="fas fa-video" style={{ marginRight: '6px', color: '#764ba2' }}></i>
          <span style={{ color: '#cccccc', fontSize: '13px' }}>面部情绪</span>
        </Checkbox>
        <button
          onClick={onClear}
          style={{
            marginLeft: 'auto',
            padding: '4px 12px',
            fontSize: '12px',
            background: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '4px',
            color: '#cccccc',
            cursor: 'pointer',
            transition: 'all 0.3s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.borderColor = '#00ffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
          }}
        >
          <i className="fas fa-trash" style={{ marginRight: '6px' }}></i>
          清空
        </button>
      </div>
    </div>
  );
}
