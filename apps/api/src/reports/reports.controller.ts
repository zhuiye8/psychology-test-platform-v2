import {
  Controller,
  Get,
  Post,
  Param,
  HttpCode,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { ReportsService } from './reports.service';

/**
 * AI报告生成控制器
 *
 * 端点：
 * - POST /api/reports/:resultId/generate - 生成报告
 * - GET /api/reports/:resultId - 获取生成的报告
 */
@ApiTags('reports')
@Controller('reports')
export class ReportsController {
  private readonly logger = new Logger(ReportsController.name);

  constructor(private readonly reportsService: ReportsService) {}

  /**
   * 生成AI分析报告
   */
  @Post(':resultId/generate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '生成AI分析报告',
    description: '基于考试结果、维度得分和AI分析数据生成心理测评报告',
  })
  @ApiParam({
    name: 'resultId',
    description: '考试结果ID',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: '报告生成成功',
  })
  @ApiResponse({
    status: 404,
    description: '考试结果不存在',
  })
  @ApiResponse({
    status: 500,
    description: 'LLM调用失败或报告生成失败',
  })
  async generateReport(@Param('resultId') resultId: string) {
    this.logger.log(`生成报告请求: resultId=${resultId}`);
    const report = await this.reportsService.generateReport(resultId);
    this.logger.log(`报告生成成功: resultId=${resultId}`);
    return report;
  }

  /**
   * 获取已生成的报告
   */
  @Get(':resultId')
  @ApiOperation({
    summary: '获取已生成的报告',
    description: '查询考试结果的AI分析报告',
  })
  @ApiParam({
    name: 'resultId',
    description: '考试结果ID',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: '获取成功',
  })
  @ApiResponse({
    status: 404,
    description: '报告不存在',
  })
  async getReport(@Param('resultId') resultId: string) {
    this.logger.log(`获取报告请求: resultId=${resultId}`);
    return this.reportsService.getReport(resultId);
  }
}
