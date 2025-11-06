/**
 * useDownloadProgress Hook
 *
 * 用于轮询AI模型下载进度
 *
 * 使用方式：
 * ```tsx
 * const { progress, startPolling, stopPolling } = useDownloadProgress();
 *
 * // 开始下载后
 * const response = await initializeModel('emotion2vec');
 * if (response.task_id) {
 *   startPolling(response.task_id);
 * }
 * ```
 */

import { useState, useEffect, useRef } from 'react';

// ============================================================================
// 类型定义
// ============================================================================

interface DownloadProgress {
  task_id: string;
  model_id: string;
  status: 'downloading' | 'initializing' | 'completed' | 'error';
  progress: number; // 0-100
  downloaded_mb: number;
  total_mb: number;
  speed_mbps: number;
  eta_seconds: number | null;
  error_message?: string;
}

interface UseDownloadProgressResult {
  progress: DownloadProgress | null;
  isPolling: boolean;
  startPolling: (taskId: string) => void;
  stopPolling: () => void;
}

// ============================================================================
// Hook实现
// ============================================================================

/**
 * AI模型下载进度Hook
 *
 * @param options 配置选项
 * @param options.pollInterval 轮询间隔（毫秒），默认1000ms
 * @param options.onCompleted 下载完成回调
 * @param options.onError 下载错误回调
 */
export function useDownloadProgress(options?: {
  pollInterval?: number;
  onCompleted?: (progress: DownloadProgress) => void;
  onError?: (error: string) => void;
}): UseDownloadProgressResult {
  const {
    pollInterval = 1000, // 默认每1秒轮询一次
    onCompleted,
    onError,
  } = options || {};

  const [progress, setProgress] = useState<DownloadProgress | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  const [taskId, setTaskId] = useState<string | null>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const onCompletedRef = useRef(onCompleted);
  const onErrorRef = useRef(onError);

  // 更新回调函数引用
  useEffect(() => {
    onCompletedRef.current = onCompleted;
    onErrorRef.current = onError;
  }, [onCompleted, onError]);

  // 获取进度数据
  const fetchProgress = async (currentTaskId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AI_SERVICE_URL}/api/models/progress/${currentTaskId}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          console.warn(`Task not found: ${currentTaskId}`);
          stopPolling();
          return;
        }
        throw new Error(`Failed to fetch progress: ${response.status}`);
      }

      const data: DownloadProgress = await response.json();
      setProgress(data);

      // 检查是否完成或错误
      if (data.status === 'completed') {
        stopPolling();
        onCompletedRef.current?.(data);
      } else if (data.status === 'error') {
        stopPolling();
        onErrorRef.current?.(data.error_message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error fetching download progress:', error);
      onErrorRef.current?.(error instanceof Error ? error.message : 'Unknown error');
    }
  };

  // 开始轮询
  const startPolling = (newTaskId: string) => {
    // 停止之前的轮询
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setTaskId(newTaskId);
    setIsPolling(true);
    setProgress(null);

    // 立即获取一次
    fetchProgress(newTaskId);

    // 设置定时轮询
    intervalRef.current = setInterval(() => {
      fetchProgress(newTaskId);
    }, pollInterval);
  };

  // 停止轮询
  const stopPolling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPolling(false);
  };

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    progress,
    isPolling,
    startPolling,
    stopPolling,
  };
}
