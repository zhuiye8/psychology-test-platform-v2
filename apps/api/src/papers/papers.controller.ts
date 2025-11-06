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
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { PapersService } from './papers.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePaperDto, UpdatePaperDto, QueryPapersDto } from './dto';

@ApiTags('papers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('papers')
export class PapersController {
  constructor(private readonly papersService: PapersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all papers with pagination and search' })
  @ApiResponse({ status: 200, description: 'Papers retrieved successfully' })
  async findAll(@Query() query: QueryPapersDto, @Request() req) {
    return this.papersService.findAll(req.user.id, query);
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get all paper categories for current teacher' })
  @ApiResponse({ status: 200, description: 'Categories retrieved successfully' })
  async getCategories(@Request() req) {
    return this.papersService.getCategories(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get paper by ID' })
  @ApiResponse({ status: 200, description: 'Paper retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Paper not found' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  async findById(@Param('id') id: string, @Request() req) {
    return this.papersService.findById(id, req.user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new paper' })
  @ApiResponse({ status: 201, description: 'Paper created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async create(@Body() createPaperDto: CreatePaperDto, @Request() req) {
    return this.papersService.create(req.user.id, createPaperDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update paper' })
  @ApiResponse({ status: 200, description: 'Paper updated successfully' })
  @ApiResponse({ status: 404, description: 'Paper not found' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async update(
    @Param('id') id: string,
    @Body() updatePaperDto: UpdatePaperDto,
    @Request() req
  ) {
    return this.papersService.update(id, req.user.id, updatePaperDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete paper (soft delete)' })
  @ApiResponse({ status: 200, description: 'Paper deleted successfully' })
  @ApiResponse({ status: 404, description: 'Paper not found' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  async delete(@Param('id') id: string, @Request() req) {
    return this.papersService.delete(id, req.user.id);
  }

  @Post('bulk-delete')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Bulk delete papers' })
  @ApiResponse({ status: 200, description: 'Papers deleted successfully' })
  @ApiResponse({ status: 403, description: 'Some papers not found or access denied' })
  async bulkDelete(@Body() body: { ids: string[] }, @Request() req) {
    return this.papersService.bulkDelete(body.ids, req.user.id);
  }

  @Post(':id/duplicate')
  @ApiOperation({ summary: 'Duplicate paper with all questions' })
  @ApiResponse({ status: 201, description: 'Paper duplicated successfully' })
  @ApiResponse({ status: 404, description: 'Paper not found' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  async duplicate(@Param('id') id: string, @Request() req) {
    return this.papersService.duplicate(id, req.user.id);
  }
}