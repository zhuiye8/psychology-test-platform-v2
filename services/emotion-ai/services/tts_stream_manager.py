"""
TTS流管理器
管理多个TTS生成任务的生命周期
单例模式确保全局唯一实例

功能：
- 并发控制（限制同时TTS任务数）
- 任务追踪（活跃流状态管理）
- 资源清理（任务完成后释放资源）

⚠️ 当前为预留框架，具体流管理逻辑待后续实现
"""

# ============================================================================
# 导入
# ============================================================================

import asyncio
from typing import Dict, Optional
from datetime import datetime
from config import settings
from utils.logger import get_logger

logger = get_logger(__name__)


# ============================================================================
# 类型定义
# ============================================================================

class TTSStreamInfo:
    """TTS流信息"""

    def __init__(
        self,
        stream_id: str,
        text: str,
        status: str = "pending"
    ):
        self.stream_id = stream_id
        self.text = text
        self.status = status  # pending, active, completed, failed
        self.created_at = datetime.now()
        self.started_at: Optional[datetime] = None
        self.completed_at: Optional[datetime] = None
        self.error: Optional[str] = None

    def to_dict(self) -> dict:
        """转换为字典格式"""
        return {
            "stream_id": self.stream_id,
            "text": self.text[:50] + "..." if len(self.text) > 50 else self.text,
            "text_length": len(self.text),
            "status": self.status,
            "created_at": self.created_at.isoformat(),
            "started_at": self.started_at.isoformat() if self.started_at else None,
            "completed_at": self.completed_at.isoformat() if self.completed_at else None,
            "error": self.error,
        }


# ============================================================================
# 主类定义
# ============================================================================

class TTSStreamManager:
    """
    TTS流管理器（单例模式）

    职责：
    - 管理TTS生成任务队列
    - 限制并发任务数（防止GPU过载）
    - 追踪任务状态和生命周期
    - 提供流式数据接口
    """

    _instance: Optional['TTSStreamManager'] = None

    def __new__(cls):
        """单例模式：确保全局唯一实例"""
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._initialized = False
        return cls._instance

    def __init__(self):
        """初始化TTS流管理器"""
        if self._initialized:
            return

        # 活跃流字典（stream_id -> TTSStreamInfo）
        self.active_streams: Dict[str, TTSStreamInfo] = {}

        # 并发控制信号量（限制同时TTS任务数）
        self.semaphore: Optional[asyncio.Semaphore] = None
        self.max_concurrent = settings.voxcpm_max_concurrent

        # 初始化标记
        self._initialized = True

        logger.info(
            "tts_stream_manager_initialized",
            max_concurrent=self.max_concurrent
        )

    def initialize(self, max_concurrent: Optional[int] = None):
        """
        初始化管理器资源

        Args:
            max_concurrent: 最大并发任务数（覆盖配置）
        """
        if max_concurrent is not None:
            self.max_concurrent = max_concurrent

        # 创建并发控制信号量
        self.semaphore = asyncio.Semaphore(self.max_concurrent)

        logger.info(
            "tts_stream_manager_resources_initialized",
            max_concurrent=self.max_concurrent
        )

    async def start_stream(
        self,
        stream_id: str,
        text: str,
        reference_audio: Optional[bytes] = None
    ) -> bool:
        """
        启动TTS流（占位实现）

        Args:
            stream_id: 唯一流ID
            text: 待合成文本
            reference_audio: 参考音频（音色克隆）

        Returns:
            bool: 是否启动成功
        """
        # 检查流是否已存在
        if stream_id in self.active_streams:
            logger.warning(
                "tts_stream_already_exists",
                stream_id=stream_id
            )
            return False

        # 检查并发限制
        if len(self.active_streams) >= self.max_concurrent:
            logger.warning(
                "tts_max_concurrent_reached",
                current=len(self.active_streams),
                max_concurrent=self.max_concurrent
            )
            return False

        try:
            # 创建流信息
            stream_info = TTSStreamInfo(
                stream_id=stream_id,
                text=text,
                status="pending"
            )
            self.active_streams[stream_id] = stream_info

            logger.info(
                "tts_stream_created",
                stream_id=stream_id,
                text_length=len(text),
                total_streams=len(self.active_streams)
            )

            # TODO: 实际启动TTS生成任务
            # async with self.semaphore:
            #     stream_info.status = "active"
            #     stream_info.started_at = datetime.now()
            #
            #     # 生成音频并流式返回
            #     for audio_chunk in tts_model.synthesize_stream(text):
            #         yield audio_chunk
            #
            #     stream_info.status = "completed"
            #     stream_info.completed_at = datetime.now()

            return True

        except Exception as e:
            logger.error(
                "tts_stream_start_failed",
                stream_id=stream_id,
                error=str(e),
                error_type=type(e).__name__
            )

            # 更新流状态为失败
            if stream_id in self.active_streams:
                self.active_streams[stream_id].status = "failed"
                self.active_streams[stream_id].error = str(e)

            return False

    async def stop_stream(self, stream_id: str) -> bool:
        """
        停止TTS流（占位实现）

        Args:
            stream_id: 流ID

        Returns:
            bool: 是否停止成功
        """
        if stream_id not in self.active_streams:
            logger.warning(
                "tts_stream_not_found",
                stream_id=stream_id
            )
            return False

        try:
            stream_info = self.active_streams[stream_id]

            # TODO: 停止TTS生成任务
            # cancel_task(stream_id)

            # 更新状态
            stream_info.status = "completed"
            stream_info.completed_at = datetime.now()

            # 从活跃流中移除
            del self.active_streams[stream_id]

            logger.info(
                "tts_stream_stopped",
                stream_id=stream_id,
                total_streams=len(self.active_streams)
            )

            return True

        except Exception as e:
            logger.error(
                "tts_stream_stop_failed",
                stream_id=stream_id,
                error=str(e)
            )
            return False

    def get_stream_status(self, stream_id: str) -> Optional[dict]:
        """
        获取流状态

        Args:
            stream_id: 流ID

        Returns:
            dict | None: 流信息字典，不存在返回None
        """
        stream_info = self.active_streams.get(stream_id)
        if stream_info is None:
            return None

        return stream_info.to_dict()

    def get_all_streams(self) -> list[dict]:
        """
        获取所有活跃流

        Returns:
            list: 流信息列表
        """
        return [
            stream_info.to_dict()
            for stream_info in self.active_streams.values()
        ]

    def get_statistics(self) -> dict:
        """
        获取管理器统计信息

        Returns:
            dict: 统计数据
        """
        status_counts = {}
        for stream_info in self.active_streams.values():
            status = stream_info.status
            status_counts[status] = status_counts.get(status, 0) + 1

        return {
            "total_streams": len(self.active_streams),
            "max_concurrent": self.max_concurrent,
            "utilization": len(self.active_streams) / self.max_concurrent if self.max_concurrent > 0 else 0,
            "status_counts": status_counts,
        }

    async def cleanup_completed_streams(self):
        """清理已完成的流（占位实现）"""
        completed_ids = [
            stream_id
            for stream_id, stream_info in self.active_streams.items()
            if stream_info.status in ["completed", "failed"]
        ]

        for stream_id in completed_ids:
            del self.active_streams[stream_id]
            logger.debug("tts_stream_cleaned_up", stream_id=stream_id)

        if completed_ids:
            logger.info(
                "tts_streams_cleaned",
                count=len(completed_ids),
                remaining=len(self.active_streams)
            )

    def cleanup(self):
        """清理管理器资源"""
        self.active_streams.clear()
        self.semaphore = None
        logger.info("tts_stream_manager_cleaned_up")


# ============================================================================
# 全局单例获取函数
# ============================================================================

_tts_manager_instance: Optional[TTSStreamManager] = None


def get_tts_manager() -> TTSStreamManager:
    """
    获取TTS流管理器单例

    Returns:
        TTSStreamManager: 全局唯一管理器实例
    """
    global _tts_manager_instance

    if _tts_manager_instance is None:
        _tts_manager_instance = TTSStreamManager()

    return _tts_manager_instance
