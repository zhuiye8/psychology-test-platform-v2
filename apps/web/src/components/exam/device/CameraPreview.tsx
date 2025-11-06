'use client';

// ============================================================================
// 摄像头预览组件
// ============================================================================

/**
 * 摄像头预览组件
 *
 * 功能：
 * - 显示视频流预览
 * - 设备选择器
 * - 连接状态指示
 */

import React, { useEffect, useRef } from 'react';
import { Card, Typography, Select } from 'antd';
import { VideoCameraOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

// ============================================================================
// 类型定义
// ============================================================================

interface CameraPreviewProps {
  /** 视频流 */
  stream: MediaStream | null;
  /** 摄像头是否正常 */
  ok: boolean;
  /** 摄像头设备列表 */
  cameras: MediaDeviceInfo[];
  /** 选中的设备ID */
  selectedId?: string;
  /** 选择设备回调 */
  onSelect: (deviceId: string) => void;
}

// ============================================================================
// 组件实现
// ============================================================================

export function CameraPreview({
  stream,
  ok,
  cameras,
  selectedId,
  onSelect,
}: CameraPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // --------------------------------------------------------------------------
  // 绑定视频流
  // --------------------------------------------------------------------------

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (stream) {
      try {
        video.srcObject = stream;
        const play = async () => {
          try {
            await video.play();
          } catch (e) {
            console.warn('[CameraPreview] 自动播放失败:', e);
          }
        };
        play();
      } catch (e) {
        console.warn('[CameraPreview] 设置视频流失败:', e);
      }
    } else {
      video.srcObject = null;
    }
  }, [stream]);

  // --------------------------------------------------------------------------
  // 渲染
  // --------------------------------------------------------------------------

  return (
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <VideoCameraOutlined />
          摄像头预览
          {ok && <CheckCircleOutlined style={{ color: '#10B981' }} />}
        </div>
      }
      style={{
        borderRadius: 16,
        border: ok ? '2px solid #10B981' : '1px solid #f0f0f0',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* 视频预览 */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{
            width: '100%',
            height: 260,
            borderRadius: 12,
            background: '#000',
            objectFit: 'cover',
          }}
        />

        {/* 设备选择器 */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Text type="secondary">摄像头</Text>
          <Select
            value={selectedId || cameras[0]?.deviceId}
            onChange={onSelect}
            style={{ minWidth: 220 }}
            options={cameras.map((c) => ({
              value: c.deviceId,
              label: c.label || '摄像头',
            }))}
            placeholder="选择摄像头"
          />
        </div>
      </div>
    </Card>
  );
}
