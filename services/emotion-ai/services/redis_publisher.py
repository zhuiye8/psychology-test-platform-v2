"""
Redis Pub/Sub发布器
负责将AI分析结果实时推送到Redis，供后端订阅并转发给前端
"""

import json
import redis.asyncio as redis
from typing import Dict, Any, Optional
from datetime import datetime
from config import settings
from utils.logger import get_logger

logger = get_logger(__name__)


class RedisPublisher:
    """
    Redis Pub/Sub发布器

    功能：
    - 实时推送AI分析结果到Redis channel
    - 每个会话独立channel：ai:session:{session_id}
    - 支持降级（Redis不可用时静默失败）
    - 异步操作，不阻塞主流程
    """

    def __init__(self):
        self.redis_client: Optional[redis.Redis] = None
        self.enabled = settings.redis_realtime_enabled
        self.connection_ok = False

    async def connect(self):
        """
        连接Redis服务器

        注意：连接失败不抛异常，而是禁用实时推送功能
        """
        if not self.enabled:
            logger.info("redis_publisher_disabled", reason="config_disabled")
            return

        try:
            self.redis_client = redis.Redis(
                host=settings.redis_host,
                port=settings.redis_port,
                db=settings.redis_db,
                password=settings.redis_password,
                decode_responses=True,  # 自动解码为字符串
                socket_connect_timeout=5,
                socket_timeout=5,
            )

            # 测试连接
            await self.redis_client.ping()
            self.connection_ok = True

            logger.info(
                "redis_publisher_connected",
                host=settings.redis_host,
                port=settings.redis_port,
                db=settings.redis_db,
            )

        except Exception as e:
            logger.warning(
                "redis_publisher_connection_failed",
                error=str(e),
                fallback="realtime_push_disabled"
            )
            self.connection_ok = False
            self.enabled = False

    async def disconnect(self):
        """关闭Redis连接"""
        if self.redis_client:
            await self.redis_client.close()
            logger.info("redis_publisher_disconnected")

    async def publish_analysis_result(
        self,
        session_id: str,
        data_type: str,
        result: Dict[str, Any]
    ) -> bool:
        """
        发布AI分析结果到Redis channel

        Args:
            session_id: 会话ID
            data_type: 数据类型（video_emotion/audio_emotion/heart_rate）
            result: 分析结果

        Returns:
            是否发布成功
        """
        if not self.enabled or not self.connection_ok:
            # 静默失败，不影响主流程
            return False

        try:
            # 构建channel名称
            channel = f"ai:session:{session_id}"

            # 构建消息
            message = {
                "session_id": session_id,
                "timestamp": datetime.utcnow().isoformat() + "Z",
                "data_type": data_type,
                "data": result
            }

            # 发布到Redis
            await self.redis_client.publish(channel, json.dumps(message))

            logger.debug(
                "analysis_result_published",
                session_id=session_id,
                data_type=data_type,
                channel=channel
            )

            return True

        except Exception as e:
            logger.error(
                "publish_analysis_failed",
                session_id=session_id,
                data_type=data_type,
                error=str(e)
            )
            return False

    async def publish_session_event(
        self,
        session_id: str,
        event_type: str,
        event_data: Optional[Dict[str, Any]] = None
    ) -> bool:
        """
        发布会话事件（开始、结束、错误等）

        Args:
            session_id: 会话ID
            event_type: 事件类型（session_started/session_stopped/session_error）
            event_data: 事件数据

        Returns:
            是否发布成功
        """
        if not self.enabled or not self.connection_ok:
            return False

        try:
            channel = f"ai:session:{session_id}"

            message = {
                "session_id": session_id,
                "timestamp": datetime.utcnow().isoformat() + "Z",
                "event_type": event_type,
                "event_data": event_data or {}
            }

            await self.redis_client.publish(channel, json.dumps(message))

            logger.info(
                "session_event_published",
                session_id=session_id,
                event_type=event_type,
                channel=channel
            )

            return True

        except Exception as e:
            logger.error(
                "publish_session_event_failed",
                session_id=session_id,
                event_type=event_type,
                error=str(e)
            )
            return False


# ============================================================================
# 单例实例（全局共享）
# ============================================================================

_redis_publisher_instance: Optional[RedisPublisher] = None


def get_redis_publisher() -> RedisPublisher:
    """
    获取RedisPublisher单例实例

    Returns:
        RedisPublisher实例
    """
    global _redis_publisher_instance

    if _redis_publisher_instance is None:
        _redis_publisher_instance = RedisPublisher()

    return _redis_publisher_instance
