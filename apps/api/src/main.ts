import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { IoAdapter } from '@nestjs/platform-socket.io';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import express from 'express';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Enable WebSocket support (Socket.IO adapter)
  app.useWebSocketAdapter(new IoAdapter(app));

  // Security middleware
  app.use(helmet());
  app.use(compression());
  app.use(cookieParser());

  // Text parser for WHIP/WHEP SDP (must be before JSON parser)
  app.use(express.text({ type: 'application/sdp' }));

  // Increase body size limit for AI batch checkpoints (50MB)
  // AI服务批量发送检查点数据时需要较大的payload
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // CORS configuration
  app.enableCors({
    origin: [
      configService.get('WEB_URL', 'http://localhost:4000'),
      configService.get('EXAM_CLIENT_URL', 'http://localhost:4002'),
      configService.get('AI_MONITOR_URL', 'http://localhost:5680'),
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Global filters and interceptors
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new TransformInterceptor(),
  );

  // API prefix
  app.setGlobalPrefix('api', {
    exclude: ['/health'],
  });

  // Swagger documentation
  if (configService.get('NODE_ENV') !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Psychology Testing Platform API')
      .setDescription('RESTful API for psychology testing and analysis')
      .setVersion('1.0')
      .addTag('auth', 'Authentication endpoints')
      .addTag('users', 'User management')
      .addTag('papers', 'Test paper management')
      .addTag('questions', 'Question management')
      .addTag('exams', 'Exam management')
      .addTag('results', 'Exam results and analysis')
      .addTag('ai', 'AI analysis endpoints')
      .addTag('system', 'System management')
      .addBearerAuth()
      .addCookieAuth('auth-cookie')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }

  // Start server
  const port = configService.get('API_PORT', 4001);
  await app.listen(port);

  console.log(`🚀 Psychology API running on: http://localhost:${port}`);
  console.log(`📚 API Documentation: http://localhost:${port}/api/docs`);
}

bootstrap();