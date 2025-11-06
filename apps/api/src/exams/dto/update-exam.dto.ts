import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateExamDto } from './create-exam.dto';

// Omit paperId because it cannot be changed after creation
export class UpdateExamDto extends PartialType(
  OmitType(CreateExamDto, ['paperId'] as const)
) {}
