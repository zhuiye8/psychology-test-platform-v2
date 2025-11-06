import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional, IsBoolean, IsInt, Min, IsJSON, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export enum QuestionType {
  SINGLE_CHOICE = 'SINGLE_CHOICE',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TEXT = 'TEXT',
  ESSAY = 'ESSAY',
}

export class QuestionOptionDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  text: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isCorrect?: boolean;
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
