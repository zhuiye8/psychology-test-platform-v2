import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional, IsBoolean, IsInt, IsNumber, Min, Max, IsJSON, IsArray, ValidateNested, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export enum QuestionType {
  SINGLE_CHOICE = 'SINGLE_CHOICE',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TEXT = 'TEXT',
  ESSAY = 'ESSAY',
}

export class QuestionOptionDto {
  @ApiProperty({ description: '选项ID' })
  @IsString()
  id: string;

  @ApiProperty({ description: '选项文本' })
  @IsString()
  text: string;

  @ApiProperty({ description: '选项分数（0-100）' })
  @IsNumber()
  @Min(-100)  // 允许负分（错误答案扣分）
  @Max(100)   // 最高100分
  score: number;
}

export class CreateQuestionDto {
  @ApiProperty({ description: 'Question title' })
  @IsString()
  title: string;

  @ApiProperty({ enum: QuestionType, description: 'Question type' })
  @IsEnum(QuestionType)
  type: QuestionType;

  @ApiProperty({ description: 'Question description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Question dimension (optional, for psychological tests)',
    required: false,
    example: '家庭生活'
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  dimension?: string;

  @ApiProperty({ description: 'Answer explanation', required: false })
  @IsOptional()
  @IsString()
  explanation?: string;

  @ApiProperty({ description: 'Display order', default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;

  @ApiProperty({ description: 'Is required', default: true })
  @IsOptional()
  @IsBoolean()
  required?: boolean;

  @ApiProperty({ description: 'Question points', default: 1 })
  @IsOptional()
  @IsInt()
  @Min(0)
  points?: number;

  @ApiProperty({ description: 'Display condition (JSON)', required: false })
  @IsOptional()
  displayCondition?: any;

  @ApiProperty({ description: 'Options for choice questions', type: [QuestionOptionDto], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionOptionDto)
  options?: QuestionOptionDto[];
}
