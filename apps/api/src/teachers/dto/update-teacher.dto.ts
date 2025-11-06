import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsBoolean, MinLength } from 'class-validator';

export class UpdateTeacherDto {
  @ApiProperty({ description: 'Email address', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'Teacher name', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Phone number', required: false })
  @IsOptional()
  @IsString()
  phone_number?: string;

  @ApiProperty({ description: 'Department', required: false })
  @IsOptional()
  @IsString()
  department?: string;

  @ApiProperty({ description: 'Job title', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: 'Active status', required: false })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @ApiProperty({ description: 'New password (optional)', required: false })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;
}
