import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as bcrypt from 'bcryptjs';
import {
  CreateTeacherDto,
  UpdateTeacherDto,
  QueryTeachersDto,
  ResetPasswordDto,
} from './dto';

@Injectable()
export class TeachersService {
  constructor(private readonly prisma: DatabaseService) {}

  /**
   * Get paginated teacher list with filters
   */
  async findAll(query: QueryTeachersDto) {
    const { page = 1, limit = 10, search, is_active } = query;

    const where: any = {
      deletedAt: null, // Exclude soft-deleted teachers
    };

    // Search filter
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { username: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Active status filter
    if (is_active !== undefined) {
      where.isActive = is_active;
    }

    // Get total count
    const total = await this.prisma.teacher.count({ where });

    // Get teachers with counts
    const teachers = await this.prisma.teacher.findMany({
      where,
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        phoneNumber: true,
        department: true,
        title: true,
        isActive: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            papers: true,
            exams: true,
          },
        },
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    return {
      success: true,
      data: teachers.map((teacher) => ({
        id: teacher.id,
        username: teacher.username,
        email: teacher.email,
        name: teacher.name,
        phone_number: teacher.phoneNumber,
        department: teacher.department,
        title: teacher.title,
        is_active: teacher.isActive,
        last_login_at: teacher.lastLoginAt,
        created_at: teacher.createdAt,
        updated_at: teacher.updatedAt,
        _count: teacher._count,
      })),
      meta: {
        page,
        limit,
        total,
        total_pages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get teacher statistics
   */
  async getStatistics() {
    const total = await this.prisma.teacher.count({
      where: { deletedAt: null },
    });

    const active = await this.prisma.teacher.count({
      where: { deletedAt: null, isActive: true },
    });

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentlyCreated = await this.prisma.teacher.count({
      where: {
        deletedAt: null,
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
    });

    return {
      success: true,
      data: {
        total_teachers: total,
        active_teachers: active,
        inactive_teachers: total - active,
        recently_created: recentlyCreated,
      },
    };
  }

  /**
   * Get teacher by ID
   */
  async findById(id: string) {
    const teacher = await this.prisma.teacher.findFirst({
      where: { id, deletedAt: null },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        phoneNumber: true,
        department: true,
        title: true,
        isActive: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            papers: true,
            exams: true,
          },
        },
      },
    });

    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    return {
      success: true,
      data: {
        id: teacher.id,
        username: teacher.username,
        email: teacher.email,
        name: teacher.name,
        phone_number: teacher.phoneNumber,
        department: teacher.department,
        title: teacher.title,
        is_active: teacher.isActive,
        last_login_at: teacher.lastLoginAt,
        created_at: teacher.createdAt,
        updated_at: teacher.updatedAt,
        _count: teacher._count,
      },
    };
  }

  /**
   * Create new teacher
   */
  async create(dto: CreateTeacherDto) {
    // Check if username already exists
    const existingUsername = await this.prisma.teacher.findUnique({
      where: { username: dto.username },
    });

    if (existingUsername) {
      throw new ConflictException('Username already exists');
    }

    // Check if email already exists
    const existingEmail = await this.prisma.teacher.findUnique({
      where: { email: dto.email },
    });

    if (existingEmail) {
      throw new ConflictException('Email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Create teacher
    const teacher = await this.prisma.teacher.create({
      data: {
        username: dto.username,
        email: dto.email,
        name: dto.name,
        password: hashedPassword,
        phoneNumber: dto.phone_number,
        department: dto.department,
        title: dto.title,
      },
    });

    return {
      success: true,
      data: {
        id: teacher.id,
        username: teacher.username,
        email: teacher.email,
        name: teacher.name,
        phone_number: teacher.phoneNumber,
        department: teacher.department,
        title: teacher.title,
        is_active: teacher.isActive,
        created_at: teacher.createdAt,
      },
    };
  }

  /**
   * Update teacher
   */
  async update(id: string, dto: UpdateTeacherDto) {
    // Check if teacher exists
    const teacher = await this.prisma.teacher.findFirst({
      where: { id, deletedAt: null },
    });

    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    // Check email uniqueness if changing
    if (dto.email && dto.email !== teacher.email) {
      const existingEmail = await this.prisma.teacher.findUnique({
        where: { email: dto.email },
      });

      if (existingEmail) {
        throw new ConflictException('Email already exists');
      }
    }

    const updateData: any = {
      email: dto.email,
      name: dto.name,
      phoneNumber: dto.phone_number,
      department: dto.department,
      title: dto.title,
      isActive: dto.is_active,
    };

    // Hash new password if provided
    if (dto.password) {
      updateData.password = await bcrypt.hash(dto.password, 10);
    }

    const updated = await this.prisma.teacher.update({
      where: { id },
      data: updateData,
    });

    return {
      success: true,
      data: {
        id: updated.id,
        username: updated.username,
        email: updated.email,
        name: updated.name,
        phone_number: updated.phoneNumber,
        department: updated.department,
        title: updated.title,
        is_active: updated.isActive,
        updated_at: updated.updatedAt,
      },
    };
  }

  /**
   * Delete teacher (soft delete)
   */
  async delete(id: string) {
    const teacher = await this.prisma.teacher.findFirst({
      where: { id, deletedAt: null },
    });

    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    // Check if teacher has exams or papers
    const hasData = await this.prisma.teacher.findFirst({
      where: { id },
      select: {
        _count: {
          select: { papers: true, exams: true },
        },
      },
    });

    if (hasData._count.papers > 0 || hasData._count.exams > 0) {
      throw new BadRequestException(
        'Cannot delete teacher with existing papers or exams'
      );
    }

    // Soft delete
    await this.prisma.teacher.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return {
      success: true,
      message: 'Teacher deleted successfully',
    };
  }

  /**
   * Toggle teacher active status
   */
  async toggleStatus(id: string) {
    const teacher = await this.prisma.teacher.findFirst({
      where: { id, deletedAt: null },
    });

    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    const updated = await this.prisma.teacher.update({
      where: { id },
      data: { isActive: !teacher.isActive },
    });

    return {
      success: true,
      data: {
        id: updated.id,
        is_active: updated.isActive,
      },
    };
  }

  /**
   * Reset teacher password
   */
  async resetPassword(id: string, dto: ResetPasswordDto) {
    const teacher = await this.prisma.teacher.findFirst({
      where: { id, deletedAt: null },
    });

    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    const hashedPassword = await bcrypt.hash(dto.new_password, 10);

    await this.prisma.teacher.update({
      where: { id },
      data: { password: hashedPassword },
    });

    return {
      success: true,
      message: 'Password reset successfully',
    };
  }
}
