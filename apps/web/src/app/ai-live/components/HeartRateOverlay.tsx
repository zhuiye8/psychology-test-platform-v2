'use client';

/**
 * 浮动心率面板组件
 *
 * 设计参照原项目emotion/templates/index.html:210-223
 * - 透明背景，叠加在视频预览上
 * - 显示心率值、图标、单位
 * - 进度条显示检测进度
 * - 状态文本提示
 */

import React from 'react';
import { HeartOutlined } from '@ant-design/icons';

// ============================================================================
// 类型定义
// ============================================================================

export interface HeartRateOverlayProps {
  /** 心率值（bpm） */
  heartRate: number | null;
  /** 检测状态 */
  status: 'waiting' | 'detecting' | 'normal' | 'abnormal' | 'no_face';
  /** 检测进度（0-100） */
  progress?: number;
}

// ============================================================================
// 状态文本和颜色映射
// ============================================================================

const STATUS_CONFIG = {
  waiting: {
    text: '等待检测人脸',
    color: '#8c8c8c',
    iconAnimation: 'none',
  },
  detecting: {
    text: '正在检测中...',
    color: '#1890ff',
    iconAnimation: 'pulse',
  },
  normal: {
    text: '心率正常',
    color: '#52c41a',
    iconAnimation: 'heartbeat',
  },
  abnormal: {
    text: '心率异常',
    color: '#ff4d4f',
    iconAnimation: 'heartbeat-fast',
  },
  no_face: {
    text: '未检测到人脸',
    color: '#faad14',
    iconAnimation: 'none',
  },
};

// ============================================================================
// 主组件
// ============================================================================

export const HeartRateOverlay: React.FC<HeartRateOverlayProps> = ({
  heartRate,
  status,
  progress = 0,
}) => {
  const config = STATUS_CONFIG[status];

  return (
    <div className="heart-rate-overlay">
      {/* 心率内容 */}
      <div className="heart-rate-content">
        <HeartOutlined
          className={`heart-icon ${config.iconAnimation}`}
          style={{ color: config.color }}
        />
        <span className="heart-rate-value" style={{ color: config.color }}>
          {heartRate !== null ? Math.round(heartRate) : '--'}
        </span>
        <span className="heart-rate-unit">bpm</span>
      </div>

      {/* 进度条（检测中显示） */}
      {(status === 'waiting' || status === 'detecting') && (
        <div className="heart-rate-progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${progress}%`,
                backgroundColor: config.color,
              }}
            />
          </div>
          <span className="progress-text" style={{ color: config.color }}>
            {config.text}
          </span>
        </div>
      )}

      {/* 状态文本（正常/异常显示） */}
      {(status === 'normal' || status === 'abnormal' || status === 'no_face') && (
        <div className="status-text" style={{ color: config.color }}>
          {config.text}
        </div>
      )}

      {/* CSS样式 */}
      <style jsx>{`
        .heart-rate-overlay {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          padding: 16px 20px;
          min-width: 180px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          z-index: 10;
        }

        .heart-rate-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        .heart-icon {
          font-size: 28px;
          transition: all 0.3s;
        }

        .heart-icon.heartbeat {
          animation: heartbeat 1.2s ease-in-out infinite;
        }

        .heart-icon.heartbeat-fast {
          animation: heartbeat 0.6s ease-in-out infinite;
        }

        .heart-icon.pulse {
          animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes heartbeat {
          0%, 100% {
            transform: scale(1);
          }
          10%, 30% {
            transform: scale(1.15);
          }
          20%, 40% {
            transform: scale(1);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .heart-rate-value {
          font-size: 32px;
          font-weight: bold;
          font-family: 'Roboto Mono', monospace;
          min-width: 60px;
          text-align: right;
        }

        .heart-rate-unit {
          font-size: 14px;
          color: #d9d9d9;
          font-weight: 500;
        }

        .heart-rate-progress {
          margin-top: 8px;
        }

        .progress-bar {
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
          overflow: hidden;
          margin-bottom: 6px;
        }

        .progress-fill {
          height: 100%;
          transition: width 0.3s ease;
          border-radius: 2px;
        }

        .progress-text,
        .status-text {
          font-size: 12px;
          text-align: center;
          display: block;
          font-weight: 500;
        }

        .status-text {
          margin-top: 4px;
        }
      `}</style>
    </div>
  );
};
