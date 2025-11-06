import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, MinLength, Matches } from 'class-validator';

export class CreateTeacherDto {
  @ApiProperty({ description: 'Username (unique)', example: 'teacher001' })
  @IsString()
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Username can only contain letters, numbers, and underscores',
  })
  username: string;

  @ApiProperty({ description: 'Email address', example: 'teacher@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Teacher name', example: '张三' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Password (min 6 chars)', example: 'password123' })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;

  @ApiProperty({ description: 'Phone number', required: false, example: '13800138000' })
  @IsOptional()
  @IsString()
  phone_number?: string;

  @ApiProperty({ description: 'Department', required: false, example: '心理学院' })
  @IsOptional()
  @IsString()
  department?: string;

  @ApiProperty({ description: 'Job title', required: false, example: '讲师' })
  @IsOptional()
  @IsString()
  title?: string;
}
