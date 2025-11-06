/**
 * 时间窗口匹配服务
 *
 * 职责：
 * - 根据答题时间窗口过滤AI数据
 * - 支持前后缓冲时间
 * - 高效的时间范围查询
 */

import { Injectable } from '@nestjs/common';
import {
  CheckpointFile,
  TimeWindow,
  WindowedAIData,
  VideoEmotionData,
  AudioEmotionData,
  HeartRateData,
} from '../types/ai-analysis.types';

@Injectable()
export class TimeWindowMatcherService {
  // ==========================================================================
  // 公开方法
  // ==========================================================================

  /**
   * 根据时间窗口过滤checkpoint数据
   */
  filterByWindow(checkpointData: CheckpointFile, window: TimeWindow): WindowedAIData {
    const windowStart = new Date(window.start.getTime() - (window.preBuffer || 0));
    const windowEnd = new Date(window.end.getTime() + (window.postBuffer || 0));

    return {
      videoEmotions: this.filterDataByTime(
        checkpointData.video_emotions,
        windowStart,
        windowEnd,
      ),
      audioEmotions: this.filterDataByTime(
        checkpointData.audio_emotions,
        windowStart,
        windowEnd,
      ),
      heartRates: this.filterDataByTime(
        checkpointData.heart_rate_data,
        windowStart,
        windowEnd,
      ),
    };
  }

  /**
   * 计算基线数据（考试开始前5分钟或前20%数据）
   */
  calculateBaseline(checkpointData: CheckpointFile, examStartTime: Date): WindowedAIData {
    const baselineWindow: TimeWindow = {
      start: new Date(examStartTime.getTime() - 5 * 60 * 1000), // 前5分钟
      end: examStartTime,
    };

    return this.filterByWindow(checkpointData, baselineWindow);
  }

  // ==========================================================================
  // 私有方法
  // ==========================================================================

  /**
   * 过滤数据数组（泛型方法）
   */
  private filterDataByTime<T extends { timestamp: string }>(
    data: T[],
    start: Date,
    end: Date,
  ): T[] {
    // 使用二分查找优化（假设数据已按时间排序）
    const startIdx = this.binarySearchStart(data, start);
    const endIdx = this.binarySearchEnd(data, end, startIdx);

    return data.slice(startIdx, endIdx + 1);
  }

  /**
   * 二分查找：找到第一个 >= start 的索引
   */
  private binarySearchStart<T extends { timestamp: string }>(
    data: T[],
    start: Date,
  ): number {
    let left = 0;
    let right = data.length - 1;
    let result = data.length;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const midTime = new Date(data[mid].timestamp);

      if (midTime >= start) {
        result = mid;
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    return result;
  }

  /**
   * 二分查找：找到最后一个 <= end 的索引
   */
  private binarySearchEnd<T extends { timestamp: string }>(
    data: T[],
    end: Date,
    startIdx: number,
  ): number {
    let left = startIdx;
    let right = data.length - 1;
    let result = startIdx - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const midTime = new Date(data[mid].timestamp);

      if (midTime <= end) {
        result = mid;
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return result;
  }
}
