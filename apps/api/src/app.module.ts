import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { APP_GUARD } from '@nestjs/core';

import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TeachersModule } from './teachers/teachers.module';
import { PapersModule } from './papers/papers.module';
import { QuestionsModule } from './questions/questions.module';
import { ExamsModule } from './exams/exams.module';
import { ResultsModule } from './results/results.module';
import { AiModule } from './ai/ai.module';
import { ReportsModule } from './reports/reports.module';
import { SystemModule } from './system/system.module';
import { HealthModule } from './health/health.module';
import { WebrtcModule } from './webrtc/webrtc.module';

import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ThrottlerGuard } from '@nestjs/throttler';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),

    // Scheduled tasks
    ScheduleModule.forRoot(),

    // Rate limiting
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000, // 1 second
        limit: 10, // 10 requests per second
      },
      {
        name: 'medium',
        ttl: 10000, // 10 seconds
        limit: 20, // 20 requests per 10 seconds
      },
      {
        name: 'long',
        ttl: 60000, // 1 minute
        limit: 100, // 100 requests per minute
      },
    ]),

    // Core modules
    DatabaseModule,
    HealthModule,

    // Domain modules
    AuthModule,
    UsersModule,
    TeachersModule,
    PapersModule,
    QuestionsModule,
    ExamsModule,
    ResultsModule,
    AiModule,
    ReportsModule,
    SystemModule,
    WebrtcModule,
  ],
  providers: [
    // Global guards
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    // Note: JwtAuthGuard is applied selectively, not globally
  ],
})
export class AppModule {}