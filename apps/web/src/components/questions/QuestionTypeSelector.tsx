'use client';

/**
 * QuestionTypeSelector - 题目类型选择组件
 *
 * 用于选择题目类型（单选/多选/文本/问答）
 */

import { Radio, Card } from 'antd';
import type { RadioChangeEvent } from 'antd';
import {
  CheckCircleOutlined,
  CheckSquareOutlined,
  EditOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { QuestionType } from '../../services/questions';

// ============================================================================
// 类型定义
// ============================================================================

export interface QuestionTypeSelectorProps {
  /** 当前选中的题目类型 */
  value?: QuestionType;
  /** 类型变化回调 */
  onChange?: (type: QuestionType) => void;
  /** 是否禁用 */
  disabled?: boolean;
}

// ============================================================================
// 常量定义
// ============================================================================

// ✨ 仅支持选择题类型（暂不支持主观题自动评分）
const QUESTION_TYPE_OPTIONS = [
  {
    value: QuestionType.SINGLE_CHOICE,
    label: '单选题',
    icon: <CheckCircleOutlined />,
    description: '从多个选项中选择一个正确答案',
  },
  {
    value: QuestionType.MULTIPLE_CHOICE,
    label: '多选题',
    icon: <CheckSquareOutlined />,
    description: '从多个选项中选择一个或多个正确答案',
  },
  // ❌ TEXT和ESSAY暂时隐藏（需要手动评分功能）
  // {
  //   value: QuestionType.TEXT,
  //   label: '文本题',
  //   icon: <EditOutlined />,
  //   description: '简短文本输入（用于填空、简答等）',
  // },
  // {
  //   value: QuestionType.ESSAY,
  //   label: '问答题',
  //   icon: <FileTextOutlined />,
  //   description: '长文本输入（用于论述、作文等）',
  // },
];

// ============================================================================
// 组件实现
// ============================================================================

export function QuestionTypeSelector({
  value,
  onChange,
  disabled = false,
}: QuestionTypeSelectorProps) {
  const handleCardClick = (type: QuestionType) => {
    if (!disabled) {
      onChange?.(type);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {QUESTION_TYPE_OPTIONS.map((option) => (
        <Card
          key={option.value}
          size="small"
          hoverable={!disabled}
          className={`cursor-pointer transition-all ${
            value === option.value
              ? 'border-2 border-blue-500 bg-blue-50'
              : 'border border-gray-200 hover:border-blue-300'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => handleCardClick(option.value)}
        >
          <div className="flex items-start space-x-2">
            <div className={`text-xl mt-1 ${value === option.value ? 'text-blue-500' : 'text-gray-600'}`}>
              {option.icon}
            </div>
            <div className="flex-1">
              <div className={`font-medium ${value === option.value ? 'text-blue-600' : 'text-gray-900'}`}>
                {option.label}
              </div>
              <div className="text-xs text-gray-500 mt-1">{option.description}</div>
            </div>
            {value === option.value && (
              <div className="text-blue-500">
                <CheckCircleOutlined />
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}

export default QuestionTypeSelector;
