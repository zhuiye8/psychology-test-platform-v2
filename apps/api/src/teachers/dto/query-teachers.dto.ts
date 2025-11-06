import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryTeachersDto {
  @ApiProperty({ description: 'Page number', required: false, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiProperty({ description: 'Page size', required: false, default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @ApiProperty({ description: 'Search by name, username, or email', required: false })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ description: 'Filter by active status', required: false })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  is_active?: boolean;
}
