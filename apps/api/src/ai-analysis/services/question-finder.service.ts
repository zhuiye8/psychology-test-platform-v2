/**
 * 题目查找服务
 *
 * 职责：
 * - 根据时间戳查找对应的题目
 * - 计算题目的时间窗口
 * - 支持模糊匹配（前后缓冲）
 */

import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

export interface QuestionTimeWindow {
  questionId: string;
  questionTitle: string;
  questionType: string;
  displayedAt: Date;
  answeredAt: Date;
  duration: number; // 秒
}

@Injectable()
export class QuestionFinderService {
  constructor(private readonly db: DatabaseService) {}

  // ==========================================================================
  // 公开方法
  // ==========================================================================

  /**
   * 根据时间戳查找对应的题目
   *
   * @param timestamp 目标时间
   * @param examResultId 考试结果ID
   * @param bufferMs 缓冲时间（毫秒），默认5秒
   */
  async findByTimestamp(
    timestamp: Date,
    examResultId: string,
    bufferMs = 5000,
  ): Promise<QuestionTimeWindow | null> {
    const answers = await this.db.answer.findMany({
      where: {
        examResultId,
        questionDisplayedAt: { not: null },
      },
      include: { question: true },
      orderBy: { questionDisplayedAt: 'asc' },
    });

    const targetTime = timestamp.getTime();

    for (const answer of answers) {
      const displayTime = answer.questionDisplayedAt!.getTime();
      const answerTime = answer.answeredAt.getTime();

      // 检查是否在时间窗口内（含缓冲）
      if (targetTime >= displayTime - bufferMs && targetTime <= answerTime + bufferMs) {
        return {
          questionId: answer.questionId,
          questionTitle: answer.question.title,
          questionType: answer.question.type,
          displayedAt: answer.questionDisplayedAt!,
          answeredAt: answer.answeredAt,
          duration: (answerTime - displayTime) / 1000,
        };
      }
    }

    return null;
  }

  /**
   * 获取所有题目的时间窗口
   */
  async getAllTimeWindows(
    examResultId: string,
  ): Promise<QuestionTimeWindow[]> {
    const answers = await this.db.answer.findMany({
      where: {
        examResultId,
        questionDisplayedAt: { not: null },
      },
      include: { question: true },
      orderBy: { questionDisplayedAt: 'asc' },
    });

    return answers.map((answer) => ({
      questionId: answer.questionId,
      questionTitle: answer.question.title,
      questionType: answer.question.type,
      displayedAt: answer.questionDisplayedAt!,
      answeredAt: answer.answeredAt,
      duration:
        (answer.answeredAt.getTime() - answer.questionDisplayedAt!.getTime()) /
        1000,
    }));
  }

  /**
   * 查找指定时间范围内的所有题目
   */
  async findInRange(
    startTime: Date,
    endTime: Date,
    examResultId: string,
  ): Promise<QuestionTimeWindow[]> {
    const allWindows = await this.getAllTimeWindows(examResultId);
    const startMs = startTime.getTime();
    const endMs = endTime.getTime();

    return allWindows.filter((window) => {
      const displayMs = window.displayedAt.getTime();
      const answerMs = window.answeredAt.getTime();

      // 题目时间窗口与查询范围有交集
      return displayMs <= endMs && answerMs >= startMs;
    });
  }
}
