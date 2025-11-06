import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HealthService } from './health.service';
import { HealthCheckResult } from './dto/health.dto';

@ApiTags('system')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({ 
    status: 200, 
    description: 'Service health status',
    type: HealthCheckResult,
  })
  async getHealth(): Promise<HealthCheckResult> {
    return this.healthService.checkHealth();
  }

  @Get('database')
  @ApiOperation({ summary: 'Database health check' })
  @ApiResponse({ 
    status: 200, 
    description: 'Database connectivity status' 
  })
  async getDatabaseHealth(): Promise<{ status: string; timestamp: string }> {
    return this.healthService.checkDatabase();
  }
}