import {
  Controller,
  Post,
  Put,
  UseGuards,
  Request,
  Response,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Response as ExpressResponse } from 'express';
import { Throttle } from '@nestjs/throttler';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginDto, AuthResponseDto, UpdateProfileDto, UpdatePasswordDto } from './dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @Throttle({ default: { limit: 5, ttl: 60000 } }) // 5 attempts per minute
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Teacher login' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials'
  })
  @ApiResponse({
    status: 429,
    description: 'Too many login attempts'
  })
  async login(
    @Request() req: any,
    @Response({ passthrough: true }) response: ExpressResponse,
  ): Promise<AuthResponseDto> {
    const result = await this.authService.login(req.user);

    // Set httpOnly cookies
    response.cookie('auth-token', result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    response.cookie('refresh-token', result.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/api/auth/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return result;
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({
    status: 200,
    description: 'Token refreshed successfully'
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid refresh token'
  })
  async refresh(
    @Request() req: any,
    @Response({ passthrough: true }) response: ExpressResponse,
  ): Promise<{ access_token: string }> {
    const refreshToken = req.cookies['refresh-token'];
    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token provided');
    }

    const result = await this.authService.refreshToken(refreshToken);

    // Update access token cookie
    response.cookie('auth-token', result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    return result;
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Teacher logout' })
  @ApiResponse({
    status: 200,
    description: 'Logout successful'
  })
  async logout(
    @Response({ passthrough: true }) response: ExpressResponse,
  ): Promise<{ message: string }> {
    // Clear auth cookies
    response.clearCookie('auth-token');
    response.clearCookie('refresh-token', { path: '/api/auth/refresh' });

    return { message: 'Logout successful' };
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully'
  })
  async getProfile(@Request() req: any) {
    return this.authService.getProfile(req.user.id);
  }

  @Put('profile')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({
    status: 200,
    description: 'Profile updated successfully'
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data'
  })
  async updateProfile(@Request() req: any, @Body() updateProfileDto: UpdateProfileDto) {
    return this.authService.updateProfile(req.user.id, updateProfileDto);
  }

  @Put('password')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update password' })
  @ApiResponse({
    status: 200,
    description: 'Password updated successfully'
  })
  @ApiResponse({
    status: 400,
    description: 'Current password incorrect'
  })
  async updatePassword(@Request() req: any, @Body() updatePasswordDto: UpdatePasswordDto) {
    return this.authService.updatePassword(req.user.id, updatePasswordDto);
  }
}