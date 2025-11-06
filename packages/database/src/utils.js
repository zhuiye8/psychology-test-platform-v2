"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACTIVE_RECORD_FILTER = void 0;
exports.calculateOffset = calculateOffset;
exports.buildPaginationResult = buildPaginationResult;
exports.validatePagination = validatePagination;
exports.buildSearchFilter = buildSearchFilter;
exports.buildDateRangeFilter = buildDateRangeFilter;
exports.generateParticipantId = generateParticipantId;
exports.generateAccessCode = generateAccessCode;
exports.calculateScore = calculateScore;
exports.evaluateDisplayCondition = evaluateDisplayCondition;
exports.formatDuration = formatDuration;
exports.sanitizeInput = sanitizeInput;
function calculateOffset(page, limit) {
    return Math.max(0, (page - 1) * limit);
}
function buildPaginationResult(data, total, params) {
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
function validatePagination(params) {
    const page = Math.max(1, params.page || 1);
    const limit = Math.min(100, Math.max(1, params.limit || 20));
    return {
        ...params,
        page,
        limit,
    };
}
function buildSearchFilter(search) {
    if (!search?.trim())
        return undefined;
    return {
        contains: search.trim(),
        mode: 'insensitive',
    };
}
function buildDateRangeFilter(startDate, endDate) {
    if (!startDate && !endDate)
        return undefined;
    const filter = {};
    if (startDate)
        filter.gte = startDate;
    if (endDate)
        filter.lte = endDate;
    return filter;
}
exports.ACTIVE_RECORD_FILTER = {
    deletedAt: null,
};
function generateParticipantId() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `${timestamp}${random}`.toUpperCase();
}
function generateAccessCode(length = 6) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
function calculateScore(answers, questions) {
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
        percentage: Math.round(percentage * 100) / 100,
    };
}
function evaluateDisplayCondition(condition, answers) {
    if (!condition)
        return true;
    if (condition.question_id && condition.selected_option) {
        const answer = answers[condition.question_id];
        if (!answer)
            return false;
        if (Array.isArray(answer.selectedOptions)) {
            return answer.selectedOptions.includes(condition.selected_option);
        }
        return answer.selectedOptions === condition.selected_option;
    }
    if (condition.type && condition.conditions) {
        const results = condition.conditions.map((cond) => evaluateDisplayCondition(cond, answers));
        return condition.type === 'and'
            ? results.every(Boolean)
            : results.some(Boolean);
    }
    return true;
}
function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    if (hours > 0) {
        return `${hours}h ${minutes}m ${remainingSeconds}s`;
    }
    else if (minutes > 0) {
        return `${minutes}m ${remainingSeconds}s`;
    }
    else {
        return `${remainingSeconds}s`;
    }
}
function sanitizeInput(input) {
    return input
        .replace(/[<>]/g, '')
        .trim()
        .slice(0, 1000);
}
//# sourceMappingURL=utils.js.map