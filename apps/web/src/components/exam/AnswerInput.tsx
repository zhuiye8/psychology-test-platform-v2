'use client';

/**
 * AnswerInput - 答题输入组件
 *
 * 根据题目类型显示不同的输入方式：单选、多选、文本、问答
 */

import { Radio, Checkbox, Input } from 'antd';
import type { RadioChangeEvent, CheckboxChangeEvent } from 'antd';
import type { Question, QuestionType } from '../../services/questions';

const { TextArea } = Input;

// ============================================================================
// 类型定义
// ============================================================================

export interface AnswerValue {
  selectedOptions?: string[];
  textAnswer?: string;
}

export interface AnswerInputProps {
  /** 题目数据 */
  question: Question;
  /** 当前答案 */
  value?: AnswerValue;
  /** 答案变化回调 */
  onChange?: (value: AnswerValue) => void;
  /** 是否禁用 */
  disabled?: boolean;
}

// ============================================================================
// 组件实现
// ============================================================================

export function AnswerInput({
  question,
  value = {},
  onChange,
  disabled = false,
}: AnswerInputProps) {
  // --------------------------------------------------------------------------
  // 事件处理函数
  // --------------------------------------------------------------------------

  /** 处理单选变化 */
  const handleRadioChange = (e: RadioChangeEvent) => {
    onChange?.({
      selectedOptions: [e.target.value],
      textAnswer: undefined,
    });
  };

  /** 处理多选变化 */
  const handleCheckboxChange = (checkedValues: string[]) => {
    onChange?.({
      selectedOptions: checkedValues,
      textAnswer: undefined,
    });
  };

  /** 处理文本输入变化 */
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange?.({
      selectedOptions: undefined,
      textAnswer: e.target.value,
    });
  };

  // --------------------------------------------------------------------------
  // 渲染不同题型的输入组件
  // --------------------------------------------------------------------------

  /** 单选题 */
  if (question.type === 'SINGLE_CHOICE') {
    return (
      <Radio.Group
        value={value.selectedOptions?.[0]}
        onChange={handleRadioChange}
        disabled={disabled}
        className="w-full"
      >
        <div className="space-y-3">
          {question.options?.map((option, index) => (
            <Radio key={option.id} value={option.id} className="flex items-start">
              <div className="flex-1">
                <span className="font-medium mr-2">
                  {String.fromCharCode(65 + index)}.
                </span>
                <span>{option.text}</span>
              </div>
            </Radio>
          ))}
        </div>
      </Radio.Group>
    );
  }

  /** 多选题 */
  if (question.type === 'MULTIPLE_CHOICE') {
    return (
      <Checkbox.Group
        value={value.selectedOptions || []}
        onChange={handleCheckboxChange}
        disabled={disabled}
        className="w-full"
      >
        <div className="space-y-3">
          {question.options?.map((option, index) => (
            <Checkbox key={option.id} value={option.id} className="flex items-start">
              <div className="flex-1">
                <span className="font-medium mr-2">
                  {String.fromCharCode(65 + index)}.
                </span>
                <span>{option.text}</span>
              </div>
            </Checkbox>
          ))}
        </div>
      </Checkbox.Group>
    );
  }

  /** 文本题（短答案） */
  if (question.type === 'TEXT') {
    return (
      <Input
        value={value.textAnswer || ''}
        onChange={handleTextChange}
        disabled={disabled}
        placeholder="请输入答案..."
        size="large"
        maxLength={200}
        showCount
      />
    );
  }

  /** 问答题（长文本） */
  if (question.type === 'ESSAY') {
    return (
      <TextArea
        value={value.textAnswer || ''}
        onChange={handleTextChange}
        disabled={disabled}
        placeholder="请输入答案..."
        rows={6}
        maxLength={2000}
        showCount
      />
    );
  }

  return null;
}

export default AnswerInput;
