'use client';

/**
 * OptionEditor - 选择题选项编辑组件
 *
 * 用于编辑单选题和多选题的选项
 */

import { useState, useEffect } from 'react';
import { Input, InputNumber, Button, Space, App, Tooltip } from 'antd';
import { PlusOutlined, DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';
import type { QuestionOption } from '../../services/questions';
import { QuestionType } from '../../services/questions';

// ============================================================================
// 类型定义
// ============================================================================

export interface OptionEditorProps {
  /** 题目类型 */
  questionType: QuestionType;
  /** 选项列表 */
  value?: QuestionOption[];
  /** 选项变化回调 */
  onChange?: (options: QuestionOption[]) => void;
  /** 是否禁用 */
  disabled?: boolean;
}

// ============================================================================
// 辅助函数
// ============================================================================

/** 生成唯一ID */
function generateId(): string {
  return `opt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// ============================================================================
// 组件实现
// ============================================================================

export function OptionEditor({
  questionType,
  value = [],
  onChange,
  disabled = false,
}: OptionEditorProps) {
  const { message } = App.useApp();
  const [options, setOptions] = useState<QuestionOption[]>(value);

  // 监听外部value变化，同步到本地状态
  useEffect(() => {
    if (value && value.length > 0) {
      setOptions(value);
    }
  }, [value]);

  // 更新选项到父组件
  const updateOptions = (newOptions: QuestionOption[]) => {
    setOptions(newOptions);
    onChange?.(newOptions);
  };

  // 添加新选项
  const handleAddOption = () => {
    const newOption: QuestionOption = {
      id: generateId(),
      text: '',
      isCorrect: false,  // 保留兼容性
      score: 0,          // 默认分数为0
    };
    updateOptions([...options, newOption]);
  };

  // 删除选项
  const handleDeleteOption = (id: string) => {
    if (options.length <= 2) {
      message.warning('至少需要保留2个选项');
      return;
    }
    updateOptions(options.filter((opt) => opt.id !== id));
  };

  // 更新选项文本
  const handleOptionTextChange = (id: string, text: string) => {
    updateOptions(
      options.map((opt) => (opt.id === id ? { ...opt, text } : opt))
    );
  };

  // 更新选项分数
  const handleScoreChange = (id: string, score: number | null) => {
    updateOptions(
      options.map((opt) => (opt.id === id ? { ...opt, score: score || 0 } : opt))
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-gray-700 flex items-center">
          选项设置 <span className="text-red-500">*</span>
          <Tooltip title="为每个选项设置分数，用于心理测试评分（0-100分）">
            <InfoCircleOutlined className="ml-1 text-gray-400" />
          </Tooltip>
        </div>
        <Button
          type="dashed"
          size="small"
          icon={<PlusOutlined />}
          onClick={handleAddOption}
          disabled={disabled}
        >
          添加选项
        </Button>
      </div>

      <div className="space-y-2">
        {options.map((option, index) => (
          <div key={option.id} className="flex items-center space-x-2">
            {/* 选项序号 */}
            <div className="w-8 text-center font-medium text-gray-600">
              {String.fromCharCode(65 + index)}
            </div>

            {/* 选项文本输入 */}
            <Input
              placeholder={`选项 ${String.fromCharCode(65 + index)} 内容`}
              value={option.text}
              onChange={(e) => handleOptionTextChange(option.id, e.target.value)}
              disabled={disabled}
              className="flex-1"
            />

            {/* 分数输入 */}
            <InputNumber
              min={0}
              max={100}
              value={option.score || 0}
              onChange={(value) => handleScoreChange(option.id, value)}
              disabled={disabled}
              placeholder="分数"
              addonAfter="分"
              style={{ width: 100 }}
            />

            {/* 删除按钮 */}
            <Button
              type="text"
              danger
              size="small"
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteOption(option.id)}
              disabled={disabled || options.length <= 2}
            />
          </div>
        ))}
      </div>

      <div className="text-xs text-gray-500 bg-blue-50 p-2 rounded">
        💡 提示：为每个选项设置分数（0-100分），用于心理测试的量化评分。不同选项可以有不同的分数。
      </div>
    </div>
  );
}

export default OptionEditor;
