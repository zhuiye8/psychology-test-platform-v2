'use client';

// ============================================================================
// 设备连接与验证页面
// ============================================================================

/**
 * 设备连接检测页面
 *
 * 功能：
 * - 请求摄像头和麦克风权限
 * - 显示设备预览和音量检测
 * - 保存流到MediaStreamContext
 * - 跳转到答题页面
 *
 * 流程：
 * 1. 页面加载 → useDeviceCheck.start()
 * 2. 显示CameraPreview + MicrophoneMeter
 * 3. 用户确认 → setStreams() → 跳转session
 * 4. 用户跳过 → ai_opt_out=true → 跳转session
 */

import { useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Button, Card, Row, Col, Typography } from 'antd';
import {
  ReloadOutlined,
  CheckCircleOutlined,
  StepForwardOutlined,
  WifiOutlined,
} from '@ant-design/icons';
import { useDeviceCheck } from '../../../../hooks/useDeviceCheck';
import { useMediaStream } from '../../../../contexts/MediaStreamContext';
import { CameraPreview } from '../../../../components/exam/device/CameraPreview';
import { MicrophoneMeter } from '../../../../components/exam/device/MicrophoneMeter';
import { TroubleshootTips } from '../../../../components/exam/device/TroubleshootTips';

const { Title, Text } = Typography;

// ============================================================================
// 样式常量
// ============================================================================

const gradientBg = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

const cardStyle = {
  borderRadius: 24,
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
  border: 'none',
};

const buttonStyle = {
  borderRadius: 12,
  padding: '8px 20px',
  height: 'auto',
  minWidth: 180,
};

// ============================================================================
// 页面组件
// ============================================================================

export default function DeviceCheckPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const examId = params.examId as string;
  const resultId = searchParams.get('resultId');

  const deviceCheck = useDeviceCheck();
  const mediaStream = useMediaStream();

  // --------------------------------------------------------------------------
  // 页面加载时自动开始检测
  // --------------------------------------------------------------------------

  useEffect(() => {
    deviceCheck.start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --------------------------------------------------------------------------
  // 计算是否可以继续
  // --------------------------------------------------------------------------

  // 更宽松的继续条件：至少有一个设备工作，或者有错误（允许降级）
  const canContinue = deviceCheck.cameraOk || deviceCheck.micOk || deviceCheck.error !== null;

  // --------------------------------------------------------------------------
  // 处理确认连接
  // --------------------------------------------------------------------------

  const handleConfirm = () => {
    console.log('[DeviceCheck] 用户确认连接，保存流到Context');

    // 将设备流保存到全局Context（不停止流）
    mediaStream.setStreams(deviceCheck.videoStream, deviceCheck.audioStream);

    console.log('[DeviceCheck] 流已保存:', {
      video: !!deviceCheck.videoStream,
      audio: !!deviceCheck.audioStream,
    });

    // 跳转到答题页面
    if (resultId) {
      router.push(`/exam/${examId}/session/${resultId}`);
    } else {
      console.error('[DeviceCheck] 缺少resultId，无法跳转');
    }
  };

  // --------------------------------------------------------------------------
  // 处理跳过连接
  // --------------------------------------------------------------------------

  const handleSkip = () => {
    console.log('[DeviceCheck] 用户跳过设备连接');

    // 停止设备检测并清理
    deviceCheck.stop();
    mediaStream.clearStreams();

    // 跳转到答题页面（标记为跳过）
    if (resultId) {
      router.push(`/exam/${examId}/session/${resultId}?aiOptOut=true`);
    }
  };

  // --------------------------------------------------------------------------
  // 渲染
  // --------------------------------------------------------------------------

  return (
    <div
      style={{
        minHeight: '100vh',
        background: gradientBg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div style={{ width: '100%', maxWidth: 1040 }}>
        <Card style={cardStyle} styles={{ body: { padding: 28 } }}>
          {/* 头部 */}
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 20,
                margin: '0 auto 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #4F46E5 0%, #10B981 100%)',
                boxShadow: '0 8px 20px rgba(79, 70, 229, 0.25)',
              }}
            >
              <WifiOutlined style={{ color: '#fff', fontSize: 28 }} />
            </div>
            <Title level={3} style={{ margin: 0 }}>
              设备连接与验证
            </Title>
            <Text type="secondary">
              建立摄像头与麦克风连接（设备将保持连接状态直到考试结束）
            </Text>
          </div>

          {/* 检测内容 */}
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <CameraPreview
                stream={deviceCheck.videoStream}
                ok={deviceCheck.cameraOk}
                cameras={deviceCheck.cameras}
                selectedId={deviceCheck.selectedCameraId}
                onSelect={deviceCheck.selectCamera}
              />
            </Col>
            <Col xs={24} md={12}>
              <MicrophoneMeter
                ok={deviceCheck.micOk}
                volume={deviceCheck.volumeLevel}
                microphones={deviceCheck.microphones}
                selectedId={deviceCheck.selectedMicId}
                onSelect={deviceCheck.selectMic}
              />
            </Col>
          </Row>

          {/* 错误提示 */}
          <div style={{ marginTop: 16 }}>
            <TroubleshootTips error={deviceCheck.error} />
          </div>

          {/* 操作按钮 */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 12,
              marginTop: 24,
            }}
          >
            <Button
              icon={<ReloadOutlined />}
              onClick={deviceCheck.retry}
              size="large"
              style={buttonStyle}
            >
              重新检测
            </Button>
            <Button
              type="primary"
              size="large"
              icon={<CheckCircleOutlined />}
              onClick={handleConfirm}
              disabled={!canContinue}
              style={{
                ...buttonStyle,
                background: canContinue
                  ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                  : undefined,
                border: 'none',
              }}
            >
              {deviceCheck.cameraOk || deviceCheck.micOk
                ? '确认连接正常，保持连接'
                : '设备异常但仍要继续'}
            </Button>
            <Button
              size="large"
              icon={<StepForwardOutlined />}
              onClick={handleSkip}
              style={buttonStyle}
            >
              跳过连接
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
