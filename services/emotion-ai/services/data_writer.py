"""
数据写入器 - 负责将AI分析结果写入后端API和本地文件系统
"""

import httpx
from typing import Dict, Any, List, Optional
from datetime import datetime
from config import settings
from utils.logger import get_logger
from services.checkpoint_file_writer import get_checkpoint_file_writer

logger = get_logger(__name__)


class DataWriter:
    """
    AI分析数据写入器
    通过HTTP调用后端API，将分析结果持久化到数据库
    """

    def __init__(self):
        self.backend_url = settings.backend_api_url.rstrip("/")
        self.headers = {
            "Authorization": f"Bearer {settings.ai_service_token}",
            "Content-Type": "application/json",
        }
        self.client: Optional[httpx.AsyncClient] = None

    async def __aenter__(self):
        """异步上下文管理器入口"""
        self.client = httpx.AsyncClient(
            timeout=httpx.Timeout(30.0),
            headers=self.headers,
            proxies=None,  # 禁用代理，确保localhost请求不经过系统代理
        )
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        """异步上下文管理器出口"""
        if self.client:
            await self.client.aclose()

    async def create_session(
        self,
        session_id: str,
        exam_result_id: Optional[str] = None,
        client_info: Optional[Dict[str, Any]] = None,
        stream_info: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        """
        创建AI会话

        Args:
            session_id: AI服务生成的会话ID
            exam_result_id: 考试结果ID
            client_info: 客户端信息
            stream_info: 流信息

        Returns:
            后端返回的会话数据
        """
        url = f"{self.backend_url}/api/ai/sessions"
        payload = {
            "session_id": session_id,
            "exam_result_id": exam_result_id,
            "client_info": client_info or {},
            "stream_info": stream_info or {},
        }

        logger.info("creating_ai_session", session_id=session_id, exam_result_id=exam_result_id)

        try:
            response = await self.client.post(url, json=payload)
            response.raise_for_status()
            data = response.json()
            logger.info("ai_session_created", session_id=session_id, prisma_id=data.get("data", {}).get("id"))
            return data.get("data", {})
        except httpx.HTTPStatusError as e:
            logger.error("create_session_failed", error=str(e), status_code=e.response.status_code)
            raise
        except Exception as e:
            logger.error("create_session_error", error=str(e))
            raise

    async def update_session_status(
        self,
        prisma_session_id: str,
        status: str,
        end_time: Optional[datetime] = None,
    ) -> Dict[str, Any]:
        """
        更新会话状态

        Args:
            prisma_session_id: Prisma数据库中的会话ID（不是sessionId字符串）
            status: 状态（CREATED, ANALYZING, COMPLETED, FAILED）
            end_time: 结束时间

        Returns:
            更新后的会话数据
        """
        url = f"{self.backend_url}/api/ai/sessions/{prisma_session_id}/status"
        payload = {
            "status": status,
        }
        if end_time:
            payload["end_time"] = end_time.isoformat()

        logger.info("updating_session_status", prisma_id=prisma_session_id, status=status)

        try:
            response = await self.client.patch(url, json=payload)
            response.raise_for_status()
            data = response.json()
            logger.info("session_status_updated", prisma_id=prisma_session_id, status=status)
            return data.get("data", {})
        except httpx.HTTPStatusError as e:
            logger.error("update_status_failed", error=str(e), status_code=e.response.status_code)
            raise
        except Exception as e:
            logger.error("update_status_error", error=str(e))
            raise

    # ============================================================================
    # 检查点文件存储（新架构：JSON文件替代数据库）
    # ============================================================================

    def initialize_checkpoint_file(
        self,
        session_id: str,
        exam_result_id: Optional[str] = None,
        metadata: Optional[Dict[str, Any]] = None
    ) -> str:
        """
        初始化检查点文件（创建空JSON结构）

        Args:
            session_id: 会话ID
            exam_result_id: 考试结果ID
            metadata: 元数据（如fps、采样策略等）

        Returns:
            相对文件路径（用于数据库存储）
        """
        file_writer = get_checkpoint_file_writer()
        return file_writer.initialize_file(
            session_id=session_id,
            exam_result_id=exam_result_id,
            metadata=metadata
        )

    def write_checkpoint_file(
        self,
        session_id: str,
        data_points: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        """
        写入检查点数据到JSON文件

        Args:
            session_id: 会话ID
            data_points: 数据点列表（包含video_emotion、audio_emotion、heart_rate等）

        Returns:
            文件信息（相对路径、数据点数量、文件大小）
        """
        file_writer = get_checkpoint_file_writer()
        return file_writer.append_data_points(
            session_id=session_id,
            data_points=data_points
        )

    async def update_session_file_info(
        self,
        prisma_session_id: str,
        file_path: str,
        checkpoint_count: int,
        file_size: int
    ) -> Dict[str, Any]:
        """
        更新会话的文件信息（调用后端API）

        Args:
            prisma_session_id: Prisma数据库中的会话ID
            file_path: 检查点文件相对路径
            checkpoint_count: 数据点数量
            file_size: 文件大小（字节）

        Returns:
            更新后的会话数据
        """
        url = f"{self.backend_url}/api/ai/sessions/{prisma_session_id}/file-info"
        payload = {
            "checkpoint_file_path": file_path,
            "checkpoint_count": checkpoint_count,
            "file_size": file_size
        }

        logger.info(
            "updating_session_file_info",
            prisma_id=prisma_session_id,
            file_path=file_path,
            count=checkpoint_count,
            size_kb=round(file_size / 1024, 2)
        )

        try:
            response = await self.client.patch(url, json=payload)
            response.raise_for_status()
            data = response.json()
            logger.info("session_file_info_updated", prisma_id=prisma_session_id)
            return data.get("data", {})
        except httpx.HTTPStatusError as e:
            logger.error(
                "update_file_info_failed",
                error=str(e),
                status_code=e.response.status_code
            )
            raise
        except Exception as e:
            logger.error("update_file_info_error", error=str(e))
            raise

    # ============================================================================
    # 聚合数据和异常事件（保留数据库存储）
    # ============================================================================

    async def save_aggregate(
        self,
        session_id: str,
        exam_result_id: Optional[str],
        **kwargs,
    ) -> Dict[str, Any]:
        """
        保存聚合分析结果

        Args:
            session_id: AI会话ID
            exam_result_id: 考试结果ID
            **kwargs: 聚合数据字段（如avg_valence, avg_arousal等）

        Returns:
            保存后的聚合数据
        """
        url = f"{self.backend_url}/api/ai/aggregates"
        payload = {
            "session_id": session_id,
            "exam_result_id": exam_result_id,
            **kwargs,
        }

        logger.info("saving_aggregate", session_id=session_id)

        try:
            response = await self.client.post(url, json=payload)
            response.raise_for_status()
            data = response.json()
            logger.info("aggregate_saved", session_id=session_id)
            return data.get("data", {})
        except httpx.HTTPStatusError as e:
            logger.error("save_aggregate_failed", error=str(e), status_code=e.response.status_code)
            raise
        except Exception as e:
            logger.error("save_aggregate_error", error=str(e))
            raise

    async def save_anomaly(
        self,
        session_id: str,
        anomaly_type: str,
        severity: str,
        timestamp: datetime,
        description: str,
        duration: Optional[float] = None,
        confidence: Optional[float] = None,
        metadata: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        """
        保存异常事件

        Args:
            session_id: AI会话ID
            anomaly_type: 异常类型（MULTIPLE_FACES, NO_FACE_DETECTED等）
            severity: 严重程度（INFO, WARNING, CRITICAL）
            timestamp: 时间戳
            description: 描述
            duration: 持续时间（秒）
            confidence: 置信度（0-1）
            metadata: 元数据

        Returns:
            保存后的异常数据
        """
        url = f"{self.backend_url}/api/ai/anomalies"
        payload = {
            "session_id": session_id,
            "type": anomaly_type,
            "severity": severity,
            "timestamp": timestamp.isoformat(),
            "description": description,
        }
        if duration is not None:
            payload["duration"] = duration
        if confidence is not None:
            payload["confidence"] = confidence
        if metadata:
            payload["metadata"] = metadata

        logger.info("saving_anomaly", session_id=session_id, type=anomaly_type, severity=severity)

        try:
            response = await self.client.post(url, json=payload)
            response.raise_for_status()
            data = response.json()
            logger.info("anomaly_saved", session_id=session_id, type=anomaly_type)
            return data.get("data", {})
        except httpx.HTTPStatusError as e:
            logger.error("save_anomaly_failed", error=str(e), status_code=e.response.status_code)
            raise
        except Exception as e:
            logger.error("save_anomaly_error", error=str(e))
            raise


# 全局实例（需要在异步上下文中使用）
_writer: Optional[DataWriter] = None


def get_data_writer() -> DataWriter:
    """获取全局数据写入器实例"""
    global _writer
    if _writer is None:
        _writer = DataWriter()
    return _writer
