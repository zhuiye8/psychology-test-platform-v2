import { Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';

import { UsersService } from '../users/users.service';
import { Teacher } from '@psychology/database';
import { AuthResponseDto } from './dto/auth-response.dto';
import { UpdateProfileDto, UpdatePasswordDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);

    if (!user || !user.isActive) {
      return null;
    }

    // Check if account is locked
    // TODO: Implement account lock logic in database

    if (await bcrypt.compare(password, user.password)) {
      const { password: _, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: Teacher): Promise<AuthResponseDto> {
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    // Update last login time
    await this.usersService.updateLastLogin(user.id);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        department: user.department,
        title: user.title,
      },
    };
  }

  async refreshToken(refreshToken: string): Promise<{ access_token: string }> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      const user = await this.usersService.findById(payload.sub);
      if (!user || !user.isActive) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const accessToken = this.generateAccessToken(user);
      return { access_token: accessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async getProfile(userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const { password: _, ...profile } = user;
    return profile;
  }

  private generateAccessToken(user: Teacher): string {
    const payload = {
      username: user.username,
      sub: user.id,
      name: user.name,
      type: 'access',
    };

    return this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN', '15m'),
    });
  }

  private generateRefreshToken(user: Teacher): string {
    const payload = {
      username: user.username,
      sub: user.id,
      type: 'refresh',
    };

    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN', '7d'),
    });
  }

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto): Promise<Teacher> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // 如果email被修改，检查是否已存在
    if (updateProfileDto.email && updateProfileDto.email !== user.email) {
      const existingUser = await this.usersService.findByEmail(updateProfileDto.email);
      if (existingUser && existingUser.id !== userId) {
        throw new BadRequestException('Email already in use');
      }
    }

    const updatedUser = await this.usersService.updateProfile(userId, updateProfileDto);
    const { password: _, ...result } = updatedUser;
    return result as Teacher;
  }

  async updatePassword(userId: string, updatePasswordDto: UpdatePasswordDto): Promise<{ message: string }> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // 验证当前密码
    const isPasswordValid = await bcrypt.compare(updatePasswordDto.currentPassword, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Current password is incorrect');
    }

    // 更新密码
    const hashedPassword = await bcrypt.hash(updatePasswordDto.newPassword, 10);
    await this.usersService.updatePassword(userId, hashedPassword);

    return { message: 'Password updated successfully' };
  }
}