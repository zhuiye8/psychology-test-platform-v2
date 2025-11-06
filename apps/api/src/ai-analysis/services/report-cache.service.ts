/**
 * 报告缓存服务
 *
 * 职责：
 * - 内存缓存LLM生成的报告（避免重复生成）
 * - TTL管理（默认1小时）
 * - 缓存键生成和查找
 */

import { Injectable } from '@nestjs/common';
import { GeneratedReport, CachedReport } from '../types/llm-report.types';

@Injectable()
export class ReportCacheService {
  private cache = new Map<string, CachedReport>();
  private readonly DEFAULT_TTL = 60 * 60 * 1000; // 1小时

  // ==========================================================================
  // 公开方法
  // ==========================================================================

  /**
   * 获取缓存的报告
   */
  get(examResultId: string, reportType: string): GeneratedReport | null {
    const key = this.buildKey(examResultId, reportType);
    const cached = this.cache.get(key);

    if (!cached) return null;

    // 检查是否过期
    if (Date.now() > cached.expiresAt.getTime()) {
      this.cache.delete(key);
      return null;
    }

    return cached.report;
  }

  /**
   * 缓存报告
   */
  set(
    examResultId: string,
    reportType: string,
    report: GeneratedReport,
    ttl = this.DEFAULT_TTL,
  ): void {
    const key = this.buildKey(examResultId, reportType);
    const cachedReport: CachedReport = {
      report,
      cachedAt: new Date(),
      expiresAt: new Date(Date.now() + ttl),
    };

    this.cache.set(key, cachedReport);
  }

  /**
   * 删除缓存
   */
  delete(examResultId: string, reportType?: string): void {
    if (reportType) {
      this.cache.delete(this.buildKey(examResultId, reportType));
    } else {
      // 删除所有相关的缓存
      const prefix = `${examResultId}:`;
      for (const key of this.cache.keys()) {
        if (key.startsWith(prefix)) {
          this.cache.delete(key);
        }
      }
    }
  }

  /**
   * 清空所有缓存
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * 获取缓存统计
   */
  getStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }

  // ==========================================================================
  // 私有方法
  // ==========================================================================

  private buildKey(examResultId: string, reportType: string): string {
    return `${examResultId}:${reportType}`;
  }
}
