/**
 * AI分析数据类型定义
 *
 * 与AI服务checkpoint文件结构保持一致
 */

// ============================================================================
// Checkpoint文件结构（来自AI服务）
// ============================================================================

export interface CheckpointFile {
  session_id: string;
  exam_result_id: string | null;
  created_at: string;
  updated_at: string;
  metadata: Record<string, any>;
  video_emotions: VideoEmotionData[];
  audio_emotions: AudioEmotionData[];
  heart_rate_data: HeartRateData[];
  stats: {
    video_emotion_count: number;
    audio_emotion_count: number;
    heart_rate_count: number;
  };
}

export interface VideoEmotionData {
  timestamp: string;
  data_type: 'video_emotion';
  payload: {
    dominant_emotion: string;
    emotion_scores: Record<string, number>;
  };
  confidence: number;
  metadata: {
    frame_number: number;
  };
}

export interface AudioEmotionData {
  timestamp: string;
  data_type: 'audio_emotion';
  payload: {
    dominant_emotion: string;
    emotion_scores: Record<string, number>;
  };
  confidence: number;
  metadata: {
    audio_segment_index: number;
  };
}

export interface HeartRateData {
  timestamp: string;
  data_type: 'heart_rate';
  payload: {
    heart_rate: number;
    confidence: number;
  };
  metadata: {
    signal_quality: number;
  };
}

// ============================================================================
// 时间窗口匹配
// ============================================================================

export interface TimeWindow {
  start: Date;
  end: Date;
  preBuffer?: number;  // 提前缓冲（毫秒）
  postBuffer?: number; // 延后缓冲（毫秒）
}

export interface WindowedAIData {
  videoEmotions: VideoEmotionData[];
  audioEmotions: AudioEmotionData[];
  heartRates: HeartRateData[];
}

// ============================================================================
// 统计特征
// ============================================================================

export interface TimeDomainFeatures {
  mean: number;
  stddev: number;
  min: number;
  max: number;
  median: number;
  rmssd: number;  // Root Mean Square of Successive Differences
  pnn50: number;  // Percentage of successive differences > 50ms
}

export interface FrequencyDomainFeatures {
  vlf: number;      // Very Low Frequency power
  lf: number;       // Low Frequency power
  hf: number;       // High Frequency power
  lfhf_ratio: number; // LF/HF ratio (stress indicator)
  total_power: number;
}

export interface NonlinearFeatures {
  shannon_entropy: number;
  sample_entropy: number;
  sd1: number; // Poincaré plot SD1 (short-term HRV)
  sd2: number; // Poincaré plot SD2 (long-term HRV)
}

export interface EmotionFeatures {
  dominant_emotion: string;
  emotion_distribution: Record<string, number>; // 各情绪占比
  avg_confidence: number;
  emotion_changes: number; // 情绪变化次数
  valence_trend: number;   // 情绪价值趋势（-1 to 1）
}

export interface QuestionAIFeatures {
  questionId: string;
  timeWindow: TimeWindow;

  // 心率特征
  heartRate?: {
    timeDomain: TimeDomainFeatures;
    frequency: FrequencyDomainFeatures;
    nonlinear: NonlinearFeatures;
    dataPoints: number;
  };

  // 情绪特征（视频）
  videoEmotion?: {
    features: EmotionFeatures;
    dataPoints: number;
  };

  // 情绪特征（音频）
  audioEmotion?: {
    features: EmotionFeatures;
    dataPoints: number;
  };

  // 关键时间点样本（用于LLM上下文）
  keyPoints?: {
    timestamp: string;
    heartRate?: number;
    emotion?: string;
    confidence?: number;
  }[];
}

// ============================================================================
// 基线对比
// ============================================================================

export interface BaselineMetrics {
  heartRate: {
    mean: number;
    stddev: number;
  };
  emotion: {
    distribution: Record<string, number>;
  };
}

export interface BaselineComparison {
  questionId: string;

  heartRateChange: {
    absolute: number;      // 绝对变化值
    percentage: number;    // 相对变化百分比
    significance: 'low' | 'medium' | 'high'; // 变化显著性
  };

  emotionShift: {
    dominant_before: string;
    dominant_during: string;
    shift_magnitude: number; // 0-1，越大表示变化越大
  };
}
