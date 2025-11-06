/**
 * AI分析控制器
 *
 * 职责：
 * - LLM报告生成API端点
 * - 报告查询和进度跟踪
 * - 缓存管理
 */

import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AiAnalysisService } from './ai-analysis.service';
import { GenerateReportDto } from './dto';

@ApiTags('ai-analysis')
@Controller('ai-analysis')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AiAnalysisController {
  constructor(private readonly aiAnalysisService: AiAnalysisService) {}

  /**
   * 生成LLM心理分析报告
   */
  @Post('reports/generate/:examResultId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '生成LLM心理分析报告（教师端）' })
  @ApiResponse({ status: 200, description: '报告生成成功' })
  @ApiResponse({ status: 400, description: 'LLM服务未配置或参数错误' })
  @ApiResponse({ status: 404, description: '考试结果未找到' })
  async generateReport(
    @Param('examResultId') examResultId: string,
    @Body() dto: GenerateReportDto,
    @Request() req,
  ) {
    try {
      const report = await this.aiAnalysisService.generateLLMReport({
        examResultId,
        reportType: dto.reportType,
        model: dto.model,
      });

      return {
        success: true,
        data: report,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      // 捕获checkpoint文件不存在的错误，转换为友好提示
      if (error instanceof NotFoundException) {
        throw new BadRequestException(
          '该考试结果没有AI监控数据，无法生成报告。请确保：1) 考试已启用AI监控 2) 学生已完成考试 3) AI分析数据已生成',
        );
      }
      // 其他错误继续抛出
      throw error;
    }
  }

  /**
   * 获取报告生成进度
   */
  @Get('reports/:examResultId/progress')
  @ApiOperation({ summary: '获取报告生成进度（教师端）' })
  @ApiResponse({ status: 200, description: '进度查询成功' })
  async getReportProgress(
    @Param('examResultId') examResultId: string,
    @Request() req,
  ) {
    const progress = this.aiAnalysisService.getLLMReportProgress(examResultId);

    return {
      success: true,
      data: progress || { status: 'not_started', progress: 0 },
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * 清除报告缓存
   */
  @Delete('cache/:examResultId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '清除指定结果的报告缓存（教师端）' })
  @ApiResponse({ status: 200, description: '缓存清除成功' })
  async clearCache(
    @Param('examResultId') examResultId: string,
    @Request() req,
  ) {
    this.aiAnalysisService.clearCache(examResultId);

    return {
      success: true,
      message: '缓存已清除',
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * 生成异常报告（无LLM）
   */
  @Get('anomalies/:examResultId')
  @ApiOperation({ summary: '获取异常检测报告（教师端）' })
  @ApiResponse({ status: 200, description: '异常报告获取成功' })
  @ApiResponse({ status: 404, description: '考试结果未找到' })
  async getAnomalyReport(
    @Param('examResultId') examResultId: string,
    @Request() req,
  ) {
    const report = await this.aiAnalysisService.generateAnomalyReport(examResultId);

    return {
      success: true,
      data: report,
      timestamp: new Date().toISOString(),
    };
  }
}
