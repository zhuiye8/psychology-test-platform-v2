import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsInt, Min, IsString, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export enum ExamStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  SUCCESS = 'SUCCESS',
  ARCHIVED = 'ARCHIVED',
  DELETED = 'DELETED',
}

export class QueryExamsDto {
  @ApiProperty({ description: 'Page number', required: false, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiProperty({ description: 'Items per page', required: false, default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 20;

  @ApiProperty({ description: 'Search keyword', required: false })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ description: 'Filter by status', enum: ExamStatus, required: false })
  @IsOptional()
  @IsEnum(ExamStatus)
  status?: ExamStatus;

  @ApiProperty({ description: 'Filter by paper ID', required: false })
  @IsOptional()
  @IsString()
  paperId?: string;
}
