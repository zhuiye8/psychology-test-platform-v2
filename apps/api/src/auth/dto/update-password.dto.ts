import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({ description: 'Current password' })
  @IsString()
  @MinLength(6)
  currentPassword: string;

  @ApiProperty({ description: 'New password (min 6 characters)' })
  @IsString()
  @MinLength(6)
  newPassword: string;
}
