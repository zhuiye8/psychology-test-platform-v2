// ============================================================================
// 媒体工具函数
// ============================================================================

/**
 * 媒体设备获取工具
 *
 * 职责：
 * - 提供多层回退的视频/音频获取策略
 * - 优先使用真实摄像头，过滤虚拟摄像头
 * - 处理NotReadableError（设备占用）的自动重试
 *
 * 技术要点：
 * - 多预设约束回退（640x480 → 320x240 → true）
 * - Windows环境特殊处理（过滤OBS、ManyCam等虚拟摄像头）
 * - NotReadableError重试机制（200ms延迟）
 */

// ============================================================================
// 类型定义
// ============================================================================

/**
 * 获取流的结果
 */
interface GetStreamResult {
  /** 获取到的媒体流（可能为null） */
  stream: MediaStream | null;
  /** 使用的约束条件 */
  constraints?: any;
}

// ============================================================================
// 预设约束
// ============================================================================

/**
 * 视频约束预设
 *
 * 按优先级从高到低排列，逐级降级：
 * 1. 640x480@15fps（标准）
 * 2. 640x360@10fps（降级1）
 * 3. 320x240@5-30fps（降级2）
 * 4. true（最小约束）
 */
export const VIDEO_PRESETS: MediaStreamConstraints[] = [
  {
    video: {
      width: { ideal: 640 },
      height: { ideal: 480 },
      frameRate: { ideal: 15 },
      facingMode: 'user',
      aspectRatio: 4 / 3,
    },
  },
  {
    video: {
      width: { ideal: 640 },
      height: { ideal: 360 },
      frameRate: { ideal: 10 },
      facingMode: 'user',
      aspectRatio: 16 / 9,
    },
  },
  {
    video: {
      width: { min: 320 },
      height: { min: 240 },
      frameRate: { min: 5, max: 30 },
    },
  },
  {
    video: true,
  },
];

/**
 * 音频约束（标准配置）
 *
 * 启用：
 * - 回声消除（echoCancellation）
 * - 噪声抑制（noiseSuppression）
 * - 自动增益控制（autoGainControl）
 */
export const AUDIO_CONSTRAINTS: MediaStreamConstraints = {
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true,
    sampleRate: 44100,
    channelCount: 1,
  },
};

// ============================================================================
// 视频流获取
// ============================================================================

/**
 * 获取最佳视频流
 *
 * 策略：
 * 1. 依次尝试VIDEO_PRESETS中的约束
 * 2. 如果全部失败，尝试枚举设备并逐个尝试
 * 3. 优先使用真实摄像头，过滤虚拟摄像头（OBS、ManyCam等）
 * 4. NotReadableError时自动重试一次（200ms延迟）
 *
 * @returns 视频流和使用的约束
 */
export async function getBestVideoStream(): Promise<GetStreamResult> {
  // 1. 尝试预设约束
  for (const constraints of VIDEO_PRESETS) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log('[Media] 视频预设成功:', constraints);
      return { stream, constraints };
    } catch (err) {
      const errorName = (err as any)?.name || 'UnknownError';
      console.warn(`[Media] 视频预设失败 (${errorName}):`, err);
      continue;
    }
  }

  // 2. 预设全部失败，尝试枚举设备
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const allCameras = devices.filter((d) => d.kind === 'videoinput');

    // Windows特殊处理：过滤掉常见的虚拟摄像头
    const problematicDevices = /virtual|obs|snap|youcam|manycam|droidcam/i;
    const realCameras = allCameras.filter(
      (d) => !problematicDevices.test(d.label || '')
    );
    const virtualCameras = allCameras.filter((d) =>
      problematicDevices.test(d.label || '')
    );

    // 优先使用真实摄像头，虚拟摄像头作为最后备选
    const cameras = [...realCameras, ...virtualCameras];

    for (const cam of cameras) {
      try {
        // Windows优化约束
        const constraints = {
          video: {
            deviceId: { exact: cam.deviceId },
            frameRate: { ideal: 15, min: 5, max: 30 },
            width: { ideal: 640, min: 320 },
            height: { ideal: 480, min: 240 },
            aspectRatio: 4 / 3,
          },
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        console.log(`[Media] 成功获取摄像头: ${cam.label || cam.deviceId}`);
        return { stream, constraints };
      } catch (err) {
        const errorName = (err as any)?.name || 'UnknownError';
        console.warn(
          `[Media] 摄像头 ${cam.label || cam.deviceId} 失败 (${errorName}):`,
          err
        );

        // NotReadableError：设备被占用，等待后重试
        if (errorName === 'NotReadableError') {
          console.log(
            `[Media] 设备 ${cam.label} 被占用，等待释放后重试...`
          );
          await new Promise((resolve) => setTimeout(resolve, 200));

          // 重试一次
          try {
            const constraints = {
              video: {
                deviceId: { exact: cam.deviceId },
                frameRate: { ideal: 15, min: 5, max: 30 },
                width: { ideal: 640, min: 320 },
                height: { ideal: 480, min: 240 },
              },
            };
            const retryStream = await navigator.mediaDevices.getUserMedia(
              constraints
            );
            console.log(
              `[Media] 重试成功，获取摄像头: ${cam.label || cam.deviceId}`
            );
            return { stream: retryStream, constraints };
          } catch (retryErr) {
            console.warn(
              `[Media] 重试失败，摄像头 ${cam.label || cam.deviceId}:`,
              retryErr
            );
            continue;
          }
        }
      }
    }
  } catch (e) {
    console.warn('[Media] 列举设备失败:', e);
  }

  // 全部失败
  return { stream: null };
}

// ============================================================================
// 音频流获取
// ============================================================================

/**
 * 获取最佳音频流
 *
 * 策略：
 * 1. 尝试标准约束（echoCancellation + noiseSuppression + autoGainControl）
 * 2. 降级1：移除autoGainControl
 * 3. 降级2：移除所有音频处理
 * 4. 降级3：最简约束（audio: true）
 * 5. NotReadableError时自动重试一次（200ms延迟）
 *
 * @returns 音频流和使用的约束
 */
export async function getBestAudioStream(): Promise<GetStreamResult> {
  // 音频约束策略（按优先级降级）
  const audioStrategies = [
    AUDIO_CONSTRAINTS, // 完整约束
    {
      audio: { echoCancellation: true, noiseSuppression: true },
    }, // 移除autoGainControl
    {
      audio: {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false,
      },
    }, // 最基础约束
    { audio: true }, // 最简约束
  ];

  for (let i = 0; i < audioStrategies.length; i++) {
    const constraints = audioStrategies[i];
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log(`[Media] 音频获取成功，使用策略 ${i + 1}:`, constraints);
      return { stream, constraints };
    } catch (err) {
      const errorName = (err as any)?.name || 'UnknownError';
      console.warn(`[Media] 音频策略 ${i + 1} 失败 (${errorName}):`, err);

      // NotReadableError：设备被占用，尝试等待后重试
      if (errorName === 'NotReadableError') {
        console.log(`[Media] 音频设备被占用，等待释放后重试策略 ${i + 1}...`);
        await new Promise((resolve) => setTimeout(resolve, 200));

        try {
          const retryStream = await navigator.mediaDevices.getUserMedia(
            constraints
          );
          console.log(`[Media] 音频重试成功，使用策略 ${i + 1}:`, constraints);
          return { stream: retryStream, constraints };
        } catch (retryErr) {
          console.warn(`[Media] 音频重试失败，策略 ${i + 1}:`, retryErr);
        }
      }

      // NotFoundError：设备未找到，直接结束尝试
      if (errorName === 'NotFoundError' && i === audioStrategies.length - 1) {
        console.error('[Media] 系统中没有可用的音频输入设备');
      }
      continue;
    }
  }

  // 全部失败
  return { stream: null };
}
