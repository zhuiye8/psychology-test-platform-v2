/**
 * Database utility functions
 */

import type { PaginationParams, PaginatedResult } from './types';

/**
 * Calculate pagination offset
 */
export function calculateOffset(page: number, limit: number): number {
  return Math.max(0, (page - 1) * limit);
}

/**
 * Build pagination result
 */
export function buildPaginationResult<T>(
  data: T[],
  total: number,
  params: PaginationParams
): PaginatedResult<T> {
  const page = params.page || 1;
  const limit = params.limit || 20;
  const totalPages = Math.ceil(total / limit);

  return {
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
      nextCursor: page < totalPages ? String(page + 1) : undefined,
      prevCursor: page > 1 ? String(page - 1) : undefined,
    },
  };
}

/**
 * Validate pagination parameters
 */
export function validatePagination(params: PaginationParams): PaginationParams {
  const page = Math.max(1, params.page || 1);
  const limit = Math.min(100, Math.max(1, params.limit || 20));
  
  return {
    ...params,
    page,
    limit,
  };
}

/**
 * Build search filter for text fields
 */
export function buildSearchFilter(search?: string) {
  if (!search?.trim()) return undefined;
  
  return {
    contains: search.trim(),
    mode: 'insensitive' as const,
  };
}

/**
 * Build date range filter
 */
export function buildDateRangeFilter(startDate?: Date, endDate?: Date) {
  if (!startDate && !endDate) return undefined;
  
  const filter: any = {};
  if (startDate) filter.gte = startDate;
  if (endDate) filter.lte = endDate;
  
  return filter;
}

/**
 * Soft delete filter (exclude deleted records)
 */
export const ACTIVE_RECORD_FILTER = {
  deletedAt: null,
};

/**
 * Generate unique participant ID
 */
export function generateParticipantId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `${timestamp}${random}`.toUpperCase();
}

/**
 * Generate exam access code
 */
export function generateAccessCode(length: number = 6): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Calculate exam score
 */
export function calculateScore(answers: any[], questions: any[]): {
  totalScore: number;
  maxScore: number;
  percentage: number;
} {
  let totalScore = 0;
  let maxScore = 0;

  for (const question of questions) {
    maxScore += question.points || 1;
    
    const answer = answers.find(a => a.questionId === question.id);
    if (answer) {
      totalScore += answer.points || 0;
    }
  }

  const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

  return {
    totalScore,
    maxScore,
    percentage: Math.round(percentage * 100) / 100, // Round to 2 decimal places
  };
}

/**
 * Validate question display condition
 */
export function evaluateDisplayCondition(
  condition: any,
  answers: Record<string, any>
): boolean {
  if (!condition) return true;

  // Simple condition
  if (condition.question_id && condition.selected_option) {
    const answer = answers[condition.question_id];
    if (!answer) return false;
    
    if (Array.isArray(answer.selectedOptions)) {
      return answer.selectedOptions.includes(condition.selected_option);
    }
    return answer.selectedOptions === condition.selected_option;
  }

  // Complex condition
  if (condition.type && condition.conditions) {
    const results = condition.conditions.map((cond: any) => 
      evaluateDisplayCondition(cond, answers)
    );

    return condition.type === 'and' 
      ? results.every(Boolean)
      : results.some(Boolean);
  }

  return true;
}

/**
 * Format time duration in human readable format
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  } else {
    return `${remainingSeconds}s`;
  }
}

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove HTML tags
    .trim()
    .slice(0, 1000); // Limit length
}