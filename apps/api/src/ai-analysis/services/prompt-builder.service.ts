/**
 * Prompt构建服务
 *
 * 职责：
 * - 构建LLM Prompt模板
 * - 数据序列化和压缩
 * - 提供心理学专业的system prompt
 */

import { Injectable } from '@nestjs/common';
import {
  QuestionAIFeatures,
  BaselineComparison,
} from '../types/ai-analysis.types';
import { AnomalyReport } from '../types/anomaly.types';

@Injectable()
export class PromptBuilderService {
  // ==========================================================================
  // System Prompts
  // ==========================================================================

  private readonly systemPrompt = `你是一位经验丰富的心理评估专家，专门从事学生心理测评分析。

你的职责：
1. 基于AI监测数据（心率、情绪、注意力）和答题行为进行深度心理分析
2. 识别潜在的心理健康风险（焦虑、抑郁、自杀倾豫等）
3. 提供专业、可操作的干预建议
4. 使用通俗易懂的语言，避免过度专业术语

分析原则：
- 数据驱动：基于客观的生理和行为指标
- 情境化：结合具体题目内容进行解读
- 谨慎评估：避免过度解读，注明不确定性
- 行动导向：提供具体的后续跟进建议

输出格式：
- 使用中文
- 结构化、清晰、简洁
- 重点突出、逻辑连贯`;

  // ==========================================================================
  // 主报告Prompt
  // ==========================================================================

  /**
   * 构建综合报告Prompt
   */
  buildComprehensivePrompt(
    questions: Array<{
      questionTitle: string;
      questionType: string;
      answer: string;
      features: QuestionAIFeatures;
      comparison: BaselineComparison;
    }>,
    anomalyReport?: AnomalyReport,
  ): { system: string; user: string } {
    const userPrompt = `
请基于以下学生的心理测评数据，生成一份综合心理分析报告。

# 考试基本信息
- 总题目数: ${questions.length}
- 是否有异常事件: ${anomalyReport ? `是（${anomalyReport.summary.totalAnomalies}个）` : '否'}

# 题目级详细数据
${questions.map((q, idx) => this.formatQuestionData(q, idx + 1)).join('\n\n')}

${anomalyReport ? this.formatAnomalyData(anomalyReport) : ''}

# 要求输出以下结构（JSON格式）：

\`\`\`json
{
  "executiveSummary": "一段200-300字的执行摘要，概括学生的整体心理状态、主要发现和关键建议",

  "questionAnalyses": [
    {
      "questionId": "题目ID",
      "questionTitle": "题目标题",
      "analysis": "该题的具体分析（100-150字），结合AI数据和答题行为",
      "psychologicalSignificance": "该题反映的心理意义（50-80字）",
      "concerns": ["如有担忧，列出具体关注点"]
    }
  ],

  "anomalyInsights": "${anomalyReport ? '针对异常事件的深度解读（150-200字）' : 'null'}",

  "overallAssessment": {
    "psychologicalProfile": "学生的整体心理画像（150-200字）",
    "keyFindings": ["关键发现1", "关键发现2", "关键发现3"],
    "riskLevel": "low/medium/high/critical",
    "recommendations": ["具体建议1", "具体建议2", "具体建议3"]
  }
}
\`\`\`

重点关注：
1. 心率变化显著的题目（>20%变化）
2. 情绪剧烈波动的题目
3. 答题时间异常的题目（犹豫度高）
4. 异常事件相关的题目

请确保输出为有效的JSON格式。`;

    return {
      system: this.systemPrompt,
      user: userPrompt,
    };
  }

  // ==========================================================================
  // 异常专用Prompt
  // ==========================================================================

  /**
   * 构建异常聚焦报告Prompt
   */
  buildAnomalyFocusedPrompt(
    anomalyReport: AnomalyReport,
    relatedQuestions: Array<{
      questionTitle: string;
      features: QuestionAIFeatures;
    }>,
  ): { system: string; user: string } {
    const userPrompt = `
请针对以下检测到的异常行为事件，进行深度心理分析。

# 异常统计
- 总异常数: ${anomalyReport.summary.totalAnomalies}
- 严重异常数: ${anomalyReport.summary.criticalCount}
- 整体风险等级: ${anomalyReport.overallAssessment.riskLevel}

# 详细异常事件
${anomalyReport.analyses.map((a, idx) => this.formatAnomalyDetail(a, idx + 1)).join('\n\n')}

# 识别的异常模式
${anomalyReport.patterns.map((p, idx) => `
${idx + 1}. ${p.patternType}模式（风险：${p.overallRisk}）
   - 涉及${p.anomalies.length}个异常事件
   - ${p.description}
`).join('\n')}

# 相关题目背景
${relatedQuestions.map((q, idx) => `
${idx + 1}. ${q.questionTitle}
   - 心率: ${q.features.heartRate?.timeDomain.mean.toFixed(1)} bpm
   - 主导情绪: ${q.features.videoEmotion?.features.dominant_emotion || '未检测'}
`).join('\n')}

# 要求输出（JSON格式）：

\`\`\`json
{
  "riskAssessment": "基于异常事件的整体风险评估（200-250字），需说明风险等级的依据",
  "patternInterpretation": "对识别出的异常模式的心理学解读（150-200字）",
  "interventionPlan": {
    "immediate": ["立即采取的措施1", "立即采取的措施2"],
    "shortTerm": ["短期跟进计划1（1-3天）", "短期跟进计划2"],
    "longTerm": ["长期关注重点1（1周以上）", "长期关注重点2"]
  },
  "referralRecommendation": "是否建议转介专业心理咨询？如需要，说明理由（50-100字）"
}
\`\`\`

请确保输出为有效的JSON格式。`;

    return {
      system: this.systemPrompt,
      user: userPrompt,
    };
  }

  // ==========================================================================
  // 辅助方法
  // ==========================================================================

  /**
   * 格式化题目数据（压缩版）
   */
  private formatQuestionData(
    q: any,
    index: number,
  ): string {
    const hr = q.features.heartRate;
    const emotion = q.features.videoEmotion;
    const comp = q.comparison;

    return `
## 题目${index}: ${q.questionTitle}
- 题型: ${q.questionType}
- 学生答案: ${q.answer || '未作答'}

### AI监测数据
- 心率: 平均${hr ? hr.timeDomain.mean.toFixed(1) : 'N/A'} bpm, RMSSD=${hr ? hr.timeDomain.rmssd.toFixed(1) : 'N/A'}, LF/HF比值=${hr ? hr.frequency.lfhf_ratio.toFixed(2) : 'N/A'}
- 情绪: 主导${emotion ? emotion.features.dominant_emotion : 'N/A'}, 变化${emotion ? emotion.features.emotion_changes : 0}次
- 数据点数: 心率${hr?.dataPoints || 0}, 情绪${emotion?.dataPoints || 0}

### 基线对比
- 心率变化: ${comp.heartRateChange.absolute > 0 ? '+' : ''}${comp.heartRateChange.absolute.toFixed(1)} bpm (${comp.heartRateChange.percentage > 0 ? '+' : ''}${comp.heartRateChange.percentage.toFixed(1)}%), 显著性=${comp.heartRateChange.significance}
- 情绪转变: ${comp.emotionShift.dominant_before} → ${comp.emotionShift.dominant_during}, 变化幅度=${(comp.emotionShift.shift_magnitude * 100).toFixed(0)}%`;
  }

  /**
   * 格式化异常数据（简洁版）
   */
  private formatAnomalyData(report: AnomalyReport): string {
    return `
# 异常事件总览
- 总数: ${report.summary.totalAnomalies}, 严重: ${report.summary.criticalCount}
- 主要类型: ${Object.entries(report.summary.byType).map(([type, count]) => `${type}(${count})`).join(', ')}
- 关键发现: ${report.overallAssessment.keyFindings.join('; ')}`;
  }

  /**
   * 格式化异常详情
   */
  private formatAnomalyDetail(analysis: any, index: number): string {
    const a = analysis.anomaly;
    return `
${index}. [${a.type}] ${a.severity}严重度, 置信度${(a.confidence * 100).toFixed(0)}%
   - 时间: ${a.timestamp.toISOString()}
   - 持续: ${a.duration}秒
   - 关联题目: ${a.relatedQuestion ? a.relatedQuestion.questionTitle : '无'}
   - AI数据: 心率${a.aiFeatures?.heartRate ? Math.round(a.aiFeatures.heartRate) : 'N/A'} bpm, 情绪${a.aiFeatures?.emotion || 'N/A'}
   - 解释: ${analysis.psychologicalInterpretation}`;
  }
}
