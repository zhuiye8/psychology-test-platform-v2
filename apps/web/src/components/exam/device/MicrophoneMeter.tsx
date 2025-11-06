'use client';

// ============================================================================
// 麦克风音量检测组件
// ============================================================================

/**
 * 麦克风音量检测组件
 *
 * 功能：
 * - 显示音量进度条
 * - 实时音量百分比
 * - 设备选择器
 */

import React from 'react';
import { Card, Typography, Progress, Select } from 'antd';
import { AudioOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

// ============================================================================
// 类型定义
// ============================================================================

interface MicrophoneMeterProps {
  /** 麦克风是否正常 */
  ok: boolean;
  /** 音量电平 (0-100) */
  volume: number;
  /** 麦克风设备列表 */
  microphones: MediaDeviceInfo[];
  /** 选中的设备ID */
  selectedId?: string;
  /** 选择设备回调 */
  onSelect: (deviceId: string) => void;
}

// ============================================================================
// 组件实现
// ============================================================================

export function MicrophoneMeter({
  ok,
  volume,
  microphones,
  selectedId,
  onSelect,
}: MicrophoneMeterProps) {
  // --------------------------------------------------------------------------
  // 音量颜色（根据音量大小）
  // --------------------------------------------------------------------------

  const getVolumeColor = () => {
    if (volume < 20) return '#22c55e'; // 绿色（低）
    if (volume < 60) return '#f59e0b'; // 橙色（中）
    return '#ef4444'; // 红色（高）
  };

  // --------------------------------------------------------------------------
  // 渲染
  // --------------------------------------------------------------------------

  return (
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <AudioOutlined />
          麦克风检测
          {ok && <CheckCircleOutlined style={{ color: '#10B981' }} />}
        </div>
      }
      style={{
        borderRadius: 16,
        border: ok ? '2px solid #10B981' : '1px solid #f0f0f0',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* 音量检测 */}
        <div>
          <Text strong>请对着麦克风说话</Text>
          <Progress
            percent={volume}
            showInfo={false}
            strokeColor={getVolumeColor()}
            style={{ marginTop: 8 }}
          />
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 }}>
            <Text style={{ fontWeight: 600 }}>音量: {volume}%</Text>
            {ok && <CheckCircleOutlined style={{ color: '#10B981' }} />}
          </div>
        </div>

        {/* 设备选择器 */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Text type="secondary">麦克风</Text>
          <Select
            value={selectedId || microphones[0]?.deviceId}
            onChange={onSelect}
            style={{ minWidth: 220 }}
            options={microphones.map((m) => ({
              value: m.deviceId,
              label: m.label || '麦克风',
            }))}
            placeholder="选择麦克风"
          />
        </div>
      </div>
    </Card>
  );
}
