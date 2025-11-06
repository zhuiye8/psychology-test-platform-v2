import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateQuestionDto } from './create-question.dto';

/**
 * 批量导入题目DTO
 */
export class BatchImportQuestionsDto {
  @ApiProperty({
    description: 'Array of questions to import',
    type: [CreateQuestionDto]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}

/**
 * 批量导入结果
 */
export interface BatchImportResult {
  /** 成功导入的题目数量 */
  successCount: number;
  /** 失败的题目数量 */
  failedCount: number;
  /** 导入的题目ID列表 */
  questionIds: string[];
  /** 错误信息（如果有） */
  errors?: Array<{
    index: number;
    title: string;
    error: string;
  }>;
}
