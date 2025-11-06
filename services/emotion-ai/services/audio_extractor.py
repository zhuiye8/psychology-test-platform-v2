"""
音频提取器
从RTSP流中提取音频轨道并进行预处理
"""

import asyncio
import subprocess
import tempfile
import os
import numpy as np
from typing import Optional, Callable
from pathlib import Path
from config import settings
from utils.logger import get_logger

logger = get_logger(__name__)


class AudioExtractor:
    """
    音频提取器
    使用ffmpeg从RTSP流中提取音频，并进行预处理
    """

    def __init__(self, rtsp_url: str, session_id: str):
        """
        Args:
            rtsp_url: RTSP流URL
            session_id: 会话ID（用于日志和临时文件命名）
        """
        self.rtsp_url = rtsp_url
        self.session_id = session_id

        # 音频配置
        self.sample_rate = settings.emotion2vec_sample_rate  # 16000Hz
        self.channels = 1  # 单声道
        self.bit_depth = 16  # 16-bit PCM

        # 缓冲区配置
        self.buffer_duration = 3.0  # 缓冲时长（秒）
        self.buffer_samples = int(self.sample_rate * self.buffer_duration)
        self.audio_buffer = np.array([], dtype=np.float32)

        # 状态
        self.is_running = False
        self.process: Optional[subprocess.Popen] = None
        self.task: Optional[asyncio.Task] = None

        # 回调函数（当音频片段准备好时调用）
        self.on_audio_ready: Optional[Callable[[np.ndarray], None]] = None

        logger.info(
            "audio_extractor_created",
            session_id=session_id,
            sample_rate=self.sample_rate,
            buffer_duration=self.buffer_duration,
        )

    def set_audio_callback(self, callback: Callable[[np.ndarray], None]):
        """
        设置音频准备就绪回调

        Args:
            callback: 回调函数，接收音频numpy数组（float32, 单声道）
        """
        self.on_audio_ready = callback
        logger.info("audio_callback_set", session_id=self.session_id)

    async def start(self):
        """启动音频提取"""
        if self.is_running:
            logger.warning("audio_extractor_already_running", session_id=self.session_id)
            return

        logger.info("starting_audio_extractor", session_id=self.session_id)

        self.is_running = True
        self.task = asyncio.create_task(self._extract_loop())

        logger.info("audio_extractor_started", session_id=self.session_id)

    async def stop(self):
        """停止音频提取"""
        if not self.is_running:
            logger.warning("audio_extractor_not_running", session_id=self.session_id)
            return

        logger.info("stopping_audio_extractor", session_id=self.session_id)

        self.is_running = False

        # 停止ffmpeg进程
        if self.process:
            try:
                self.process.terminate()
                await asyncio.sleep(1)
                if self.process.poll() is None:
                    self.process.kill()
            except Exception as e:
                logger.error("ffmpeg_termination_error", error=str(e))

        # 等待任务完成
        if self.task:
            try:
                await asyncio.wait_for(self.task, timeout=5.0)
            except asyncio.TimeoutError:
                logger.warning("audio_extractor_stop_timeout", session_id=self.session_id)
                self.task.cancel()

        logger.info("audio_extractor_stopped", session_id=self.session_id)

    async def _extract_loop(self):
        """音频提取主循环"""
        retry_count = 0
        max_retries = 3

        while self.is_running and retry_count < max_retries:
            try:
                # 启动ffmpeg进程
                if not await self._start_ffmpeg():
                    retry_count += 1
                    logger.warning(
                        "ffmpeg_start_failed_retry",
                        session_id=self.session_id,
                        retry=retry_count,
                    )
                    await asyncio.sleep(2 ** retry_count)
                    continue

                # 重置重试计数
                retry_count = 0

                # 读取音频数据
                await self._read_audio_data()

            except asyncio.CancelledError:
                logger.info("audio_extractor_cancelled", session_id=self.session_id)
                break

            except Exception as e:
                logger.error(
                    "audio_extractor_error",
                    session_id=self.session_id,
                    error=str(e),
                    error_type=type(e).__name__,
                )
                retry_count += 1
                await asyncio.sleep(2)

        if retry_count >= max_retries:
            logger.error("audio_extractor_max_retries_exceeded", session_id=self.session_id)

    async def _start_ffmpeg(self) -> bool:
        """
        启动ffmpeg进程提取音频

        Returns:
            是否启动成功
        """
        try:
            logger.info("starting_ffmpeg_for_audio", rtsp_url=self.rtsp_url)

            # ffmpeg命令：提取音频并输出为16kHz单声道PCM
            cmd = [
                'ffmpeg',
                '-rtsp_transport', 'tcp',         # 🔧 强制使用TCP传输（更稳定）
                '-i', self.rtsp_url,              # 输入RTSP流
                '-vn',                             # 忽略视频
                '-ar', str(self.sample_rate),     # 采样率16kHz
                '-ac', str(self.channels),        # 单声道
                '-f', 's16le',                    # 16-bit PCM little-endian
                '-acodec', 'pcm_s16le',           # PCM编解码器
                'pipe:1',                          # 输出到stdout
            ]

            # 启动进程
            self.process = subprocess.Popen(
                cmd,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,           # 🔧 捕获stderr以便诊断错误
                bufsize=10**6,  # 1MB缓冲
            )

            # 🔧 启动stderr监控任务
            asyncio.create_task(self._monitor_ffmpeg_stderr())

            logger.info("ffmpeg_started", session_id=self.session_id, pid=self.process.pid)
            return True

        except Exception as e:
            logger.error("ffmpeg_start_error", error=str(e), session_id=self.session_id)
            return False

    async def _read_audio_data(self):
        """从ffmpeg读取音频数据"""
        if not self.process or not self.process.stdout:
            return

        # 每次读取的字节数（0.5秒音频）
        chunk_duration = 0.5  # 秒
        chunk_samples = int(self.sample_rate * chunk_duration)
        chunk_bytes = chunk_samples * 2  # 16-bit = 2 bytes per sample

        while self.is_running and self.process.poll() is None:
            try:
                # 读取音频chunk
                audio_bytes = await asyncio.get_event_loop().run_in_executor(
                    None,
                    self.process.stdout.read,
                    chunk_bytes
                )

                if not audio_bytes:
                    logger.warning("audio_stream_ended", session_id=self.session_id)
                    break

                # 转换为numpy数组（int16 -> float32）
                audio_chunk = np.frombuffer(audio_bytes, dtype=np.int16)
                audio_chunk = audio_chunk.astype(np.float32) / 32768.0  # 归一化到[-1, 1]

                # 添加到缓冲区
                self.audio_buffer = np.concatenate([self.audio_buffer, audio_chunk])

                # 检查是否达到缓冲时长
                if len(self.audio_buffer) >= self.buffer_samples:
                    # 提取一个完整的音频段
                    audio_segment = self.audio_buffer[:self.buffer_samples]
                    self.audio_buffer = self.audio_buffer[self.buffer_samples:]

                    # 调用回调函数
                    if self.on_audio_ready:
                        await self._invoke_callback(audio_segment)

                # 让出控制权
                await asyncio.sleep(0.01)

            except Exception as e:
                logger.error(
                    "audio_read_error",
                    session_id=self.session_id,
                    error=str(e),
                    error_type=type(e).__name__,
                )
                break

    async def _invoke_callback(self, audio_data: np.ndarray):
        """
        调用音频准备就绪回调

        Args:
            audio_data: 音频numpy数组
        """
        try:
            loop = asyncio.get_event_loop()
            await loop.run_in_executor(None, self.on_audio_ready, audio_data)

            logger.debug(
                "audio_callback_invoked",
                session_id=self.session_id,
                samples=len(audio_data),
                duration=len(audio_data) / self.sample_rate,
            )

        except Exception as e:
            logger.error(
                "audio_callback_error",
                session_id=self.session_id,
                error=str(e),
                error_type=type(e).__name__,
            )

    async def _monitor_ffmpeg_stderr(self):
        """
        监控ffmpeg的stderr输出以诊断错误
        """
        if not self.process or not self.process.stderr:
            return

        try:
            while self.is_running and self.process.poll() is None:
                # 非阻塞读取stderr
                line = await asyncio.get_event_loop().run_in_executor(
                    None,
                    self.process.stderr.readline
                )

                if not line:
                    break

                line_str = line.decode('utf-8', errors='ignore').strip()

                # 过滤ffmpeg的正常输出，只记录重要信息
                if not line_str:
                    continue

                # 记录错误和警告
                if 'error' in line_str.lower() or 'failed' in line_str.lower():
                    logger.error(
                        "ffmpeg_stderr_error",
                        session_id=self.session_id,
                        message=line_str
                    )
                elif 'warning' in line_str.lower():
                    logger.warning(
                        "ffmpeg_stderr_warning",
                        session_id=self.session_id,
                        message=line_str
                    )
                elif 'audio' in line_str.lower() or 'stream' in line_str.lower():
                    # 记录音频流相关信息（用于调试）
                    logger.info(
                        "ffmpeg_audio_info",
                        session_id=self.session_id,
                        message=line_str
                    )

        except Exception as e:
            logger.error(
                "ffmpeg_stderr_monitor_error",
                session_id=self.session_id,
                error=str(e)
            )

    def get_stats(self) -> dict:
        """获取音频提取器统计信息"""
        return {
            "session_id": self.session_id,
            "is_running": self.is_running,
            "buffer_size": len(self.audio_buffer),
            "buffer_duration_sec": len(self.audio_buffer) / self.sample_rate,
            "ffmpeg_running": self.process is not None and self.process.poll() is None,
        }
