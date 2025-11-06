import { Controller, Get, Param, Post, Body, HttpCode, HttpStatus, Patch, Query, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AiService } from './ai.service';
import {
  AiSessionDto,
  AiAggregateDto,
  AiAnomalyDto,
  AiSessionMetricsDto,
  AiBatchCheckDto,
} from './dto/ai-response.dto';
import { AiBatchCheckRequestDto } from './dto/ai-request.dto';
import {
  CreateAiSessionDto,
  UpdateSessionStatusDto,
  UpdateSessionFileInfoDto,
  SaveAggregateDto,
  SaveAnomalyDto,
} from './dto/ai-write.dto';

@ApiTags('ai')
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  /**
   * 获取AI会话列表（支持状态筛选）
   * 用于AI实时大屏的学生监控模式
   */
  @Get('sessions')
  @ApiOperation({ summary: '获取AI会话列表（支持状态筛选）' })
  @ApiQuery({ name: 'status', required: false, description: '会话状态筛选（ACTIVE, COMPLETED等）' })
  @ApiResponse({ status: 200, description: '成功', type: [AiSessionDto] })
  async getSessions(@Query('status') status?: string) {
    const sessions = await this.aiService.getSessionsByStatus(status);
    return sessions.map((s) => ({
      ...this.transformSession(s),
      exam_result: s.examResult ? {
        id: s.examResult.id,
        student_name: s.examResult.participantName,
        student_id: s.examResult.participantId,
        exam_id: s.examResult.examId,
        exam_title: s.examResult.exam?.title,
      } : null,
    }));
  }

  /**
   * 根据考试结果ID获取AI会话详情
   */
  @Get('sessions/result/:resultId')
  @ApiOperation({ summary: '根据考试结果ID获取AI会话详情' })
  @ApiParam({ name: 'resultId', description: '考试结果ID' })
  @ApiResponse({ status: 200, description: '成功', type: AiSessionDto })
  @ApiResponse({ status: 404, description: '未找到AI会话' })
  async getSessionByResultId(@Param('resultId') resultId: string) {
    const session = await this.aiService.getSessionByResultId(resultId);
    return this.transformSession(session);
  }

  /**
   * 根据考试结果ID获取AI分析聚合数据
   */
  @Get('aggregates/result/:resultId')
  @ApiOperation({ summary: '根据考试结果ID获取AI分析聚合数据' })
  @ApiParam({ name: 'resultId', description: '考试结果ID' })
  @ApiResponse({ status: 200, description: '成功', type: AiAggregateDto })
  @ApiResponse({ status: 404, description: '未找到AI聚合数据' })
  async getAggregateByResultId(@Param('resultId') resultId: string) {
    const aggregate = await this.aiService.getAggregateByResultId(resultId);
    return this.transformAggregate(aggregate);
  }

  /**
   * 根据会话ID获取异常事件列表
   */
  @Get('anomalies/session/:sessionId')
  @ApiOperation({ summary: '根据会话ID获取异常事件列表' })
  @ApiParam({ name: 'sessionId', description: 'AI会话ID' })
  @ApiResponse({ status: 200, description: '成功', type: [AiAnomalyDto] })
  async getAnomaliesBySessionId(@Param('sessionId') sessionId: string) {
    const anomalies = await this.aiService.getAnomaliesBySessionId(sessionId);
    return anomalies.map((a) => this.transformAnomaly(a));
  }

  /**
   * 获取会话实时指标
   */
  @Get('metrics/session/:sessionId')
  @ApiOperation({ summary: '获取会话实时指标' })
  @ApiParam({ name: 'sessionId', description: 'AI会话ID' })
  @ApiResponse({ status: 200, description: '成功', type: AiSessionMetricsDto })
  @ApiResponse({ status: 404, description: '未找到AI会话' })
  async getSessionMetrics(@Param('sessionId') sessionId: string) {
    const metrics = await this.aiService.getSessionMetrics(sessionId);
    return {
      session_id: metrics.sessionId,
      status: metrics.status,
      duration: metrics.duration,
      anomaly_counts: metrics.anomalyCounts,
      aggregate: metrics.aggregate ? this.transformAggregate(metrics.aggregate) : null,
    };
  }

  /**
   * 检查结果是否有AI分析数据
   */
  @Get('check/result/:resultId')
  @ApiOperation({ summary: '检查结果是否有AI分析数据' })
  @ApiParam({ name: 'resultId', description: '考试结果ID' })
  @ApiResponse({ status: 200, description: '成功' })
  async checkAiAnalysis(@Param('resultId') resultId: string) {
    const hasAi = await this.aiService.hasAiAnalysis(resultId);
    return {
      result_id: resultId,
      has_ai_analysis: hasAi,
    };
  }

  /**
   * 批量检查多个结果的AI分析状态
   */
  @Post('check/batch')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '批量检查多个结果的AI分析状态' })
  @ApiResponse({ status: 200, description: '成功', type: AiBatchCheckDto })
  async batchCheckAiAnalysis(@Body() dto: AiBatchCheckRequestDto) {
    const statusMap = await this.aiService.batchCheckAiAnalysis(dto.result_ids);
    return {
      ai_status_map: statusMap,
    };
  }

  // --------------------------------------------------------------------------
  // 数据写入接口（供AI服务调用）
  // --------------------------------------------------------------------------

  /**
   * 创建AI会话
   */
  @Post('sessions')
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: '创建AI会话（AI服务专用）' })
  @ApiResponse({ status: 201, description: '会话创建成功' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  @ApiResponse({ status: 401, description: '未授权' })
  async createSession(@Body() dto: CreateAiSessionDto) {
    const session = await this.aiService.createSession(dto);
    return this.transformSession(session);
  }

  /**
   * 更新会话状态
   */
  @Patch('sessions/:sessionId/status')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: '更新会话状态（AI服务专用）' })
  @ApiParam({ name: 'sessionId', description: 'AI会话ID（Prisma ID）' })
  @ApiResponse({ status: 200, description: '更新成功' })
  @ApiResponse({ status: 404, description: '会话不存在' })
  async updateSessionStatus(
    @Param('sessionId') sessionId: string,
    @Body() dto: UpdateSessionStatusDto,
  ) {
    const session = await this.aiService.updateSessionStatus(sessionId, dto);
    return this.transformSession(session);
  }

  /**
   * 更新会话文件信息（新架构：JSON文件存储）
   */
  @Patch('sessions/:sessionId/file-info')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: '更新会话文件信息（AI服务专用）' })
  @ApiParam({ name: 'sessionId', description: 'AI会话ID（Prisma ID）' })
  @ApiResponse({ status: 200, description: '更新成功' })
  @ApiResponse({ status: 404, description: '会话不存在' })
  async updateSessionFileInfo(
    @Param('sessionId') sessionId: string,
    @Body() dto: UpdateSessionFileInfoDto,
  ) {
    const session = await this.aiService.updateSessionFileInfo(sessionId, dto);
    return this.transformSession(session);
  }

  /**
   * 删除AI会话及其关联数据（用于本机检测清理）
   */
  @Delete('sessions/:sessionId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '删除AI会话（仅限本机检测session）' })
  @ApiParam({ name: 'sessionId', description: 'AI会话ID（Prisma ID）' })
  @ApiResponse({ status: 200, description: '删除成功' })
  @ApiResponse({ status: 404, description: '会话不存在' })
  @ApiResponse({ status: 400, description: '不允许删除有examResultId的会话' })
  async deleteSession(@Param('sessionId') sessionId: string) {
    await this.aiService.deleteSession(sessionId);
    return {
      success: true,
      message: 'Session deleted successfully',
    };
  }

  /**
   * 保存聚合分析结果
   */
  @Post('aggregates')
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: '保存聚合分析结果（AI服务专用）' })
  @ApiResponse({ status: 201, description: '聚合结果保存成功' })
  async saveAggregate(@Body() dto: SaveAggregateDto) {
    const aggregate = await this.aiService.saveAggregate(dto);
    return this.transformAggregate(aggregate);
  }

  /**
   * 保存异常事件
   */
  @Post('anomalies')
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: '保存异常事件（AI服务专用）' })
  @ApiResponse({ status: 201, description: '异常事件保存成功' })
  async saveAnomaly(@Body() dto: SaveAnomalyDto) {
    const anomaly = await this.aiService.saveAnomaly(dto);
    return this.transformAnomaly(anomaly);
  }

  // --------------------------------------------------------------------------
  // 辅助方法：数据转换（Prisma模型 -> API响应DTO）
  // --------------------------------------------------------------------------

  private transformSession(session: any): AiSessionDto {
    return {
      id: session.id,
      session_id: session.sessionId,
      exam_result_id: session.examResultId,
      status: session.status,
      start_time: session.startTime,
      end_time: session.endTime,
      client_ip: session.clientIp,
      user_agent: session.userAgent,
      client_info: session.clientInfo,
      stream_info: session.streamInfo,
      // 新架构：文件存储信息
      checkpoint_file_path: session.checkpointFilePath,
      checkpoint_count: session.checkpointCount,
      file_size: session.fileSize,
      created_at: session.createdAt,
      updated_at: session.updatedAt,
    };
  }

  private transformAggregate(aggregate: any): AiAggregateDto {
    return {
      id: aggregate.id,
      session_id: aggregate.sessionId,
      exam_result_id: aggregate.examResultId,
      avg_valence: aggregate.avgValence,
      avg_arousal: aggregate.avgArousal,
      dominant_emotion: aggregate.dominantEmotion,
      emotion_distribution: aggregate.emotionDistribution,
      avg_attention: aggregate.avgAttention,
      attention_variability: aggregate.attentionVariability,
      distraction_events: aggregate.distractionEvents,
      engagement_score: aggregate.engagementScore,
      consistency_score: aggregate.consistencyScore,
      avg_heart_rate: aggregate.avgHeartRate,
      heart_rate_variability: aggregate.heartRateVariability,
      stress_indicators: aggregate.stressIndicators,
      data_quality: aggregate.dataQuality,
      analysis_confidence: aggregate.analysisConfidence,
      created_at: aggregate.createdAt,
      updated_at: aggregate.updatedAt,
    };
  }

  private transformAnomaly(anomaly: any): AiAnomalyDto {
    return {
      id: anomaly.id,
      session_id: anomaly.sessionId,
      type: anomaly.type,
      severity: anomaly.severity,
      timestamp: anomaly.timestamp,
      duration: anomaly.duration,
      confidence: anomaly.confidence,
      description: anomaly.description,
      metadata: anomaly.metadata,
      created_at: anomaly.createdAt,
    };
  }
}