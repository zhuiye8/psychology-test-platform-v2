import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { SubmitAnswerDto } from './submit-answer.dto';

export class SubmitExamDto {
  @ApiProperty({ description: 'All answers for the exam', type: [SubmitAnswerDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubmitAnswerDto)
  answers: SubmitAnswerDto[];
}
