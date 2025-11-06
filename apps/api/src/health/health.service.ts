import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { HealthCheckResult } from './dto/health.dto';

@Injectable()
export class HealthService {
  constructor(private readonly databaseService: DatabaseService) {}

  async checkHealth(): Promise<HealthCheckResult> {
    const timestamp = new Date().toISOString();
    
    // Check database connectivity
    const databaseHealthy = await this.databaseService.healthCheck();
    
    // Overall status
    const status = databaseHealthy ? 'healthy' : 'unhealthy';
    
    return {
      status,
      timestamp,
      services: {
        database: databaseHealthy ? 'healthy' : 'unhealthy',
        api: 'healthy', // If we're responding, API is healthy
      },
      version: process.env.npm_package_version || '0.1.0',
      uptime: process.uptime(),
    };
  }

  async checkDatabase(): Promise<{ status: string; timestamp: string }> {
    const timestamp = new Date().toISOString();
    const isHealthy = await this.databaseService.healthCheck();
    
    return {
      status: isHealthy ? 'healthy' : 'unhealthy',
      timestamp,
    };
  }
}