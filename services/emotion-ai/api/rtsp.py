"""
RTSP流控制API
提供启动、停止、查询RTSP流消费的接口
"""

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field
from typing import Optional
from services.rtsp_manager import get_rtsp_manager
from utils.logger import get_logger

logger = get_logger(__name__)

router = APIRouter(prefix="/api/rtsp", tags=["RTSP"])


# ============================================================================
# 请求/响应模型
# ============================================================================


class StartRTSPRequest(BaseModel):
    """启动RTSP消费请求"""

    stream_name: str = Field(..., description="RTSP流名称（如：exam_uuid_participant_id）")
    session_id: str = Field(..., description="AI会话ID")
    exam_result_id: Optional[str] = Field(None, description="考试结果ID")


class StopRTSPRequest(BaseModel):
    """停止RTSP消费请求"""

    session_id: Optional[str] = Field(None, description="AI会话ID")
    stream_name: Optional[str] = Field(None, description="RTSP流名称")

    class Config:
        @staticmethod
        def schema_extra(schema, model):
            """添加schema说明"""
            schema['description'] = 'session_id和stream_name至少提供一个'


class RTSPResponse(BaseModel):
    """RTSP操作响应"""

    success: bool
    message: str
    data: Optional[dict] = None


# ============================================================================
# API端点
# ============================================================================


@router.post("/start", response_model=RTSPResponse)
async def start_rtsp_consumer(request: StartRTSPRequest):
    """
    启动RTSP流消费

    从MediaMTX拉取指定流并开始AI分析
    """
    logger.info(
        "api_start_rtsp_requested",
        stream_name=request.stream_name,
        session_id=request.session_id,
    )

    try:
        manager = get_rtsp_manager()

        success = await manager.start_consumer(
            stream_name=request.stream_name,
            session_id=request.session_id,
            exam_result_id=request.exam_result_id,
        )

        if not success:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Failed to start RTSP consumer for session {request.session_id}",
            )

        logger.info("api_start_rtsp_success", session_id=request.session_id)

        return RTSPResponse(
            success=True,
            message=f"RTSP consumer started for session {request.session_id}",
            data={"session_id": request.session_id, "stream_name": request.stream_name},
        )

    except HTTPException:
        raise

    except Exception as e:
        logger.error(
            "api_start_rtsp_error",
            error=str(e),
            session_id=request.session_id,
        )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Internal server error: {str(e)}",
        )


@router.post("/stop", response_model=RTSPResponse)
async def stop_rtsp_consumer(request: StopRTSPRequest):
    """
    停止RTSP流消费

    停止指定会话的AI分析

    可通过session_id或stream_name停止，两者至少提供一个
    优先使用session_id，如果未提供则使用stream_name
    """
    # 验证至少提供一个参数
    if not request.session_id and not request.stream_name:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="session_id或stream_name至少提供一个",
        )

    logger.info(
        "api_stop_rtsp_requested",
        session_id=request.session_id,
        stream_name=request.stream_name,
    )

    try:
        manager = get_rtsp_manager()

        # 优先使用session_id
        if request.session_id:
            success = await manager.stop_consumer(session_id=request.session_id)
            identifier = request.session_id
            identifier_type = "session_id"
        else:
            success = await manager.stop_consumer_by_stream_name(
                stream_name=request.stream_name
            )
            identifier = request.stream_name
            identifier_type = "stream_name"

        if not success:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"RTSP consumer not found for {identifier_type} {identifier}",
            )

        logger.info(
            "api_stop_rtsp_success",
            identifier_type=identifier_type,
            identifier=identifier,
        )

        return RTSPResponse(
            success=True,
            message=f"RTSP consumer stopped for {identifier_type} {identifier}",
            data={
                identifier_type: identifier,
                "stopped": True,
            },
        )

    except HTTPException:
        raise

    except Exception as e:
        logger.error(
            "api_stop_rtsp_error",
            error=str(e),
            session_id=request.session_id,
            stream_name=request.stream_name,
        )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Internal server error: {str(e)}",
        )


@router.get("/status", response_model=RTSPResponse)
async def get_rtsp_status():
    """
    获取RTSP流消费状态

    返回所有活跃消费器的统计信息
    """
    logger.info("api_get_rtsp_status_requested")

    try:
        manager = get_rtsp_manager()
        stats = manager.get_stats()

        logger.info("api_get_rtsp_status_success", total_consumers=stats["total_consumers"])

        return RTSPResponse(
            success=True,
            message="RTSP status retrieved successfully",
            data=stats,
        )

    except Exception as e:
        logger.error("api_get_rtsp_status_error", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Internal server error: {str(e)}",
        )


@router.get("/status/{session_id}", response_model=RTSPResponse)
async def get_rtsp_session_status(session_id: str):
    """
    获取指定会话的RTSP消费状态

    Args:
        session_id: AI会话ID
    """
    logger.info("api_get_rtsp_session_status_requested", session_id=session_id)

    try:
        manager = get_rtsp_manager()
        consumer = manager.get_consumer(session_id)

        if not consumer:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"RTSP consumer not found for session {session_id}",
            )

        stats = consumer.get_stats()

        logger.info("api_get_rtsp_session_status_success", session_id=session_id)

        return RTSPResponse(
            success=True,
            message=f"RTSP session status retrieved for {session_id}",
            data=stats,
        )

    except HTTPException:
        raise

    except Exception as e:
        logger.error(
            "api_get_rtsp_session_status_error",
            error=str(e),
            session_id=session_id,
        )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Internal server error: {str(e)}",
        )
