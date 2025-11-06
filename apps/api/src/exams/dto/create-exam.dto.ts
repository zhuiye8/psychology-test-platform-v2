import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsInt, Min, IsDateString, IsArray, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateExamDto {
  @ApiProperty({ description: 'Paper ID to create exam from' })
  @IsString()
  paperId: string;

  @ApiProperty({ description: 'Exam title' })
  @IsString()
  @MaxLength(200)
  title: string;

  @ApiProperty({ description: 'Exam description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Exam start time (ISO 8601)' })
  @IsDateString()
  startTime: string;

  @ApiProperty({ description: 'Exam end time (ISO 8601)' })
  @IsDateString()
  endTime: string;

  @ApiProperty({ description: 'Time limit in minutes (overrides paper setting)', required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  timeLimit?: number;

  @ApiProperty({ description: 'Access code for exam entry', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  accessCode?: string;

  @ApiProperty({ description: 'Array of allowed participant IDs', required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  allowedStudents?: string[];

  @ApiProperty({ description: 'Maximum number of attempts per student', default: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  maxAttempts?: number;

  @ApiProperty({ description: 'Require camera for exam', default: false })
  @IsOptional()
  @IsBoolean()
  requireCamera?: boolean;

  @ApiProperty({ description: 'Require microphone for exam', default: false })
  @IsOptional()
  @IsBoolean()
  requireMicrophone?: boolean;

  @ApiProperty({ description: 'Enable AI analysis during exam', default: false })
  @IsOptional()
  @IsBoolean()
  enableAIAnalysis?: boolean;
}
