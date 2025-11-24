'use client';

// ============================================================================
// AI连接Hook
// ============================================================================

/**
 * useAIConnection - AI会话与WebRTC集成
 *
 * 职责：
 * - AI服务健康检查
 * - 创建/结束AI会话
 * - 启动WHIP推流（复用Context流）
 * - WebRTC连接状态管理
 *
 * 技术要点：
 * - 使用MediaStreamContext中的流（避免重新请求权限）
 * - 二次触发startStream确保RTSP消费
 * - beforeunload/pagehide清理
 */

import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { message } from 'antd';
import { useMediaStream } from '../contexts/MediaStreamContext';
import { webrtcApi } from '../services/webrtc';
import webrtcPublisher from '../services/webrtcPublisher';
import type { WebRTCConnectionState } from '../types/webrtc';

// ============================================================================
// Hook参数
// ============================================================================

interface UseAIConnectionOptions {
  /** 是否启用AI监控 */
  aiEnabled: boolean;
}

// ============================================================================
// Hook返回值
// ============================================================================

interface UseAIConnectionReturn {
  /** AI服务是否可用 */
  aiAvailable: boolean | null;
  /** AI配置加载中 */
  aiConfigLoading: boolean;
  /** WebRTC连接状态 */
  webrtcConnectionState: WebRTCConnectionState;
  /** 数据库会话ID（用于WebSocket连接） */
  sessionId: string | null;

  /** 初始化AI会话（resultId可选：正常考试传入，本机检测不传） */
  initAISession: (examUuid: string, participantId: string, resultId?: string) => Promise<string | null>;
  /** 断开AI会话 */
  disconnect: () => Promise<void>;
}

// ============================================================================
// Hook实现
// ============================================================================

export function useAIConnection(
  options: UseAIConnectionOptions
): UseAIConnectionReturn {
  const { aiEnabled } = options;
  const mediaStream = useMediaStream();

  // --------------------------------------------------------------------------
  // State状态
  // --------------------------------------------------------------------------

  const [aiAvailable, setAiAvailable] = useState<boolean | null>(null);
  const [aiConfigLoading, setAiConfigLoading] = useState(false);
  const [webrtcConnectionState, setWebrtcConnectionState] =
    useState<WebRTCConnectionState>({
      status: 'idle',
    });
  const [sessionId, setSessionId] = useState<string | null>(null);

  // --------------------------------------------------------------------------
  // Ref引用
  // --------------------------------------------------------------------------

  const aiEnabledRef = useRef(aiEnabled);
  const lastExamUuidRef = useRef<string>('');
  const lastParticipantIdRef = useRef<string>('');
  const lastResultIdRef = useRef<string>('');
  const lastDbSessionIdRef = useRef<string>(''); // ✅ 新增：保存数据库会话ID
  const isInitializingRef = useRef(false); // ✅ 防重入守卫：防止React Strict Mode双重执行导致的重复初始化

  useEffect(() => {
    aiEnabledRef.current = aiEnabled;
    if (!aiEnabled) {
      setWebrtcConnectionState({ status: 'disabled' });
    }
  }, [aiEnabled]);

  // --------------------------------------------------------------------------
  // AI服务健康检查（预取配置）
  // --------------------------------------------------------------------------

  useEffect(() => {
    let mounted = true;

    const checkAIService = async () => {
      try {
        setAiConfigLoading(true);
        // TODO: 调用AI服务健康检查API
        // const res = await fetch('/api/ai/health');
        // const data = await res.json();
        // setAiAvailable(data.success && data.available);
        setAiAvailable(true); // 暂时默认可用
      } catch (error) {
        console.warn('[useAIConnection] AI服务检查失败:', error);
        if (mounted) {
          setAiAvailable(false);
        }
      } finally {
        if (mounted) {
          setAiConfigLoading(false);
        }
      }
    };

    checkAIService();

    return () => {
      mounted = false;
    };
  }, []);

  // --------------------------------------------------------------------------
  // 初始化AI会话
  // --------------------------------------------------------------------------

  const initAISession = useCallback(
    async (examUuid: string, participantId: string, resultId?: string): Promise<string | null> => {
      // ✅ 防重入守卫：防止React Strict Mode或useEffect重复触发导致并发初始化
      if (isInitializingRef.current) {
        console.log('[useAIConnection] ⚠️ 已在初始化中，跳过重复调用');
        return null;
      }

      if (!aiEnabledRef.current) {
        console.log('[useAIConnection] AI监控已禁用，跳过会话初始化');
        setWebrtcConnectionState({ status: 'disabled' });
        return null;
      }

      // 设置初始化标志
      isInitializingRef.current = true;

      try {
        const isDeviceCheck = !resultId;
        console.log('[useAIConnection] 初始化AI会话:', {
          examUuid,
          participantId,
          resultId,
          mode: isDeviceCheck ? '本机检测' : '正常考试',
        });

        // 保存用于后续停止
        lastExamUuidRef.current = examUuid;
        lastParticipantIdRef.current = participantId;
        lastResultIdRef.current = resultId || '';

        // 验证Context中的流
        const { videoValid, audioValid } = mediaStream.validateStreams();
        console.log('[useAIConnection] 流状态:', { videoValid, audioValid });

        // 1. 调用后端API获取流信息
        const startResp = await webrtcApi.startStream({
          exam_uuid: examUuid,
          participant_id: participantId,
        });

        if (!startResp.success) {
          message.error('视频服务器连接失败，请检查MediaMTX服务是否正常运行');
          throw new Error(startResp.error || '启动流失败');
        }

        console.log('[useAIConnection] 流信息:', startResp);

        // 2. 启动WHIP推流（使用Context中的流）
        setWebrtcConnectionState({ status: 'connecting' });
        await webrtcPublisher.start({
          examUuid,
          participantId,
          streams: {
            video: mediaStream.videoStream,
            audio: mediaStream.audioStream,
          },
          maxBitrate: 6_000_000, // 6Mbps
          maxFramerate: 60,
          preferCodec: 'H264', // H264更适合OpenCV解码
        });

        // 3. ⭐ 创建数据库会话记录（提前获取dbSessionId，用于AI服务和WebSocket）
        console.log('[useAIConnection] 创建数据库会话记录...');

        // 使用完整的后端API地址（与webrtc.ts保持一致）
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001';

        let dbSessionId: string | null = null;
        try {
          // ✅ 修复：正常考试使用resultId，本机检测使用固定sessionId（复用同一条记录）
          const sessionIdForCreate = resultId || `${examUuid}_${participantId}`;

          // 构造请求体：只有正常考试时才包含exam_result_id
          const requestBody: Record<string, any> = {
            session_id: sessionIdForCreate,
            client_info: {
              user_agent: navigator.userAgent,
              platform: navigator.platform,
              timestamp: new Date().toISOString(),
            },
            stream_info: {
              stream_name: startResp.data?.streamName || '',
              participant_id: participantId,
            },
          };

          // ✅ 核心修复：只有正常考试时才包含exam_result_id（避免本机检测的外键约束违反）
          if (resultId) {
            requestBody.exam_result_id = resultId;
          }

          console.log('[useAIConnection] 请求体:', {
            ...requestBody,
            mode: resultId ? '正常考试（含exam_result_id）' : '本机检测（无exam_result_id）',
          });

          const sessionResp = await fetch(`${API_BASE_URL}/api/ai/sessions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
          });

          if (!sessionResp.ok) {
            const errorText = await sessionResp.text();
            let userMessage = 'AI分析会话创建失败';

            // 根据HTTP状态码给出详细提示
            if (sessionResp.status === 401 || sessionResp.status === 403) {
              userMessage = '认证失败，请刷新页面重新登录';
            } else if (sessionResp.status === 500) {
              userMessage = '服务器内部错误，请联系管理员检查后端日志';
            } else if (sessionResp.status === 400) {
              userMessage = `请求参数错误：${errorText.substring(0, 100)}`;
            } else if (sessionResp.status === 0 || sessionResp.status === 504) {
              userMessage = '后端服务无响应，请检查服务器是否正常运行';
            }

            console.error('[useAIConnection] Session创建失败:', {
              status: sessionResp.status,
              statusText: sessionResp.statusText,
              body: errorText,
              resultId,
            });

            message.error(userMessage);
            throw new Error(`Session创建失败 [${sessionResp.status}]: ${errorText}`);
          }

          console.log('[useAIConnection] API响应状态:', sessionResp.status, sessionResp.statusText);
          const response = await sessionResp.json();
          console.log('[useAIConnection] 完整响应数据:', JSON.stringify(response, null, 2));

          // ✅ 使用业务session_id（与examResultId一致），而非Prisma数据库id
          dbSessionId = response.data?.session_id || response.data?.sessionId;
          console.log('[useAIConnection] 提取的 session ID:', dbSessionId, '(类型:', typeof dbSessionId, ')');

          if (!dbSessionId) {
            console.error('[useAIConnection] ❌ 响应数据异常:', response);
            message.error('后端返回数据格式错误，请联系管理员');
            throw new Error('后端返回的session数据缺少id字段');
          }

          setSessionId(dbSessionId);
          lastDbSessionIdRef.current = dbSessionId; // ✅ 保存到ref，供disconnect使用
          console.log('[useAIConnection] ✅ 数据库会话已创建:', dbSessionId);
        } catch (sessionErr) {
          console.error('[useAIConnection] Session创建异常:', sessionErr);

          // ✅ 修复：不再降级运行，session创建失败时直接抛出异常
          // 防止出现"推流正常但无AI数据"的情况
          const errorMessage = sessionErr instanceof Error
            ? sessionErr.message
            : 'Session创建失败';

          throw new Error(`AI监控初始化失败: ${errorMessage}`);
        }

        // 4. ⭐ 通知AI服务开始RTSP消费（使用dbSessionId确保channel一致）
        if (dbSessionId) {
          try {
            const streamName = startResp.data?.streamName || ''; // e.g., "exam_uuid_participant_id"
            const aiServiceUrl = process.env.NEXT_PUBLIC_AI_SERVICE_URL || 'http://localhost:5678';
            const mediamtxRtspUrl = process.env.NEXT_PUBLIC_MEDIAMTX_RTSP_URL || 'rtsp://192.168.0.95:8554';

            console.log('[useAIConnection] Notifying AI service to start RTSP consumption:', {
              streamName,
              sessionId: dbSessionId,  // ✅ 使用database session ID
              aiServiceUrl,
              rtspUrl: `${mediamtxRtspUrl}/${streamName}`,
            });

            const rtspStartResp = await fetch(`${aiServiceUrl}/api/rtsp/start`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                stream_name: streamName,
                session_id: dbSessionId,  // ✅ 核心修复：使用database session ID
                exam_result_id: resultId || null,  // ✅ 修复：传递exam_result_id给AI服务
                rtsp_url: `${mediamtxRtspUrl}/${streamName}`,
              }),
            });

            if (!rtspStartResp.ok) {
              const errorText = await rtspStartResp.text();
              console.error('[useAIConnection] Failed to start AI RTSP consumption:', errorText);
              message.warning('AI分析服务连接失败，将继续答题但无AI监控功能');
              // 不抛出错误，允许继续（降级运行）
            } else {
              const rtspResult = await rtspStartResp.json();
              console.log('[useAIConnection] AI RTSP consumption started successfully:', rtspResult);
            }
          } catch (aiErr) {
            console.error('[useAIConnection] Error notifying AI service:', aiErr);
            message.warning('无法连接AI分析服务，将继续答题但无AI监控功能');
            // 不抛出错误，允许继续（降级运行）
          }
        } else {
          console.warn('[useAIConnection] ⚠️ 跳过AI服务通知（无database session ID）');
        }

        // 5. 二次触发后端startStream（确保AI RTSP消费在推流建立后成功）
        try {
          await webrtcApi.startStream({
            exam_uuid: examUuid,
            participant_id: participantId,
          });
          console.log('[useAIConnection] 二次触发startStream成功');
        } catch (e) {
          console.warn('[useAIConnection] 二次触发startStream失败:', e);
        }

        // 6. 最终状态确认
        setWebrtcConnectionState({ status: 'connected' });
        console.log('[useAIConnection] AI会话已建立');

        return dbSessionId;  // 返回sessionId供调用者使用
      } catch (error) {
        console.warn('[useAIConnection] AI会话初始化失败，降级模式:', error);

        // 根据错误类型显示不同的提示
        const errorMessage = error instanceof Error ? error.message : String(error);
        if (errorMessage.includes('MediaMTX') || errorMessage.includes('视频服务器')) {
          message.error('视频服务器连接失败，请联系管理员检查MediaMTX服务状态');
        } else if (errorMessage.includes('getUserMedia') || errorMessage.includes('媒体流')) {
          message.error('媒体流初始化失败，请检查摄像头和麦克风权限');
        } else if (errorMessage.includes('WHIP') || errorMessage.includes('推流')) {
          message.error('视频推流失败，请检查网络连接或联系管理员');
        } else {
          message.error('AI监控服务连接失败，请联系管理员');
        }

        setWebrtcConnectionState({
          status: 'failed',
          error: error instanceof Error ? error : new Error(String(error)),
        });
        return null;
      } finally {
        // ✅ 重置守卫标志，允许下次初始化
        isInitializingRef.current = false;
      }
    },
    [mediaStream]
  );

  // --------------------------------------------------------------------------
  // 断开连接
  // --------------------------------------------------------------------------

  const disconnect = useCallback(async (shouldCleanup = true) => {
    try {
      console.log('[useAIConnection] 断开AI会话, shouldCleanup:', shouldCleanup);

      // 场景2：如果需要清理且有resultId，清理考试数据（大屏主动断开）
      const resultId = lastResultIdRef.current;
      if (shouldCleanup && resultId) {
        try {
          const resultsApi = (await import('../services/results')).default;
          await resultsApi.cleanupExamSession(resultId);
          console.log('[useAIConnection] 已清理考试数据');
        } catch (error) {
          console.warn('[useAIConnection] 清理数据失败:', error);
        }
      }

      // 停止推流
      await webrtcPublisher.stop();

      // 通知后端停止流
      const examUuid = lastExamUuidRef.current;
      const participantId = lastParticipantIdRef.current;

      if (examUuid && participantId) {
        try {
          await webrtcApi.stopStream({
            exam_uuid: examUuid,
            participant_id: participantId,
            session_id: lastDbSessionIdRef.current, // ✅ 传递数据库会话ID给AI服务
          });
          console.log('[useAIConnection] 后端停止流成功');
        } catch (e) {
          console.warn('[useAIConnection] 后端停止流失败:', e);
        }
      }

      // 清空refs
      lastExamUuidRef.current = '';
      lastParticipantIdRef.current = '';
      lastResultIdRef.current = '';
      lastDbSessionIdRef.current = ''; // ✅ 清空数据库会话ID

      // 流的生命周期由Context管理，这里不清理
      console.log('[useAIConnection] AI会话已断开，流保留在Context中');
      setWebrtcConnectionState({ status: 'stopped' });
    } catch (error) {
      console.warn('[useAIConnection] 断开时出错:', error);
    }
  }, []);

  // --------------------------------------------------------------------------
  // 页面卸载时清理
  // --------------------------------------------------------------------------

  useEffect(() => {
    const handleUnload = () => {
      console.log('[useAIConnection] 页面卸载，清理WebRTC');
      webrtcPublisher.stop().catch(console.error);

      // 使用sendBeacon发送停止请求（页面卸载时仍能发送）
      const examUuid = lastExamUuidRef.current;
      const participantId = lastParticipantIdRef.current;

      if (examUuid && participantId && 'sendBeacon' in navigator) {
        const blob = new Blob(
          [
            JSON.stringify({
              exam_uuid: examUuid,
              participant_id: participantId,
              session_id: lastDbSessionIdRef.current, // ✅ 传递数据库会话ID给AI服务
            }),
          ],
          { type: 'application/json' }
        );
        navigator.sendBeacon('/api/webrtc/stop', blob);
      }
    };

    window.addEventListener('beforeunload', handleUnload);
    window.addEventListener('pagehide', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
      window.removeEventListener('pagehide', handleUnload);
    };
  }, []);

  // --------------------------------------------------------------------------
  // 返回值（使用useMemo稳定化引用，防止依赖此Hook的useEffect循环执行）
  // --------------------------------------------------------------------------

  return useMemo(
    () => ({
      aiAvailable,
      aiConfigLoading,
      webrtcConnectionState,
      sessionId,  // 暴露数据库会话ID
      initAISession,
      disconnect,
    }),
    // ✅ 修复：移除函数依赖（initAISession, disconnect）
    // 函数引用通过useCallback保持稳定，不应作为useMemo的依赖项
    // 否则会导致频繁重新创建对象，触发消费组件的useEffect循环执行
    [aiAvailable, aiConfigLoading, webrtcConnectionState, sessionId]
  );
}
