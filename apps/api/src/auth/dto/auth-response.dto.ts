import { ApiProperty } from '@nestjs/swagger';

export class UserProfileDto {
  @ApiProperty({ description: 'User ID' })
  id: string;

  @ApiProperty({ description: 'Username' })
  username: string;

  @ApiProperty({ description: 'Email address' })
  email: string;

  @ApiProperty({ description: 'Full name' })
  name: string;

  @ApiProperty({ description: 'Department', required: false })
  department?: string;

  @ApiProperty({ description: 'Job title', required: false })
  title?: string;
}

export class AuthResponseDto {
  @ApiProperty({ description: 'JWT access token' })
  access_token: string;

  @ApiProperty({ description: 'JWT refresh token' })
  refresh_token: string;

  @ApiProperty({ description: 'User profile data', type: UserProfileDto })
  user: UserProfileDto;
}