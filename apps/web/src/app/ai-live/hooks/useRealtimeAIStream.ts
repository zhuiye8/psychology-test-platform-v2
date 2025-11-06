/**
 * 实时AI数据流Hook
 *
 * 功能：
 * - 建立WebSocket连接到后端AI Stream网关
 * - 实时接收AI分析结果（情绪、心率、注意力）
 * - 自动重连和错误处理
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

// ============================================================================
// 类型定义
// ============================================================================

interface AIStreamData {
  session_id: string;
  timestamp: string;
  data_type: 'video_emotion' | 'audio_emotion' | 'heart_rate' | 'attention' | 'session_event';
  data?: {
    dominant_emotion?: string;
    emotion_scores?: Record<string, number>;
    confidence?: number;
    frame_number?: number;
    heart_rate?: number;
    attention_score?: number;
  };
  event_type?: string;
  event_data?: Record<string, any>;
}

interface UseRealtimeAIStreamResult {
  /** 最新接收到的数据 */
  latestData: AIStreamData | null;
  /** WebSocket连接状态 */
  connected: boolean;
  /** 错误信息 */
  error: string | null;
  /** 累计接收的数据点数量 */
  dataPointsCount: number;
  /** 手动重连 */
  reconnect: () => void;
  /** 断开连接 */
  disconnect: () => void;
}

// ============================================================================
// Hook
// ============================================================================

export function useRealtimeAIStream(
  sessionId: string | null,
  options?: {
    /** 后端WebSocket地址 */
    socketUrl?: string;
    /** 是否启用（默认true） */
    enabled?: boolean;
    /** 连接超时时间（毫秒） */
    timeout?: number;
  }
): UseRealtimeAIStreamResult {
  const {
    socketUrl = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:4001',
    enabled = true,
    timeout = 10000,
  } = options || {};

  // --------------------------------------------------------------------------
  // State
  // --------------------------------------------------------------------------

  const [latestData, setLatestData] = useState<AIStreamData | null>(null);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dataPointsCount, setDataPointsCount] = useState(0);

  const socketRef = useRef<Socket | null>(null);

  // --------------------------------------------------------------------------
  // WebSocket连接管理
  // --------------------------------------------------------------------------

  const connect = useCallback(() => {
    if (!sessionId || !enabled) {
      return;
    }

    try {
      // 创建Socket.IO连接
      const socket = io(`${socketUrl}/ai-stream`, {
        query: {
          sessionId,
        },
        transports: ['websocket', 'polling'], // 优先使用WebSocket
        reconnection: true, // 自动重连
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout,
      });

      // 连接成功
      socket.on('connect', () => {
        console.log(`[useRealtimeAIStream] Connected to AI stream for session: ${sessionId}`);
        setConnected(true);
        setError(null);
      });

      // 接收连接确认消息
      socket.on('connected', (data) => {
        console.log('[useRealtimeAIStream] Connection confirmed:', data);
      });

      // 接收AI分析数据
      socket.on('ai-data', (data: AIStreamData) => {
        console.log('[useRealtimeAIStream] Received AI data:', data);
        setLatestData(data);
        setDataPointsCount((prev) => prev + 1);
      });

      // 心跳响应
      socket.on('pong', (data) => {
        console.log('[useRealtimeAIStream] Pong received:', data);
      });

      // 连接错误
      socket.on('connect_error', (err) => {
        console.error('[useRealtimeAIStream] Connection error:', err);
        setConnected(false);
        setError(`连接失败: ${err.message}`);
      });

      // 断开连接
      socket.on('disconnect', (reason) => {
        console.log('[useRealtimeAIStream] Disconnected:', reason);
        setConnected(false);

        if (reason === 'io server disconnect') {
          // 服务器主动断开，需要手动重连
          socket.connect();
        }
      });

      // 错误事件
      socket.on('error', (data) => {
        console.error('[useRealtimeAIStream] Error:', data);
        setError(data.message || '未知错误');
      });

      socketRef.current = socket;
    } catch (err) {
      console.error('[useRealtimeAIStream] Failed to create socket:', err);
      setError(err instanceof Error ? err.message : '创建WebSocket连接失败');
    }
  }, [sessionId, enabled, socketUrl, timeout]);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
      setConnected(false);
      setLatestData(null);
      setDataPointsCount(0);
      console.log('[useRealtimeAIStream] Manually disconnected');
    }
  }, []);

  const reconnect = useCallback(() => {
    disconnect();
    setError(null);
    setTimeout(() => {
      connect();
    }, 100);
  }, [disconnect, connect]);

  // --------------------------------------------------------------------------
  // 生命周期
  // --------------------------------------------------------------------------

  // 建立连接
  useEffect(() => {
    if (sessionId && enabled) {
      connect();
    }

    // 清理函数
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [sessionId, enabled, connect]);

  // 定期心跳检测（可选）
  useEffect(() => {
    if (!connected || !socketRef.current) {
      return;
    }

    const heartbeatInterval = setInterval(() => {
      if (socketRef.current?.connected) {
        socketRef.current.emit('ping');
      }
    }, 30000); // 每30秒一次心跳

    return () => clearInterval(heartbeatInterval);
  }, [connected]);

  // --------------------------------------------------------------------------
  // 返回值
  // --------------------------------------------------------------------------

  return {
    latestData,
    connected,
    error,
    dataPointsCount,
    reconnect,
    disconnect,
  };
}
