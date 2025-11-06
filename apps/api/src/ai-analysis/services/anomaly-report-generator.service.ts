/**
 * 异常报告生成服务
 *
 * 职责：
 * - 整合异常分析结果
 * - 生成完整的异常报告
 * - 提供摘要和整体评估
 */

import { Injectable } from '@nestjs/common';
import { AnomalyContextBuilderService } from './anomaly-context-builder.service';
import { AnomalyAnalyzerService } from './anomaly-analyzer.service';
import {
  AnomalyReport,
  AnomalyType,
  AnomalySeverity,
} from '../types/anomaly.types';

@Injectable()
export class AnomalyReportGeneratorService {
  constructor(
    private readonly contextBuilder: AnomalyContextBuilderService,
    private readonly analyzer: AnomalyAnalyzerService,
  ) {}

  // ==========================================================================
  // 公开方法
  // ==========================================================================

  /**
   * 生成完整的异常报告
   */
  async generateReport(examResultId: string): Promise<AnomalyReport> {
    // 1. 构建所有异常的上下文
    const contexts = await this.contextBuilder.buildContexts(examResultId);

    if (contexts.length === 0) {
      return this.generateEmptyReport(examResultId);
    }

    // 2. 分析所有异常
    const analyses = this.analyzer.analyzeAnomalies(contexts);

    // 3. 识别模式
    const patterns = this.analyzer.identifyPatterns(contexts);

    // 4. 生成统计摘要
    const summary = this.generateSummary(contexts);

    // 5. 整体评估
    const overallAssessment = this.generateOverallAssessment(
      analyses,
      patterns,
    );

    return {
      examResultId,
      generatedAt: new Date(),
      summary,
      analyses,
      patterns,
      overallAssessment,
    };
  }

  // ==========================================================================
  // 私有方法
  // ==========================================================================

  /**
   * 生成空报告（无异常情况）
   */
  private generateEmptyReport(examResultId: string): AnomalyReport {
    return {
      examResultId,
      generatedAt: new Date(),
      summary: {
        totalAnomalies: 0,
        byType: {} as any,
        bySeverity: {} as any,
        criticalCount: 0,
      },
      analyses: [],
      patterns: [],
      overallAssessment: {
        riskLevel: 'low',
        keyFindings: ['未检测到任何异常行为'],
        urgentActions: [],
      },
    };
  }

  /**
   * 生成统计摘要
   */
  private generateSummary(contexts: any[]) {
    const byType: Partial<Record<AnomalyType, number>> = {};
    const bySeverity: Partial<Record<AnomalySeverity, number>> = {};
    let criticalCount = 0;

    contexts.forEach((ctx) => {
      // 按类型统计
      byType[ctx.type] = (byType[ctx.type] || 0) + 1;

      // 按严重程度统计
      bySeverity[ctx.severity] = (bySeverity[ctx.severity] || 0) + 1;

      // 统计严重异常
      if (ctx.severity === 'CRITICAL') criticalCount++;
    });

    return {
      totalAnomalies: contexts.length,
      byType: byType as Record<AnomalyType, number>,
      bySeverity: bySeverity as Record<AnomalySeverity, number>,
      criticalCount,
    };
  }

  /**
   * 生成整体评估
   */
  private generateOverallAssessment(analyses: any[], patterns: any[]) {
    // 计算整体风险等级
    const riskLevels = analyses.map((a) => a.riskLevel);
    const overallRisk = this.calculateOverallRisk(riskLevels);

    // 提取关键发现
    const keyFindings = this.extractKeyFindings(analyses, patterns);

    // 生成紧急行动项
    const urgentActions = this.generateUrgentActions(analyses, overallRisk);

    return {
      riskLevel: overallRisk,
      keyFindings,
      urgentActions,
    };
  }

  /**
   * 计算整体风险等级
   */
  private calculateOverallRisk(
    riskLevels: string[],
  ): 'low' | 'medium' | 'high' | 'critical' {
    if (riskLevels.includes('critical')) return 'critical';

    const highCount = riskLevels.filter((r) => r === 'high').length;
    if (highCount >= 3) return 'critical';
    if (highCount >= 1) return 'high';

    const mediumCount = riskLevels.filter((r) => r === 'medium').length;
    if (mediumCount >= 3) return 'high';
    if (mediumCount >= 1) return 'medium';

    return 'low';
  }

  /**
   * 提取关键发现
   */
  private extractKeyFindings(analyses: any[], patterns: any[]): string[] {
    const findings: string[] = [];

    // 从异常分析中提取
    const criticalAnalyses = analyses.filter(
      (a) => a.riskLevel === 'critical' || a.riskLevel === 'high',
    );

    if (criticalAnalyses.length > 0) {
      findings.push(
        `检测到${criticalAnalyses.length}个高风险异常事件，需要重点关注`,
      );
    }

    // 从模式中提取
    patterns.forEach((pattern) => {
      findings.push(pattern.description);
    });

    // 异常类型分析
    const emotionalSpikes = analyses.filter(
      (a) => a.anomaly.type === 'EMOTIONAL_SPIKE',
    );
    if (emotionalSpikes.length > 0) {
      findings.push(
        `发生${emotionalSpikes.length}次情绪剧烈波动，建议进行心理辅导`,
      );
    }

    const multipleFaces = analyses.filter(
      (a) => a.anomaly.type === 'MULTIPLE_FACES',
    );
    if (multipleFaces.length > 0) {
      findings.push(
        `检测到${multipleFaces.length}次多人入镜，可能存在违规行为`,
      );
    }

    return findings;
  }

  /**
   * 生成紧急行动项
   */
  private generateUrgentActions(
    analyses: any[],
    overallRisk: string,
  ): string[] {
    const actions: string[] = [];

    if (overallRisk === 'critical') {
      actions.push('立即联系学生进行一对一面谈');
      actions.push('通知班主任和心理辅导老师');
    }

    // 收集所有critical和high风险的建议
    analyses
      .filter((a) => a.riskLevel === 'critical' || a.riskLevel === 'high')
      .forEach((a) => {
        a.recommendations.forEach((rec: string) => {
          if (!actions.includes(rec)) {
            actions.push(rec);
          }
        });
      });

    return actions;
  }
}
