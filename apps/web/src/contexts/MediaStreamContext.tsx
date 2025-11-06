'use client';

// ============================================================================
// 媒体流全局Context
// ============================================================================

/**
 * MediaStream全局管理Context
 *
 * 职责：
 * - 全局保存video/audio流
 * - 跨页面复用流（device-check → session）
 * - 提供流验证和清理API
 *
 * 使用场景：
 * - device-check页面：获取流 → setStreams() → 导航到session
 * - session页面：复用流 → 推流到MediaMTX
 * - success/submit页面：清理流 → clearStreams()
 *
 * 技术要点：
 * - 使用React Context实现全局共享
 * - 自动清理机制（组件卸载）
 * - 流有效性验证
 */

import React, { createContext, useContext, useState, useCallback } from 'react';

// ============================================================================
// 类型定义
// ============================================================================

/**
 * MediaStream Context值类型
 */
interface MediaStreamContextValue {
  /** 视频流 */
  videoStream: MediaStream | null;
  /** 音频流 */
  audioStream: MediaStream | null;

  /**
   * 设置流
   *
   * @param video 视频流
   * @param audio 音频流
   */
  setStreams: (video: MediaStream | null, audio: MediaStream | null) => void;

  /**
   * 清理流
   *
   * 会停止所有轨道并清空引用
   */
  clearStreams: () => void;

  /**
   * 验证流的有效性
   *
   * @returns 视频流和音频流的有效性
   */
  validateStreams: () => { videoValid: boolean; audioValid: boolean };
}

/**
 * MediaStreamProvider Props
 */
interface MediaStreamProviderProps {
  children: React.ReactNode;
}

// ============================================================================
// Context创建
// ============================================================================

const MediaStreamContext = createContext<MediaStreamContextValue | undefined>(
  undefined
);

// ============================================================================
// Provider组件
// ============================================================================

/**
 * MediaStream Context Provider
 *
 * 提供全局的媒体流管理
 *
 * @param props Provider props
 * @returns Provider组件
 */
export function MediaStreamProvider({ children }: MediaStreamProviderProps) {
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);

  /**
   * 设置流
   */
  const setStreams = useCallback(
    (video: MediaStream | null, audio: MediaStream | null) => {
      console.log('[MediaStreamContext] 设置流:', {
        video: !!video,
        audio: !!audio,
      });
      setVideoStream(video);
      setAudioStream(audio);
    },
    []
  );

  /**
   * 清理流
   */
  const clearStreams = useCallback(() => {
    console.log('[MediaStreamContext] 清理流');

    // 停止视频流的所有轨道
    if (videoStream) {
      videoStream.getTracks().forEach((track) => {
        track.stop();
        console.log('[MediaStreamContext] 已停止视频轨道:', track.id);
      });
    }

    // 停止音频流的所有轨道
    if (audioStream) {
      audioStream.getTracks().forEach((track) => {
        track.stop();
        console.log('[MediaStreamContext] 已停止音频轨道:', track.id);
      });
    }

    // 清空引用
    setVideoStream(null);
    setAudioStream(null);
  }, [videoStream, audioStream]);

  /**
   * 验证流的有效性
   */
  const validateStreams = useCallback(() => {
    const videoValid =
      videoStream !== null &&
      videoStream.getVideoTracks().length > 0 &&
      videoStream.getVideoTracks()[0].readyState === 'live';

    const audioValid =
      audioStream !== null &&
      audioStream.getAudioTracks().length > 0 &&
      audioStream.getAudioTracks()[0].readyState === 'live';

    return { videoValid, audioValid };
  }, [videoStream, audioStream]);

  const value: MediaStreamContextValue = {
    videoStream,
    audioStream,
    setStreams,
    clearStreams,
    validateStreams,
  };

  return (
    <MediaStreamContext.Provider value={value}>
      {children}
    </MediaStreamContext.Provider>
  );
}

// ============================================================================
// Hook
// ============================================================================

/**
 * 使用MediaStream Context
 *
 * 必须在MediaStreamProvider内部使用
 *
 * @returns MediaStream Context值
 * @throws 如果在Provider外部使用
 */
export function useMediaStream(): MediaStreamContextValue {
  const context = useContext(MediaStreamContext);
  if (context === undefined) {
    throw new Error(
      'useMediaStream必须在MediaStreamProvider内部使用'
    );
  }
  return context;
}
