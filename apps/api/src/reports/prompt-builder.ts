import { Injectable, Logger } from '@nestjs/common';
import { DimensionScore, AnswerPerformance, AiAnalysisData } from './dto/report.dto';

/**
 * 提示词构建器输入数据
 */
export interface PromptBuilderInput {
  studentInfo: {
    name: string;
    studentId: string;
  };
  paperInfo: {
    title: string;
    description?: string | null;
  };
  answerPerformance: AnswerPerformance;
  dimensionScores: DimensionScore[];
  hasDimensions: boolean;
  aiAnalysis: AiAnalysisData;
}

/**
 * 提示词构建器
 *
 * 职责：
 * 1. 基于不同场景构建LLM提示词
 * 2. 支持有维度/无维度测试
 * 3. 支持有AI数据/无AI数据
 * 4. 确保提示词结构化、专业化
 */
@Injectable()
export class PromptBuilder {
  private readonly logger = new Logger(PromptBuilder.name);

  /**
   * 构建LLM提示词
   */
  build(input: PromptBuilderInput): string {
    this.logger.log(`[build] 构建提示词: hasDimensions=${input.hasDimensions}, aiAvailable=${input.aiAnalysis.available}`);

    const sections: string[] = [];

    // 1. 基本信息
    sections.push(this.buildBasicInfo(input));

    // 2. 答题表现数据
    sections.push(this.buildAnswerPerformance(input.answerPerformance));

    // 3. 维度/题型得分数据
    sections.push(this.buildDimensionScores(input.dimensionScores, input.hasDimensions));

    // 4. AI分析数据（如果有）
    if (input.aiAnalysis.available) {
      sections.push(this.buildAiAnalysis(input.aiAnalysis));
    }

    // 5. 输出要求
    sections.push(this.buildOutputRequirements(input.hasDimensions, input.aiAnalysis.available));

    const prompt = sections.join('\n\n---\n\n');
    this.logger.log(`[build] 提示词构建完成: ${prompt.length} 字符`);
    return prompt;
  }

  /**
   * 构建基本信息部分
   */
  private buildBasicInfo(input: PromptBuilderInput): string {
    return `# 心理测评报告生成任务

## 学生基本信息
- 姓名：${input.studentInfo.name}
- 学号：${input.studentInfo.studentId}
- 测试名称：${input.paperInfo.title}
${input.paperInfo.description ? `- 测试说明：${input.paperInfo.description}` : ''}
- 报告生成时间：${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}`;
  }

  /**
   * 构建答题表现部分
   */
  private buildAnswerPerformance(performance: AnswerPerformance): string {
    const minutes = Math.floor(performance.time_spent / 60);
    const seconds = performance.time_spent % 60;

    return `## 答题表现数据

### 总体得分
- 总分：${performance.total_score} / ${performance.max_score}
- 得分率：${(performance.percentage * 100).toFixed(1)}%
- 答题时长：${minutes}分${seconds}秒

### 答题情况
- 题目总数：${performance.total_questions}题
- 完全正确：${performance.correct_count}题
- 正确率：${(performance.correct_rate * 100).toFixed(1)}%`;
  }

  /**
   * 构建维度得分部分
   */
  private buildDimensionScores(scores: DimensionScore[], hasDimensions: boolean): string {
    if (scores.length === 0) {
      return `## 分类统计\n\n暂无分类数据。`;
    }

    const header = hasDimensions ? '## 维度得分分析' : '## 题型得分分析';
    const tableHeader = hasDimensions ? '维度名称' : '题型';

    let table = `${header}\n\n| ${tableHeader} | 题目数 | 得分 | 满分 | 平均分 | 得分率 |\n|---------|--------|------|------|--------|--------|\n`;

    for (const score of scores) {
      table += `| ${score.dimension_name} | ${score.count} | ${score.total} | ${score.max} | ${score.mean.toFixed(2)} | ${(score.percentage * 100).toFixed(1)}% |\n`;
    }

    return table;
  }

  /**
   * 构建AI分析数据部分
   */
  private buildAiAnalysis(analysis: AiAnalysisData): string {
    const sections: string[] = ['## AI行为分析数据'];

    // 数据质量说明
    if (analysis.data_quality !== undefined) {
      sections.push(`### 数据质量
- 数据质量评分：${(analysis.data_quality * 100).toFixed(1)}%
- 分析置信度：${((analysis.analysis_confidence || 0) * 100).toFixed(1)}%
${analysis.data_quality < 0.5 ? '\n⚠️ **注意**：数据质量较低，分析结果仅供参考。' : ''}`);
    }

    // 情绪分析
    if (analysis.avg_valence !== undefined && analysis.avg_arousal !== undefined) {
      sections.push(`### 情绪状态
- 主导情绪：${this.getEmotionDisplayName(analysis.dominant_emotion || 'unknown')}
- 平均效价（积极度）：${analysis.avg_valence.toFixed(2)} （-1到1，越高越积极）
- 平均唤醒度（激活度）：${analysis.avg_arousal.toFixed(2)} （0到1，越高越激活）`);

      // 情绪分布
      if (analysis.emotion_distribution && Object.keys(analysis.emotion_distribution).length > 0) {
        const emotionList = Object.entries(analysis.emotion_distribution)
          .map(([emotion, value]) => `  - ${this.getEmotionDisplayName(emotion)}: ${(value * 100).toFixed(1)}%`)
          .join('\n');
        sections.push(`#### 情绪分布\n${emotionList}`);
      }
    }

    // 注意力分析
    if (analysis.avg_attention !== undefined) {
      sections.push(`### 注意力状态
- 平均注意力：${(analysis.avg_attention * 100).toFixed(1)}% （0-100%，越高越专注）
- 注意力变异性：${((analysis.attention_variability || 0) * 100).toFixed(1)}% （越低越稳定）
- 分心事件数：${analysis.distraction_events || 0}次`);
    }

    // 心率分析
    if (analysis.avg_heart_rate !== undefined && analysis.avg_heart_rate > 0) {
      sections.push(`### 生理指标
- 平均心率：${analysis.avg_heart_rate.toFixed(1)} BPM
- 心率变异性：${((analysis.heart_rate_variability || 0) * 100).toFixed(1)}%`);

      // 压力指标
      if (analysis.stress_indicators && Object.keys(analysis.stress_indicators).length > 0) {
        const stressInfo = JSON.stringify(analysis.stress_indicators, null, 2);
        sections.push(`#### 压力指标\n\`\`\`json\n${stressInfo}\n\`\`\``);
      }
    }

    // 异常事件
    if (analysis.anomalies && analysis.anomalies.length > 0) {
      const criticalAnomalies = analysis.anomalies.filter((a) => a.severity === 'CRITICAL' || a.severity === 'HIGH');
      if (criticalAnomalies.length > 0) {
        const anomalyList = criticalAnomalies
          .map((a) => `  - [${a.severity}] ${a.description} (${new Date(a.timestamp).toLocaleTimeString('zh-CN')})`)
          .join('\n');
        sections.push(`### 重要异常事件\n${anomalyList}`);
      }
    }

    return sections.join('\n\n');
  }

  /**
   * 构建输出要求部分
   */
  private buildOutputRequirements(hasDimensions: boolean, hasAiData: boolean): string {
    return `## 报告输出要求

请基于以上数据生成一份**完整的心理测评报告**，使用Markdown格式，包含以下章节：

### 报告结构（必须包含以下6个章节）

#### 一、执行摘要（200字以内）
- 简要总结测试结果
- 突出关键发现
- 给出总体评价

#### 二、答题表现分析
- 分析总体得分情况
${hasDimensions ? '- 解读各维度得分（重点关注得分率低于60%或高于80%的维度）' : '- 解读各题型得分情况'}
- 指出优势领域和需要关注的领域

#### 三、${hasAiData ? 'AI行为分析' : '答题行为分析'}
${hasAiData ? `- 情绪状态解读（结合效价和唤醒度）
- 注意力状态评估
- 生理状态分析（如有心率数据）
- 异常行为说明（如有）` : `- 基于答题时长分析答题状态
- 基于正确率分析掌握程度`}

#### 四、综合评价
- 整合答题表现${hasAiData ? '和AI分析数据' : ''}
- 给出综合评估结论
- 如果发现潜在风险，使用温和但明确的语言提示
${hasDimensions ? '- 特别关注自杀风险、抑郁倾向等敏感维度（如果测试包含）' : ''}

#### 五、建议与干预措施
- 针对学生：具体可行的改进建议
- 针对家长/教师：支持性建议
- 如有高风险指标，建议寻求专业帮助

#### 六、方法与局限性
- 说明评估方法${hasAiData ? '（问卷 + AI行为分析）' : '（问卷评估）'}
- 声明数据质量${hasAiData && '（特别是AI数据质量）'}
- 明确边界：这是筛查性评估，不能替代临床诊断
- 建议后续跟进或转介条件

### 写作要求
1. **专业但易懂**：使用专业术语，但要通俗解释
2. **谨慎表述**：避免绝对化，使用"可能"、"倾向于"、"建议"等词汇
3. **数据支撑**：每个结论必须引用具体数据
4. **建设性**：重点放在改进和支持，而非批评
5. **安全第一**：如发现自伤、他伤风险线索，明确建议立即寻求专业帮助

### 格式要求
- 使用Markdown格式
- 使用二级标题(##)分隔章节
- 使用列表、粗体、斜体增强可读性
- 重要提示使用引用块(>)或加粗
- 数据使用表格或列表清晰展示`;
  }

  /**
   * 获取情绪的中文显示名称
   */
  private getEmotionDisplayName(emotion: string): string {
    const emotionMap: Record<string, string> = {
      neutral: '平静',
      happy: '快乐',
      sad: '悲伤',
      angry: '愤怒',
      fear: '恐惧',
      surprise: '惊讶',
      disgust: '厌恶',
      other: '其他',
      unknown: '未知',
    };
    return emotionMap[emotion] || emotion;
  }
}
