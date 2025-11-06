"""
聚合计算器
负责从JSON检查点文件读取数据并计算聚合指标
"""

import statistics
import traceback
from typing import Dict, Any, Optional, List
from collections import Counter
from utils.logger import get_logger

logger = get_logger(__name__)


class CheckpointAggregator:
    """
    检查点数据聚合器

    功能：
    - 从JSON文件读取检查点数据
    - 计算情绪、注意力、心率等聚合指标
    - 返回符合SaveAggregateDto格式的聚合结果
    """

    def __init__(self):
        pass

    def calculate_aggregate(self, checkpoint_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """
        计算聚合指标

        Args:
            checkpoint_data: 从JSON文件读取的完整检查点数据

        Returns:
            聚合指标字典（snake_case格式，用于API调用）
        """
        try:
            # 从新结构读取三类数据
            video_emotions = checkpoint_data.get("video_emotions", [])
            audio_emotions = checkpoint_data.get("audio_emotions", [])
            heart_rate_data = checkpoint_data.get("heart_rate_data", [])
            attention_points = []  # 注意力数据暂未实现

            # 合并视频和音频情绪数据（用于综合分析）
            # 为什么合并：面部表情+语音语调结合，能更准确地反映学生真实情绪状态
            # 例如：学生面部平静但声音紧张，合并分析能发现焦虑情绪
            all_emotion_points = video_emotions + audio_emotions

            if not all_emotion_points and not heart_rate_data:
                logger.warning("no_data_for_aggregation")
                return None

            logger.info(
                "aggregating_data",
                video_emotions=len(video_emotions),
                audio_emotions=len(audio_emotions),
                heart_rate_data=len(heart_rate_data),
                total_emotion_points=len(all_emotion_points),
            )

            # 计算聚合指标
            aggregate = {
                "session_id": checkpoint_data.get("session_id"),
                "exam_result_id": checkpoint_data.get("exam_result_id"),
            }

            # 情绪分析（合并视频+音频情绪）
            if all_emotion_points:
                emotion_agg = self._aggregate_emotion(all_emotion_points)
                aggregate.update(emotion_agg)

            # 注意力分析（暂未实现）
            if attention_points:
                attention_agg = self._aggregate_attention(attention_points)
                aggregate.update(attention_agg)

            # 心率分析
            if heart_rate_data:
                ppg_agg = self._aggregate_heart_rate(heart_rate_data)
                aggregate.update(ppg_agg)

            # 数据质量（基于所有数据点的置信度）
            all_data_points = video_emotions + audio_emotions + heart_rate_data
            all_confidences = [p.get("confidence", 0) for p in all_data_points if p.get("confidence") is not None]
            if all_confidences:
                aggregate["data_quality"] = round(statistics.mean(all_confidences), 3)
                aggregate["analysis_confidence"] = round(statistics.mean(all_confidences), 3)
            else:
                aggregate["data_quality"] = 0.5
                aggregate["analysis_confidence"] = 0.5

            logger.info("aggregate_calculated", session_id=checkpoint_data.get("session_id"))
            return aggregate

        except Exception as e:
            # ⭐ 增强错误日志：添加详细的异常信息和堆栈跟踪
            logger.error(
                "aggregate_calculation_error",
                session_id=checkpoint_data.get("session_id") if checkpoint_data else None,
                error=str(e),
                error_type=type(e).__name__,
                error_traceback=traceback.format_exc(),
                checkpoint_data_keys=list(checkpoint_data.keys()) if checkpoint_data else [],
                video_emotions_count=len(checkpoint_data.get("video_emotions", [])) if checkpoint_data else 0,
                audio_emotions_count=len(checkpoint_data.get("audio_emotions", [])) if checkpoint_data else 0,
                heart_rate_count=len(checkpoint_data.get("heart_rate_data", [])) if checkpoint_data else 0,
                message="❌ 聚合计算失败，返回None。请检查上述错误信息定位问题。"
            )
            return None

    def _aggregate_emotion(self, emotion_points: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        聚合情绪数据

        Args:
            emotion_points: 情绪数据点列表

        Returns:
            情绪聚合指标
        """
        # 提取主导情绪
        dominant_emotions = [p.get("dominant_emotion") for p in emotion_points if p.get("dominant_emotion")]

        # 统计主导情绪分布
        emotion_counter = Counter(dominant_emotions)
        most_common_emotion = emotion_counter.most_common(1)[0][0] if emotion_counter else "neutral"

        # 计算情绪分布（百分比）
        total_emotions = len(dominant_emotions)
        emotion_distribution = {
            emotion: round(count / total_emotions, 3)
            for emotion, count in emotion_counter.items()
        }

        # 提取情绪分数（如果有）
        emotion_scores_list = [p.get("emotion_scores", {}) for p in emotion_points if p.get("emotion_scores")]

        # 计算平均情绪分数
        avg_emotion_scores = {}
        if emotion_scores_list:
            all_emotions = set()
            for scores in emotion_scores_list:
                all_emotions.update(scores.keys())

            for emotion in all_emotions:
                values = [scores.get(emotion, 0) for scores in emotion_scores_list if emotion in scores]
                if values:
                    avg_emotion_scores[emotion] = round(statistics.mean(values), 3)

        # 计算效价和唤醒度（基于情绪分数）
        # 简化实现：假设happy/sad对应效价，angry/fear对应唤醒度
        avg_valence = None
        avg_arousal = None

        if avg_emotion_scores:
            # 效价：positive情绪 - negative情绪
            positive = avg_emotion_scores.get("happy", 0) + avg_emotion_scores.get("surprise", 0)
            negative = avg_emotion_scores.get("sad", 0) + avg_emotion_scores.get("angry", 0) + avg_emotion_scores.get("disgust", 0)
            avg_valence = round((positive - negative) / (positive + negative + 0.001), 3)  # 避免除零

            # 唤醒度：high-energy情绪 - low-energy情绪
            high_energy = avg_emotion_scores.get("angry", 0) + avg_emotion_scores.get("fear", 0) + avg_emotion_scores.get("surprise", 0)
            low_energy = avg_emotion_scores.get("sad", 0) + avg_emotion_scores.get("neutral", 0)
            avg_arousal = round(high_energy / (high_energy + low_energy + 0.001), 3)

        return {
            "avg_valence": avg_valence,
            "avg_arousal": avg_arousal,
            "dominant_emotion": most_common_emotion,
            "emotion_distribution": emotion_distribution,
        }

    def _aggregate_attention(self, attention_points: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        聚合注意力数据

        Args:
            attention_points: 注意力数据点列表

        Returns:
            注意力聚合指标
        """
        # 提取注意力分数
        attention_scores = [
            p.get("attention_score", 0)
            for p in attention_points
            if p.get("attention_score") is not None
        ]

        if not attention_scores:
            return {
                "avg_attention": None,
                "attention_variability": None,
                "distraction_events": 0,
                "engagement_score": None,
                "consistency_score": None,
            }

        # 计算平均注意力
        avg_attention = round(statistics.mean(attention_scores), 3)

        # 计算注意力变异性（标准差）
        attention_variability = round(statistics.stdev(attention_scores), 3) if len(attention_scores) > 1 else 0.0

        # 检测分心事件（注意力低于0.5的连续时段）
        distraction_events = 0
        in_distraction = False
        for score in attention_scores:
            if score < 0.5:
                if not in_distraction:
                    distraction_events += 1
                    in_distraction = True
            else:
                in_distraction = False

        # 参与度评分（基于平均注意力和变异性）
        engagement_score = round((avg_attention * 100) * (1 - min(attention_variability, 0.5)), 1)

        # 一致性评分（基于变异性）
        consistency_score = round((1 - min(attention_variability, 1.0)) * 100, 1)

        return {
            "avg_attention": avg_attention,
            "attention_variability": attention_variability,
            "distraction_events": distraction_events,
            "engagement_score": engagement_score,
            "consistency_score": consistency_score,
        }

    def _aggregate_heart_rate(self, heart_rate_points: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        聚合心率数据（基于PPG检测）

        Args:
            heart_rate_points: 心率数据点列表

        Returns:
            心率聚合指标
        """
        # 提取心率数据
        heart_rates = [
            p.get("heart_rate", 0)
            for p in heart_rate_points
            if p.get("heart_rate") is not None and p.get("heart_rate") > 0
        ]

        if not heart_rates:
            return {
                "avg_heart_rate": None,
                "heart_rate_variability": None,
                "stress_indicators": None,
            }

        # 计算平均心率
        avg_heart_rate = round(statistics.mean(heart_rates), 1)

        # 计算心率变异性（HRV - 使用标准差）
        heart_rate_variability = round(statistics.stdev(heart_rates), 1) if len(heart_rates) > 1 else 0.0

        # 计算压力指标
        # 简化实现：高心率 + 低HRV = 高压力
        stress_level = "low"
        if avg_heart_rate > 100:
            stress_level = "high" if heart_rate_variability < 5 else "medium"
        elif avg_heart_rate > 85:
            stress_level = "medium"

        stress_indicators = {
            "level": stress_level,
            "avg_bpm": avg_heart_rate,
            "hrv": heart_rate_variability,
        }

        return {
            "avg_heart_rate": avg_heart_rate,
            "heart_rate_variability": heart_rate_variability,
            "stress_indicators": stress_indicators,
        }


# ============================================================================
# 全局实例
# ============================================================================

_aggregator: Optional[CheckpointAggregator] = None


def get_aggregator() -> CheckpointAggregator:
    """获取全局聚合计算器实例"""
    global _aggregator
    if _aggregator is None:
        _aggregator = CheckpointAggregator()
    return _aggregator
