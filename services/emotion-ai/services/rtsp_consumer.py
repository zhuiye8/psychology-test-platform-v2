"""
RTSP流消费器
从MediaMTX拉取RTSP流并进行AI分析
"""

import asyncio
import cv2
import numpy as np
import time
from typing import Optional, Dict, Any
from datetime import datetime
from config import settings
from utils.logger import get_logger
from models.deepface_analyzer import get_deepface_analyzer
from models.emotion2vec_analyzer import get_emotion2vec_analyzer
from models.ppg_detector import get_ppg_detector
from models.video_processor import VideoFrameProcessor
from services.data_writer import get_data_writer
from services.redis_publisher import get_redis_publisher
from services.audio_extractor import AudioExtractor

logger = get_logger(__name__)


class RTSPConsumer:
    """
    RTSP流消费器
    负责从MediaMTX拉取视频流，进行情绪分析，并写入后端API
    """

    def __init__(self, stream_name: str, session_id: str, exam_result_id: Optional[str] = None):
        """
        Args:
            stream_name: RTSP流名称（例如：exam_uuid_participant_id）
            session_id: AI会话ID
            exam_result_id: 考试结果ID（可选）
        """
        self.stream_name = stream_name
        self.session_id = session_id
        self.exam_result_id = exam_result_id

        # 构建RTSP URL
        mediamtx_host = settings.mediamtx_host.replace('http://', '').replace('https://', '')
        if ':' in mediamtx_host:
            host_ip = mediamtx_host.split(':')[0]
        else:
            host_ip = mediamtx_host

        self.rtsp_url = f"rtsp://{host_ip}:8554/{stream_name}"

        # 组件
        self.deepface = get_deepface_analyzer()
        self.emotion2vec = get_emotion2vec_analyzer()
        self.ppg_detector = get_ppg_detector()
        self.video_processor = VideoFrameProcessor(target_size=None)
        self.data_writer = get_data_writer()
        self.redis_publisher = get_redis_publisher()
        self.audio_extractor = AudioExtractor(self.rtsp_url, session_id)

        # 状态
        self.is_running = False
        self.cap: Optional[cv2.VideoCapture] = None
        self.task: Optional[asyncio.Task] = None

        # 统计
        self.frames_processed = 0
        self.emotions_detected = 0
        self.audio_segments_processed = 0
        self.audio_emotions_detected = 0
        self.heart_rate_measurements = 0
        self.start_time: Optional[datetime] = None

        # 配置
        self.frame_skip_interval = settings.frame_skip_interval
        self.checkpoint_interval = settings.checkpoint_interval

        # 检查点缓冲区（用于文件写入）
        self.checkpoint_buffer = []
        self.last_checkpoint_time = time.time()

        # 时间窗口采样配置（性能优化）
        self.checkpoint_save_interval = settings.checkpoint_save_interval
        self.checkpoint_sampling_strategy = settings.checkpoint_sampling_strategy
        self.current_window_start = time.time()
        self.current_window_checkpoint: Optional[Dict[str, Any]] = None

        # 文件存储信息（新架构）
        self.checkpoint_file_path: Optional[str] = None  # 相对路径
        self.prisma_session_id: Optional[str] = None      # Prisma数据库会话ID

        # ✅ 保存主事件循环引用（用于线程安全的协程调度）
        try:
            self.main_loop = asyncio.get_running_loop()
        except RuntimeError:
            # __init__可能在事件循环启动前调用，在start()中再次尝试
            self.main_loop = None
            logger.debug("no_running_loop_in_init", session_id=session_id)

        logger.info(
            "rtsp_consumer_created",
            stream_name=stream_name,
            session_id=session_id,
            rtsp_url=self.rtsp_url,
        )

    def set_session_info(self, prisma_session_id: str):
        """
        设置Prisma数据库会话ID（在创建session后调用）

        Args:
            prisma_session_id: Prisma数据库中的会话ID
        """
        self.prisma_session_id = prisma_session_id
        logger.info("session_info_set", session_id=self.session_id, prisma_id=prisma_session_id)

    async def start(self):
        """启动RTSP流消费"""
        if self.is_running:
            logger.warning("rtsp_consumer_already_running", session_id=self.session_id)
            return

        logger.info("starting_rtsp_consumer", session_id=self.session_id)

        # 初始化检查点文件（新架构）
        try:
            metadata = {
                "fps": 15,  # 预估帧率
                "sampling_strategy": self.checkpoint_sampling_strategy,
                "sampling_interval_seconds": self.checkpoint_save_interval
            }
            self.checkpoint_file_path = self.data_writer.initialize_checkpoint_file(
                session_id=self.session_id,
                exam_result_id=self.exam_result_id,
                metadata=metadata
            )
            logger.info(
                "checkpoint_file_initialized",
                session_id=self.session_id,
                file_path=self.checkpoint_file_path
            )
        except Exception as e:
            logger.error("checkpoint_file_init_failed", session_id=self.session_id, error=str(e))
            # 非致命错误，继续运行

        # 初始化DeepFace分析器
        if not self.deepface.is_initialized:
            self.deepface.initialize()

        # 初始化emotion2vec分析器
        if not self.emotion2vec.is_initialized:
            try:
                self.emotion2vec.initialize()
                logger.info("emotion2vec_initialized", session_id=self.session_id)
            except Exception as e:
                logger.error(
                    "emotion2vec_init_failed",
                    session_id=self.session_id,
                    error=str(e),
                    message="音频情绪分析将被禁用"
                )

        # 设置音频回调并启动音频提取器
        if self.emotion2vec.is_initialized:
            self.audio_extractor.set_audio_callback(self._on_audio_ready)
            await self.audio_extractor.start()
            logger.info("audio_extractor_started", session_id=self.session_id)

        # 启动异步任务
        self.is_running = True
        self.start_time = datetime.now()
        self.task = asyncio.create_task(self._consume_loop())

        logger.info("rtsp_consumer_started", session_id=self.session_id)

    async def stop(self):
        """停止RTSP流消费"""
        if not self.is_running:
            logger.warning("rtsp_consumer_not_running", session_id=self.session_id)
            return

        logger.info("stopping_rtsp_consumer", session_id=self.session_id)

        self.is_running = False

        # 停止音频提取器
        if self.audio_extractor:
            await self.audio_extractor.stop()
            logger.info("audio_extractor_stopped", session_id=self.session_id)

        # 等待任务完成
        if self.task:
            try:
                await asyncio.wait_for(self.task, timeout=5.0)
            except asyncio.TimeoutError:
                logger.warning("rtsp_consumer_stop_timeout", session_id=self.session_id)
                self.task.cancel()

        # 释放OpenCV资源
        if self.cap:
            self.cap.release()
            self.cap = None

        # ✅ 确保最后一个窗口的检查点被添加到缓冲区（修复checkpoint丢失问题）
        if self.current_window_checkpoint:
            self.checkpoint_buffer.append(self.current_window_checkpoint)
            self.current_window_checkpoint = None
            logger.debug(
                "last_window_checkpoint_saved",
                session_id=self.session_id,
                buffer_size=len(self.checkpoint_buffer)
            )

        # 保存剩余检查点到文件
        await self._flush_checkpoints()

        # 更新数据库中的文件信息（新架构）
        if self.prisma_session_id and self.checkpoint_file_path:
            try:
                from services.checkpoint_file_writer import get_checkpoint_file_writer
                file_writer = get_checkpoint_file_writer()
                file_info = file_writer.get_file_info(self.session_id)

                if file_info:
                    async with self.data_writer as writer:
                        await writer.update_session_file_info(
                            prisma_session_id=self.prisma_session_id,
                            file_path=file_info["relative_path"],
                            checkpoint_count=file_info["checkpoint_count"],
                            file_size=file_info["file_size"]
                        )
                    logger.info(
                        "session_file_info_updated",
                        session_id=self.session_id,
                        count=file_info["checkpoint_count"],
                        size_kb=round(file_info["file_size"] / 1024, 2)
                    )
            except Exception as e:
                logger.error(
                    "update_file_info_failed",
                    session_id=self.session_id,
                    error=str(e)
                )

        # ✅ 计算并保存聚合数据（新架构：从JSON文件计算）
        logger.info(
            "starting_aggregate_generation",
            session_id=self.session_id,
            prisma_session_id=self.prisma_session_id
        )

        if self.prisma_session_id:
            try:
                from services.checkpoint_file_writer import get_checkpoint_file_writer
                from services.aggregator import get_aggregator

                file_writer = get_checkpoint_file_writer()
                aggregator = get_aggregator()

                logger.debug(
                    "reading_checkpoint_data_for_aggregation",
                    session_id=self.session_id
                )

                # 读取检查点数据
                checkpoint_data = file_writer.read_checkpoint_data(self.session_id)

                # ✅ 增强日志：检查点数据结构详情
                if checkpoint_data:
                    checkpoint_keys = list(checkpoint_data.keys())
                    video_emotions_count = len(checkpoint_data.get("video_emotions", []))
                    audio_emotions_count = len(checkpoint_data.get("audio_emotions", []))
                    heart_rate_count = len(checkpoint_data.get("heart_rate_data", []))
                    data_points_count = len(checkpoint_data.get("data_points", []))

                    logger.info(
                        "checkpoint_data_structure_analysis",
                        session_id=self.session_id,
                        checkpoint_keys=checkpoint_keys,
                        video_emotions_count=video_emotions_count,
                        audio_emotions_count=audio_emotions_count,
                        heart_rate_count=heart_rate_count,
                        data_points_count=data_points_count,
                        has_valid_data=(video_emotions_count > 0 or audio_emotions_count > 0 or data_points_count > 0)
                    )
                else:
                    logger.warn(
                        "checkpoint_data_is_none",
                        session_id=self.session_id,
                        message="无法读取检查点文件或文件为空"
                    )

                if checkpoint_data and checkpoint_data.get("data_points"):
                    logger.info(
                        "calculating_aggregate",
                        session_id=self.session_id,
                        data_points=len(checkpoint_data["data_points"])
                    )

                    # 计算聚合指标
                    aggregate = aggregator.calculate_aggregate(checkpoint_data)

                    if aggregate:
                        logger.info(
                            "aggregate_calculated_successfully",
                            session_id=self.session_id,
                            avg_valence=aggregate.get("avgValence"),
                            avg_arousal=aggregate.get("avgArousal"),
                            avg_hr=aggregate.get("avgHeartRate"),
                            dominant_emotion=aggregate.get("dominantEmotion"),
                            attention_score=aggregate.get("attentionScore")
                        )

                        # 保存到后端API
                        try:
                            async with self.data_writer as writer:
                                await writer.save_aggregate(
                                    session_id=self.session_id,
                                    exam_result_id=self.exam_result_id,
                                    **aggregate
                                )
                            logger.info(
                                "aggregate_saved_to_backend",
                                session_id=self.session_id,
                                message="聚合数据已成功保存到后端API"
                            )
                        except Exception as save_error:
                            logger.error(
                                "aggregate_save_failed",
                                session_id=self.session_id,
                                error=str(save_error),
                                error_type=type(save_error).__name__
                            )
                    else:
                        logger.warn(
                            "aggregate_calculation_returned_none",
                            session_id=self.session_id,
                            message="聚合计算返回None，可能数据不足或计算失败"
                        )
                else:
                    logger.warn(
                        "no_data_points_for_aggregation",
                        session_id=self.session_id,
                        has_checkpoint_data=checkpoint_data is not None,
                        message="检查点数据中没有data_points，无法计算聚合指标"
                    )
            except Exception as e:
                logger.error(
                    "aggregate_generation_exception",
                    session_id=self.session_id,
                    error=str(e),
                    error_type=type(e).__name__,
                    prisma_session_id=self.prisma_session_id,
                    exam_result_id=self.exam_result_id
                )
                # raise
        else:
            logger.error(
                "❌ cannot_generate_aggregate_no_prisma_session_id",
                session_id=self.session_id,
                message="prisma_session_id未设置，无法保存聚合数据"
            )

        logger.info(
            "rtsp_consumer_stopped",
            session_id=self.session_id,
            frames_processed=self.frames_processed,
            emotions_detected=self.emotions_detected,
        )

    async def _consume_loop(self):
        """RTSP流消费主循环"""
        retry_count = 0
        max_retries = 3

        while self.is_running and retry_count < max_retries:
            try:
                # 连接RTSP流
                if not await self._connect_rtsp():
                    retry_count += 1
                    logger.warning(
                        "rtsp_connection_failed_retry",
                        session_id=self.session_id,
                        retry=retry_count,
                    )
                    await asyncio.sleep(2 ** retry_count)  # 指数退避
                    continue

                # 重置重试计数
                retry_count = 0

                # 读取并处理帧
                await self._process_frames()

            except asyncio.CancelledError:
                logger.info("rtsp_consumer_cancelled", session_id=self.session_id)
                break

            except Exception as e:
                logger.error(
                    "rtsp_consumer_error",
                    session_id=self.session_id,
                    error=str(e),
                    error_type=type(e).__name__,
                )
                retry_count += 1
                await asyncio.sleep(2)

        if retry_count >= max_retries:
            logger.error("rtsp_consumer_max_retries_exceeded", session_id=self.session_id)

    async def _connect_rtsp(self) -> bool:
        """
        连接RTSP流

        Returns:
            是否连接成功
        """
        try:
            logger.info("connecting_to_rtsp", rtsp_url=self.rtsp_url)

            # 使用OpenCV连接RTSP
            self.cap = cv2.VideoCapture(self.rtsp_url)

            if not self.cap.isOpened():
                logger.error("rtsp_stream_not_opened", rtsp_url=self.rtsp_url)
                return False

            # 设置缓冲区大小（减少延迟）
            self.cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)

            logger.info("rtsp_connected", rtsp_url=self.rtsp_url)
            return True

        except Exception as e:
            logger.error("rtsp_connection_error", error=str(e), rtsp_url=self.rtsp_url)
            return False

    async def _process_frames(self):
        """处理视频帧"""
        while self.is_running and self.cap and self.cap.isOpened():
            # 读取帧
            ret, frame = self.cap.read()

            if not ret or frame is None:
                logger.warning("rtsp_frame_read_failed", session_id=self.session_id)
                await asyncio.sleep(0.1)
                continue

            # 验证帧有效性
            if not self.video_processor.is_valid_frame(frame):
                logger.debug("invalid_frame_skipped", session_id=self.session_id)
                continue

            self.frames_processed += 1

            # 帧跳过（降低分析频率）
            if self.video_processor.should_skip_frame(self.frame_skip_interval):
                continue

            # 异步处理帧（避免阻塞）
            await self._analyze_frame(frame)

            # PPG心率检测（添加帧到缓冲区并可能计算心率）
            await self._process_ppg_frame(frame)

            # 定期保存检查点
            await self._maybe_flush_checkpoints()

            # 让出控制权
            await asyncio.sleep(0.01)

    async def _analyze_frame(self, frame):
        """
        分析单帧图像

        Args:
            frame: OpenCV帧
        """
        try:
            # 在线程池中运行DeepFace分析（避免阻塞事件循环）
            loop = asyncio.get_event_loop()
            result = await loop.run_in_executor(None, self.deepface.analyze_emotion, frame)

            if result is None:
                logger.debug("no_emotion_detected_in_frame", session_id=self.session_id)
                return

            self.emotions_detected += 1

            # 构建检查点数据
            checkpoint = {
                "session_id": self.session_id,
                "timestamp": datetime.now(),
                "data_type": "video_emotion",
                "payload": {
                    "dominant_emotion": result["dominant_emotion"],
                    "emotion_scores": result["emotion_scores"],
                },
                "confidence": result["confidence"],
                "metadata": {
                    "frame_number": self.frames_processed,
                },
            }

            # ✨ 实时推送到Redis（每帧都推送，不受采样策略影响）
            await self.redis_publisher.publish_analysis_result(
                session_id=self.session_id,
                data_type="video_emotion",
                result={
                    "dominant_emotion": result["dominant_emotion"],
                    "emotion_scores": result["emotion_scores"],
                    "confidence": result["confidence"],
                    "frame_number": self.frames_processed,
                    "face_detected": result.get("face_detected", False),
                    "face_count": result.get("face_count", 0),
                }
            )

            # ⭐ 时间窗口采样逻辑（性能优化，仅用于文件持久化）
            current_time = time.time()
            time_in_window = current_time - self.current_window_start

            if time_in_window >= self.checkpoint_save_interval:
                # 窗口结束，保存上一个窗口的检查点
                if self.current_window_checkpoint:
                    self.checkpoint_buffer.append(self.current_window_checkpoint)
                    logger.debug(
                        "checkpoint_sampled",
                        session_id=self.session_id,
                        strategy=self.checkpoint_sampling_strategy,
                        window_duration=time_in_window,
                    )

                # 重置窗口
                self.current_window_start = current_time
                self.current_window_checkpoint = checkpoint
            else:
                # 窗口内，根据策略更新候选检查点
                if self.checkpoint_sampling_strategy == "last_valid":
                    # 最近帧策略：直接替换
                    self.current_window_checkpoint = checkpoint
                elif self.checkpoint_sampling_strategy == "highest_confidence":
                    # 最高置信度策略：比较置信度
                    if (
                        not self.current_window_checkpoint
                        or checkpoint["confidence"] > self.current_window_checkpoint["confidence"]
                    ):
                        self.current_window_checkpoint = checkpoint

            logger.debug(
                "emotion_detected",
                session_id=self.session_id,
                emotion=result["dominant_emotion"],
                confidence=result["confidence"],
            )

        except Exception as e:
            logger.error(
                "frame_analysis_error",
                session_id=self.session_id,
                error=str(e),
                error_type=type(e).__name__,
            )

    async def _maybe_flush_checkpoints(self):
        """根据时间间隔决定是否刷新检查点"""
        current_time = time.time()
        if current_time - self.last_checkpoint_time >= self.checkpoint_interval:
            await self._flush_checkpoints()

    async def _flush_checkpoints(self):
        """批量保存检查点到JSON文件（新架构）"""
        # 添加当前窗口的检查点（如果存在）
        if self.current_window_checkpoint:
            self.checkpoint_buffer.append(self.current_window_checkpoint)
            self.current_window_checkpoint = None

        if not self.checkpoint_buffer:
            return

        try:
            # 格式化数据点（转换为JSON友好格式）
            data_points = []
            for cp in self.checkpoint_buffer:
                data_point = {
                    "timestamp": cp["timestamp"].isoformat() + "Z",
                    "data_type": cp["data_type"],
                    "confidence": cp["confidence"],
                }

                # 合并payload内容到数据点
                if "payload" in cp:
                    data_point.update(cp["payload"])

                # 添加metadata（如果有）
                if "metadata" in cp:
                    data_point["metadata"] = cp["metadata"]

                data_points.append(data_point)

            # 写入文件
            file_info = self.data_writer.write_checkpoint_file(
                session_id=self.session_id,
                data_points=data_points
            )

            logger.info(
                "checkpoints_flushed_to_file",
                session_id=self.session_id,
                count=len(data_points),
                file_path=file_info["relative_path"],
                total_count=file_info["checkpoint_count"],
                size_kb=round(file_info["file_size"] / 1024, 2)
            )

            # 清空缓冲区
            self.checkpoint_buffer = []
            self.last_checkpoint_time = time.time()

        except Exception as e:
            logger.error(
                "checkpoint_flush_failed",
                session_id=self.session_id,
                error=str(e),
                buffer_size=len(self.checkpoint_buffer),
            )

    def _on_audio_ready(self, audio_data: 'np.ndarray'):
        """
        音频准备就绪回调（同步函数，在线程池中执行）

        Args:
            audio_data: 音频numpy数组（float32, 单声道, 16kHz）
        """
        try:
            import numpy as np

            self.audio_segments_processed += 1

            # 使用emotion2vec分析音频情绪
            result = self.emotion2vec.analyze_audio_array(audio_data)

            if result is None:
                logger.debug("no_audio_emotion_detected", session_id=self.session_id)
                return

            self.audio_emotions_detected += 1

            # 构建检查点数据
            checkpoint = {
                "session_id": self.session_id,
                "timestamp": datetime.now(),
                "data_type": "audio_emotion",
                "payload": {
                    "dominant_emotion": result["dominant_emotion"],
                    "emotion_scores": result["emotion_scores"],
                },
                "confidence": result["confidence"],
                "metadata": {
                    "audio_segment_number": self.audio_segments_processed,
                    "audio_duration": len(audio_data) / self.audio_extractor.sample_rate,
                },
            }

            # 添加到检查点缓冲区
            self.checkpoint_buffer.append(checkpoint)

            logger.info(
                "audio_emotion_detected",
                session_id=self.session_id,
                emotion=result["dominant_emotion"],
                confidence=result["confidence"],
                segment=self.audio_segments_processed,
            )

            # ✅ 使用run_coroutine_threadsafe推送Redis实时数据（线程安全）
            if self.main_loop and self.main_loop.is_running():
                try:
                    future = asyncio.run_coroutine_threadsafe(
                        self.redis_publisher.publish_analysis_result(
                            session_id=self.session_id,
                            data_type="audio_emotion",
                            result={
                                "dominant_emotion": result["dominant_emotion"],
                                "emotion_scores": result["emotion_scores"],
                                "confidence": result["confidence"],
                                "segment_number": self.audio_segments_processed,
                            }
                        ),
                        self.main_loop
                    )
                    future.result(timeout=2.0)
                except Exception as redis_error:
                    logger.warning(
                        "redis_publish_failed_audio",
                        session_id=self.session_id,
                        error=str(redis_error)
                    )
            else:
                logger.debug("main_loop_not_available", session_id=self.session_id)

        except Exception as e:
            logger.error(
                "audio_analysis_error",
                session_id=self.session_id,
                error=str(e),
                error_type=type(e).__name__,
            )

    async def _process_ppg_frame(self, frame: np.ndarray):
        """
        处理PPG心率检测帧

        每帧都会添加到PPG缓冲区，当缓冲区满时自动计算心率

        Args:
            frame: OpenCV帧
        """
        try:
            # 在线程池中运行PPG帧处理（避免阻塞事件循环）
            loop = asyncio.get_event_loop()
            hr_result = await loop.run_in_executor(None, self.ppg_detector.detect_heart_rate, frame)

            # 如果detect_heart_rate返回了结果（缓冲区已满并成功计算）
            if hr_result:
                self.heart_rate_measurements += 1

                # 构建检查点数据
                checkpoint = {
                    "session_id": self.session_id,
                    "timestamp": datetime.now(),
                    "data_type": "heart_rate",
                    "payload": {
                        "heart_rate": hr_result['heart_rate'],
                        "confidence": hr_result['confidence'],
                        "signal_quality": hr_result['signal_quality'],
                    },
                    "confidence": hr_result['confidence'],
                    "metadata": {
                        "measurement_number": self.heart_rate_measurements,
                        "frame_number": self.frames_processed,
                    },
                }

                # 添加到检查点缓冲区
                self.checkpoint_buffer.append(checkpoint)

                logger.info(
                    "heart_rate_detected",
                    session_id=self.session_id,
                    bpm=hr_result['heart_rate'],
                    confidence=hr_result['confidence'],
                    quality=hr_result['signal_quality'],
                    measurement=self.heart_rate_measurements,
                )

                # 推送到Redis
                await self.redis_publisher.publish_analysis_result(
                    session_id=self.session_id,
                    data_type="heart_rate",
                    result={
                        "heart_rate": hr_result['heart_rate'],
                        "confidence": hr_result['confidence'],
                        "signal_quality": hr_result['signal_quality'],
                        "measurement_number": self.heart_rate_measurements,
                    }
                )

        except Exception as e:
            logger.debug(
                "ppg_frame_processing_failed",
                session_id=self.session_id,
                error=str(e),
            )

    def get_stats(self) -> Dict[str, Any]:
        """获取消费器统计信息"""
        return {
            "session_id": self.session_id,
            "stream_name": self.stream_name,
            "is_running": self.is_running,
            "frames_processed": self.frames_processed,
            "emotions_detected": self.emotions_detected,
            "audio_segments_processed": self.audio_segments_processed,
            "audio_emotions_detected": self.audio_emotions_detected,
            "heart_rate_measurements": self.heart_rate_measurements,
            "uptime_seconds": (
                (datetime.now() - self.start_time).total_seconds()
                if self.start_time
                else 0
            ),
            "buffer_size": len(self.checkpoint_buffer),
            "ppg_buffer_status": self.ppg_detector.get_buffer_status() if self.ppg_detector else {},
        }
