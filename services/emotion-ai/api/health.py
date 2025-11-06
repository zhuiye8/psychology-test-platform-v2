"""
健康检查API
提供服务状态、模型加载情况、MediaMTX连接状态、活跃流等信息
"""

import time
import httpx
from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime
from typing import Dict, Optional
from utils.logger import get_logger

logger = get_logger(__name__)

router = APIRouter(tags=["health"])

# 服务启动时间
_service_start_time = time.time()


class HealthResponse(BaseModel):
    """健康检查响应"""

    status: str
    timestamp: datetime
    version: str
    environment: str
    models_loaded: Dict[str, bool]
    mediamtx_available: bool
    mediamtx_url: Optional[str]
    active_streams: int
    uptime_seconds: float


@router.get("/health", response_model=HealthResponse)
async def health_check():
    """
    健康检查端点

    返回服务状态、模型加载情况、MediaMTX连接状态、活跃流数量等信息
    """
    from config import settings
    from utils.logger import logger
    from models.deepface_analyzer import get_deepface_analyzer
    from models.emotion2vec_analyzer import get_emotion2vec_analyzer

    logger.info("health_check_requested")

    # 获取模型真实状态
    try:
        deepface = get_deepface_analyzer()
        emotion2vec = get_emotion2vec_analyzer()

        models_status = {
            "deepface": deepface.is_initialized,
            "emotion2vec": emotion2vec.is_initialized,
            "ppg_detector": True,  # PPG不需要初始化
        }
    except Exception as e:
        logger.error("health_check_models_error", error=str(e))
        models_status = {
            "deepface": False,
            "emotion2vec": False,
            "ppg_detector": False,
        }

    # 检查MediaMTX连接
    mediamtx_available = False
    mediamtx_url = getattr(settings, 'mediamtx_host', None)

    if mediamtx_url:
        try:
            # 尝试访问MediaMTX的根路径或任何端点（只要能连接就行）
            # MediaMTX的API端点可能因版本而异，简单检查连接性即可
            async with httpx.AsyncClient(timeout=2.0) as client:
                # 尝试多个可能的端点
                endpoints = [
                    f"{mediamtx_url}/v3/config/pathdefaults/get",
                    f"{mediamtx_url}/",
                ]

                for endpoint in endpoints:
                    try:
                        response = await client.get(endpoint, follow_redirects=True)
                        # 只要返回非500的状态码，就认为服务可用
                        if response.status_code < 500:
                            mediamtx_available = True
                            logger.debug("mediamtx_health_check_success",
                                       endpoint=endpoint,
                                       status_code=response.status_code)
                            break
                    except Exception:
                        continue

                if not mediamtx_available:
                    logger.debug("mediamtx_health_check_failed",
                               message="All endpoints failed",
                               url=mediamtx_url)
        except Exception as e:
            logger.debug("mediamtx_health_check_error", error=str(e), url=mediamtx_url)
            mediamtx_available = False

    # 计算uptime
    uptime = time.time() - _service_start_time

    # TODO: 从RTSP管理器获取活跃流数量
    active_streams_count = 0

    return HealthResponse(
        status="ok",
        timestamp=datetime.now(),
        version="2.0.0",
        environment=settings.app_env,
        models_loaded=models_status,
        mediamtx_available=mediamtx_available,
        mediamtx_url=mediamtx_url,
        active_streams=active_streams_count,
        uptime_seconds=round(uptime, 2),
    )


@router.get("/ping")
async def ping():
    """简单的存活检查"""
    return {"status": "pong"}


# ============================================================================
# 模型健康检查（供Web管理页面使用）
# ============================================================================


class ModelInfo(BaseModel):
    """模型详细信息"""
    name: str
    type: str
    exists: bool
    size_mb: float
    path: str
    is_initialized: bool
    expected_size_mb: Optional[int] = None
    detector_backend: Optional[str] = None


class ModelHealthResponse(BaseModel):
    """模型健康检查响应"""
    deepface: ModelInfo
    emotion2vec: ModelInfo
    ppg_detector: Dict


@router.get("/health/models", response_model=ModelHealthResponse)
async def health_check_models():
    """
    模型健康检查端点（供Web管理页面调用）

    返回：
    - 各模型是否存在
    - 模型文件大小
    - 模型初始化状态
    - 模型存储路径
    """
    from models.deepface_analyzer import get_deepface_analyzer
    from models.emotion2vec_analyzer import get_emotion2vec_analyzer
    from models.ppg_detector import get_ppg_detector

    logger.info("model_health_check_requested")

    try:
        deepface = get_deepface_analyzer()
        emotion2vec = get_emotion2vec_analyzer()
        ppg = get_ppg_detector()

        return ModelHealthResponse(
            deepface=ModelInfo(**deepface.get_model_info()),
            emotion2vec=ModelInfo(**emotion2vec.get_model_info()),
            ppg_detector={
                "name": "ppg_detector",
                "type": "heart_rate",
                "requires_download": False,  # PPG是算法，不需要下载模型
                "buffer_size": ppg.buffer_size,
                "is_ready": True,
            }
        )
    except Exception as e:
        logger.error("model_health_check_failed", error=str(e))
        raise
