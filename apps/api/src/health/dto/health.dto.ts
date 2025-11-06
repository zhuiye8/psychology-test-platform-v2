import { ApiProperty } from '@nestjs/swagger';

export class HealthCheckResult {
  @ApiProperty({ 
    description: 'Overall health status',
    example: 'healthy',
    enum: ['healthy', 'unhealthy'] 
  })
  status: string;

  @ApiProperty({ 
    description: 'Timestamp of health check',
    example: '2024-01-01T00:00:00.000Z' 
  })
  timestamp: string;

  @ApiProperty({ 
    description: 'Individual service health status',
    example: {
      database: 'healthy',
      api: 'healthy'
    }
  })
  services: {
    database: string;
    api: string;
  };

  @ApiProperty({ 
    description: 'Application version',
    example: '0.1.0' 
  })
  version: string;

  @ApiProperty({ 
    description: 'Server uptime in seconds',
    example: 3600 
  })
  uptime: number;
}