"""
结构化日志模块
使用structlog提供结构化、上下文化的日志
"""

import sys
import logging
import structlog
from structlog.processors import JSONRenderer, KeyValueRenderer
from config import settings


def setup_logging():
    """配置结构化日志"""

    # ✅ 配置Python标准logging（structlog依赖它）
    logging.basicConfig(
        format="%(message)s",
        stream=sys.stdout,
        level=getattr(logging, settings.log_level.upper(), logging.INFO),
    )

    # 处理器链
    processors = [
        structlog.stdlib.filter_by_level,
        structlog.stdlib.add_log_level,
        structlog.stdlib.add_logger_name,
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.StackInfoRenderer(),
        structlog.processors.format_exc_info,
        structlog.processors.UnicodeDecoder(),
    ]

    # 根据配置选择渲染器
    if settings.log_format == "json":
        processors.append(JSONRenderer())
    else:
        processors.append(KeyValueRenderer(key_order=["timestamp", "level", "event"]))

    structlog.configure(
        processors=processors,
        context_class=dict,
        logger_factory=structlog.stdlib.LoggerFactory(),
        cache_logger_on_first_use=True,
    )


def get_logger(name: str = __name__):
    """获取logger实例"""
    return structlog.get_logger(name)


# ============================================================================
# 默认初始化
# ============================================================================

setup_logging()
logger = get_logger("emotion-ai")
