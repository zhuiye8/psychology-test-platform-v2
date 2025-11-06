import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, MinLength, MaxLength } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty({ description: 'Teacher name', required: false })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name?: string;

  @ApiProperty({ description: 'Email address', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'Job title', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  title?: string;

  @ApiProperty({ description: 'Phone number', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;
}
