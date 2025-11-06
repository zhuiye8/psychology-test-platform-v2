"""
Opus音频编码服务
将PCM音频编码为Opus格式（用于WebRTC实时传输）

Opus优势：
- 低延迟（26.5ms默认，可降至5ms）
- 高压缩率（16-32 kbps达良好语音质量）
- WebRTC强制支持（浏览器兼容性好）
- 动态码率调整（适应网络波动）

⚠️ 当前为预留框架，具体编码逻辑待后续实现
"""

# ============================================================================
# 导入
# ============================================================================

import numpy as np
from typing import Optional, Literal
from config import settings
from utils.logger import get_logger

logger = get_logger(__name__)


# ============================================================================
# 主类定义
# ============================================================================

class OpusEncoder:
    """
    Opus音频编码器

    功能：
    - 将PCM音频编码为Opus格式
    - 支持流式编码（逐块处理）
    - 动态码率控制
    - 适用于实时对话场景

    技术参数：
    - 采样率: 16kHz（语音质量）
    - 码率: 24 kbps（平衡模式）
    - 帧时长: 20ms
    - 通道数: 1（单声道）
    """

    # Opus支持的采样率（Hz）
    SUPPORTED_SAMPLE_RATES = [8000, 12000, 16000, 24000, 48000]

    # Opus支持的帧时长（毫秒）
    SUPPORTED_FRAME_DURATIONS = [2.5, 5, 10, 20, 40, 60]

    # Opus码率范围（bps）
    BITRATE_RANGE = (6000, 510000)

    def __init__(
        self,
        sample_rate: Optional[int] = None,
        bitrate: Optional[int] = None,
        frame_duration: Optional[int] = None,
        channels: Optional[int] = None,
        application: Optional[Literal["audio", "voip"]] = None
    ):
        """
        初始化Opus编码器

        Args:
            sample_rate: 采样率（Hz）
            bitrate: 目标码率（bps）
            frame_duration: 帧时长（ms）
            channels: 通道数（1=单声道，2=立体声）
            application: 应用模式（voip优化语音，audio优化音乐）
        """
        self.is_initialized = False
        self.encoder = None

        # 读取配置（优先使用传入参数）
        self.sample_rate = sample_rate or settings.opus_sample_rate
        self.bitrate = bitrate or settings.opus_bitrate
        self.frame_duration = frame_duration or settings.opus_frame_duration
        self.channels = channels or settings.opus_channels
        self.application = application or settings.opus_application

        # 验证参数
        self._validate_parameters()

        # 计算帧大小（采样点数）
        self.frame_size = self._calculate_frame_size()

        logger.info(
            "opus_encoder_created",
            sample_rate=self.sample_rate,
            bitrate=self.bitrate,
            frame_duration=self.frame_duration,
            channels=self.channels,
            application=self.application,
            frame_size=self.frame_size
        )

    def _validate_parameters(self):
        """验证编码参数"""
        # 验证采样率
        if self.sample_rate not in self.SUPPORTED_SAMPLE_RATES:
            logger.warning(
                "opus_unsupported_sample_rate",
                sample_rate=self.sample_rate,
                supported=self.SUPPORTED_SAMPLE_RATES
            )
            self.sample_rate = 16000  # 降级到16kHz

        # 验证帧时长
        if self.frame_duration not in self.SUPPORTED_FRAME_DURATIONS:
            logger.warning(
                "opus_unsupported_frame_duration",
                frame_duration=self.frame_duration,
                supported=self.SUPPORTED_FRAME_DURATIONS
            )
            self.frame_duration = 20  # 降级到20ms

        # 验证码率
        min_bitrate, max_bitrate = self.BITRATE_RANGE
        if not (min_bitrate <= self.bitrate <= max_bitrate):
            logger.warning(
                "opus_bitrate_out_of_range",
                bitrate=self.bitrate,
                valid_range=self.BITRATE_RANGE
            )
            self.bitrate = 24000  # 降级到24 kbps

        # 验证通道数
        if self.channels not in [1, 2]:
            logger.warning(
                "opus_unsupported_channels",
                channels=self.channels
            )
            self.channels = 1  # 降级到单声道

    def _calculate_frame_size(self) -> int:
        """
        计算Opus帧大小（采样点数）

        帧大小 = 采样率 * 帧时长(秒)
        例如：16000 Hz * 0.02 s = 320 samples

        Returns:
            int: 帧大小（采样点数）
        """
        frame_size = int(self.sample_rate * self.frame_duration / 1000)
        return frame_size

    def initialize(self) -> bool:
        """
        初始化Opus编码器（占位实现）

        实现方式可选：
        1. PyOgg库：from pyogg import OpusEncoder
        2. FFmpeg管道：subprocess调用ffmpeg
        3. opuslib：纯Python绑定

        Returns:
            bool: 初始化是否成功

        Raises:
            RuntimeError: 编码器初始化失败
        """
        if self.is_initialized:
            logger.info("opus_encoder_already_initialized")
            return True

        try:
            logger.info("initializing_opus_encoder")

            # TODO: 使用PyOgg或FFmpeg初始化Opus编码器
            # from pyogg import OpusEncoder as PyOggEncoder
            # self.encoder = PyOggEncoder()
            # self.encoder.set_application(self.application)
            # self.encoder.set_sampling_frequency(self.sample_rate)
            # self.encoder.set_channels(self.channels)
            # self.encoder.set_bit_rate(self.bitrate)

            self.is_initialized = True
            logger.info(
                "opus_encoder_initialized_successfully",
                sample_rate=self.sample_rate,
                bitrate=self.bitrate
            )
            return True

        except Exception as e:
            logger.error(
                "opus_encoder_initialization_failed",
                error=str(e),
                error_type=type(e).__name__
            )
            raise RuntimeError(f"Opus编码器初始化失败: {str(e)}")

    def encode(self, pcm_data: np.ndarray) -> bytes:
        """
        编码PCM音频为Opus格式（占位实现）

        Args:
            pcm_data: PCM音频数据（int16，采样率必须匹配初始化参数）

        Returns:
            bytes: Opus编码后的音频数据

        Raises:
            ValueError: PCM数据格式错误
            RuntimeError: 编码器未初始化
        """
        if not self.is_initialized:
            raise RuntimeError("Opus编码器未初始化，请先调用initialize()")

        # 验证PCM数据
        if not isinstance(pcm_data, np.ndarray):
            raise ValueError("PCM数据必须是numpy数组")

        if pcm_data.dtype != np.int16:
            raise ValueError(f"PCM数据类型错误：期望int16，实际{pcm_data.dtype}")

        logger.debug(
            "opus_encode_start",
            pcm_samples=len(pcm_data),
            pcm_bytes=pcm_data.nbytes
        )

        try:
            # TODO: 使用PyOgg或FFmpeg编码
            # opus_data = self.encoder.encode(pcm_data.tobytes())

            # 占位返回：空字节
            opus_data = b''

            logger.debug(
                "opus_encode_complete",
                opus_bytes=len(opus_data),
                compression_ratio=pcm_data.nbytes / max(len(opus_data), 1)
            )

            return opus_data

        except Exception as e:
            logger.error(
                "opus_encode_failed",
                error=str(e),
                pcm_samples=len(pcm_data)
            )
            raise

    def encode_stream(self, pcm_chunk: np.ndarray) -> bytes:
        """
        流式编码PCM音频块（占位实现）

        用于实时场景，逐块编码音频数据

        Args:
            pcm_chunk: PCM音频块（int16）

        Returns:
            bytes: Opus编码后的音频块

        Raises:
            ValueError: PCM块大小不匹配帧大小
            RuntimeError: 编码器未初始化
        """
        if not self.is_initialized:
            raise RuntimeError("Opus编码器未初始化，请先调用initialize()")

        # 验证块大小
        if len(pcm_chunk) != self.frame_size:
            # 严格模式：块大小必须匹配帧大小
            logger.warning(
                "opus_chunk_size_mismatch",
                chunk_size=len(pcm_chunk),
                frame_size=self.frame_size
            )
            # 可选：自动填充或截断
            if len(pcm_chunk) < self.frame_size:
                # 填充零
                pcm_chunk = np.pad(
                    pcm_chunk,
                    (0, self.frame_size - len(pcm_chunk)),
                    mode='constant'
                )
            else:
                # 截断
                pcm_chunk = pcm_chunk[:self.frame_size]

        try:
            # TODO: 流式编码
            # opus_chunk = self.encoder.encode_stream(pcm_chunk.tobytes())

            # 占位返回：空字节
            opus_chunk = b''

            logger.debug(
                "opus_encode_stream_chunk",
                chunk_samples=len(pcm_chunk),
                opus_bytes=len(opus_chunk)
            )

            return opus_chunk

        except Exception as e:
            logger.error(
                "opus_encode_stream_failed",
                error=str(e),
                chunk_samples=len(pcm_chunk)
            )
            raise

    def get_info(self) -> dict:
        """
        获取编码器信息

        Returns:
            dict: 编码器配置和状态
        """
        return {
            "codec": "Opus",
            "sample_rate": self.sample_rate,
            "bitrate": self.bitrate,
            "frame_duration": self.frame_duration,
            "frame_size": self.frame_size,
            "channels": self.channels,
            "application": self.application,
            "is_initialized": self.is_initialized,
            "latency_ms": self.frame_duration,  # Opus延迟约等于帧时长
        }

    def cleanup(self):
        """清理编码器资源（占位实现）"""
        if self.encoder is not None:
            # TODO: 释放Opus编码器资源
            # del self.encoder
            self.encoder = None
            self.is_initialized = False
            logger.info("opus_encoder_cleaned_up")


# ============================================================================
# 工具函数
# ============================================================================

def convert_pcm_to_opus(
    pcm_data: np.ndarray,
    sample_rate: int = 16000,
    bitrate: int = 24000
) -> bytes:
    """
    便捷函数：将PCM数据转换为Opus格式

    Args:
        pcm_data: PCM音频数据（int16）
        sample_rate: 采样率
        bitrate: 目标码率

    Returns:
        bytes: Opus编码数据
    """
    encoder = OpusEncoder(sample_rate=sample_rate, bitrate=bitrate)
    encoder.initialize()
    opus_data = encoder.encode(pcm_data)
    encoder.cleanup()
    return opus_data
