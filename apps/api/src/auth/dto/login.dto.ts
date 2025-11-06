import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ 
    description: 'Teacher username',
    example: 'T2025001' 
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ 
    description: 'Teacher password',
    example: '123456' 
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}