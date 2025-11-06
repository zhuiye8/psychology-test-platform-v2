import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prisma, AiSessionStatus } from '@psychology/database';
import {
  CreateAiSessionDto,
  UpdateSessionStatusDto,
  UpdateSessionFileInfoDto,
  SaveAggregateDto,
  SaveAnomalyDto,
} from './dto/ai-write.dto';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(private readonly db: DatabaseService) {}

  /**
   * 根据考试结果ID获取AI会话
   */
  async getSessionByResultId(resultId: string) {
    const session = await this.db.aiSession.findFirst({
      where: {
        examResultId: resultId,
      },
      include: {
        anomalies: {
          orderBy: {
            timestamp: 'asc',
          },
        },
      },
    });

    if (!session) {
      throw new NotFoundException(`AI session not found for result ${resultId}`);
    }

    return session;
  }

  /**
   * 根据考试结果ID获取AI分析聚合数据
   */
  async getAggregateByResultId(resultId: string) {
    const aggregate = await this.db.aiAnalysisAggregate.findUnique({
      where: {
        examResultId: resultId,
      },
      include: {
        session: true,
      },
    });

    if (!aggregate) {
      throw new NotFoundException(`AI aggregate not found for result ${resultId}`);
    }

    return aggregate;
  }

  /**
   * 根据会话ID获取异常事件列表
   */
  async getAnomaliesBySessionId(sessionId: string) {
    return this.db.aiAnomaly.findMany({
      where: {
        sessionId,
      },
      orderBy: [
        { severity: 'desc' },
        { timestamp: 'asc' },
      ],
    });
  }

  /**
   * 计算会话实时指标
   */
  async getSessionMetrics(sessionId: string) {
    const session = await this.db.aiSession.findUnique({
      where: {
        id: sessionId,
      },
      include: {
        anomalies: true,
        aggregate: true,
      },
    });

    if (!session) {
      throw new NotFoundException(`AI session not found: ${sessionId}`);
    }

    // 计算会话时长
    const duration = session.endTime
      ? Math.floor((session.endTime.getTime() - session.startTime.getTime()) / 1000)
      : Math.floor((new Date().getTime() - session.startTime.getTime()) / 1000);

    // 统计异常事件
    const anomalyCounts = {
      total: session.anomalies.length,
      critical: session.anomalies.filter((a) => a.severity === 'CRITICAL').length,
      high: session.anomalies.filter((a) => a.severity === 'HIGH').length,
      medium: session.anomalies.filter((a) => a.severity === 'MEDIUM').length,
      low: session.anomalies.filter((a) => a.severity === 'LOW').length,
    };

    return {
      sessionId: session.id,
      status: session.status,
      duration,
      anomalyCounts,
      aggregate: session.aggregate || null,
    };
  }

  /**
   * 检查结果是否有AI分析数据
   *
   * ✅ 修复时序问题：查询aiSession表而不是aiAnalysisAggregate表
   * - aiSession在推流开始时就创建
   * - aiAnalysisAggregate在推流结束后才生成
   * - 只要有session就说明启用了AI监控，即使aggregate还未生成
   */
  async hasAiAnalysis(resultId: string): Promise<boolean> {
    const count = await this.db.aiSession.count({
      where: {
        examResultId: resultId,
      },
    });

    return count > 0;
  }

  /**
   * 批量检查多个结果的AI分析状态
   *
   * ✅ 修复：查询 aiSession 表而不是 aiAnalysisAggregate 表
   * 只要创建了session（包括 CREATED 状态），就应该在AI大屏显示
   */
  async batchCheckAiAnalysis(resultIds: string[]): Promise<Record<string, boolean>> {
    const sessions = await this.db.aiSession.findMany({
      where: {
        examResultId: {
          in: resultIds,
        },
      },
      select: {
        examResultId: true,
      },
    });

    const resultMap: Record<string, boolean> = {};
    resultIds.forEach((id) => {
      resultMap[id] = false;
    });

    sessions.forEach((session) => {
      if (session.examResultId) {
        resultMap[session.examResultId] = true;
      }
    });

    return resultMap;
  }

  // ==========================================================================
  // 数据写入方法（供AI服务调用）
  // ==========================================================================

  /**
   * 创建AI会话（前端调用）
   *
   * ✅ 简化状态管理：直接创建为ACTIVE状态
   * WebRTC推流建立 = 会话活跃 = AI分析中（统一为ACTIVE）
   * ✅ 使用upsert支持学生重新参加考试（同一examResultId重新开始）
   */
  async createSession(dto: CreateAiSessionDto) {
    try {
      this.logger.log(`[createSession] 开始创建session: ${dto.session_id}`);
      this.logger.log(`[createSession] exam_result_id: ${dto.exam_result_id}`);
      this.logger.log(`[createSession] stream_name: ${dto.stream_info?.stream_name || 'N/A'}`);
      this.logger.log(`[createSession] participant_id: ${dto.stream_info?.participant_id || 'N/A'}`);

      const session = await this.db.aiSession.upsert({
        where: { sessionId: dto.session_id },
        update: {
          // 如果已存在，重置会话信息（学生重新开始考试）
          examResultId: dto.exam_result_id,
          clientInfo: dto.client_info as any,
          streamInfo: dto.stream_info as any,
          status: AiSessionStatus.ACTIVE,
          startTime: new Date(),
          endTime: null,
        },
        create: {
          // 如果不存在，创建新会话
          sessionId: dto.session_id,
          examResultId: dto.exam_result_id,
          clientInfo: dto.client_info as any,
          streamInfo: dto.stream_info as any,
          status: AiSessionStatus.ACTIVE,
          startTime: new Date(),
        },
      });

      this.logger.log(`[createSession] ✅ Session创建成功:`);
      this.logger.log(`[createSession]   - database id: ${session.id}`);
      this.logger.log(`[createSession]   - sessionId: ${session.sessionId}`);
      this.logger.log(`[createSession]   - examResultId: ${session.examResultId}`);
      this.logger.log(`[createSession]   - status: ${session.status}`);

      return session;
    } catch (error) {
      this.logger.error(`[createSession] ❌ Session创建失败:`, {
        errorMessage: error.message,
        errorCode: error.code,
        errorName: error.name,
        sessionId: dto.session_id,
        examResultId: dto.exam_result_id,
        streamInfo: dto.stream_info,
        clientInfo: dto.client_info,
      });
      throw error;
    }
  }

  /**
   * 更新会话状态
   */
  async updateSessionStatus(sessionId: string, dto: UpdateSessionStatusDto) {
    const session = await this.db.aiSession.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      throw new NotFoundException(`AI session not found: ${sessionId}`);
    }

    return this.db.aiSession.update({
      where: { id: sessionId },
      data: {
        status: dto.status as AiSessionStatus,
        endTime: dto.end_time ? new Date(dto.end_time) : undefined,
      },
    });
  }

  /**
   * 更新会话文件信息（新架构：JSON文件存储）
   */
  async updateSessionFileInfo(sessionId: string, dto: UpdateSessionFileInfoDto) {
    const session = await this.db.aiSession.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      throw new NotFoundException(`AI session not found: ${sessionId}`);
    }

    return this.db.aiSession.update({
      where: { id: sessionId },
      data: {
        checkpointFilePath: dto.checkpoint_file_path,
        checkpointCount: dto.checkpoint_count,
        fileSize: dto.file_size,
      },
    });
  }

  /**
   * 保存聚合分析结果
   */
  async saveAggregate(dto: SaveAggregateDto) {
    // 先查找会话ID
    const session = await this.db.aiSession.findFirst({
      where: { sessionId: dto.session_id },
      select: { id: true },
    });

    if (!session) {
      throw new NotFoundException(`AI session not found: ${dto.session_id}`);
    }

    return this.db.aiAnalysisAggregate.create({
      data: {
        sessionId: session.id,
        examResultId: dto.exam_result_id,
        // 情绪分析
        avgValence: dto.avg_valence,
        avgArousal: dto.avg_arousal,
        dominantEmotion: dto.dominant_emotion,
        emotionDistribution: dto.emotion_distribution as any,
        // 注意力分析
        avgAttention: dto.avg_attention,
        attentionVariability: dto.attention_variability,
        distractionEvents: dto.distraction_events,
        engagementScore: dto.engagement_score,
        consistencyScore: dto.consistency_score,
        // 心率分析
        avgHeartRate: dto.avg_heart_rate,
        heartRateVariability: dto.heart_rate_variability,
        stressIndicators: dto.stress_indicators as any,
        // 数据质量
        dataQuality: dto.data_quality,
        analysisConfidence: dto.analysis_confidence,
      },
    });
  }

  /**
   * 保存异常事件
   */
  async saveAnomaly(dto: SaveAnomalyDto) {
    // 先查找会话ID
    const session = await this.db.aiSession.findFirst({
      where: { sessionId: dto.session_id },
      select: { id: true },
    });

    if (!session) {
      throw new NotFoundException(`AI session not found: ${dto.session_id}`);
    }

    return this.db.aiAnomaly.create({
      data: {
        sessionId: session.id,
        type: dto.type,
        severity: dto.severity,
        timestamp: new Date(dto.timestamp),
        duration: dto.duration,
        confidence: dto.confidence,
        description: dto.description,
        metadata: dto.metadata as any,
      },
    });
  }

  /**
   * 删除AI会话及其关联数据（用于本机检测清理）
   *
   * ⚠️ 注意：此方法会级联删除关联的aggregate和anomalies数据
   * 仅用于清理本机检测session（examResultId为null）
   */
  async deleteSession(sessionId: string) {
    const session = await this.db.aiSession.findUnique({
      where: { id: sessionId },
      select: { examResultId: true },
    });

    if (!session) {
      throw new NotFoundException(`AI session not found: ${sessionId}`);
    }

    // 安全检查：只允许删除本机检测session（examResultId为null）
    if (session.examResultId !== null) {
      throw new Error(`Cannot delete session with examResultId. Use cleanup API instead.`);
    }

    // 级联删除：Prisma会自动删除关联的aggregate和anomalies（通过onDelete: Cascade）
    return this.db.aiSession.delete({
      where: { id: sessionId },
    });
  }

  // ==========================================================================
  // AI实时大屏专用接口
  // ==========================================================================

  /**
   * 获取活跃AI会话列表（支持状态筛选）
   * 用于AI实时大屏的学生监控模式
   */
  async getSessionsByStatus(statusStr?: string): Promise<Prisma.AiSessionGetPayload<{
    include: {
      examResult: {
        select: {
          id: true;
          participantName: true;
          participantId: true;
          examId: true;
          exam: {
            select: {
              id: true;
              title: true;
            };
          };
        };
      };
      aggregate: true;
    };
  }>[]> {
    // ✅ 简化验证：现在ACTIVE/COMPLETED/FAILED都是真实的enum值
    if (statusStr && !Object.values(AiSessionStatus).includes(statusStr as any)) {
      throw new Error(`Invalid status: ${statusStr}. Valid values: ACTIVE, COMPLETED, FAILED`);
    }

    // ✅ 修复：过滤本机检测session（examResultId为null的记录）
    return this.db.aiSession.findMany({
      where: {
        ...(statusStr && { status: statusStr as AiSessionStatus }),
        examResultId: { not: null }, // 只返回有examResult的session
      },
      include: {
        examResult: {
          select: {
            id: true,
            participantName: true,
            participantId: true,
            examId: true,
            exam: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
        aggregate: true,
      },
      orderBy: { startTime: 'desc' },
      take: 50, // 最多返回50个会话
    });
  }
}