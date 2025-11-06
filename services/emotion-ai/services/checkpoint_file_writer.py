"""
检查点文件写入器
负责将AI分析结果写入JSON文件（替代数据库存储）
"""

import json
import os
from pathlib import Path
from datetime import datetime
from typing import Dict, Any, List, Optional
from threading import Lock
from config import settings
from utils.logger import get_logger

logger = get_logger(__name__)


class CheckpointFileWriter:
    """
    检查点JSON文件写入器

    功能：
    - 按日期分区存储（YYYY/MM/DD/目录结构）
    - 线程安全写入
    - 自动创建目录
    - 文件大小控制
    - 实时更新和追加写入
    """

    def __init__(self):
        self.storage_root = Path(settings.checkpoint_storage_root)
        self.file_locks: Dict[str, Lock] = {}  # 每个文件一个锁
        self.max_file_size_bytes = settings.checkpoint_file_max_size_mb * 1024 * 1024

        # 确保根目录存在
        self.storage_root.mkdir(parents=True, exist_ok=True)

    def _get_file_path(self, session_id: str, timestamp: Optional[datetime] = None) -> Path:
        """
        构建检查点文件路径

        Args:
            session_id: 会话ID
            timestamp: 时间戳（用于日期分区，默认当前时间）

        Returns:
            完整文件路径
        """
        if timestamp is None:
            timestamp = datetime.utcnow()

        # 按日期分区
        year = timestamp.year
        month = timestamp.month
        day = timestamp.day

        # 构建目录路径
        dir_path = self.storage_root / str(year) / f"{month:02d}" / f"{day:02d}"
        dir_path.mkdir(parents=True, exist_ok=True)

        # 文件名
        file_name = f"{session_id}_data.json"
        return dir_path / file_name

    def _get_relative_path(self, file_path: Path) -> str:
        """
        获取相对于storage_root的相对路径（用于数据库存储）

        Args:
            file_path: 完整文件路径

        Returns:
            相对路径字符串（例如：2025/01/21/session_id_data.json）
        """
        return str(file_path.relative_to(self.storage_root))

    def _get_or_create_lock(self, file_path: Path) -> Lock:
        """
        获取文件锁（线程安全）

        Args:
            file_path: 文件路径

        Returns:
            文件锁
        """
        file_key = str(file_path)
        if file_key not in self.file_locks:
            self.file_locks[file_key] = Lock()
        return self.file_locks[file_key]

    def initialize_file(
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
        file_path = self._get_file_path(session_id)
        lock = self._get_or_create_lock(file_path)

        with lock:
            # 如果文件已存在，不覆盖
            if file_path.exists():
                logger.warning("checkpoint_file_exists", session_id=session_id, file_path=str(file_path))
                return self._get_relative_path(file_path)

            # 创建初始JSON结构
            logger.info(
                "initializing_checkpoint_file",
                session_id=session_id,
                exam_result_id=exam_result_id,
                has_exam_result_id=exam_result_id is not None
            )

            # 添加警告：如果exam_result_id为None
            if exam_result_id is None:
                logger.warning(
                    "checkpoint_file_without_exam_result_id",
                    session_id=session_id,
                    message="Checkpoint文件将创建为exam_result_id=null，请确认是否为设备检测流程"
                )

            initial_data = {
                "session_id": session_id,
                "exam_result_id": exam_result_id,
                "created_at": datetime.utcnow().isoformat() + "Z",
                "updated_at": datetime.utcnow().isoformat() + "Z",
                "metadata": metadata or {},
                "video_emotions": [],
                "audio_emotions": [],
                "heart_rate_data": [],
                "stats": {
                    "video_emotion_count": 0,
                    "audio_emotion_count": 0,
                    "heart_rate_count": 0
                }
            }

            # 写入文件
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(initial_data, f, ensure_ascii=False, indent=2)

            logger.info(
                "checkpoint_file_initialized",
                session_id=session_id,
                file_path=str(file_path),
                relative_path=self._get_relative_path(file_path)
            )

            return self._get_relative_path(file_path)

    def append_data_points(
        self,
        session_id: str,
        data_points: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        """
        追加数据点到检查点文件（按类型分发到三个数组）

        Args:
            session_id: 会话ID
            data_points: 数据点列表

        Returns:
            文件信息（相对路径、数据点数量、文件大小）
        """
        file_path = self._get_file_path(session_id)
        lock = self._get_or_create_lock(file_path)

        with lock:
            # 读取现有数据
            if not file_path.exists():
                logger.error("checkpoint_file_not_found", session_id=session_id, file_path=str(file_path))
                # 自动初始化
                self.initialize_file(session_id)

            with open(file_path, 'r', encoding='utf-8') as f:
                checkpoint_data = json.load(f)

            # 按data_type分发数据点
            for point in data_points:
                data_type = point.get("data_type")

                if data_type == "video_emotion":
                    checkpoint_data["video_emotions"].append(point)
                elif data_type == "audio_emotion":
                    checkpoint_data["audio_emotions"].append(point)
                elif data_type == "heart_rate":
                    checkpoint_data["heart_rate_data"].append(point)
                else:
                    # 未知类型，记录警告
                    logger.warning(
                        "unknown_data_type",
                        session_id=session_id,
                        data_type=data_type
                    )

            # 更新时间戳
            checkpoint_data["updated_at"] = datetime.utcnow().isoformat() + "Z"

            # 更新统计信息
            video_emotion_count = len(checkpoint_data["video_emotions"])
            audio_emotion_count = len(checkpoint_data["audio_emotions"])
            heart_rate_count = len(checkpoint_data["heart_rate_data"])

            checkpoint_data["stats"] = {
                "video_emotion_count": video_emotion_count,
                "audio_emotion_count": audio_emotion_count,
                "heart_rate_count": heart_rate_count
            }

            # 写回文件
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(checkpoint_data, f, ensure_ascii=False, indent=2)

            # 获取文件大小
            file_size = file_path.stat().st_size

            total_added = len(data_points)
            total_stored = video_emotion_count + audio_emotion_count + heart_rate_count

            logger.info(
                "data_points_appended",
                session_id=session_id,
                added_points=total_added,
                video_emotion_count=video_emotion_count,
                audio_emotion_count=audio_emotion_count,
                heart_rate_count=heart_rate_count,
                total_points=total_stored,
                file_size_kb=round(file_size / 1024, 2)
            )

            return {
                "relative_path": self._get_relative_path(file_path),
                "checkpoint_count": total_stored,
                "file_size": file_size
            }

    def read_checkpoint_data(self, session_id: str) -> Optional[Dict[str, Any]]:
        """
        读取检查点文件内容

        Args:
            session_id: 会话ID

        Returns:
            检查点数据（如果文件存在）
        """
        file_path = self._get_file_path(session_id)

        if not file_path.exists():
            logger.warning("checkpoint_file_not_found_for_read", session_id=session_id)
            return None

        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)

    def get_file_info(self, session_id: str) -> Optional[Dict[str, Any]]:
        """
        获取检查点文件信息（不读取内容）

        Args:
            session_id: 会话ID

        Returns:
            文件信息（相对路径、数据点数量、文件大小）
        """
        file_path = self._get_file_path(session_id)

        if not file_path.exists():
            return None

        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        file_size = file_path.stat().st_size

        # 计算总数据点数量
        stats = data.get("stats", {})
        total_checkpoint_count = (
            stats.get("video_emotion_count", 0) +
            stats.get("audio_emotion_count", 0) +
            stats.get("heart_rate_count", 0)
        )

        return {
            "relative_path": self._get_relative_path(file_path),
            "checkpoint_count": total_checkpoint_count,
            "file_size": file_size
        }


# ============================================================================
# 全局实例
# ============================================================================

_checkpoint_file_writer: Optional[CheckpointFileWriter] = None


def get_checkpoint_file_writer() -> CheckpointFileWriter:
    """获取全局检查点文件写入器实例"""
    global _checkpoint_file_writer
    if _checkpoint_file_writer is None:
        _checkpoint_file_writer = CheckpointFileWriter()
    return _checkpoint_file_writer
