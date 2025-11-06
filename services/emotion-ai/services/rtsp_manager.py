"""
RTSP消费管理器
管理多个RTSP流的生命周期
"""

from typing import Dict, Optional
import httpx
from services.rtsp_consumer import RTSPConsumer
from config import settings
from utils.logger import get_logger

logger = get_logger(__name__)


class RTSPConsumerManager:
    """RTSP消费管理器 - 单例模式"""

    _instance: Optional['RTSPConsumerManager'] = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._initialized = False
        return cls._instance

    def __init__(self):
        if self._initialized:
            return

        self.consumers: Dict[str, RTSPConsumer] = {}
        self._initialized = True

        logger.info("rtsp_consumer_manager_initialized")

    async def start_consumer(
        self,
        stream_name: str,
        session_id: str,
        exam_result_id: Optional[str] = None,
    ) -> bool:
        """
        启动RTSP消费器

        Args:
            stream_name: RTSP流名称
            session_id: AI会话ID
            exam_result_id: 考试结果ID

        Returns:
            是否启动成功
        """
        if session_id in self.consumers:
            logger.warning("consumer_already_exists", session_id=session_id)
            return False

        try:
            # 创建消费器
            consumer = RTSPConsumer(
                stream_name=stream_name,
                session_id=session_id,
                exam_result_id=exam_result_id,
            )

            # 启动消费
            await consumer.start()

            # 保存到字典
            self.consumers[session_id] = consumer

            logger.info(
                "consumer_started",
                session_id=session_id,
                stream_name=stream_name,
                total_consumers=len(self.consumers),
            )

            # ✅ 简化状态管理：前端创建session时直接设置ACTIVE状态，AI服务无需更新
            # 状态由前端负责管理，保证可靠性

            return True

        except Exception as e:
            logger.error(
                "consumer_start_failed",
                session_id=session_id,
                error=str(e),
                error_type=type(e).__name__,
            )
            return False

    async def stop_consumer(self, session_id: str) -> bool:
        """
        停止RTSP消费器

        Args:
            session_id: AI会话ID

        Returns:
            是否停止成功
        """
        consumer = self.consumers.get(session_id)

        if not consumer:
            logger.warning("consumer_not_found", session_id=session_id)
            return False

        try:
            # 停止消费
            await consumer.stop()

            # 从字典移除
            del self.consumers[session_id]

            logger.info(
                "consumer_stopped",
                session_id=session_id,
                total_consumers=len(self.consumers),
            )

            return True

        except Exception as e:
            logger.error(
                "consumer_stop_failed",
                session_id=session_id,
                error=str(e),
                error_type=type(e).__name__,
            )
            return False

    async def stop_consumer_by_stream_name(self, stream_name: str) -> bool:
        """
        通过流名称停止RTSP消费器

        反向查找：遍历consumers找到匹配的stream_name并停止

        Args:
            stream_name: RTSP流名称

        Returns:
            是否停止成功
        """
        # 反向查找对应的session_id
        for session_id, consumer in self.consumers.items():
            if consumer.stream_name == stream_name:
                logger.info(
                    "consumer_found_by_stream_name",
                    stream_name=stream_name,
                    session_id=session_id,
                )
                return await self.stop_consumer(session_id)

        logger.warning("consumer_not_found_by_stream_name", stream_name=stream_name)
        return False

    async def stop_all_consumers(self):
        """停止所有消费器"""
        logger.info("stopping_all_consumers", total=len(self.consumers))

        session_ids = list(self.consumers.keys())

        for session_id in session_ids:
            await self.stop_consumer(session_id)

        logger.info("all_consumers_stopped")

    def get_consumer(self, session_id: str) -> Optional[RTSPConsumer]:
        """获取消费器"""
        return self.consumers.get(session_id)

    def get_all_consumers(self) -> Dict[str, RTSPConsumer]:
        """获取所有消费器"""
        return self.consumers.copy()

    def get_stats(self):
        """获取所有消费器的统计信息"""
        return {
            "total_consumers": len(self.consumers),
            "consumers": {
                session_id: consumer.get_stats()
                for session_id, consumer in self.consumers.items()
            },
        }


# 全局单例
_manager: Optional[RTSPConsumerManager] = None


def get_rtsp_manager() -> RTSPConsumerManager:
    """获取全局RTSP消费管理器"""
    global _manager
    if _manager is None:
        _manager = RTSPConsumerManager()
    return _manager
