import { PrismaClient } from '../generated/client';
import type { Prisma } from '../generated/client';
declare global {
    var prisma: PrismaClient | undefined;
}
export declare const prisma: PrismaClient<Prisma.PrismaClientOptions, never, import("../generated/client/runtime/library").DefaultArgs>;
export type { Teacher, Student, Paper, Question, Exam, ExamResult, Answer, AiSession, AiDataPoint, AiAnalysisAggregate, AiAnomaly, AiCheckpoint, SystemLog, SystemConfig, AuditLog, QuestionType, ExamStatus, AiSessionStatus, AiDataType, AnomalyType, AnomalySeverity, CheckpointType, LogLevel, AuditAction, } from '../generated/client';
export default prisma;
