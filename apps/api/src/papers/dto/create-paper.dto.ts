import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsInt, Min, MaxLength, Matches } from 'class-validator';

export class CreatePaperDto {
  @ApiProperty({ description: 'Paper title', example: '心理健康量表' })
  @IsString()
  @MaxLength(200)
  title: string;

  @ApiProperty({ description: 'Paper description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Paper category (optional)',
    required: false,
    example: '心理评估'
  })
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: '分类名称不能超过100个字符' })
  @Matches(/^(?!__).*(?<!__)$/, {
    message: '分类名称不能以双下划线开头或结尾'
  })
  category?: string;

  @ApiProperty({ description: 'Time limit in minutes', required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  timeLimit?: number;

  @ApiProperty({ description: 'Allow retake', required: false, default: false })
  @IsOptional()
  @IsBoolean()
  allowRetake?: boolean;

  @ApiProperty({ description: 'Show results immediately', required: false, default: true })
  @IsOptional()
  @IsBoolean()
  showResultsImmediately?: boolean;

  @ApiProperty({ description: 'Randomize questions', required: false, default: false })
  @IsOptional()
  @IsBoolean()
  randomizeQuestions?: boolean;
}
