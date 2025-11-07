import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  Query,
  HttpCode,
  HttpStatus,
  Ip,
  Headers,
  Patch,
  StreamableFile,
  Header,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResultsService } from './results.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { StartExamDto, SubmitAnswerDto, SubmitExamDto, QueryResultsDto } from './dto';

@ApiTags('results')
@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  // ===== Public Student Endpoints (No Auth Required) =====

  @Post('exam/:examId/start')
  @ApiOperation({ summary: 'Start exam (student endpoint, public)' })
  @ApiResponse({ status: 201, description: 'Exam started successfully' })
  @ApiResponse({ status: 400, description: 'Exam not available or validation failed' })
  @ApiResponse({ status: 403, description: 'Access denied (wrong code or not in whitelist)' })
  async startExam(
    @Param('examId') examId: string,
    @Body() startExamDto: StartExamDto,
    @Ip() ipAddress: string,
    @Headers('user-agent') userAgent: string,
  ) {
    return this.resultsService.startExam(examId, startExamDto, ipAddress, userAgent);
  }

  @Post(':examResultId/answer')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Submit single answer (student endpoint, public)' })
  @ApiResponse({ status: 200, description: 'Answer submitted successfully' })
  @ApiResponse({ status: 400, description: 'Exam already submitted or validation failed' })
  async submitAnswer(
    @Param('examResultId') examResultId: string,
    @Body() submitAnswerDto: SubmitAnswerDto,
  ) {
    return this.resultsService.submitAnswer(examResultId, submitAnswerDto);
  }

  @Post(':examResultId/submit')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Submit entire exam (student endpoint, public)' })
  @ApiResponse({ status: 200, description: 'Exam submitted successfully with auto-scoring' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  async submitExam(
    @Param('examResultId') examResultId: string,
    @Body() submitExamDto: SubmitExamDto,
  ) {
    return this.resultsService.submitExam(examResultId, submitExamDto);
  }

  @Delete(':examResultId/cleanup')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cleanup exam session (student endpoint, public)' })
  @ApiResponse({ status: 200, description: 'Session cleaned successfully' })
  @ApiResponse({ status: 400, description: 'Cannot cleanup completed exam' })
  async cleanupExamSession(@Param('examResultId') examResultId: string) {
    return this.resultsService.cleanupExamSession(examResultId);
  }

  // ===== Teacher Endpoints (Auth Required) =====

  @Get('stats')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get results statistics (teacher endpoint)' })
  @ApiResponse({ status: 200, description: 'Statistics retrieved successfully' })
  async getStats(@Query('examId') examId: string | undefined, @Request() req) {
    return this.resultsService.getStats(req.user.id, examId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all exam results (teacher endpoint)' })
  @ApiResponse({ status: 200, description: 'Results retrieved successfully' })
  async findAll(@Query() query: QueryResultsDto, @Request() req) {
    return this.resultsService.findAll(req.user.id, query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get exam result detail (teacher endpoint)' })
  @ApiResponse({ status: 200, description: 'Result retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Result not found' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  async findById(@Param('id') id: string, @Request() req) {
    return this.resultsService.findById(id, req.user.id);
  }

  @Get('exam/:examId/statistics')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get exam statistics (teacher endpoint)' })
  @ApiResponse({ status: 200, description: 'Statistics retrieved successfully' })
  async getExamStatistics(@Param('examId') examId: string, @Request() req) {
    return this.resultsService.getExamStatistics(examId, req.user.id);
  }

  @Get('export')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  @ApiOperation({ summary: 'Export results to Excel (teacher endpoint)' })
  @ApiResponse({ status: 200, description: 'Excel file generated successfully' })
  async exportResults(@Query() query: QueryResultsDto, @Request() req): Promise<StreamableFile> {
    return this.resultsService.exportResultsToExcel(req.user.id, query);
  }

  @Patch(':id/score')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update manual score for a question (teacher endpoint)' })
  @ApiResponse({ status: 200, description: 'Score updated successfully' })
  async updateScore(
    @Param('id') id: string,
    @Body() body: { questionId: string; points: number },
    @Request() req,
  ) {
    return this.resultsService.updateScore(id, req.user.id, body.questionId, body.points);
  }

  @Post(':id/flag-invalid')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Flag result as invalid (teacher endpoint)' })
  @ApiResponse({ status: 200, description: 'Result flagged as invalid' })
  async flagAsInvalid(@Param('id') id: string, @Request() req) {
    return this.resultsService.flagAsInvalid(id, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete exam result (teacher endpoint)' })
  @ApiResponse({ status: 200, description: 'Result deleted successfully' })
  async delete(@Param('id') id: string, @Request() req) {
    return this.resultsService.delete(id, req.user.id);
  }
}
