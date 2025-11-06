import type { Teacher, Student, Paper, Question, Exam, ExamResult, Answer, AiSession, AiAnalysisAggregate } from '../generated/client';
export interface TeacherWithCounts extends Teacher {
    _count?: {
        papers?: number;
        exams?: number;
    };
}
export interface PaperWithDetails extends Paper {
    teacher?: Teacher;
    questions?: Question[];
    _count?: {
        questions?: number;
        exams?: number;
    };
}
export interface ExamWithDetails extends Exam {
    paper?: PaperWithDetails;
    teacher?: Teacher;
    examResults?: ExamResult[];
    _count?: {
        examResults?: number;
    };
}
export interface ExamResultWithDetails extends ExamResult {
    exam?: ExamWithDetails;
    student?: Student;
    answers?: Answer[];
    aiAnalysisData?: AiAnalysisAggregate;
}
export interface QuestionWithAnswers extends Question {
    answers?: Answer[];
    _count?: {
        answers?: number;
    };
}
export interface SimpleCondition {
    question_id: string;
    selected_option: string;
}
export interface ComplexCondition {
    type: 'and' | 'or';
    conditions: (SimpleCondition | ComplexCondition)[];
}
export type DisplayCondition = SimpleCondition | ComplexCondition;
export interface QuestionOption {
    id: string;
    text: string;
    isCorrect?: boolean;
    order?: number;
}
export interface AiSessionWithDetails extends AiSession {
    dataPoints?: any[];
    aggregates?: AiAnalysisAggregate;
    anomalies?: any[];
    checkpoints?: any[];
}
export interface PaginationParams {
    page?: number;
    limit?: number;
    cursor?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
export interface PaginatedResult<T> {
    data: T[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
        nextCursor?: string;
        prevCursor?: string;
    };
}
export interface TeacherFilter {
    search?: string;
    department?: string;
    isActive?: boolean;
}
export interface PaperFilter {
    search?: string;
    category?: string;
    teacherId?: string;
    isActive?: boolean;
}
export interface ExamFilter {
    search?: string;
    status?: string[];
    teacherId?: string;
    startDate?: Date;
    endDate?: Date;
}
export interface ExamResultFilter {
    examId?: string;
    participantId?: string;
    isCompleted?: boolean;
    isValid?: boolean;
    minScore?: number;
    maxScore?: number;
}
export interface ExamStatistics {
    totalParticipants: number;
    completedParticipants: number;
    averageScore: number;
    averageTimeSpent: number;
    passRate: number;
    scoreDistribution: {
        range: string;
        count: number;
    }[];
}
export interface QuestionStatistics {
    questionId: string;
    totalAnswers: number;
    correctAnswers: number;
    accuracy: number;
    averageTimeSpent?: number;
    optionDistribution?: {
        optionId: string;
        count: number;
        percentage: number;
    }[];
}
export interface ExportOptions {
    format: 'json' | 'csv' | 'xlsx';
    includePersonalData: boolean;
    includeAiData: boolean;
    dateRange?: {
        start: Date;
        end: Date;
    };
}
