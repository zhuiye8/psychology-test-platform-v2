// ============================================================================
// 设备检测类型定义
// ============================================================================

/**
 * 设备检测相关的类型定义
 *
 * 包含：
 * - 设备检测结果
 * - Hook状态
 * - Hook返回类型
 */

// ============================================================================
// 设备检测结果（后端API格式）
// ============================================================================

/**
 * 设备检测结果（snake_case格式，用于后端API）
 */
export interface DeviceCheckResults {
  /** 摄像头是否可用 */
  camera_ok: boolean;
  /** 麦克风是否可用 */
  microphone_ok: boolean;

  /** 选中的摄像头设备ID */
  selected_camera_id?: string;
  /** 选中的摄像头设备标签 */
  selected_camera_label?: string;
  /** 选中的麦克风设备ID */
  selected_microphone_id?: string;
  /** 选中的麦克风设备标签 */
  selected_microphone_label?: string;

  /** 使用的约束条件（用于调试） */
  constraints_used?: Record<string, any>;

  /** 是否跳过了设备检测 */
  skipped?: boolean;
  /** 是否选择退出AI监控 */
  ai_opt_out?: boolean;
  /** 用户是否确认 */
  user_confirmed?: boolean;
}

// ============================================================================
// Hook状态
// ============================================================================

/**
 * useDeviceCheck Hook的状态
 */
export interface UseDeviceCheckState {
  /** 视频流 */
  videoStream: MediaStream | null;
  /** 音频流 */
  audioStream: MediaStream | null;

  /** 摄像头是否正常 */
  cameraOk: boolean;
  /** 麦克风是否正常 */
  micOk: boolean;
  /** 音量电平 (0-100) */
  volumeLevel: number;
  /** 是否正在检测 */
  testing: boolean;
  /** 错误信息 */
  error: string | null;

  /** 摄像头设备列表 */
  cameras: MediaDeviceInfo[];
  /** 麦克风设备列表 */
  microphones: MediaDeviceInfo[];
  /** 选中的摄像头ID */
  selectedCameraId?: string;
  /** 选中的麦克风ID */
  selectedMicId?: string;
}

/**
 * useDeviceCheck Hook的返回类型
 */
export interface UseDeviceCheckReturn extends UseDeviceCheckState {
  /** 开始设备检测 */
  start: () => Promise<void>;
  /** 重试设备检测 */
  retry: () => Promise<void>;
  /** 停止设备检测并清理资源 */
  stop: () => void;
  /** 刷新设备列表 */
  refreshDevices: () => Promise<void>;
  /** 选择摄像头 */
  selectCamera: (deviceId: string) => Promise<void>;
  /** 选择麦克风 */
  selectMic: (deviceId: string) => Promise<void>;
}

// ============================================================================
// 页面Props
// ============================================================================

/**
 * 设备检测页面Props
 */
export interface DeviceCheckPageProps {
  /** 检测完成回调 */
  onComplete: (results: DeviceCheckResults) => void;
  /** 跳过检测回调（可选） */
  onSkip?: (results: DeviceCheckResults) => void;
}
