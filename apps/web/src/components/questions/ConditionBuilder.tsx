/**
 * Condition Builder Component
 *
 * 条件逻辑构建器（可视化配置显示条件）
 */

import { useState, useEffect } from 'react';
import { Card, Select, Button, Space, Radio, Alert, Empty } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import type {
  DisplayCondition,
  SimpleCondition,
  ConditionGroup,
  ConditionGroupType,
} from '@/types/condition';
import { isSimpleCondition, isConditionGroup } from '@/types/condition';
import type { Question } from '@/services/questions';

// ============================================================================
// 类型定义
// ============================================================================

export interface ConditionBuilderProps {
  /** 当前条件 */
  value?: DisplayCondition;
  /** 条件变化回调 */
  onChange?: (value: DisplayCondition) => void;
  /** 可用的题目列表（用于选择依赖题目） */
  availableQuestions: Question[];
  /** 当前题目ID（用于过滤） */
  currentQuestionId?: string;
}

// ============================================================================
// 主组件
// ============================================================================

export function ConditionBuilder({
  value,
  onChange,
  availableQuestions,
  currentQuestionId,
}: ConditionBuilderProps) {
  const [condition, setCondition] = useState<DisplayCondition>(value || null);

  // 同步外部value
  useEffect(() => {
    setCondition(value || null);
  }, [value]);

  // 条件变化时通知父组件
  const handleConditionChange = (newCondition: DisplayCondition) => {
    setCondition(newCondition);
    onChange?.(newCondition);
  };

  // 过滤可用题目（排除当前题目和之后的题目）
  const filteredQuestions = availableQuestions.filter(
    (q) => q.id !== currentQuestionId
  );

  if (filteredQuestions.length === 0) {
    return (
      <Alert
        message="提示"
        description="暂无可用的依赖题目，请先创建其他题目"
        type="info"
        showIcon
      />
    );
  }

  return (
    <Card size="small" title="显示条件配置" className="mb-4">
      {!condition ? (
        <Empty
          description="未配置显示条件，此题目将始终显示"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        >
          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => handleConditionChange({ questionId: '', selectedOption: '' })}
            >
              添加简单条件
            </Button>
            <Button
              icon={<PlusOutlined />}
              onClick={() =>
                handleConditionChange({
                  type: 'and',
                  conditions: [{ questionId: '', selectedOption: '' }],
                })
              }
            >
              添加条件组（AND）
            </Button>
          </Space>
        </Empty>
      ) : (
        <Space direction="vertical" className="w-full">
          {renderCondition(condition, handleConditionChange, filteredQuestions)}
          <Button danger icon={<DeleteOutlined />} onClick={() => handleConditionChange(null)}>
            清除所有条件
          </Button>
        </Space>
      )}
    </Card>
  );
}

// ============================================================================
// 辅助渲染函数
// ============================================================================

/** 渲染条件（递归） */
function renderCondition(
  condition: SimpleCondition | ConditionGroup,
  onChange: (newCondition: DisplayCondition) => void,
  availableQuestions: Question[]
): React.ReactNode {
  if (isSimpleCondition(condition)) {
    return renderSimpleCondition(condition, onChange, availableQuestions);
  }

  if (isConditionGroup(condition)) {
    return renderConditionGroup(condition, onChange, availableQuestions);
  }

  return null;
}

/** 渲染简单条件 */
function renderSimpleCondition(
  condition: SimpleCondition,
  onChange: (newCondition: DisplayCondition) => void,
  availableQuestions: Question[]
): React.ReactNode {
  const selectedQuestion = availableQuestions.find((q) => q.id === condition.questionId);

  return (
    <Space>
      <Select
        placeholder="选择依赖题目"
        style={{ width: 200 }}
        value={condition.questionId || undefined}
        onChange={(questionId) =>
          onChange({
            ...condition,
            questionId,
            selectedOption: '', // 重置选项
          })
        }
        options={availableQuestions.map((q) => ({
          label: q.title,
          value: q.id,
        }))}
      />
      <span>=</span>
      <Select
        placeholder="选择选项"
        style={{ width: 200 }}
        value={condition.selectedOption || undefined}
        onChange={(selectedOption) =>
          onChange({
            ...condition,
            selectedOption,
          })
        }
        disabled={!selectedQuestion}
        options={
          selectedQuestion?.options
            ? (selectedQuestion.options as any[]).map((opt: any) => ({
                label: opt.text,
                value: opt.id,
              }))
            : []
        }
      />
    </Space>
  );
}

/** 渲染条件组 */
function renderConditionGroup(
  group: ConditionGroup,
  onChange: (newCondition: DisplayCondition) => void,
  availableQuestions: Question[]
): React.ReactNode {
  const updateGroup = (updates: Partial<ConditionGroup>) => {
    onChange({ ...group, ...updates });
  };

  const updateCondition = (index: number, newCondition: SimpleCondition | ConditionGroup) => {
    const newConditions = [...group.conditions];
    newConditions[index] = newCondition;
    updateGroup({ conditions: newConditions });
  };

  const addCondition = () => {
    updateGroup({
      conditions: [...group.conditions, { questionId: '', selectedOption: '' }],
    });
  };

  const removeCondition = (index: number) => {
    const newConditions = group.conditions.filter((_, i) => i !== index);
    if (newConditions.length === 0) {
      onChange(null);
    } else {
      updateGroup({ conditions: newConditions });
    }
  };

  return (
    <Card size="small" type="inner" title="条件组">
      <Space direction="vertical" className="w-full">
        {/* 逻辑类型选择 */}
        <div>
          <span className="mr-2">逻辑关系：</span>
          <Radio.Group
            value={group.type}
            onChange={(e) => updateGroup({ type: e.target.value as ConditionGroupType })}
          >
            <Radio.Button value="and">AND（且）</Radio.Button>
            <Radio.Button value="or">OR（或）</Radio.Button>
          </Radio.Group>
        </div>

        {/* 条件列表 */}
        {group.conditions.map((cond, index) => (
          <Space key={index} className="w-full">
            {renderCondition(cond, (newCond) => updateCondition(index, newCond as any), availableQuestions)}
            <Button
              danger
              size="small"
              icon={<DeleteOutlined />}
              onClick={() => removeCondition(index)}
            >
              删除
            </Button>
          </Space>
        ))}

        {/* 添加条件按钮 */}
        <Button type="dashed" icon={<PlusOutlined />} onClick={addCondition}>
          添加条件
        </Button>
      </Space>
    </Card>
  );
}
