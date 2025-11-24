import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useState } from 'react';

// ============================================================================
// 类型定义
// ============================================================================

interface EmotionData {
  name: string;
  value: number;
}

interface EmotionDisplayData extends EmotionData {
  displayName: string;
  originalName: string;
}

interface EmotionPieChartProps {
  data: EmotionData[];
  type: 'audio' | 'video';
  title?: string;
}

// ============================================================================
// 常量定义
// ============================================================================

// 情绪名称英文→中文映射（DeepFace输出英文，UI显示中文）
const EMOTION_LABELS: Record<string, string> = {
  // DeepFace标准7种情绪
  neutral: '中性',
  happy: '快乐',
  sad: '悲伤',
  angry: '愤怒',
  surprise: '惊讶',
  fear: '恐惧',
  disgust: '厌恶',
  // emotion2vec额外情绪（Phase 5）
  anxiety: '焦虑',
  tired: '疲惫',
};

// 面部情绪颜色映射（使用英文键，与DeepFace输出对齐）
const VIDEO_EMOTION_COLORS: Record<string, string> = {
  neutral: '#95a5a6',   // 浅灰-中性
  happy: '#f39c12',     // 橙色-快乐
  sad: '#3498db',       // 蓝色-悲伤
  angry: '#e74c3c',     // 红色-愤怒
  surprise: '#9b59b6',  // 紫色-惊讶
  fear: '#34495e',      // 深灰-恐惧
  disgust: '#16a085',   // 青绿-厌恶
};

// 语音情绪颜色映射（使用英文键）
const AUDIO_EMOTION_COLORS: Record<string, string> = {
  neutral: '#95a5a6',   // 浅灰-中性
  happy: '#f39c12',     // 橙色-快乐
  sad: '#3498db',       // 蓝色-悲伤
  angry: '#e74c3c',     // 红色-愤怒
  surprise: '#9b59b6',  // 紫色-惊讶
  fear: '#34495e',      // 深灰-恐惧
  disgust: '#16a085',   // 青绿-厌恶
  anxiety: '#e67e22',   // 橙红-焦虑
  tired: '#7f8c8d',     // 中灰-疲惫
};

// 空数据占位符
const EMPTY_PLACEHOLDER: EmotionDisplayData[] = [{ name: 'empty', value: 100, displayName: '等待数据', originalName: 'empty' }];

// ============================================================================
// 工具函数
// ============================================================================

/**
 * 翻译情绪名称（英文→中文）
 * 支持防御性编程：已是中文则直接返回
 */
function translateEmotion(emotion: string): string {
  return EMOTION_LABELS[emotion] || emotion;
}

// ============================================================================
// 组件
// ============================================================================

export function EmotionPieChart({ data, type, title }: EmotionPieChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const colorMap = type === 'audio' ? AUDIO_EMOTION_COLORS : VIDEO_EMOTION_COLORS;

  // 检测是否有数据
  const hasData = data.length > 0;

  // 获取情绪颜色（接收英文名）
  const getColor = (name: string) => {
    if (name === 'empty') return '#2a2a2a'; // 空数据灰色
    return colorMap[name] || '#cccccc';
  };

  // 转换数据：添加中文显示名称，或使用占位数据
  const displayData: EmotionDisplayData[] = hasData
    ? data.map(item => ({
        ...item,
        name: translateEmotion(item.name), // ✅ 直接覆盖name用于Legend显示
        displayName: translateEmotion(item.name),
        originalName: item.name,
      }))
    : EMPTY_PLACEHOLDER;

  // 计算当前主要情绪（最高置信度），仅当有数据时
  const dominantEmotion: EmotionDisplayData | null = hasData && displayData.length > 0
    ? displayData.reduce((prev, current) => (current.value > prev.value ? current : prev))
    : null;

  // 生成图例数据（有数据时显示实际情绪，无数据时显示所有可能的情绪）
  const legendData = hasData
    ? Object.keys(colorMap).map(key => ({
        name: translateEmotion(key),
        color: colorMap[key],
      }))
    : Object.keys(colorMap).map(key => ({
        name: translateEmotion(key),
        color: colorMap[key],
      }));

  // 自定义Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (!hasData) return null; // 空数据时不显示Tooltip

    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div style={{
          background: 'rgba(0, 0, 0, 0.9)',
          border: `1px solid ${data.payload.fill}`,
          borderRadius: '6px',
          padding: '8px 12px',
        }}>
          <p style={{ color: '#ffffff', margin: 0, fontSize: '12px', fontWeight: 'bold' }}>
            {data.payload.displayName || data.name}
          </p>
          <p style={{ color: data.payload.fill, margin: 0, fontSize: '14px', marginTop: '4px' }}>
            {data.value.toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  // 自定义Legend（紧凑单行布局）
  const CustomLegend = () => {
    return (
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '6px 12px',
        marginTop: '10px',
        opacity: hasData ? 1 : 0.5, // 无数据时半透明
      }}>
        {legendData.map((entry, index) => (
          <div
            key={index}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '2px',
              background: entry.color,
              boxShadow: hasData ? `0 0 6px ${entry.color}60` : 'none',
            }} />
            <span style={{
              fontSize: '11px',
              color: hasData ? '#cccccc' : '#666666',
              fontWeight: 400,
            }}>
              {entry.name}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 标题行：包含标题和当前主要情绪 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px',
      }}>
        {title && (
          <h4 style={{
            color: '#00ffff',
            fontSize: '13px',
            margin: 0,
            fontWeight: 600,
          }}>
            {title}
          </h4>
        )}
        {/* 主要情绪徽章或无数据提示 */}
        {dominantEmotion ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 10px',
            background: `${getColor(dominantEmotion.originalName)}20`,
            border: `1px solid ${getColor(dominantEmotion.originalName)}`,
            borderRadius: '6px',
            boxShadow: `0 0 10px ${getColor(dominantEmotion.originalName)}40`,
          }}>
            <div style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: getColor(dominantEmotion.originalName),
              boxShadow: `0 0 6px ${getColor(dominantEmotion.originalName)}`,
              animation: 'pulse 2s ease-in-out infinite',
            }} />
            <span style={{
              fontSize: '12px',
              fontWeight: 600,
              color: getColor(dominantEmotion.originalName),
            }}>
              {dominantEmotion.displayName}
            </span>
            <span style={{
              fontSize: '11px',
              color: '#999999',
            }}>
              {dominantEmotion.value.toFixed(1)}%
            </span>
          </div>
        ) : (
          <div style={{
            padding: '4px 10px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '6px',
          }}>
            <span style={{
              fontSize: '11px',
              color: '#666666',
            }}>
              暂无数据
            </span>
          </div>
        )}
      </div>

      {/* 饼状图 */}
      <div style={{ flex: 1, minHeight: 0, position: 'relative' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={displayData}
              cx="50%"
              cy="50%"
              innerRadius={32}
              outerRadius={52}
              paddingAngle={hasData ? 2 : 0}
              dataKey="value"
              nameKey="displayName"
              onMouseEnter={hasData ? (_, index) => setActiveIndex(index) : undefined}
              onMouseLeave={hasData ? () => setActiveIndex(null) : undefined}
            >
              {displayData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={hasData ? getColor(entry.originalName) : '#2a2a2a'}
                  opacity={hasData ? (activeIndex === null || activeIndex === index ? 1 : 0.6) : 0.4}
                  style={{
                    transition: 'opacity 0.3s',
                    filter: activeIndex === index ? 'brightness(1.2)' : 'none',
                  }}
                  stroke={hasData && activeIndex === index ? getColor(entry.originalName) : 'none'}
                  strokeWidth={activeIndex === index ? 2 : 0}
                />
              ))}
            </Pie>
            {hasData && <Tooltip content={<CustomTooltip />} />}
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>

        {/* 空数据中心提示 */}
        {!hasData && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            textAlign: 'center',
            marginTop: '-15px', // 调整位置避开图例
          }}>
            <div style={{
              fontSize: '11px',
              color: '#666666',
              marginBottom: '4px',
            }}>
              ⏳
            </div>
            <div style={{
              fontSize: '12px',
              color: '#888888',
              fontWeight: 500,
            }}>
              等待AI分析
            </div>
          </div>
        )}
      </div>

      {/* 添加pulse动画的CSS */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
