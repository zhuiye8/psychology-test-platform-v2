'use client';

/**
 * 学生视频预览组件
 *
 * 用于AI监控大屏，显示选中学生的实时视频流
 * 叠加心率面板和人脸检测状态
 */

import React, { useEffect, useRef, useState } from 'react';
import { Card, Empty, Spin } from 'antd';
import { VideoCameraOutlined } from '@ant-design/icons';
import { HeartRateOverlay } from './HeartRateOverlay';
import { FaceDetectionStatus } from './FaceDetectionStatus';
import type { AiSession, AiAggregate, StreamInfo } from '../../../../services/ai';
import { createSubscriber } from '../../../../services/webrtcSubscriber';

// ============================================================================
// 类型定义
// ============================================================================

export interface StudentVideoPreviewProps {
  /** 学生会话信息 */
  session: AiSession | null;
  /** AI分析聚合数据 */
  aggregate?: AiAggregate;
  /** 学生姓名 */
  participantName?: string;
  /** 考试标题 */
  examTitle?: string;
}

// ============================================================================
// 主组件
// ============================================================================

export const StudentVideoPreview: React.FC<StudentVideoPreviewProps> = ({
  session,
  aggregate,
  participantName,
  examTitle,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // --------------------------------------------------------------------------
  // WHEP拉流连接
  // --------------------------------------------------------------------------

  useEffect(() => {
    console.log('[StudentVideoPreview] useEffect 触发', {
      hasSession: !!session,
      sessionId: session?.id,
      sessionData: session,
    });

    // 验证 session 和 streamInfo
    if (!session) {
      console.log('[StudentVideoPreview] 无session，清除状态');
      setVideoError(false);
      setLoading(false);
      return;
    }

    // 类型断言：提取 streamInfo
    const streamInfo = session.streamInfo as StreamInfo | undefined;
    const streamName = streamInfo?.stream_name;

    console.log('[StudentVideoPreview] streamInfo 检查:', {
      streamInfo,
      streamName,
      hasStreamInfo: !!streamInfo,
      hasStreamName: !!streamName,
    });

    if (!streamName) {
      console.error('[StudentVideoPreview] ❌ streamInfo 缺少 stream_name:', {
        session,
        streamInfo,
      });
      setVideoError(true);
      setLoading(false);
      return;
    }

    let mounted = true;
    let subscriber: ReturnType<typeof createSubscriber> | null = null;

    const connect = async () => {
      try {
        setLoading(true);
        setVideoError(false);

        console.log('[StudentVideoPreview] ✅ 开始连接视频流:', {
          sessionId: session.id,
          streamName,
          examResultId: session.examResultId,
        });

        // 创建订阅器
        console.log('[StudentVideoPreview] 创建 WHEP 订阅器...');
        subscriber = createSubscriber();

        // 启动 WHEP 拉流
        console.log('[StudentVideoPreview] 调用 subscriber.start()...');
        const result = await subscriber.start({
          streamName,
          timeout: 10000,  // 10秒超时
          maxRetries: 3,
        });

        console.log('[StudentVideoPreview] subscriber.start() 成功', {
          hasRemoteStream: !!result.remoteStream,
          streamTracks: result.remoteStream?.getTracks().map(t => ({
            kind: t.kind,
            enabled: t.enabled,
            readyState: t.readyState,
          })),
        });

        // 设置视频源
        if (mounted && videoRef.current) {
          videoRef.current.srcObject = result.remoteStream;
          console.log('[StudentVideoPreview] ✅ 视频流已设置到 video 元素');
          setVideoError(false);
        } else {
          console.warn('[StudentVideoPreview] ⚠️ 组件已卸载或 videoRef 不存在');
        }
      } catch (error) {
        console.error('[StudentVideoPreview] ❌ 视频流连接失败:', error);

        if (mounted) {
          setVideoError(true);

          // 用户友好的错误提示
          const errorMsg = error instanceof Error ? error.message : '未知错误';
          if (errorMsg.includes('不存在')) {
            console.warn('[StudentVideoPreview] 学生可能未开始推流，或流已结束');
          } else if (errorMsg.includes('超时')) {
            console.warn('[StudentVideoPreview] 连接超时，请检查 MediaMTX 服务是否运行');
          }
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    // 启动连接
    connect();

    // 清理函数
    return () => {
      console.log('[StudentVideoPreview] 清理资源', { sessionId: session.id });
      mounted = false;

      // 停止订阅器
      if (subscriber) {
        subscriber.stop().catch(console.error);
      }

      // 清理 video 元素
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject = null;
      }
    };
  }, [session?.id]); // 依赖 session.id，避免频繁重连

  // --------------------------------------------------------------------------
  // 计算组件状态
  // --------------------------------------------------------------------------

  // 心率状态
  const heartRateStatus = (() => {
    if (!aggregate?.avgHeartRate) return 'waiting';
    if (aggregate.avgHeartRate < 60 || aggregate.avgHeartRate > 100) {
      return 'abnormal';
    }
    return 'normal';
  })();

  // 人脸检测状态（从aggregate推断）
  const faceDetectionStatus = (() => {
    if (!session) return 'idle';
    if (session.status === 'ACTIVE') {
      // 如果有心率数据，说明检测到了人脸
      if (aggregate?.avgHeartRate) return 'detected';
      // 否则还在检测中
      return 'detecting';
    }
    if (session.status === 'COMPLETED') return 'detected';
    return 'not_detected';
  })();

  // --------------------------------------------------------------------------
  // 渲染
  // --------------------------------------------------------------------------

  if (!session) {
    return (
      <Card className="video-preview-card">
        <Empty
          image={<VideoCameraOutlined style={{ fontSize: 64, color: '#d9d9d9' }} />}
          description="请从左侧列表选择学生"
        />
      </Card>
    );
  }

  return (
    <Card
      className="video-preview-card"
      title={
        <div>
          <VideoCameraOutlined className="mr-2" />
          {participantName || '未知学生'}
          {examTitle && <span className="text-gray-500 text-sm ml-2">- {examTitle}</span>}
        </div>
      }
    >
      <div className="video-container">
        {/* 视频预览 */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="video-element"
          onLoadedMetadata={() => setLoading(false)}
          onError={() => {
            setVideoError(true);
            setLoading(false);
          }}
        />

        {/* 占位图（无视频时） */}
        {!videoRef.current?.srcObject && !videoError && (
          <div className="video-placeholder">
            {loading ? (
              <Spin size="large" tip="连接视频流..." />
            ) : (
              <Empty
                image={<VideoCameraOutlined style={{ fontSize: 48 }} />}
                description="视频流未连接"
              />
            )}
          </div>
        )}

        {/* 错误提示 */}
        {videoError && (
          <div className="video-placeholder">
            <Empty
              image={<VideoCameraOutlined style={{ fontSize: 48, color: '#ff4d4f' }} />}
              description="视频流连接失败"
            />
          </div>
        )}

        {/* 检测结果覆盖层 */}
        <div className="detection-overlay">
          {/* 人脸检测状态 */}
          <FaceDetectionStatus
            status={faceDetectionStatus}
            faceCount={1}
          />

          {/* PPG心率检测显示框 */}
          <HeartRateOverlay
            heartRate={aggregate?.avgHeartRate || null}
            status={heartRateStatus}
            progress={aggregate?.avgHeartRate ? 100 : 0}
          />
        </div>
      </div>

      {/* CSS样式 */}
      <style jsx>{`
        :global(.video-preview-card .ant-card-body) {
          padding: 0;
        }

        .video-container {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          background: #000;
          border-radius: 8px;
          overflow: hidden;
        }

        .video-element {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .video-placeholder {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #141414;
        }

        .detection-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
      `}</style>
    </Card>
  );
};
