/**
 * Prisma client configuration and connection management
 */

import { PrismaClient } from '../generated/client';
import type { Prisma } from '../generated/client';

// Global Prisma client instance (singleton pattern)
declare global {
  var prisma: PrismaClient | undefined;
}

// Database client configuration
const clientConfig: Prisma.PrismaClientOptions = {
  log: [
    { level: 'warn', emit: 'event' },
    { level: 'error', emit: 'event' },
    { level: 'info', emit: 'event' },
  ],
  errorFormat: 'pretty',
};

// Create or reuse Prisma client instance
export const prisma = globalThis.prisma ?? new PrismaClient(clientConfig);

// In development, store client on global to prevent multiple instances
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

// Graceful shutdown handling
async function gracefulShutdown() {
  await prisma.$disconnect();
  process.exit(0);
}

process.on('beforeExit', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

// Export types for convenience
export type {
  Teacher,
  Student,
  Paper,
  Question,
  Exam,
  ExamResult,
  Answer,
  AiSession,
  AiDataPoint,
  AiAnalysisAggregate,
  AiAnomaly,
  AiCheckpoint,
  SystemLog,
  SystemConfig,
  AuditLog,
  QuestionType,
  ExamStatus,
  AiSessionStatus,
  AiDataType,
  AnomalyType,
  AnomalySeverity,
  CheckpointType,
  LogLevel,
  AuditAction,
} from '../generated/client';

export default prisma;