import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TeachersService } from './teachers.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  CreateTeacherDto,
  UpdateTeacherDto,
  QueryTeachersDto,
  ResetPasswordDto,
} from './dto';

@ApiTags('teachers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all teachers with pagination and filters' })
  @ApiResponse({ status: 200, description: 'Teachers retrieved successfully' })
  async findAll(@Query() query: QueryTeachersDto) {
    return this.teachersService.findAll(query);
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Get teacher statistics' })
  @ApiResponse({ status: 200, description: 'Statistics retrieved successfully' })
  async getStatistics() {
    return this.teachersService.getStatistics();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get teacher by ID' })
  @ApiResponse({ status: 200, description: 'Teacher retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Teacher not found' })
  async findById(@Param('id') id: string) {
    return this.teachersService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new teacher' })
  @ApiResponse({ status: 201, description: 'Teacher created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 409, description: 'Username or email already exists' })
  async create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teachersService.create(createTeacherDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update teacher' })
  @ApiResponse({ status: 200, description: 'Teacher updated successfully' })
  @ApiResponse({ status: 404, description: 'Teacher not found' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  async update(
    @Param('id') id: string,
    @Body() updateTeacherDto: UpdateTeacherDto
  ) {
    return this.teachersService.update(id, updateTeacherDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete teacher (soft delete)' })
  @ApiResponse({ status: 200, description: 'Teacher deleted successfully' })
  @ApiResponse({ status: 400, description: 'Cannot delete teacher with existing data' })
  @ApiResponse({ status: 404, description: 'Teacher not found' })
  async delete(@Param('id') id: string) {
    return this.teachersService.delete(id);
  }

  @Patch(':id/status')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Toggle teacher active status' })
  @ApiResponse({ status: 200, description: 'Status toggled successfully' })
  @ApiResponse({ status: 404, description: 'Teacher not found' })
  async toggleStatus(@Param('id') id: string) {
    return this.teachersService.toggleStatus(id);
  }

  @Patch(':id/password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset teacher password' })
  @ApiResponse({ status: 200, description: 'Password reset successfully' })
  @ApiResponse({ status: 404, description: 'Teacher not found' })
  async resetPassword(
    @Param('id') id: string,
    @Body() resetPasswordDto: ResetPasswordDto
  ) {
    return this.teachersService.resetPassword(id, resetPasswordDto);
  }
}
