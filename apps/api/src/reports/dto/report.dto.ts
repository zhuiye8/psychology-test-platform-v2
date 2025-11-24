import { ApiProperty } from '@nestjs/swagger';

/**
 * 维度得分数据
 */
export class DimensionScore {
  @ApiProperty({ description: '维度名称', example: '家庭生活' })
  dimension_name: string;

  @ApiProperty({ description: '平均得分', example: 3.5 })
  mean: number;

  @ApiProperty({ description: '总分', example: 14 })
  total: number;

  @ApiProperty({ description: '满分', example: 20 })
  max: number;

  @ApiProperty({ description: '题目数量', example: 4 })
  count: number;

  @ApiProperty({ description: '得分率', example: 0.7 })
  percentage: number;
}

/**
 * 答题表现数据
 */
export class AnswerPerformance {
  @ApiProperty({ description: '总分', example: 85 })
  total_score: number;

  @ApiProperty({ description: '满分', example: 100 })
  max_score: number;

  @ApiProperty({ description: '得分率', example: 0.85 })
  percentage: number;

  @ApiProperty({ description: '答题时长（秒）', example: 1800 })
  time_spent: number;

  @ApiProperty({ description: '题目总数', example: 20 })
  total_questions: number;

  @ApiProperty({ description: '正确题目数', example: 17 })
  correct_count: number;

  @ApiProperty({ description: '正确率', example: 0.85 })
  correct_rate: number;
}

/**
 * AI分析数据
 */
export class AiAnalysisData {
  @ApiProperty({ description: '数据是否可用', example: true })
  available: boolean;

  @ApiProperty({ description: '数据质量（0-1）', example: 0.85, required: false })
  data_quality?: number;

  @ApiProperty({ description: '分析置信度（0-1）', example: 0.9, required: false })
  analysis_confidence?: number;

  @ApiProperty({ description: '平均效价（-1到1）', example: 0.3, required: false })
  avg_valence?: number;

  @ApiProperty({ description: '平均唤醒度（0-1）', example: 0.6, required: false })
  avg_arousal?: number;

  @ApiProperty({ description: '主导情绪', example: 'neutral', required: false })
  dominant_emotion?: string;

  @ApiProperty({ description: '情绪分布', required: false })
  emotion_distribution?: Record<string, number>;

  @ApiProperty({ description: '平均注意力（0-1）', example: 0.75, required: false })
  avg_attention?: number;

  @ApiProperty({ description: '注意力变异性', example: 0.15, required: false })
  attention_variability?: number;

  @ApiProperty({ description: '分心事件数', example: 3, required: false })
  distraction_events?: number;

  @ApiProperty({ description: '平均心率（BPM）', example: 75, required: false })
  avg_heart_rate?: number;

  @ApiProperty({ description: '心率变异性', example: 0.08, required: false })
  heart_rate_variability?: number;

  @ApiProperty({ description: '压力指标', required: false })
  stress_indicators?: Record<string, any>;

  @ApiProperty({ description: '异常事件列表', required: false })
  anomalies?: Array<{
    type: string;
    severity: string;
    timestamp: string;
    description: string;
  }>;
}

/**
 * 完整报告数据
 */
export class ReportDto {
  @ApiProperty({ description: '考试结果ID', example: 'result_xxx' })
  result_id: string;

  @ApiProperty({ description: '考试ID', example: 'exam_xxx' })
  exam_id: string;

  @ApiProperty({ description: '试卷标题', example: 'ASQ青少年自杀风险评估问卷' })
  paper_title: string;

  @ApiProperty({ description: '学生姓名', example: '张三' })
  student_name: string;

  @ApiProperty({ description: '学号', example: '20230001' })
  student_id: string;

  @ApiProperty({ description: '完成时间', example: '2025-11-07T10:30:00Z' })
  completed_at: string;

  @ApiProperty({ description: '是否有维度字段', example: true })
  has_dimensions: boolean;

  @ApiProperty({ description: '维度得分列表', type: [DimensionScore] })
  dimension_scores: DimensionScore[];

  @ApiProperty({ description: '答题表现', type: AnswerPerformance })
  answer_performance: AnswerPerformance;

  @ApiProperty({ description: 'AI分析数据', type: AiAnalysisData })
  ai_analysis: AiAnalysisData;

  @ApiProperty({ description: 'LLM生成的Markdown报告内容' })
  markdown_content: string;

  @ApiProperty({ description: '报告生成时间', example: '2025-11-07T11:00:00Z' })
  generated_at: string;
}
