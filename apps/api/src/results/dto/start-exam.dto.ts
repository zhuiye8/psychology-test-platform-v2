import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsOptional } from 'class-validator';

export class StartExamDto {
  @ApiProperty({ description: 'Participant ID (student ID or anonymous ID)' })
  @IsString()
  @MaxLength(50)
  participantId: string;

  @ApiProperty({ description: 'Participant name' })
  @IsString()
  @MaxLength(100)
  participantName: string;

  @ApiProperty({ description: 'Access code (if required)', required: false })
  @IsOptional()
  @IsString()
  accessCode?: string;
}
