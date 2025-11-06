import { Injectable, BadRequestException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as bcrypt from 'bcryptjs';

// DTO types for internal use
interface UpdateProfileData {
  name?: string;
  email?: string;
  title?: string;
  phone?: string;
  phoneNumber?: string;
  department?: string;
}

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  async findByUsername(username: string) {
    return this.db.teacher.findUnique({
      where: { username, deletedAt: null },
    });
  }

  async findById(id: string) {
    return this.db.teacher.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async findByEmail(email: string) {
    return this.db.teacher.findUnique({
      where: { email, deletedAt: null },
    });
  }

  async updateLastLogin(id: string) {
    return this.db.teacher.update({
      where: { id },
      data: { lastLoginAt: new Date() },
    });
  }

  async updateProfile(id: string, data: UpdateProfileData) {
    // 检查邮箱是否已被使用
    if (data.email) {
      const existing = await this.db.teacher.findFirst({
        where: {
          email: data.email,
          id: { not: id },
          deletedAt: null,
        },
      });
      if (existing) {
        throw new BadRequestException('该邮箱已被使用');
      }
    }

    const updateData: any = {};
    if (data.name) updateData.name = data.name;
    if (data.email) updateData.email = data.email;
    if (data.title) updateData.title = data.title;
    if (data.phoneNumber !== undefined) updateData.phoneNumber = data.phoneNumber;
    if (data.department !== undefined) updateData.department = data.department;

    return this.db.teacher.update({
      where: { id },
      data: updateData,
    });
  }

  async changePassword(id: string, currentPassword: string, newPassword: string) {
    // 验证当前密码
    const user = await this.findById(id);
    if (!user) {
      throw new BadRequestException('用户不存在');
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('当前密码错误');
    }

    // 加密新密码
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 更新密码
    return this.db.teacher.update({
      where: { id },
      data: { password: hashedPassword },
    });
  }

  async updatePassword(id: string, hashedPassword: string) {
    return this.db.teacher.update({
      where: { id },
      data: { password: hashedPassword },
    });
  }
}