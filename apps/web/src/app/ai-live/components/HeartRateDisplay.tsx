import { useEffect, useState } from 'react';

// ============================================================================
// 类型定义
// ============================================================================

interface HeartRateDisplayProps {
  heartRate: number | null;
  status?: 'normal' | 'high' | 'low';
}

// ============================================================================
// 工具函数
// ============================================================================

/**
 * 根据心率值判断状态
 */
function getHeartRateStatus(bpm: number): 'normal' | 'high' | 'low' {
  if (bpm < 60) return 'low';
  if (bpm > 100) return 'high';
  return 'normal';
}

/**
 * 获取状态颜色
 */
function getStatusColor(status: 'normal' | 'high' | 'low'): string {
  switch (status) {
    case 'normal':
      return '#00ffff';
    case 'high':
      return '#e74c3c';
    case 'low':
      return '#3498db';
  }
}

/**
 * 获取状态描述
 */
function getStatusText(status: 'normal' | 'high' | 'low'): string {
  switch (status) {
    case 'normal':
      return '正常';
    case 'high':
      return '偏高';
    case 'low':
      return '偏低';
  }
}

// ============================================================================
// 组件
// ============================================================================

export function HeartRateDisplay({ heartRate, status }: HeartRateDisplayProps) {
  const [isPulse, setIsPulse] = useState(false);

  // 自动计算状态
  const currentStatus = status || (heartRate ? getHeartRateStatus(heartRate) : 'normal');
  const statusColor = getStatusColor(currentStatus);

  // 心跳动画效果
  useEffect(() => {
    if (!heartRate) return;

    // 根据心率计算动画间隔
    const interval = 60000 / heartRate; // 毫秒

    const timer = setInterval(() => {
      setIsPulse(true);
      setTimeout(() => setIsPulse(false), 200);
    }, interval);

    return () => clearInterval(timer);
  }, [heartRate]);

  return (
    <div style={{
      background: 'rgba(0, 255, 255, 0.1)',
      borderRadius: '8px',
      padding: '16px',
      textAlign: 'center',
    }}>
      {/* 心跳图标 */}
      <div style={{
        marginBottom: '12px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <i
          className="fas fa-heartbeat"
          style={{
            fontSize: '32px',
            color: statusColor,
            transform: isPulse ? 'scale(1.2)' : 'scale(1)',
            transition: 'transform 0.2s ease-in-out',
          }}
        />
      </div>

      {/* 心率数值 */}
      <div style={{
        fontSize: '48px',
        fontWeight: 'bold',
        color: statusColor,
        lineHeight: 1,
        marginBottom: '4px',
      }}>
        {heartRate !== null ? Math.round(heartRate) : '--'}
      </div>

      {/* 单位 */}
      <div style={{
        color: '#cccccc',
        fontSize: '14px',
        marginBottom: '12px',
      }}>
        bpm
      </div>

      {/* 状态指示 */}
      {heartRate !== null && (
        <div style={{
          display: 'inline-block',
          padding: '4px 12px',
          borderRadius: '12px',
          background: `${statusColor}20`,
          border: `1px solid ${statusColor}`,
          color: statusColor,
          fontSize: '12px',
        }}>
          {getStatusText(currentStatus)}
        </div>
      )}

      {/* 无数据提示 */}
      {heartRate === null && (
        <div style={{
          color: '#666',
          fontSize: '12px',
        }}>
          等待心率数据...
        </div>
      )}
    </div>
  );
}
