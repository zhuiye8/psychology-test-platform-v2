import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

// ============================================================================
// AI分析批量检查请求DTO
// ============================================================================

export class AiBatchCheckRequestDto {
  @ApiProperty({ description: '考试结果ID列表', type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  result_ids: string[];
}
