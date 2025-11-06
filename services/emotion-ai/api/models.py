"""
模型管理API（简化版 - 纯离线模式）
供Web管理页面调用，提供模型验证、删除等功能

注意：实际的模型下载功能由Web后端实现（使用modelscope/huggingface SDK）
AI服务只负责使用模型，不负责下载模型
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from pathlib import Path
from typing import Literal
import shutil
from utils.logger import get_logger

logger = get_logger(__name__)

router = APIRouter(prefix="/api/models", tags=["Models"])


# ============================================================================
# 数据模型
# ============================================================================


class ModelVerifyResponse(BaseModel):
    """模型验证响应"""
    success: bool
    message: str
    model_info: dict


class ModelDeleteResponse(BaseModel):
    """模型删除响应"""
    success: bool
    message: str


# ============================================================================
# API端点
# ============================================================================


@router.post("/verify/{model_type}", response_model=ModelVerifyResponse)
async def verify_model(model_type: Literal["deepface", "emotion2vec"]):
    """
    验证模型完整性（供Web管理页面调用）

    Args:
        model_type: 模型类型（deepface或emotion2vec）

    Returns:
        模型验证结果
    """
    from models.deepface_analyzer import get_deepface_analyzer
    from models.emotion2vec_analyzer import get_emotion2vec_analyzer

    logger.info("model_verify_requested", model_type=model_type)

    if model_type == "deepface":
        analyzer = get_deepface_analyzer()
    elif model_type == "emotion2vec":
        analyzer = get_emotion2vec_analyzer()
    else:
        raise HTTPException(status_code=400, detail="Invalid model type")

    model_info = analyzer.get_model_info()

    return ModelVerifyResponse(
        success=model_info["exists"],
        message="模型验证通过" if model_info["exists"] else "模型不存在或不完整",
        model_info=model_info
    )


@router.delete("/delete/{model_type}", response_model=ModelDeleteResponse)
async def delete_model(model_type: Literal["deepface", "emotion2vec"]):
    """
    删除模型（供Web管理页面调用）

    警告：此操作不可恢复！

    Args:
        model_type: 模型类型（deepface或emotion2vec）

    Returns:
        删除结果
    """
    from config import settings

    logger.warning("model_delete_requested", model_type=model_type)

    if model_type == "deepface":
        model_path = Path(settings.deepface_home) / ".deepface"
    elif model_type == "emotion2vec":
        model_path = Path(settings.modelscope_cache) / "models" / "iic" / "emotion2vec_plus_seed"
    else:
        raise HTTPException(status_code=400, detail="Invalid model type")

    if not model_path.exists():
        raise HTTPException(status_code=404, detail="Model not found")

    try:
        shutil.rmtree(model_path)
        logger.info("model_deleted", model_type=model_type, path=str(model_path))
        return ModelDeleteResponse(
            success=True,
            message=f"模型已删除：{model_path}"
        )
    except Exception as e:
        logger.error("model_delete_failed", error=str(e))
        raise HTTPException(status_code=500, detail=f"删除失败：{str(e)}")


@router.post("/download/{model_type}")
async def download_model(model_type: Literal["deepface", "emotion2vec"]):
    """
    触发模型下载（预留接口，实际由Web后端实现）

    注意：
    - 此API仅用于首次下载或强制重新下载
    - 实际下载逻辑应在Web后端实现（使用modelscope/huggingface SDK）
    - AI服务不负责模型下载，只负责使用模型

    Args:
        model_type: 模型类型（deepface或emotion2vec）

    Returns:
        501 Not Implemented（提示应由Web后端实现）
    """
    logger.warning("model_download_requested_but_not_implemented", model_type=model_type)

    raise HTTPException(
        status_code=501,
        detail={
            "error": "Model download should be handled by web backend",
            "message": "模型下载功能由Web后端实现，此API为预留接口",
            "model_type": model_type,
            "recommendation": "请在Web管理页面（/dashboard/ai-models）下载模型"
        }
    )
