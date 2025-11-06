// ============================================================================
// WebRTC类型定义
// ============================================================================

/**
 * WebRTC相关的类型定义
 *
 * 包含：
 * - 推流器状态类型
 * - API请求/响应类型
 * - 推流配置类型
 */

// ============================================================================
// 推流器状态
// ============================================================================

/**
 * WebRTC推流器状态
 *
 * - idle: 空闲状态
 * - connecting: 正在连接
 * - connected: 已连接
 * - failed: 连接失败
 * - stopped: 已停止
 */
export type PublisherState = 'idle' | 'connecting' | 'connected' | 'failed' | 'stopped';

// ============================================================================
// API类型（后端snake_case格式）
// ============================================================================

/**
 * 启动流请求参数（后端API格式）
 */
export interface StartStreamParams {
  /** 考试UUID */
  exam_uuid?: string;
  /** 参与者ID */
  participant_id?: string;
}

/**
 * 启动流API响应（嵌套结构，匹配后端Controller返回）
 */
export interface StartStreamResponse {
  /** 是否成功 */
  success: boolean;
  /** 流数据 */
  data?: {
    /** 流名称 */
    streamName: string;
    /** WHIP端点URL（相对路径，通过后端代理） */
    whipUrl: string;
    /** WHEP端点URL（相对路径，通过后端代理） */
    whepUrl: string;
    /** RTSP播放URL（供AI服务消费） */
    rtspUrl: string;
    /** AI服务是否已启动RTSP消费 */
    aiRtspStarted: boolean;
  };
  /** 错误信息 */
  error?: string;
}

/**
 * 停止流请求参数（后端API格式）
 */
export interface StopStreamParams {
  /** 考试UUID */
  exam_uuid?: string;
  /** 参与者ID */
  participant_id?: string;
  /** 数据库会话ID（AI服务使用，优先级最高） */
  session_id?: string;
}

/**
 * 停止流API响应（嵌套结构，匹配后端Controller返回）
 */
export interface StopStreamResponse {
  /** 是否成功 */
  success: boolean;
  /** 流数据 */
  data?: {
    /** 流名称 */
    streamName: string;
    /** AI服务是否已停止RTSP消费 */
    aiRtspStopped: boolean;
  };
  /** 错误信息 */
  error?: string;
}

// ============================================================================
// 推流器配置
// ============================================================================

/**
 * WebRTC推流器启动选项
 */
export interface PublisherOptions {
  /** 考试UUID */
  examUuid?: string;
  /** 参与者ID */
  participantId?: string;

  /** 已获取的媒体流（优先使用，避免重复请求权限） */
  streams?: {
    video?: MediaStream | null;
    audio?: MediaStream | null;
  };

  /** 最大码率（bps），默认6Mbps */
  maxBitrate?: number;
  /** 最大帧率，默认60fps */
  maxFramerate?: number;
  /** 优先编码器，默认VP8 */
  preferCodec?: 'VP8' | 'H264';
}

/**
 * 推流器启动结果
 */
export interface PublisherStartResult {
  /** 流名称 */
  streamName: string;
}

/**
 * WebRTC连接状态
 */
export interface WebRTCConnectionState {
  /** 连接状态 */
  status: 'disabled' | 'idle' | 'connecting' | 'connected' | 'failed' | 'stopped';
  /** 额外信息 */
  message?: string;
  /** 错误对象 */
  error?: Error;
}

// ============================================================================
// 订阅器状态
// ============================================================================

/**
 * WebRTC订阅器状态
 *
 * - idle: 空闲状态
 * - connecting: 正在连接
 * - connected: 已连接
 * - playing: 正在播放
 * - failed: 连接失败
 * - stopped: 已停止
 */
export type SubscriberState = 'idle' | 'connecting' | 'connected' | 'playing' | 'failed' | 'stopped';

// ============================================================================
// 订阅器配置
// ============================================================================

/**
 * 流信息接口（从 AiSession.streamInfo 提取）
 */
export interface StreamInfo {
  /** 流名称 */
  stream_name: string;
  /** 参与者ID */
  participant_id: string;
}

/**
 * WebRTC订阅器选项
 */
export interface SubscriberOptions {
  /** 流名称（必须） */
  streamName: string;

  /** 连接超时时间（毫秒），默认10秒 */
  timeout?: number;

  /** 重试次数，默认3次 */
  maxRetries?: number;
}

/**
 * 订阅器启动结果
 */
export interface SubscriberStartResult {
  /** 流名称 */
  streamName: string;
  /** 远端媒体流 */
  remoteStream: MediaStream;
}
