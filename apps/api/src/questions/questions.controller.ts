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
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QuestionsService } from './questions.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateQuestionDto, UpdateQuestionDto, BatchImportQuestionsDto } from './dto';

@ApiTags('questions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get('paper/:paperId')
  @ApiOperation({ summary: 'Get all questions for a paper' })
  @ApiResponse({ status: 200, description: 'Questions retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Paper not found' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  async findAllByPaper(@Param('paperId') paperId: string, @Request() req) {
    return this.questionsService.findAllByPaper(paperId, req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get question by ID' })
  @ApiResponse({ status: 200, description: 'Question retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Question not found' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  async findById(@Param('id') id: string, @Request() req) {
    return this.questionsService.findById(id, req.user.id);
  }

  @Post('paper/:paperId')
  @ApiOperation({ summary: 'Create new question' })
  @ApiResponse({ status: 201, description: 'Question created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 404, description: 'Paper not found' })
  async create(
    @Param('paperId') paperId: string,
    @Body() createQuestionDto: CreateQuestionDto,
    @Request() req
  ) {
    return this.questionsService.create(paperId, req.user.id, createQuestionDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update question' })
  @ApiResponse({ status: 200, description: 'Question updated successfully' })
  @ApiResponse({ status: 404, description: 'Question not found' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  async update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
    @Request() req
  ) {
    return this.questionsService.update(id, req.user.id, updateQuestionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete question (soft delete)' })
  @ApiResponse({ status: 200, description: 'Question deleted successfully' })
  @ApiResponse({ status: 404, description: 'Question not found' })
  async delete(@Param('id') id: string, @Request() req) {
    return this.questionsService.delete(id, req.user.id);
  }

  @Post('bulk-delete')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Bulk delete questions' })
  @ApiResponse({ status: 200, description: 'Questions deleted successfully' })
  async bulkDelete(@Body() body: { ids: string[] }, @Request() req) {
    return this.questionsService.bulkDelete(body.ids, req.user.id);
  }

  @Post('paper/:paperId/reorder')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reorder questions in a paper' })
  @ApiResponse({ status: 200, description: 'Questions reordered successfully' })
  async reorder(
    @Param('paperId') paperId: string,
    @Body() body: { questionIds: string[] },
    @Request() req
  ) {
    return this.questionsService.reorder(paperId, req.user.id, body.questionIds);
  }

  @Post(':id/duplicate')
  @ApiOperation({ summary: 'Duplicate a question' })
  @ApiResponse({ status: 201, description: 'Question duplicated successfully' })
  @ApiResponse({ status: 404, description: 'Question not found' })
  async duplicate(@Param('id') id: string, @Request() req) {
    return this.questionsService.duplicate(id, req.user.id);
  }

  @Post('paper/:paperId/batch-import')
  @ApiOperation({ summary: 'Batch import questions from JSON' })
  @ApiResponse({ status: 201, description: 'Questions imported successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 404, description: 'Paper not found' })
  async batchImport(
    @Param('paperId') paperId: string,
    @Body() batchImportDto: BatchImportQuestionsDto,
    @Request() req
  ) {
    return this.questionsService.batchImport(paperId, req.user.id, batchImportDto);
  }
}
