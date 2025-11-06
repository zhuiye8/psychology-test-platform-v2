import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsInt, Min, IsString, IsBoolean } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class QueryResultsDto {
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

  @ApiProperty({ description: 'Filter by exam ID', required: false })
  @IsOptional()
  @IsString()
  examId?: string;

  @ApiProperty({ description: 'Search by participant name or ID', required: false })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ description: 'Filter completed only', required: false })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isCompleted?: boolean;

  @ApiProperty({ description: 'Sort by field', required: false, enum: ['score', 'timeSpent', 'submittedAt', 'startedAt'] })
  @IsOptional()
  @IsString()
  sortBy?: 'score' | 'timeSpent' | 'submittedAt' | 'startedAt';

  @ApiProperty({ description: 'Sort order', required: false, enum: ['asc', 'desc'] })
  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc';
}
