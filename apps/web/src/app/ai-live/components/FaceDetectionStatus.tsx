'use client';

/**
 * 人脸检测状态组件
 *
 * 设计参照原项目emotion/templates/index.html:206-209
 * - 搜索图标 + 状态文本
 * - 实时更新检测状态
 * - 透明背景叠加在视频上
 */

import React from 'react';
import {
  SearchOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  LoadingOutlined,
} from '@ant-design/icons';

// ============================================================================
// 类型定义
// ============================================================================

export interface FaceDetectionStatusProps {
  /** 检测状态 */
  status: 'idle' | 'detecting' | 'detected' | 'not_detected' | 'multiple_faces';
  /** 检测到的人脸数量 */
  faceCount?: number;
}

interface StatusConfig {
  icon: typeof SearchOutlined;
  text: string;
  color: string;
  bgColor: string;
  spin?: boolean;
}

// ============================================================================
// 状态配置
// ============================================================================

const STATUS_CONFIG: Record<FaceDetectionStatusProps['status'], StatusConfig> = {
  idle: {
    icon: SearchOutlined,
    text: '等待开始分析...',
    color: '#8c8c8c',
    bgColor: 'rgba(0, 0, 0, 0.6)',
  },
  detecting: {
    icon: LoadingOutlined,
    text: '正在检测人脸...',
    color: '#1890ff',
    bgColor: 'rgba(24, 144, 255, 0.15)',
    spin: true,
  },
  detected: {
    icon: CheckCircleOutlined,
    text: '已检测到人脸',
    color: '#52c41a',
    bgColor: 'rgba(82, 196, 26, 0.15)',
  },
  not_detected: {
    icon: WarningOutlined,
    text: '未检测到人脸',
    color: '#faad14',
    bgColor: 'rgba(250, 173, 20, 0.15)',
  },
  multiple_faces: {
    icon: WarningOutlined,
    text: '检测到多张人脸',
    color: '#ff4d4f',
    bgColor: 'rgba(255, 77, 79, 0.15)',
  },
};

// ============================================================================
// 主组件
// ============================================================================

export const FaceDetectionStatus: React.FC<FaceDetectionStatusProps> = ({
  status,
  faceCount = 0,
}) => {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;

  // 特殊处理：多张人脸时显示数量
  const displayText =
    status === 'multiple_faces' && faceCount > 0
      ? `检测到 ${faceCount} 张人脸`
      : config.text;

  return (
    <div
      className="face-detection-status"
      style={{
        backgroundColor: config.bgColor,
        borderColor: config.color,
      }}
    >
      <Icon
        className={`status-icon ${config.spin ? 'spin' : ''}`}
        style={{ color: config.color }}
      />
      <span className="status-text" style={{ color: config.color }}>
        {displayText}
      </span>

      {/* CSS样式 */}
      <style jsx>{`
        .face-detection-status {
          position: absolute;
          top: 16px;
          left: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 16px;
          border-radius: 8px;
          border: 1px solid;
          backdrop-filter: blur(10px);
          z-index: 10;
          transition: all 0.3s;
        }

        .status-icon {
          font-size: 20px;
          transition: all 0.3s;
        }

        .status-icon.spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .status-text {
          font-size: 14px;
          font-weight: 500;
          white-space: nowrap;
        }

        /* 呼吸效果（not_detected和multiple_faces状态） */
        .face-detection-status:has(.status-icon:not(.spin)) {
          animation: breathe 2s ease-in-out infinite;
        }

        @keyframes breathe {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};
