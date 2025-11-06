/**
 * Conditional Logic Types
 *
 * 条件逻辑类型定义（用于题目显示条件）
 */

// ============================================================================
// 基础类型
// ============================================================================

/** 单个简单条件 */
export interface SimpleCondition {
  questionId: string; // 依赖的题目ID
  selectedOption: string; // 选中的选项ID
}

/** 条件组类型 */
export type ConditionGroupType = 'and' | 'or';

/** 条件组（AND/OR逻辑） */
export interface ConditionGroup {
  type: ConditionGroupType;
  conditions: (SimpleCondition | ConditionGroup)[];
}

/** 显示条件（可以是简单条件或条件组） */
export type DisplayCondition = SimpleCondition | ConditionGroup | null;

// ============================================================================
// 类型守卫函数
// ============================================================================

/** 判断是否为简单条件 */
export function isSimpleCondition(
  condition: SimpleCondition | ConditionGroup
): condition is SimpleCondition {
  return 'questionId' in condition && 'selectedOption' in condition;
}

/** 判断是否为条件组 */
export function isConditionGroup(
  condition: SimpleCondition | ConditionGroup
): condition is ConditionGroup {
  return 'type' in condition && 'conditions' in condition;
}

// ============================================================================
// 工具函数
// ============================================================================

/**
 * 验证条件是否有效
 */
export function validateCondition(condition: DisplayCondition): boolean {
  if (!condition) return true;

  if (isSimpleCondition(condition)) {
    return !!condition.questionId && !!condition.selectedOption;
  }

  if (isConditionGroup(condition)) {
    if (!condition.conditions || condition.conditions.length === 0) {
      return false;
    }
    return condition.conditions.every(validateCondition);
  }

  return false;
}

/**
 * 格式化条件为可读文本（用于展示）
 */
export function formatConditionText(
  condition: DisplayCondition,
  getQuestionTitle?: (id: string) => string,
  getOptionText?: (questionId: string, optionId: string) => string
): string {
  if (!condition) return '无条件';

  if (isSimpleCondition(condition)) {
    const questionTitle = getQuestionTitle?.(condition.questionId) || condition.questionId;
    const optionText =
      getOptionText?.(condition.questionId, condition.selectedOption) ||
      condition.selectedOption;
    return `${questionTitle} = ${optionText}`;
  }

  if (isConditionGroup(condition)) {
    const operator = condition.type === 'and' ? ' 且 ' : ' 或 ';
    const conditionTexts = condition.conditions.map((c) =>
      formatConditionText(c, getQuestionTitle, getOptionText)
    );
    return `(${conditionTexts.join(operator)})`;
  }

  return '';
}

/**
 * 答案值类型（用于条件判断）
 */
export interface AnswerValue {
  selectedOptions?: string[];
  textAnswer?: string;
}

/**
 * 判断题目是否应该显示（基于条件逻辑和用户答案）
 *
 * @param displayCondition 题目的显示条件
 * @param answers 用户当前的答案状态（questionId -> AnswerValue）
 * @returns true表示应该显示，false表示隐藏
 *
 * @example
 * // 简单条件：Q2只在Q1选择'A'时显示
 * const condition = { questionId: 'q1', selectedOption: 'optionA' };
 * const answers = { q1: { selectedOptions: ['optionA'] } };
 * shouldDisplayQuestion(condition, answers); // true
 *
 * @example
 * // 复杂条件：Q3在(Q1='A' AND Q2='B') OR (Q1='C')时显示
 * const condition = {
 *   type: 'or',
 *   conditions: [
 *     {
 *       type: 'and',
 *       conditions: [
 *         { questionId: 'q1', selectedOption: 'A' },
 *         { questionId: 'q2', selectedOption: 'B' }
 *       ]
 *     },
 *     { questionId: 'q1', selectedOption: 'C' }
 *   ]
 * };
 */
export function shouldDisplayQuestion(
  displayCondition: DisplayCondition,
  answers: Record<string, AnswerValue>
): boolean {
  // 无条件：始终显示
  if (!displayCondition) {
    return true;
  }

  // 简单条件：检查指定题目的选项是否匹配
  if (isSimpleCondition(displayCondition)) {
    const answer = answers[displayCondition.questionId];

    // 如果依赖题目未作答，则隐藏当前题目
    if (!answer || !answer.selectedOptions || answer.selectedOptions.length === 0) {
      return false;
    }

    // 检查答案中是否包含指定的选项
    return answer.selectedOptions.includes(displayCondition.selectedOption);
  }

  // 条件组：递归判断所有子条件
  if (isConditionGroup(displayCondition)) {
    // 空条件组视为false
    if (!displayCondition.conditions || displayCondition.conditions.length === 0) {
      return false;
    }

    // 递归判断每个子条件
    const results = displayCondition.conditions.map((condition) =>
      shouldDisplayQuestion(condition, answers)
    );

    // AND：所有条件都满足
    if (displayCondition.type === 'and') {
      return results.every((result) => result === true);
    }

    // OR：至少一个条件满足
    if (displayCondition.type === 'or') {
      return results.some((result) => result === true);
    }
  }

  // 未知条件类型，默认隐藏
  return false;
}
