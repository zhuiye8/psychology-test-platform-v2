'use client';

// ============================================================================
// 设备检测Hook
// ============================================================================

/**
 * useDeviceCheck - 设备连接核心逻辑
 *
 * 职责：
 * - 渐进式请求音频/视频权限
 * - 设备列表枚举与切换
 * - 音量电平分析（AudioContext + AnalyserNode）
 * - 错误处理与降级策略
 *
 * 技术要点：
 * - 使用ref防止闭包陷阱
 * - AudioContext资源管理
 * - requestAnimationFrame循环
 * - 权限状态检查
 */

import { useCallback, useRef, useState } from 'react';
import { getBestVideoStream, getBestAudioStream } from '../utils/media';
import type { UseDeviceCheckReturn } from '../types/device';

// ============================================================================
// Hook实现
// ============================================================================

export function useDeviceCheck(): UseDeviceCheckReturn {
  // --------------------------------------------------------------------------
  // State状态
  // --------------------------------------------------------------------------

  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [cameraOk, setCameraOk] = useState(false);
  const [micOk, setMicOk] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [testing, setTesting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [microphones, setMicrophones] = useState<MediaDeviceInfo[]>([]);
  const [selectedCameraId, setSelectedCameraId] = useState<string | undefined>(
    undefined
  );
  const [selectedMicId, setSelectedMicId] = useState<string | undefined>(
    undefined
  );

  // --------------------------------------------------------------------------
  // Ref引用（防止闭包陷阱）
  // --------------------------------------------------------------------------

  // 音频分析
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number | null>(null);

  // 流引用（最新值）
  const videoStreamRef = useRef<MediaStream | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);

  // --------------------------------------------------------------------------
  // 工具函数
  // --------------------------------------------------------------------------

  /**
   * 停止并清理流
   *
   * @param stream 要停止的流
   */
  const stopStream = (stream: MediaStream | null) => {
    if (!stream) return;
    stream.getTracks().forEach((t) => t.stop());
  };

  /**
   * 完全清理所有资源
   */
  const cleanup = useCallback(() => {
    console.log('[useDeviceCheck] 清理资源');

    // 停止流
    stopStream(videoStreamRef.current);
    stopStream(audioStreamRef.current);
    videoStreamRef.current = null;
    audioStreamRef.current = null;
    setVideoStream(null);
    setAudioStream(null);

    // 停止音量检测动画
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    // 清理音频分析器
    if (analyserRef.current) {
      analyserRef.current.disconnect();
      analyserRef.current = null;
    }

    // 关闭AudioContext
    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch (e) {
        console.warn('[useDeviceCheck] 关闭AudioContext失败:', e);
      }
      audioContextRef.current = null;
    }
  }, []);

  /**
   * 刷新设备列表
   */
  const refreshDevices = useCallback(async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      setCameras(devices.filter((d) => d.kind === 'videoinput'));
      setMicrophones(devices.filter((d) => d.kind === 'audioinput'));
    } catch (e) {
      console.warn('[useDeviceCheck] 获取设备列表失败:', e);
    }
  }, []);

  /**
   * 设置音频分析器
   *
   * @param stream 音频流
   */
  const setupAudioAnalyzer = useCallback((stream: MediaStream) => {
    try {
      audioContextRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      const src = audioContextRef.current.createMediaStreamSource(stream);
      src.connect(analyserRef.current);

      // 音量检测循环
      const loop = () => {
        if (!analyserRef.current) return;
        const arr = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(arr);
        const avg = arr.reduce((s, v) => s + v, 0) / arr.length;
        const level = Math.round((avg / 255) * 100);
        setVolumeLevel(level);
        if (level > 5) setMicOk(true); // 检测到声音
        rafRef.current = requestAnimationFrame(loop);
      };
      loop();
    } catch (e) {
      console.warn('[useDeviceCheck] 音频分析器初始化失败:', e);
    }
  }, []);

  // --------------------------------------------------------------------------
  // 主要功能
  // --------------------------------------------------------------------------

  /**
   * 开始设备检测
   */
  const start = useCallback(async (): Promise<{ success: boolean; cameraOk: boolean; micOk: boolean }> => {
    setTesting(true);
    setError(null);

    try {
      // 检查设备权限状态
      try {
        const cameraPermission = await navigator.permissions.query({
          name: 'camera' as PermissionName,
        });
        const microphonePermission = await navigator.permissions.query({
          name: 'microphone' as PermissionName,
        });

        if (cameraPermission.state === 'denied') {
          setError(
            '摄像头权限被拒绝。请刷新页面并允许摄像头权限，或在浏览器设置中启用摄像头。'
          );
          return { success: false, cameraOk: false, micOk: false };
        }
        if (microphonePermission.state === 'denied') {
          setError(
            '麦克风权限被拒绝。请刷新页面并允许麦克风权限，或在浏览器设置中启用麦克风。'
          );
          return { success: false, cameraOk: false, micOk: false };
        }
      } catch (permError) {
        console.warn('[useDeviceCheck] 权限查询不支持，继续尝试获取设备:', permError);
      }

      // 检查现有流是否仍然有效
      const currentVideoValid =
        videoStreamRef.current &&
        videoStreamRef.current.getVideoTracks().length > 0 &&
        videoStreamRef.current.getVideoTracks()[0].readyState === 'live';

      const currentAudioValid =
        audioStreamRef.current &&
        audioStreamRef.current.getAudioTracks().length > 0 &&
        audioStreamRef.current.getAudioTracks()[0].readyState === 'live';

      console.log('[useDeviceCheck] 现有流状态:', {
        currentVideoValid,
        currentAudioValid,
      });

      // 只获取无效的流
      const videoPromise = currentVideoValid
        ? Promise.resolve({ stream: videoStreamRef.current })
        : getBestVideoStream();

      const audioPromise = currentAudioValid
        ? Promise.resolve({ stream: audioStreamRef.current })
        : getBestAudioStream();

      const [{ stream: vs }, { stream: as }] = await Promise.all([
        videoPromise,
        audioPromise,
      ]);

      // 处理视频流
      if (vs) {
        if (vs !== videoStreamRef.current) {
          // 新流，停止旧流
          if (videoStreamRef.current) {
            stopStream(videoStreamRef.current);
          }
          videoStreamRef.current = vs;
        }
        setVideoStream(vs);
        const videoTrack = vs.getVideoTracks()[0];
        setCameraOk(videoTrack && videoTrack.readyState === 'live');
      } else {
        // 获取失败，清理
        if (videoStreamRef.current) {
          stopStream(videoStreamRef.current);
        }
        videoStreamRef.current = null;
        setVideoStream(null);
        setCameraOk(false);
      }

      // 处理音频流
      if (as) {
        if (as !== audioStreamRef.current) {
          // 新流，停止旧流
          if (audioStreamRef.current) {
            stopStream(audioStreamRef.current);
          }
          audioStreamRef.current = as;
        }
        setAudioStream(as);
        setupAudioAnalyzer(as);
      } else {
        // 获取失败，清理
        if (audioStreamRef.current) {
          stopStream(audioStreamRef.current);
        }
        audioStreamRef.current = null;
        setAudioStream(null);
        setMicOk(false);
      }

      await refreshDevices();

      // 返回成功状态
      const finalCameraOk = videoStreamRef.current !== null &&
        videoStreamRef.current.getVideoTracks().length > 0 &&
        videoStreamRef.current.getVideoTracks()[0].readyState === 'live';
      const finalMicOk = audioStreamRef.current !== null &&
        audioStreamRef.current.getAudioTracks().length > 0 &&
        audioStreamRef.current.getAudioTracks()[0].readyState === 'live';

      return {
        success: true,
        cameraOk: finalCameraOk,
        micOk: finalMicOk,
      };
    } catch (e) {
      const errorMsg = (e as any)?.message || '设备连接失败';
      console.error('[useDeviceCheck] 设备连接失败:', e);

      // 失败时清理资源
      cleanup();

      // 根据错误类型提供解决建议
      if (errorMsg.includes('Permission') || errorMsg.includes('denied')) {
        setError(
          '设备权限被拒绝。请刷新页面并允许摄像头和麦克风权限，或检查浏览器设置。'
        );
      } else if (errorMsg.includes('NotFound')) {
        setError(
          '未检测到可用设备。可能的解决方案：1) 检查设备连接 2) 重启浏览器 3) 检查Windows设备管理器中的音频/视频设备状态。'
        );
      } else if (
        errorMsg.includes('NotReadableError') ||
        errorMsg.includes('NotAllowed')
      ) {
        setError(
          '设备被其他应用占用。请关闭可能使用摄像头的程序（如QQ、微信、腾讯会议、OBS、Skype等），然后点击重新检测。'
        );
      } else if (errorMsg.includes('OverConstrainedError')) {
        setError('设备不支持所需配置。正在尝试降级配置...');
        setTimeout(() => retry(), 2000); // 自动重试
        return { success: false, cameraOk: false, micOk: false };
      } else {
        setError(
          `设备连接遇到问题: ${errorMsg}。建议：1) 刷新页面 2) 尝试不同浏览器（推荐Chrome/Edge） 3) 重启设备。`
        );
      }

      return { success: false, cameraOk: false, micOk: false };
    } finally {
      setTesting(false);
    }
  }, [cleanup, refreshDevices, setupAudioAnalyzer]);

  /**
   * 重试设备检测
   */
  const retry = useCallback(async () => {
    await start();
  }, [start]);

  /**
   * 选择摄像头
   *
   * @param deviceId 设备ID
   */
  const selectCamera = useCallback(async (deviceId: string) => {
    try {
      // 停止旧视频流
      stopStream(videoStreamRef.current);
      videoStreamRef.current = null;
      setVideoStream(null);
      setCameraOk(false);
      setSelectedCameraId(deviceId);

      // 获取新的视频流
      const s = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: { exact: deviceId },
          width: { ideal: 640, min: 320 },
          height: { ideal: 480, min: 240 },
          frameRate: { ideal: 15, min: 5, max: 30 },
        },
      });

      videoStreamRef.current = s;
      setVideoStream(s);
      setCameraOk(true);
    } catch (e) {
      console.warn('[useDeviceCheck] 切换摄像头失败:', e);
      setCameraOk(false);
    }
  }, []);

  /**
   * 选择麦克风
   *
   * @param deviceId 设备ID
   */
  const selectMic = useCallback(
    async (deviceId: string) => {
      try {
        stopStream(audioStreamRef.current);
        audioStreamRef.current = null;
        setAudioStream(null);
        setMicOk(false);
        setSelectedMicId(deviceId);

        // 获取新的音频流
        const s = await navigator.mediaDevices.getUserMedia({
          audio: {
            deviceId: { exact: deviceId },
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
            sampleRate: 44100,
            channelCount: 1,
          },
        });

        audioStreamRef.current = s;
        setAudioStream(s);
        setMicOk(true);

        // 重新挂接分析器
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        if (analyserRef.current) analyserRef.current.disconnect();
        analyserRef.current = null;
        setupAudioAnalyzer(s);
      } catch (e) {
        console.warn('[useDeviceCheck] 切换麦克风失败:', e);
        setMicOk(false);
      }
    },
    [setupAudioAnalyzer]
  );

  /**
   * 停止设备检测并清理资源
   */
  const stop = useCallback(() => {
    cleanup();
  }, [cleanup]);

  // --------------------------------------------------------------------------
  // 返回值
  // --------------------------------------------------------------------------

  return {
    videoStream,
    audioStream,
    cameraOk,
    micOk,
    volumeLevel,
    testing,
    error,
    cameras,
    microphones,
    selectedCameraId,
    selectedMicId,
    start,
    retry,
    stop,
    refreshDevices,
    selectCamera,
    selectMic,
  };
}
