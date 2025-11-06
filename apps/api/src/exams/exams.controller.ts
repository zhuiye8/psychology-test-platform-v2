import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  Query,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ExamsService } from './exams.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateExamDto, UpdateExamDto, QueryExamsDto } from './dto';

@ApiTags('exams')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all exams with pagination and filters' })
  @ApiResponse({ status: 200, description: 'Exams retrieved successfully' })
  async findAll(@Query() query: QueryExamsDto, @Request() req) {
    return this.examsService.findAll(req.user.id, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get exam by ID' })
  @ApiResponse({ status: 200, description: 'Exam retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Exam not found' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  async findById(@Param('id') id: string, @Request() req) {
    return this.examsService.findById(id, req.user.id);
  }

  @Get(':id/statistics')
  @ApiOperation({ summary: 'Get exam statistics' })
  @ApiResponse({ status: 200, description: 'Statistics retrieved successfully' })
  async getStatistics(@Param('id') id: string, @Request() req) {
    return this.examsService.getStatistics(id, req.user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new exam' })
  @ApiResponse({ status: 201, description: 'Exam created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 404, description: 'Paper not found' })
  async create(@Body() createExamDto: CreateExamDto, @Request() req) {
    return this.examsService.create(req.user.id, createExamDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update exam (only DRAFT exams)' })
  @ApiResponse({ status: 200, description: 'Exam updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input or exam status' })
  @ApiResponse({ status: 404, description: 'Exam not found' })
  async update(
    @Param('id') id: string,
    @Body() updateExamDto: UpdateExamDto,
    @Request() req
  ) {
    return this.examsService.update(id, req.user.id, updateExamDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete exam (soft delete, only non-PUBLISHED exams)' })
  @ApiResponse({ status: 200, description: 'Exam deleted successfully' })
  @ApiResponse({ status: 400, description: 'Cannot delete published exam' })
  async delete(@Param('id') id: string, @Request() req) {
    return this.examsService.delete(id, req.user.id);
  }

  // ===== Status Management Endpoints =====

  @Post(':id/publish')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Publish exam (DRAFT → PUBLISHED)' })
  @ApiResponse({ status: 200, description: 'Exam published successfully' })
  @ApiResponse({ status: 400, description: 'Invalid status transition or no questions' })
  async publish(@Param('id') id: string, @Request() req) {
    return this.examsService.publish(id, req.user.id);
  }

  @Post(':id/mark-success')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mark exam as successful (PUBLISHED → SUCCESS)' })
  @ApiResponse({ status: 200, description: 'Exam marked as success' })
  @ApiResponse({ status: 400, description: 'Invalid status transition' })
  async markSuccess(@Param('id') id: string, @Request() req) {
    return this.examsService.markSuccess(id, req.user.id);
  }

  @Post(':id/stop')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Stop exam and return to draft (PUBLISHED → DRAFT)' })
  @ApiResponse({ status: 200, description: 'Exam stopped successfully' })
  @ApiResponse({ status: 400, description: 'Invalid status transition' })
  async stop(@Param('id') id: string, @Request() req) {
    return this.examsService.stop(id, req.user.id);
  }

  @Post(':id/archive')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Archive exam (SUCCESS → ARCHIVED)' })
  @ApiResponse({ status: 200, description: 'Exam archived successfully' })
  @ApiResponse({ status: 400, description: 'Invalid status transition' })
  async archive(@Param('id') id: string, @Request() req) {
    return this.examsService.archive(id, req.user.id);
  }

  @Post(':id/restore')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Restore exam from archive (ARCHIVED → SUCCESS)' })
  @ApiResponse({ status: 200, description: 'Exam restored successfully' })
  @ApiResponse({ status: 400, description: 'Invalid status transition' })
  async restore(@Param('id') id: string, @Request() req) {
    return this.examsService.restore(id, req.user.id);
  }

  // ===== Student Access Management =====

  @Post(':id/students')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Add allowed students to exam' })
  @ApiResponse({ status: 200, description: 'Students added successfully' })
  async addAllowedStudents(
    @Param('id') id: string,
    @Body() body: { studentIds: string[] },
    @Request() req
  ) {
    return this.examsService.addAllowedStudents(id, req.user.id, body.studentIds);
  }

  @Delete(':id/students')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remove allowed students from exam' })
  @ApiResponse({ status: 200, description: 'Students removed successfully' })
  async removeAllowedStudents(
    @Param('id') id: string,
    @Body() body: { studentIds: string[] },
    @Request() req
  ) {
    return this.examsService.removeAllowedStudents(id, req.user.id, body.studentIds);
  }
}
