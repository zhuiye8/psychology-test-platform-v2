import { Injectable, Logger } from '@nestjs/common';
import { DimensionScore } from './dto/report.dto';

/**
 * 答案数据接口
 */
interface AnswerData {
  id: string;
  questionId: string;
  points: number;
  maxPoints: number;
  question: {
    id: string;
    dimension?: string | null;
    type: string;
    title: string;
  };
}

/**
 * 题目数据接口
 */
interface QuestionData {
  id: string;
  dimension?: string | null;
  type: string;
  title: string;
}

/**
 * 维度计算结果
 */
export interface DimensionCalculationResult {
  hasDimensions: boolean;
  scores: DimensionScore[];
  groupingStrategy: 'dimension' | 'type' | 'mixed';
}

/**
 * 维度计算器
 *
 * 核心功能：
 * 1. 自动检测题目是否有维度字段
 * 2. 按维度分组计算得分（有维度时）
 * 3. 按题型分组计算得分（无维度时）
 * 4. 处理混合场景（部分有维度）
 */
@Injectable()
export class DimensionCalculator {
  private readonly logger = new Logger(DimensionCalculator.name);

  /**
   * 计算维度得分
   *
   * @param answers 学生答案列表
   * @param questions 试卷题目列表
   * @returns 维度计算结果
   */
  calculate(
    answers: AnswerData[],
    questions: QuestionData[],
  ): DimensionCalculationResult {
    this.logger.log(
      `[calculate] 开始计算维度得分: answers=${answers.length}, questions=${questions.length}`,
    );

    // 1. 检测维度策略
    const strategy = this.detectGroupingStrategy(questions);
    this.logger.log(`[calculate] 分组策略: ${strategy}`);

    // 2. 根据策略计算得分
    let scores: DimensionScore[] = [];
    let hasDimensions = false;

    switch (strategy) {
      case 'dimension':
        scores = this.calculateByDimension(answers);
        hasDimensions = true;
        break;

      case 'type':
        scores = this.calculateByType(answers);
        hasDimensions = false;
        break;

      case 'mixed':
        // 混合场景：优先使用维度，但也展示题型统计
        const dimensionScores = this.calculateByDimension(
          answers.filter((a) => a.question.dimension),
        );
        const typeScores = this.calculateByType(
          answers.filter((a) => !a.question.dimension),
        );
        scores = [...dimensionScores, ...typeScores];
        hasDimensions = dimensionScores.length > 0;
        break;
    }

    this.logger.log(
      `[calculate] 计算完成: hasDimensions=${hasDimensions}, scores=${scores.length}`,
    );

    return {
      hasDimensions,
      scores,
      groupingStrategy: strategy,
    };
  }

  /**
   * 检测分组策略
   */
  private detectGroupingStrategy(
    questions: QuestionData[],
  ): 'dimension' | 'type' | 'mixed' {
    const totalCount = questions.length;
    const withDimensionCount = questions.filter((q) => q.dimension).length;

    if (withDimensionCount === 0) {
      return 'type'; // 全部没有维度
    } else if (withDimensionCount === totalCount) {
      return 'dimension'; // 全部有维度
    } else {
      return 'mixed'; // 部分有维度
    }
  }

  /**
   * 按维度分组计算
   */
  private calculateByDimension(answers: AnswerData[]): DimensionScore[] {
    // 按维度分组
    const groupedByDimension = this.groupBy(answers, (a) => a.question.dimension || '未分类');

    // 计算每个维度的统计数据
    const scores: DimensionScore[] = [];

    for (const [dimensionName, dimensionAnswers] of Object.entries(groupedByDimension)) {
      const total = dimensionAnswers.reduce((sum, a) => sum + a.points, 0);
      const max = dimensionAnswers.reduce((sum, a) => sum + a.maxPoints, 0);
      const count = dimensionAnswers.length;
      const mean = count > 0 ? total / count : 0;
      const percentage = max > 0 ? total / max : 0;

      scores.push({
        dimension_name: dimensionName,
        mean,
        total,
        max,
        count,
        percentage,
      });
    }

    // 按得分率降序排序
    return scores.sort((a, b) => b.percentage - a.percentage);
  }

  /**
   * 按题型分组计算
   */
  private calculateByType(answers: AnswerData[]): DimensionScore[] {
    // 按题型分组
    const groupedByType = this.groupBy(answers, (a) => this.getTypeDisplayName(a.question.type));

    // 计算每个题型的统计数据
    const scores: DimensionScore[] = [];

    for (const [typeName, typeAnswers] of Object.entries(groupedByType)) {
      const total = typeAnswers.reduce((sum, a) => sum + a.points, 0);
      const max = typeAnswers.reduce((sum, a) => sum + a.maxPoints, 0);
      const count = typeAnswers.length;
      const mean = count > 0 ? total / count : 0;
      const percentage = max > 0 ? total / max : 0;

      scores.push({
        dimension_name: typeName,
        mean,
        total,
        max,
        count,
        percentage,
      });
    }

    // 按题目数量降序排序
    return scores.sort((a, b) => b.count - a.count);
  }

  /**
   * 获取题型显示名称
   */
  private getTypeDisplayName(type: string): string {
    const typeMap: Record<string, string> = {
      SINGLE_CHOICE: '单选题',
      MULTIPLE_CHOICE: '多选题',
      TEXT: '简答题',
      ESSAY: '问答题',
    };
    return typeMap[type] || type;
  }

  /**
   * 通用分组工具函数
   */
  private groupBy<T>(
    items: T[],
    keyGetter: (item: T) => string,
  ): Record<string, T[]> {
    const grouped: Record<string, T[]> = {};

    for (const item of items) {
      const key = keyGetter(item);
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(item);
    }

    return grouped;
  }
}
