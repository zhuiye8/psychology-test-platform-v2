import type { PaginationParams, PaginatedResult } from './types';
export declare function calculateOffset(page: number, limit: number): number;
export declare function buildPaginationResult<T>(data: T[], total: number, params: PaginationParams): PaginatedResult<T>;
export declare function validatePagination(params: PaginationParams): PaginationParams;
export declare function buildSearchFilter(search?: string): {
    contains: string;
    mode: "insensitive";
};
export declare function buildDateRangeFilter(startDate?: Date, endDate?: Date): any;
export declare const ACTIVE_RECORD_FILTER: {
    deletedAt: any;
};
export declare function generateParticipantId(): string;
export declare function generateAccessCode(length?: number): string;
export declare function calculateScore(answers: any[], questions: any[]): {
    totalScore: number;
    maxScore: number;
    percentage: number;
};
export declare function evaluateDisplayCondition(condition: any, answers: Record<string, any>): boolean;
export declare function formatDuration(seconds: number): string;
export declare function sanitizeInput(input: string): string;
