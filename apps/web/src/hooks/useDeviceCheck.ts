/**
 * Device Check Hook (Stub Implementation)
 *
 * 用于设备检测（摄像头、麦克风）的Hook
 * 这是一个简化的实现，主要用于满足类型检查
 */

import { useState, useCallback } from 'react';

export interface DeviceCheckResult {
  success: boolean;
  cameraOk: boolean;
  micOk: boolean;
  cameraStream?: MediaStream;
  micStream?: MediaStream;
}

export function useDeviceCheck() {
  const [cameraOk, setCameraOk] = useState(false);
  const [micOk, setMicOk] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);

  const start = useCallback(async (): Promise<void> => {
    try {
      setIsChecking(true);
      setError(null);

      // 请求摄像头和麦克风权限
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      setCameraOk(true);
      setMicOk(true);
      setVideoStream(stream);
      setAudioStream(stream);
    } catch (err) {
      console.error('[useDeviceCheck] Failed to get media devices:', err);
      const errorMessage = err instanceof Error ? err.message : '设备初始化失败';
      setError(errorMessage);
      setCameraOk(false);
      setMicOk(false);
    } finally {
      setIsChecking(false);
    }
  }, []);

  const stop = useCallback(() => {
    console.log('[useDeviceCheck] Stopping device check');
    if (videoStream) {
      videoStream.getTracks().forEach(track => track.stop());
    }
    if (audioStream) {
      audioStream.getTracks().forEach(track => track.stop());
    }
    setVideoStream(null);
    setAudioStream(null);
    setCameraOk(false);
    setMicOk(false);
  }, [videoStream, audioStream]);

  return {
    cameraOk,
    micOk,
    isChecking,
    error,
    volumeLevel,
    videoStream,
    audioStream,
    start,
    stop,
    // Device selection properties (stub implementation)
    cameras: [],
    microphones: [],
    selectedCameraId: undefined,
    selectedMicId: undefined,
    selectCamera: () => {},
    selectMic: () => {},
    retry: start, // Retry is the same as start
  };
}
