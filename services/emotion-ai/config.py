"""
配置管理模块
使用pydantic-settings进行类型安全的配置管理
"""

import os
from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field
from typing import Literal


class Settings(BaseSettings):
    """应用配置"""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # ============================================================================
    # 服务配置
    # ============================================================================

    app_env: Literal["development", "production", "test"] = Field(
        default="development", description="运行环境"
    )
    ai_service_host: str = Field(default="0.0.0.0", description="服务监听地址")
    ai_service_port: int = Field(default=5678, description="服务端口")

    # ============================================================================
    # Web管理页面配置
    # ============================================================================

    web_admin_url: str = Field(
        default="http://localhost:4000",
        description="Web管理页面地址（用于错误提示跳转）"
    )

    # ============================================================================
    # 后端API配置
    # ============================================================================

    backend_api_url: str = Field(
        default="http://localhost:4001", description="后端API地址"
    )
    ai_service_token: str = Field(
        default="dev-ai-service-token-2024", description="AI服务访问后端的Token"
    )

    # ============================================================================
    # MediaMTX配置
    # ============================================================================

    mediamtx_host: str = Field(
        default="http://192.168.0.95:8889", description="MediaMTX服务地址"
    )

    # ============================================================================
    # Redis配置（实时数据推送）
    # ============================================================================

    redis_host: str = Field(
        default="localhost", description="Redis服务地址"
    )
    redis_port: int = Field(
        default=6379, description="Redis端口"
    )
    redis_db: int = Field(
        default=0, description="Redis数据库编号"
    )
    redis_password: str | None = Field(
        default=None, description="Redis密码（可选）"
    )
    redis_realtime_enabled: bool = Field(
        default=True, description="是否启用实时数据推送（生产环境建议开启）"
    )

    # ============================================================================
    # 日志配置
    # ============================================================================

    log_level: Literal["DEBUG", "INFO", "WARNING", "ERROR"] = Field(
        default="INFO", description="日志级别"
    )
    log_format: Literal["json", "text"] = Field(
        default="json", description="日志格式"
    )

    # ============================================================================
    # 模型配置
    # ============================================================================

    # 启动时模型检查
    require_models_on_startup: bool = Field(
        default=False,
        description="启动时是否强制要求模型存在（False允许降级启动）"
    )

    # Hugging Face镜像配置（中国大陆推荐使用hf-mirror）
    hf_endpoint: str = Field(
        default="https://hf-mirror.com",
        description="Hugging Face镜像站点（默认hf-mirror.com，可改为huggingface.co）"
    )

    # 模型存储路径（强制使用项目目录）
    # 说明：DeepFace会在deepface_home下创建.deepface/weights/子目录存储所有模型
    # 包括情绪识别模型（VGG Face）和人脸检测器（YOLOv8/RetinaFace等）
    deepface_home: str = Field(default="./models/deepface_models", description="DeepFace模型存储目录（包含所有检测器）")
    modelscope_cache: str = Field(default="./models/emotion2vec_models", description="ModelScope（emotion2vec）模型缓存目录")

    # DeepFace配置
    deepface_backend: Literal["opencv", "ssd", "mtcnn", "retinaface", "yolov8", "yunet", "fastmtcnn", "mediapipe"] = Field(
        default="yolov8", description="DeepFace人脸检测后端（推荐yolov8，准确度高）"
    )
    deepface_enforce_detection: bool = Field(
        default=False, description="是否强制人脸检测（False提高容错性）"
    )

    # emotion2vec配置
    emotion2vec_model: str = Field(
        default="iic/emotion2vec_plus_seed", description="emotion2vec模型名称"
    )
    emotion2vec_sample_rate: int = Field(
        default=16000, description="音频采样率"
    )

    # ============================================================================
    # VoxCPM TTS配置
    # ============================================================================

    # 模型路径
    voxcpm_model_path: str = Field(
        default="./models/voxcpm_models",
        description="VoxCPM模型存储目录"
    )

    # VoxCPM推理参数
    voxcpm_cfg_scale: float = Field(
        default=2.0,
        description="指导比例（1.5-3.0）- 较低值更放松自然，较高值更清晰忠实"
    )
    voxcpm_inference_steps: int = Field(
        default=15,
        description="推理步数（15-25质量好，5-10快速草稿）"
    )
    voxcpm_enable_stream: bool = Field(
        default=True,
        description="启用流式模式（实时对话用）"
    )

    # GPU配置
    voxcpm_device: Literal["cuda", "cpu", "directml"] = Field(
        default="cuda",
        description="设备类型（cuda/cpu/directml）"
    )
    voxcpm_max_concurrent: int = Field(
        default=3,
        description="最大并发TTS任务数（防止GPU过载）"
    )

    # ============================================================================
    # Opus音频编码配置（用于实时对话）
    # ============================================================================

    opus_sample_rate: int = Field(
        default=16000,
        description="Opus采样率（16kHz语音质量）"
    )
    opus_bitrate: int = Field(
        default=24000,
        description="Opus码率（24 kbps平衡模式）"
    )
    opus_frame_duration: int = Field(
        default=20,
        description="Opus帧时长（毫秒）"
    )
    opus_channels: int = Field(
        default=1,
        description="音频通道数（1=单声道）"
    )
    opus_application: Literal["audio", "voip"] = Field(
        default="voip",
        description="Opus应用模式（voip优化语音）"
    )

    # ============================================================================
    # TTS服务配置
    # ============================================================================

    tts_enable: bool = Field(
        default=True,
        description="启用TTS服务"
    )
    tts_preload_model: bool = Field(
        default=True,
        description="启动时预加载TTS模型（避免首次请求延迟）"
    )
    tts_max_text_length: int = Field(
        default=500,
        description="单次合成最大文本长度（字符）"
    )
    tts_cache_voices: bool = Field(
        default=True,
        description="缓存音色克隆结果（提高性能）"
    )

    # ============================================================================
    # 性能配置
    # ============================================================================

    max_concurrent_streams: int = Field(default=5, description="最大并发流数")
    frame_skip_interval: int = Field(default=2, description="帧跳过间隔（分析每N帧）")
    batch_size: int = Field(default=10, description="批处理大小")

    # ============================================================================
    # 数据配置
    # ============================================================================

    data_compression: bool = Field(default=True, description="数据传输压缩")
    checkpoint_interval: int = Field(default=5, description="检查点批量发送间隔（秒）")

    # 检查点采样配置（性能优化）
    checkpoint_save_interval: float = Field(
        default=1.0,
        description="检查点保存间隔（秒）- 控制存储频率，不影响分析频率"
    )
    checkpoint_sampling_strategy: Literal["last_valid", "highest_confidence"] = Field(
        default="last_valid",
        description="检查点采样策略：last_valid=最近帧，highest_confidence=最高置信度"
    )

    # ✨ 检查点文件存储配置（新架构：JSON文件替代数据库）
    checkpoint_storage_root: str = Field(
        default="/home/aaron/心理测试平台/refactor/data/ai_analysis/checkpoints",
        description="检查点文件存储根目录（绝对路径）"
    )
    checkpoint_file_pattern: str = Field(
        default="{year}/{month:02d}/{day:02d}/{session_id}_data.json",
        description="检查点文件路径模式（相对于storage_root）"
    )
    checkpoint_file_max_size_mb: int = Field(
        default=50,
        description="单个检查点文件最大大小（MB）- 超过后切分"
    )
    checkpoint_archive_days: int = Field(
        default=30,
        description="归档天数（超过后移动到archive/并压缩为.gz）"
    )
    checkpoint_delete_days: int = Field(
        default=90,
        description="删除天数（超过后永久删除）"
    )

    def model_post_init(self, __context):
        """模型初始化后设置环境变量（强制所有AI库使用项目目录）"""
        # 设置Hugging Face镜像端点
        os.environ['HF_ENDPOINT'] = self.hf_endpoint

        # 设置DeepFace模型路径
        # DeepFace会在此目录下自动创建.deepface/weights/子目录
        # 所有模型（情绪识别+人脸检测器）都存储在这里
        deepface_path = Path(self.deepface_home).absolute()
        os.environ['DEEPFACE_HOME'] = str(deepface_path)

        # 设置ModelScope缓存路径（emotion2vec）
        modelscope_path = Path(self.modelscope_cache).absolute()
        os.environ['MODELSCOPE_CACHE'] = str(modelscope_path)

        # ✨ 设置VoxCPM模型路径（TTS）
        voxcpm_path = Path(self.voxcpm_model_path).absolute()
        # VoxCPM会使用系统缓存，这里仅创建项目目录供离线模型存储
        os.environ['VOXCPM_MODEL_PATH'] = str(voxcpm_path)

        # 创建模型目录（如果不存在）
        deepface_path.mkdir(parents=True, exist_ok=True)
        modelscope_path.mkdir(parents=True, exist_ok=True)
        voxcpm_path.mkdir(parents=True, exist_ok=True)

        # ✨ 创建检查点存储目录（新架构）
        checkpoint_storage_path = Path(self.checkpoint_storage_root).absolute()
        checkpoint_storage_path.mkdir(parents=True, exist_ok=True)
        (checkpoint_storage_path / "archive").mkdir(exist_ok=True)

    @property
    def is_development(self) -> bool:
        """是否开发环境"""
        return self.app_env == "development"

    @property
    def is_production(self) -> bool:
        """是否生产环境"""
        return self.app_env == "production"


# ============================================================================
# 全局配置实例
# ============================================================================

settings = Settings()
