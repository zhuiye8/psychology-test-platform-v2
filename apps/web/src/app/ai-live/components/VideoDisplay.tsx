import { useEffect, useRef } from 'react';
import { Badge } from 'antd';
import { HeartRateOverlay } from './HeartRateOverlay';
import { FaceDetectionStatus } from './FaceDetectionStatus';
import type { AiAggregate } from '@/services/ai';

// ============================================================================
// 类型定义
// ============================================================================

interface VideoDisplayProps {
  mode: 'local' | 'monitor';
  stream?: MediaStream | null;
  studentName?: string;
  connectionStatus?: 'connected' | 'connecting' | 'disconnected';
  // ⭐ AI分析数据
  aggregate?: AiAggregate | null;
  session?: { status: string } | null;
  // ⭐ 实时WebSocket数据（优先级最高）
  realtimeData?: {
    face_detected?: boolean;
    face_count?: number;
  } | null;
}

// ============================================================================
// 组件
// ============================================================================

export function VideoDisplay({
  mode,
  stream,
  studentName,
  connectionStatus = 'disconnected',
  aggregate,
  session,
  realtimeData,
}: VideoDisplayProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // 更新视频流
  useEffect(() => {
    if (!videoRef.current) return;

    if (stream) {
      videoRef.current.srcObject = stream;
    } else {
      videoRef.current.srcObject = null;
    }
  }, [stream]);

  // --------------------------------------------------------------------------
  // 计算AI分析状态（仅monitor模式）
  // --------------------------------------------------------------------------

  // 心率状态
  const heartRateStatus = (() => {
    if (!aggregate?.avgHeartRate) return 'waiting';
    if (aggregate.avgHeartRate < 60 || aggregate.avgHeartRate > 100) {
      return 'abnormal';
    }
    return 'normal';
  })();

  // 人脸检测状态（优先使用实时WebSocket数据）
  const faceDetectionStatus = (() => {
    if (!session) return 'idle';

    // ✅ 优先使用实时WebSocket数据（最准确）
    if (realtimeData?.face_detected !== undefined) {
      if (realtimeData.face_detected) {
        return (realtimeData.face_count ?? 1) > 1 ? 'multiple_faces' : 'detected';
      }
      return 'not_detected';
    }

    // 降级：session为ACTIVE但无实时数据时显示detecting
    if (session.status === 'ACTIVE') {
      return 'detecting';
    }

    return session.status === 'COMPLETED' ? 'detected' : 'idle';
  })();

  // 人脸数量（用于multiple_faces状态显示）
  const faceCount = realtimeData?.face_count || 0;

  // 获取状态徽章
  const getStatusBadge = () => {
    switch (connectionStatus) {
      case 'connected':
        return <Badge status="success" text="已连接" />;
      case 'connecting':
        return <Badge status="processing" text="连接中..." />;
      case 'disconnected':
        return <Badge status="default" text="未连接" />;
    }
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'rgba(0, 0, 0, 0.3)',
      borderRadius: '8px',
      overflow: 'hidden',
    }}>
      {/* 头部信息栏 */}
      <div style={{
        padding: '12px 16px',
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(0, 255, 255, 0.2)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <i className="fas fa-video" style={{ color: '#00ffff', fontSize: '14px' }} />
          <span style={{ color: '#cccccc', fontSize: '13px' }}>
            {mode === 'local' ? '本机检测' : `监控: ${studentName || '未选择'}`}
          </span>
        </div>
        {getStatusBadge()}
      </div>

      {/* 视频预览区域 */}
      <div style={{
        flex: 1,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000000',
      }}>
        {stream ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
            {/* ⭐ AI分析overlay层（仅monitor模式显示） */}
            {mode === 'monitor' && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
              }}>
                <FaceDetectionStatus
                  status={faceDetectionStatus}
                  faceCount={faceCount}
                />
                <HeartRateOverlay
                  heartRate={aggregate?.avgHeartRate || null}
                  status={heartRateStatus}
                  progress={aggregate?.avgHeartRate ? 100 : 0}
                />
              </div>
            )}
          </>
        ) : (
          <div style={{
            textAlign: 'center',
            color: '#666',
          }}>
            <i className="fas fa-video-slash" style={{
              fontSize: '48px',
              marginBottom: '12px',
              display: 'block',
            }} />
            <div style={{ fontSize: '14px' }}>
              {mode === 'local' ? '请启动摄像头' : '未连接学生视频'}
            </div>
          </div>
        )}
      </div>

      {/* 底部音量指示器（可选） */}
      {stream && (
        <div style={{
          padding: '8px 16px',
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          borderTop: '1px solid rgba(0, 255, 255, 0.2)',
        }}>
          <i className="fas fa-microphone" style={{ color: '#667eea', fontSize: '12px' }} />
          <div style={{
            flex: 1,
            height: '4px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}>
            <div style={{
              width: '60%',
              height: '100%',
              background: 'linear-gradient(90deg, #667eea, #764ba2)',
              transition: 'width 0.1s',
            }} />
          </div>
        </div>
      )}
    </div>
  );
}
