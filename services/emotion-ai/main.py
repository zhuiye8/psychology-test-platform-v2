"""
AI分析服务 - FastAPI应用入口

功能：
- RTSP流消费（从MediaMTX拉流）
- 视频情绪分析（DeepFace）
- 音频情绪分析（emotion2vec）
- 心率检测（PPG）
- 实时数据写入后端API
"""

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from config import settings
from utils.logger import logger
from api.health import router as health_router
from api.rtsp import router as rtsp_router
from api.models import router as models_router
from api.tts import router as tts_router
from services.rtsp_manager import get_rtsp_manager
from services.redis_publisher import get_redis_publisher


# ============================================================================
# 生命周期管理
# ============================================================================


@asynccontextmanager
async def lifespan(app: FastAPI):
    """应用生命周期管理"""

    # ========== 启动 ==========
    logger.info(
        "ai_service_starting",
        environment=settings.app_env,
        host=settings.ai_service_host,
        port=settings.ai_service_port,
    )

    # 初始化RTSP管理器（单例模式，自动初始化）
    rtsp_manager = get_rtsp_manager()
    logger.info("rtsp_manager_initialized")

    # 初始化Redis发布器（实时数据推送）
    redis_publisher = get_redis_publisher()
    await redis_publisher.connect()
    logger.info("redis_publisher_initialized", enabled=redis_publisher.enabled)

    # ========== 启动前检查模型完整性 ==========
    logger.info("checking_models_before_startup", message="检查模型完整性...")

    from models.deepface_analyzer import get_deepface_analyzer
    from models.emotion2vec_analyzer import get_emotion2vec_analyzer

    deepface = get_deepface_analyzer()
    emotion2vec = get_emotion2vec_analyzer()

    # 获取模型信息
    deepface_info = deepface.get_model_info()
    emotion2vec_info = emotion2vec.get_model_info()

    # 检查模型是否存在
    if not deepface_info["exists"]:
        logger.error(
            "deepface_model_not_found",
            path=deepface_info["path"],
            message=f"❌ DeepFace模型未找到！请访问 {settings.web_admin_url}/dashboard/ai-models 下载模型"
        )

    if not emotion2vec_info["exists"]:
        logger.error(
            "emotion2vec_model_not_found",
            path=emotion2vec_info["path"],
            message=f"❌ emotion2vec模型未找到！请访问 {settings.web_admin_url}/dashboard/ai-models 下载模型"
        )

    # 决策：是否允许服务启动（可配置）
    models_ready = deepface_info["exists"] and emotion2vec_info["exists"]

    if not models_ready:
        if settings.require_models_on_startup:
            logger.error("models_missing_cannot_start", message="❌ 模型未找到，服务无法启动")
            raise RuntimeError(
                f"模型未找到，服务无法启动！\n"
                f"DeepFace: {'✅' if deepface_info['exists'] else '❌'}\n"
                f"emotion2vec: {'✅' if emotion2vec_info['exists'] else '❌'}\n"
                f"请访问 {settings.web_admin_url}/dashboard/ai-models 下载模型"
            )
        else:
            logger.warning(
                "models_missing_but_allowing_startup",
                deepface_ok=deepface_info["exists"],
                emotion2vec_ok=emotion2vec_info["exists"],
                message="⚠️ 部分模型缺失，服务将以降级模式启动"
            )

    # ========== 预加载AI模型（避免首次请求延迟）==========
    logger.info("preloading_ai_models", message="预加载AI模型...")

    try:
        # 预加载DeepFace模型
        if deepface_info["exists"] and not deepface.is_initialized:
            deepface.initialize()
            logger.info("deepface_preloaded", message="✅ DeepFace模型预加载完成")
        elif not deepface_info["exists"]:
            logger.warning("deepface_skipped", message="⚠️ DeepFace模型不存在，跳过加载")
        else:
            logger.info("deepface_already_loaded")

        # 预加载emotion2vec模型
        if emotion2vec_info["exists"] and not emotion2vec.is_initialized:
            emotion2vec.initialize()
            logger.info("emotion2vec_preloaded", message="✅ emotion2vec模型预加载完成")
        elif not emotion2vec_info["exists"]:
            logger.warning("emotion2vec_skipped", message="⚠️ emotion2vec模型不存在，跳过加载")
        else:
            logger.info("emotion2vec_already_loaded")

        if models_ready:
            logger.info("all_models_preloaded", message="✅ 所有AI模型已预加载完成")
        else:
            logger.warning("partial_models_loaded", message="⚠️ 部分模型已加载（降级模式）")

    except Exception as e:
        logger.error(
            "model_preload_failed",
            error=str(e),
            error_type=type(e).__name__,
            message="❌ 模型预加载失败"
        )
        if settings.require_models_on_startup:
            raise

    logger.info("ai_service_started")

    yield

    # ========== 关闭 ==========
    logger.info("ai_service_shutting_down")

    # 停止所有活跃流
    await rtsp_manager.stop_all_consumers()
    logger.info("all_rtsp_consumers_stopped")

    # 关闭Redis连接
    redis_publisher = get_redis_publisher()
    await redis_publisher.disconnect()
    logger.info("redis_publisher_closed")

    # TODO: 清理模型资源（Phase 4）

    logger.info("ai_service_stopped")


# ============================================================================
# FastAPI应用实例
# ============================================================================

app = FastAPI(
    title="心理测试平台 - AI分析服务",
    description="提供实时情绪分析、心率检测、注意力监测等AI功能",
    version="2.0.0",
    lifespan=lifespan,
    docs_url="/docs" if settings.is_development else None,  # 生产环境禁用文档
    redoc_url="/redoc" if settings.is_development else None,
)

# ============================================================================
# 中间件
# ============================================================================

# CORS配置
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if settings.is_development else ["http://localhost:4001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================================
# 路由注册
# ============================================================================

app.include_router(health_router)
app.include_router(rtsp_router)
app.include_router(models_router)
app.include_router(tts_router)

# TODO: 注册会话管理路由（Phase 5）


# ============================================================================
# 根路由
# ============================================================================


@app.get("/")
async def root():
    """根路径"""
    return {
        "service": "AI Analysis Service",
        "version": "2.0.0",
        "status": "running",
        "docs": "/docs" if settings.is_development else None,
    }


# ============================================================================
# 应用启动
# ============================================================================


def main():
    """启动服务"""

    # 清除HTTP代理（避免本地回环请求被代理）
    import os

    for key in ["http_proxy", "https_proxy", "HTTP_PROXY", "HTTPS_PROXY"]:
        os.environ.pop(key, None)

    logger.info(
        "starting_uvicorn",
        host=settings.ai_service_host,
        port=settings.ai_service_port,
        log_level=settings.log_level.lower(),
    )

    uvicorn.run(
        "main:app",
        host=settings.ai_service_host,
        port=settings.ai_service_port,
        log_level=settings.log_level.lower(),
        reload=settings.is_development,
    )


if __name__ == "__main__":
    main()
