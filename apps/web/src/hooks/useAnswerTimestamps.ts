/**
 * useAnswerTimestamps Hook
 *
 * 追踪学生答题行为的时间戳和交互数据，用于AI分析相关性
 *
 * 功能：
 * - questionDisplayedAt: 题目首次展示时间
 * - firstInteractionAt: 首次交互时间（点击/输入）
 * - lastModifiedAt: 最后修改时间
 * - totalViewTime: 总查看时长（毫秒）
 * - interactionCount: 交互次数
 * - hesitationScore: 犹豫度评分（0-1，基于交互模式计算）
 */

import { useState, useEffect, useRef, useCallback } from 'react';

// ============================================================================
// 类型定义
// ============================================================================

/**
 * 单个题目的时间戳数据
 */
export interface QuestionTimestamps {
  questionId: string;
  questionDisplayedAt: string; // ISO 8601
  firstInteractionAt?: string; // ISO 8601
  lastModifiedAt?: string;     // ISO 8601
  totalViewTime: number;        // 毫秒
  interactionCount: number;
  hesitationScore?: number;     // 0-1，越高表示越犹豫
}

/**
 * 时间戳状态管理
 */
interface TimestampState {
  [questionId: string]: {
    displayedAt: number;      // 展示时间（timestamp）
    firstInteractionAt?: number;
    lastModifiedAt?: number;
    accumulatedViewTime: number; // 累计查看时长
    interactionCount: number;
    isCurrentlyViewing: boolean;
    lastViewStartTime?: number;  // 最后一次开始查看的时间
  };
}

// ============================================================================
// Hook实现
// ============================================================================

export function useAnswerTimestamps(currentQuestionId: string | null) {
  const [timestampState, setTimestampState] = useState<TimestampState>({});
  const viewTimerRef = useRef<NodeJS.Timeout | null>(null);

  // --------------------------------------------------------------------------
  // 题目展示追踪
  // --------------------------------------------------------------------------

  /**
   * 当前题目改变时：
   * 1. 记录新题目的展示时间
   * 2. 停止旧题目的查看计时
   * 3. 开始新题目的查看计时
   */
  useEffect(() => {
    if (!currentQuestionId) return;

    const now = Date.now();

    setTimestampState((prev) => {
      const newState = { ...prev };

      // 停止所有题目的查看计时
      Object.keys(newState).forEach((qId) => {
        if (newState[qId].isCurrentlyViewing) {
          const viewDuration = now - (newState[qId].lastViewStartTime || now);
          newState[qId].accumulatedViewTime += viewDuration;
          newState[qId].isCurrentlyViewing = false;
          newState[qId].lastViewStartTime = undefined;
        }
      });

      // 初始化或更新当前题目
      if (!newState[currentQuestionId]) {
        // 首次展示此题目
        newState[currentQuestionId] = {
          displayedAt: now,
          accumulatedViewTime: 0,
          interactionCount: 0,
          isCurrentlyViewing: true,
          lastViewStartTime: now,
        };
      } else {
        // 重新查看此题目
        newState[currentQuestionId].isCurrentlyViewing = true;
        newState[currentQuestionId].lastViewStartTime = now;
      }

      return newState;
    });

    // 每秒更新查看时长
    viewTimerRef.current = setInterval(() => {
      setTimestampState((prev) => {
        if (!prev[currentQuestionId]?.isCurrentlyViewing) return prev;

        const newState = { ...prev };
        const now = Date.now();
        const viewDuration = now - (newState[currentQuestionId].lastViewStartTime || now);
        newState[currentQuestionId].accumulatedViewTime += viewDuration;
        newState[currentQuestionId].lastViewStartTime = now;

        return newState;
      });
    }, 1000);

    // 清理定时器
    return () => {
      if (viewTimerRef.current) {
        clearInterval(viewTimerRef.current);
      }
    };
  }, [currentQuestionId]);

  // --------------------------------------------------------------------------
  // 交互追踪
  // --------------------------------------------------------------------------

  /**
   * 记录用户交互（点击、输入等）
   */
  const recordInteraction = useCallback((questionId: string) => {
    const now = Date.now();

    setTimestampState((prev) => {
      const newState = { ...prev };

      if (!newState[questionId]) {
        // 题目未展示就交互（边界情况）
        newState[questionId] = {
          displayedAt: now,
          accumulatedViewTime: 0,
          interactionCount: 1,
          isCurrentlyViewing: false,
          firstInteractionAt: now,
          lastModifiedAt: now,
        };
      } else {
        // 正常交互
        if (!newState[questionId].firstInteractionAt) {
          newState[questionId].firstInteractionAt = now;
        }
        newState[questionId].lastModifiedAt = now;
        newState[questionId].interactionCount += 1;
      }

      return newState;
    });
  }, []);

  // --------------------------------------------------------------------------
  // 数据导出
  // --------------------------------------------------------------------------

  /**
   * 获取指定题目的时间戳数据（用于提交答案）
   */
  const getQuestionTimestamps = useCallback(
    (questionId: string): QuestionTimestamps | null => {
      const state = timestampState[questionId];
      if (!state) return null;

      // 计算犹豫度评分（基于交互模式）
      const hesitationScore = calculateHesitationScore(state);

      return {
        questionId,
        questionDisplayedAt: new Date(state.displayedAt).toISOString(),
        firstInteractionAt: state.firstInteractionAt
          ? new Date(state.firstInteractionAt).toISOString()
          : undefined,
        lastModifiedAt: state.lastModifiedAt
          ? new Date(state.lastModifiedAt).toISOString()
          : undefined,
        totalViewTime: state.accumulatedViewTime,
        interactionCount: state.interactionCount,
        hesitationScore,
      };
    },
    [timestampState]
  );

  /**
   * 获取所有题目的时间戳数据（用于批量提交）
   */
  const getAllTimestamps = useCallback((): QuestionTimestamps[] => {
    return Object.keys(timestampState)
      .map((qId) => getQuestionTimestamps(qId))
      .filter((t): t is QuestionTimestamps => t !== null);
  }, [timestampState, getQuestionTimestamps]);

  return {
    recordInteraction,
    getQuestionTimestamps,
    getAllTimestamps,
  };
}

// ============================================================================
// 辅助函数
// ============================================================================

/**
 * 计算犹豫度评分
 *
 * 基于以下因素：
 * - 交互次数：频繁修改答案表示犹豫
 * - 首次交互延迟：看题时间长但不作答表示犹豫
 * - 修改间隔：快速连续修改表示不确定
 *
 * @returns 0-1之间的评分，越高表示越犹豫
 */
function calculateHesitationScore(state: {
  displayedAt: number;
  firstInteractionAt?: number;
  lastModifiedAt?: number;
  accumulatedViewTime: number;
  interactionCount: number;
}): number {
  let score = 0;

  // 因素1：交互次数（权重40%）
  // 正常：1-2次，犹豫：3-5次，高度犹豫：6+次
  if (state.interactionCount >= 6) {
    score += 0.4;
  } else if (state.interactionCount >= 3) {
    score += 0.2 + ((state.interactionCount - 3) / 3) * 0.2;
  }

  // 因素2：首次交互延迟（权重30%）
  if (state.firstInteractionAt) {
    const delaySeconds = (state.firstInteractionAt - state.displayedAt) / 1000;
    // 正常：<5秒，犹豫：5-20秒，高度犹豫：>20秒
    if (delaySeconds > 20) {
      score += 0.3;
    } else if (delaySeconds > 5) {
      score += ((delaySeconds - 5) / 15) * 0.3;
    }
  } else {
    // 从未交互，视为高度犹豫
    const viewSeconds = state.accumulatedViewTime / 1000;
    if (viewSeconds > 10) {
      score += 0.3;
    }
  }

  // 因素3：查看时长与交互次数的比例（权重30%）
  // 长时间查看但交互少表示犹豫
  if (state.interactionCount > 0) {
    const avgTimePerInteraction = state.accumulatedViewTime / state.interactionCount;
    const avgSeconds = avgTimePerInteraction / 1000;
    // 正常：<10秒/次，犹豫：10-30秒/次，高度犹豫：>30秒/次
    if (avgSeconds > 30) {
      score += 0.3;
    } else if (avgSeconds > 10) {
      score += ((avgSeconds - 10) / 20) * 0.3;
    }
  }

  // 限制在0-1范围内
  return Math.min(1, Math.max(0, score));
}
