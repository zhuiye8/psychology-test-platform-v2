// ============================================================================
// WebRTC API服务
// ============================================================================

/**
 * WebRTC API封装
 *
 * 职责：
 * - 封装后端WebRTC API调用
 * - 提供统一的错误处理
 * - 类型安全的API接口
 *
 * API端点：
 * - POST /api/webrtc/start - 启动流
 * - POST /api/webrtc/stop - 停止流
 */

import type {
  StartStreamParams,
  StartStreamResponse,
  StopStreamParams,
  StopStreamResponse,
} from '../types/webrtc';

// ============================================================================
// API基础URL
// ============================================================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/api`
  : 'http://localhost:4001/api';

// ============================================================================
// WebRTC API
// ============================================================================

/**
 * WebRTC API封装
 */
export const webrtcApi = {
  /**
   * 启动WebRTC流
   *
   * 流程：
   * 1. 调用后端API获取流名称和端点URL
   * 2. 后端会返回WHIP/WHEP/RTSP端点
   * 3. （可选）后端通知AI服务准备消费RTSP
   *
   * @param params 启动流参数
   * @returns 流信息
   */
  async startStream(
    params: StartStreamParams
  ): Promise<StartStreamResponse> {
    try {
      console.log('[WebRTC API] 调用启动流:', `${API_BASE_URL}/webrtc/start`, params);

      const response = await fetch(`${API_BASE_URL}/webrtc/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      console.log('[WebRTC API] 响应状态:', response.status, response.statusText);

      // 尝试解析响应
      let data: any;
      const contentType = response.headers.get('content-type');

      if (contentType?.includes('application/json')) {
        data = await response.json();
      } else {
        // 非JSON响应，读取文本
        const text = await response.text();
        console.error('[WebRTC API] 非JSON响应:', text.substring(0, 200));
        throw new Error(`服务器返回非JSON响应 (${response.status}): ${text.substring(0, 100)}`);
      }

      if (!response.ok) {
        // 提取错误消息
        const errorMsg = typeof data.error === 'string'
          ? data.error
          : data.message || JSON.stringify(data) || `HTTP ${response.status}`;
        throw new Error(errorMsg);
      }

      console.log('[WebRTC API] 启动流成功:', data);
      return data as StartStreamResponse;
    } catch (error) {
      console.error('[WebRTC API] 启动流失败:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        success: false,
        error: errorMessage,
      };
    }
  },

  /**
   * 停止WebRTC流
   *
   * 流程：
   * 1. 调用后端API通知停止流
   * 2. 后端会通知AI服务停止RTSP消费
   * 3. 清理相关资源
   *
   * @param params 停止流参数
   * @returns 停止结果
   */
  async stopStream(params: StopStreamParams): Promise<StopStreamResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/webrtc/stop`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }

      return data as StopStreamResponse;
    } catch (error) {
      console.error('[WebRTC API] 停止流失败:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },
};
