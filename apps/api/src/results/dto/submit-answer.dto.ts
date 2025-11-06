import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, IsNumber, IsISO8601 } from 'class-validator';

export class SubmitAnswerDto {
  @ApiProperty({ description: 'Question ID' })
  @IsString()
  questionId: string;

  @ApiProperty({ description: 'Selected option IDs for choice questions', type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  selectedOptions?: string[];

  @ApiProperty({ description: 'Text answer for text/essay questions', required: false })
  @IsOptional()
  @IsString()
  textAnswer?: string;

  // ⭐ Answer timing fields (for AI analysis correlation)
  @ApiProperty({ description: 'When question was first shown to student (ISO 8601)', required: false })
  @IsOptional()
  @IsISO8601()
  questionDisplayedAt?: string;

  @ApiProperty({ description: 'When student first interacted with question (ISO 8601)', required: false })
  @IsOptional()
  @IsISO8601()
  firstInteractionAt?: string;

  @ApiProperty({ description: 'When student last modified answer (ISO 8601)', required: false })
  @IsOptional()
  @IsISO8601()
  lastModifiedAt?: string;

  @ApiProperty({ description: 'Total time viewing question (milliseconds)', required: false })
  @IsOptional()
  @IsNumber()
  totalViewTime?: number;

  @ApiProperty({ description: 'Number of interactions with question', required: false })
  @IsOptional()
  @IsNumber()
  interactionCount?: number;

  @ApiProperty({ description: 'Hesitation score (0-1, higher = more hesitation)', required: false })
  @IsOptional()
  @IsNumber()
  hesitationScore?: number;
}
