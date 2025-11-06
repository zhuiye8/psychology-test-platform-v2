import { useState, useEffect, useCallback, useRef } from 'react';
import { useDeviceCheck } from '@/hooks/useDeviceCheck';
import { useAIConnection } from '@/hooks/useAIConnection';
import aiApi, { type AiSessionWithResult, type StreamInfo, type AiAggregate } from '@/services/ai';
import { useRealtimeAIStream } from './useRealtimeAIStream';
import { createSubscriber } from '@/services/webrtcSubscriber';
import resultsApi from '@/services/results';

// ============================================================================
// 类型定义
// ============================================================================

interface EmotionData {
  name: string;
  value: number;
}

interface TrendDataPoint {
  timestamp: string;
  audioEmotion?: number;
  videoEmotion?: number;
}

/**
 * 学生信息（用于监控模式）
 */
interface Student {
  id: string;           // AI会话ID (AiSession.id)
  name: string;         // 学生姓名
  examId: string;       // ExamResult ID（学生答卷ID，注意：不是Exam UUID）
  status: 'active' | 'completed' | 'failed';
  duration?: number;    // 会话持续时间（秒）
}

interface RealtimeAnalysisData {
  heartRate: number | null;
  audioEmotions: EmotionData[];
  videoEmotions: EmotionData[];
  trendData: TrendDataPoint[];
  students: Student[];
  currentStudent: Student | null;
}

// ============================================================================
// 工具函数 - 数据解析
// ============================================================================

/**
 * 计算会话持续时间（秒）
 */
function calculateDuration(startTime: string): number {
  const start = new Date(startTime).getTime();
  const now = Date.now();
  return Math.floor((now - start) / 1000);
}

// ============================================================================
// Hook
// ============================================================================

export function useRealtimeAnalysis(
  mode: 'local' | 'monitor',
  autoRefresh: boolean = true,
  refreshInterval: number = 3000
) {
  // --------------------------------------------------------------------------
  // State
  // --------------------------------------------------------------------------

  const [data, setData] = useState<RealtimeAnalysisData>({
    heartRate: null,
    audioEmotions: [],
    videoEmotions: [],
    trendData: [],
    students: [],
    currentStudent: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);

  // ⭐ 新增：monitor模式的视频流和AI数据
  const [monitorStream, setMonitorStream] = useState<MediaStream | null>(null);
  const [currentSession, setCurrentSession] = useState<any>(null);
  const [currentAggregate, setCurrentAggregate] = useState<AiAggregate | null>(null);

  // ✨ 实时数据流（新架构）
  const realtimeStream = useRealtimeAIStream(sessionId, {
    enabled: !!sessionId && autoRefresh, // 仅在有sessionId且启用自动刷新时连接
  });

  // --------------------------------------------------------------------------
  // Hooks（始终调用，通过参数控制行为）
  // --------------------------------------------------------------------------

  const deviceCheck = useDeviceCheck();
  const aiConnection = useAIConnection({ aiEnabled: mode === 'local' });

  // --------------------------------------------------------------------------
  // Refs
  // --------------------------------------------------------------------------

  const trendDataRef = useRef<TrendDataPoint[]>([]);
  const isStartedRef = useRef(false);
  // ⭐ 新增：WHEP订阅器ref
  const subscriberRef = useRef<ReturnType<typeof createSubscriber> | null>(null);

  // --------------------------------------------------------------------------
  // 数据更新函数
  // --------------------------------------------------------------------------

  /**
   * 处理实时AI数据流更新（新架构）
   */
  useEffect(() => {
    if (!realtimeStream.latestData) return;

    const { data_type, data } = realtimeStream.latestData;

    // 处理视频情绪数据（面部表情识别）
    if (data_type === 'video_emotion' && data?.emotion_scores) {
      // 更新饼状图数据
      const emotions = Object.entries(data.emotion_scores).map(([name, value]) => ({
        name,
        value: typeof value === 'number' ? value : 0,
      }));
      setData((prev) => ({ ...prev, videoEmotions: emotions }));

      // 更新趋势图数据
      const timestamp = new Date().toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

      const newPoint: TrendDataPoint = {
        timestamp,
        videoEmotion: data.confidence,
      };

      trendDataRef.current = [...trendDataRef.current, newPoint].slice(-30); // 保留最近30个点
      setData((prev) => ({ ...prev, trendData: [...trendDataRef.current] }));
    }

    // 处理音频情绪数据（语音语调识别）
    if (data_type === 'audio_emotion' && data?.emotion_scores) {
      const emotions = Object.entries(data.emotion_scores).map(([name, value]) => ({
        name,
        value: typeof value === 'number' ? value : 0,
      }));
      setData((prev) => ({ ...prev, audioEmotions: emotions }));

      // 更新趋势图数据
      const timestamp = new Date().toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

      const existingPoint = trendDataRef.current.find((p) => p.timestamp === timestamp);
      if (existingPoint) {
        existingPoint.audioEmotion = data.confidence;
      } else {
        const newPoint: TrendDataPoint = {
          timestamp,
          audioEmotion: data.confidence,
        };
        trendDataRef.current = [...trendDataRef.current, newPoint].slice(-30);
      }
      setData((prev) => ({ ...prev, trendData: [...trendDataRef.current] }));
    }

    // 处理心率数据（PPG检测）
    if (data_type === 'heart_rate' && data?.heart_rate) {
      setData((prev) => ({ ...prev, heartRate: data.heart_rate || null }));
    }

    // TODO: 处理注意力数据
    if (data_type === 'attention' && data?.attention_score) {
      // 暂未实现
    }
  }, [realtimeStream.latestData]);

  // --------------------------------------------------------------------------
  // 本机检测模式 - 启动/停止
  // --------------------------------------------------------------------------

  const startLocalDetection = useCallback(async () => {
    if (!deviceCheck || !aiConnection || isStartedRef.current) return;

    try {
      setLoading(true);
      setError(null);

      // 1. 启动设备并获取返回值
      console.log('[useRealtimeAnalysis] Starting device check...');
      const deviceResult = await deviceCheck.start();
      console.log('[useRealtimeAnalysis] Device check result:', deviceResult);

      if (!deviceResult.success || !deviceResult.cameraOk || !deviceResult.micOk) {
        throw new Error('设备初始化失败：摄像头或麦克风不可用');
      }

      // 2. 创建AI会话（本机检测模式：不传resultId，避免外键约束违反）
      console.log('[useRealtimeAnalysis] Initializing AI session...');
      // ✅ 修复：使用固定的sessionId，避免每次检测都创建新记录
      const DEVICE_CHECK_EXAM_ID = 'device-check-local';
      const DEVICE_CHECK_PARTICIPANT_ID = 'local-test-user';
      // 本机检测不传resultId（避免外键约束违反）
      const dbSessionId = await aiConnection.initAISession(DEVICE_CHECK_EXAM_ID, DEVICE_CHECK_PARTICIPANT_ID);

      // 3. 设置sessionId用于WebSocket连接（核心修复）
      if (dbSessionId) {
        setSessionId(dbSessionId);
        console.log('[useRealtimeAnalysis] ✅ Session ID 已设置:', dbSessionId);
      } else {
        console.warn('[useRealtimeAnalysis] ⚠️ 未获取到 sessionId，实时数据流可能无法建立');
        // 不抛出错误，允许降级运行（无实时数据）
      }

      isStartedRef.current = true;
      console.log('[useRealtimeAnalysis] Local detection started successfully');
    } catch (err) {
      const message = err instanceof Error ? err.message : '本机检测启动失败';
      setError(message);
      console.error('[useRealtimeAnalysis] startLocalDetection error:', err);
    } finally {
      setLoading(false);
    }
  }, [deviceCheck, aiConnection]);

  const stopLocalDetection = useCallback(async () => {
    // 允许在任何时候停止，不检查isStartedRef
    if (!deviceCheck || !aiConnection) {
      console.warn('[useRealtimeAnalysis] Cannot stop: missing dependencies');
      return;
    }

    try {
      setLoading(true); // 添加加载状态
      console.log('[useRealtimeAnalysis] Stopping local detection...');

      await aiConnection.disconnect();
      deviceCheck.stop();
      isStartedRef.current = false;
      setSessionId(null);
      setError(null); // 清除错误

      console.log('[useRealtimeAnalysis] Local detection stopped successfully');
    } catch (err) {
      const message = err instanceof Error ? err.message : '停止检测失败';
      console.error('[useRealtimeAnalysis] stopLocalDetection error:', err);
      setError(message); // 显示错误给用户
    } finally {
      setLoading(false);
    }
  }, [deviceCheck, aiConnection]);

  // --------------------------------------------------------------------------
  // 监控模式 - 学生列表刷新
  // --------------------------------------------------------------------------

  const refreshStudentList = useCallback(async () => {
    if (mode !== 'monitor') return;

    try {
      const sessions = await aiApi.getActiveSessions();

      // ✅ 双重过滤：只显示ACTIVE状态的session（防止历史数据污染）
      const students: Student[] = sessions
        .filter((s: AiSessionWithResult) => s.status === 'ACTIVE')
        .map((s: AiSessionWithResult) => ({
          id: s.id,
          name: s.examResult?.studentName || '未知学生',
          examId: s.examResult?.id || '', // ExamResult ID
          status: 'active' as const,
          duration: calculateDuration(s.startTime),
        }));

      setData((prev) => ({ ...prev, students }));
    } catch (err) {
      console.error('[useRealtimeAnalysis] refreshStudentList error:', err);
    }
  }, [mode]);

  // --------------------------------------------------------------------------
  // 实时数据轮询（新架构：使用聚合数据）
  // --------------------------------------------------------------------------

  const pollLatestData = useCallback(async () => {
    if (!sessionId) return;

    try {
      // 新架构：使用聚合数据而不是checkpoint
      // 注意：聚合数据只在会话结束时计算，无法实时更新
      // 本机检测模式下，暂时禁用实时轮询
      console.log('[useRealtimeAnalysis] 新架构下暂不支持实时轮询，请等待会话结束后查看聚合数据');
    } catch (err) {
      console.error('[useRealtimeAnalysis] pollLatestData error:', err);
    }
  }, [sessionId]);

  // --------------------------------------------------------------------------
  // 自动刷新
  // --------------------------------------------------------------------------

  useEffect(() => {
    if (!autoRefresh) return;

    const timer = setInterval(() => {
      if (mode === 'local' && sessionId) {
        pollLatestData();
      } else if (mode === 'monitor') {
        refreshStudentList();
      }
    }, refreshInterval);

    return () => clearInterval(timer);
  }, [autoRefresh, mode, sessionId, refreshInterval, pollLatestData, refreshStudentList]);

  // --------------------------------------------------------------------------
  // 初始加载
  // --------------------------------------------------------------------------

  useEffect(() => {
    if (mode === 'monitor' && autoRefresh) {
      refreshStudentList();
    }
  }, [mode, autoRefresh, refreshStudentList]);

  // --------------------------------------------------------------------------
  // 公共方法
  // --------------------------------------------------------------------------

  const clearTrendData = useCallback(() => {
    trendDataRef.current = [];
    setData((prev) => ({ ...prev, trendData: [] }));
  }, []);

  const selectStudent = useCallback(async (student: Student) => {
    console.log('[useRealtimeAnalysis] 选择学生:', student);

    // ✅ 先断开旧的WHEP连接，避免连接泄漏
    if (subscriberRef.current) {
      console.log('[useRealtimeAnalysis] 断开旧的WHEP连接');
      try {
        await subscriberRef.current.stop();
      } catch (error) {
        console.warn('[useRealtimeAnalysis] 停止旧连接失败（忽略）:', error);
      }
      subscriberRef.current = null;
    }

    setData((prev) => ({ ...prev, currentStudent: student }));
    setSessionId(student.id);

    try {
      // 1. 获取session和aggregate数据
      console.log('[useRealtimeAnalysis] 获取session和aggregate数据...');
      const [session, aggregate, anomalies] = await Promise.all([
        aiApi.getSessionByResultId(student.examId),
        aiApi.getAggregateByResultId(student.examId).catch(() => null),
        aiApi.getAnomaliesBySessionId(student.id).catch(() => []),
      ]);

      console.log('[useRealtimeAnalysis] session:', session);
      console.log('[useRealtimeAnalysis] aggregate:', aggregate);

      // 保存session和aggregate供VideoDisplay使用
      setCurrentSession(session);
      setCurrentAggregate(aggregate);

      // 2. ⭐ 启动WHEP拉流
      if (!session) {
        console.warn('[useRealtimeAnalysis] ⚠️ Session不存在，无法启动WHEP拉流');
      } else {
        const streamInfo = session.streamInfo as StreamInfo | undefined;
        const streamName = streamInfo?.stream_name;

        if (streamName) {
        console.log('[useRealtimeAnalysis] 开始WHEP拉流, streamName:', streamName);

        try {
          const subscriber = createSubscriber();
          subscriberRef.current = subscriber;

          const result = await subscriber.start({
            streamName,
            timeout: 10000,
            maxRetries: 3,
          });

          setMonitorStream(result.remoteStream);
          console.log('[useRealtimeAnalysis] ✅ WHEP拉流成功');
        } catch (whepError) {
          console.error('[useRealtimeAnalysis] ❌ WHEP拉流失败:', whepError);
          // 不阻止后续流程
        }
        } else {
          console.warn('[useRealtimeAnalysis] ⚠️ streamInfo缺少stream_name:', session);
        }
      }

      // 3. 处理聚合数据
      if (aggregate) {
        // 更新心率
        if (aggregate.avgHeartRate) {
          setData((prev) => ({ ...prev, heartRate: aggregate.avgHeartRate || null }));
        }

        // 更新情绪分布
        if (aggregate.emotionDistribution) {
          const emotions = Object.entries(aggregate.emotionDistribution).map(([name, value]) => ({
            name,
            value: (value as number) * 100,
          }));
          setData((prev) => ({ ...prev, videoEmotions: emotions }));
        }

        // 添加一个趋势数据点（基于聚合数据）
        if (aggregate.avgValence !== undefined || aggregate.avgArousal !== undefined) {
          const timestamp = new Date().toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          });

          const newPoint: TrendDataPoint = {
            timestamp,
            audioEmotion: aggregate.avgValence,
            videoEmotion: aggregate.avgArousal,
          };

          trendDataRef.current = [...trendDataRef.current, newPoint].slice(-30);
          setData((prev) => ({ ...prev, trendData: [...trendDataRef.current] }));
        }
      }
    } catch (err) {
      console.error('[useRealtimeAnalysis] selectStudent失败:', err);
    }
  }, []);

  const disconnect = useCallback(async () => {
    console.log('[useRealtimeAnalysis] 断开连接');
    const currentResultId = data.currentStudent?.examId;
    const currentStudentStatus = data.currentStudent?.status;

    // 1. 停止WHEP订阅器
    if (subscriberRef.current) {
      console.log('[useRealtimeAnalysis] 停止WHEP拉流');
      try {
        await subscriberRef.current.stop();
      } catch (error) {
        console.error('[useRealtimeAnalysis] 停止WHEP失败:', error);
      }
      subscriberRef.current = null;
    }
    setMonitorStream(null);
    setCurrentSession(null);
    setCurrentAggregate(null);

    // 2. 调用cleanup API清理后端数据（仅对未完成的考试）
    if (currentResultId && currentStudentStatus === 'active') {
      try {
        console.log('[useRealtimeAnalysis] 调用cleanupExamSession:', currentResultId);
        await resultsApi.cleanupExamSession(currentResultId);
        console.log('[useRealtimeAnalysis] ✅ 清理成功');
      } catch (error) {
        console.error('[useRealtimeAnalysis] ❌ 清理失败:', error);
      }
    } else if (currentStudentStatus === 'completed') {
      console.log('[useRealtimeAnalysis] 跳过清理（考试已完成）');
    }

    // 3. 清除状态
    setData((prev) => ({ ...prev, currentStudent: null }));
    setSessionId(null);
    clearTrendData();
  }, [data.currentStudent, clearTrendData]);

  // --------------------------------------------------------------------------
  // 返回值
  // --------------------------------------------------------------------------

  return {
    data,
    loading,
    error,
    sessionId,

    // 本机检测
    deviceCheck,
    aiConnection,
    startLocalDetection,
    stopLocalDetection,

    // 通用
    refresh: mode === 'local' ? pollLatestData : refreshStudentList,
    clearTrendData,

    // 监控模式
    selectStudent,
    disconnect,
    // ⭐ 新增：monitor模式的视频流和AI数据
    monitorStream,
    currentSession,
    currentAggregate,

    // ✨ 实时数据流状态（新架构）
    realtimeStream: {
      latestData: realtimeStream.latestData,
      connected: realtimeStream.connected,
      error: realtimeStream.error,
      dataPointsCount: realtimeStream.dataPointsCount,
      reconnect: realtimeStream.reconnect,
      disconnect: realtimeStream.disconnect,
    },
  };
}
