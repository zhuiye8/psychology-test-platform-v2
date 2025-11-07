'use client';

/**
 * QuestionEditor - 题目编辑器组件
 *
 * 集成题目类型选择和选项编辑功能的完整编辑器
 */

import { useEffect } from 'react';
import { Form, Input, InputNumber, Switch, Divider, Collapse } from 'antd';
import type { FormInstance } from 'antd';
import { FormModal } from '../ui-kit';
import { QuestionTypeSelector } from './QuestionTypeSelector';
import { OptionEditor } from './OptionEditor';
import { ConditionBuilder } from './ConditionBuilder';
import {
  QuestionType,
  type CreateQuestionDto,
  type Question,
} from '../../services/questions';
import { QuestionCircleOutlined } from '@ant-design/icons';
import type { DisplayCondition } from '@/types/condition';

// ============================================================================
// 类型定义
// ============================================================================

export interface QuestionEditorProps {
  /** 是否显示编辑器 */
  open: boolean;
  /** 表单实例 */
  form: FormInstance<CreateQuestionDto>;
  /** 加载状态 */
  loading?: boolean;
  /** 编辑模式（创建/编辑） */
  mode?: 'create' | 'edit';
  /** 初始数据（编辑模式） */
  initialData?: Question;
  /** 可用的题目列表（用于配置显示条件） */
  availableQuestions?: Question[];
  /** 当前题目ID（编辑模式，用于过滤） */
  currentQuestionId?: string;
  /** 关闭回调 */
  onCancel: () => void;
  /** 提交回调 */
  onFinish: (values: CreateQuestionDto) => void | Promise<void>;
}

// ============================================================================
// 组件实现
// ============================================================================

export function QuestionEditor({
  open,
  form,
  loading = false,
  mode = 'create',
  initialData,
  availableQuestions = [],
  currentQuestionId,
  onCancel,
  onFinish,
}: QuestionEditorProps) {
  // 监听题目类型变化
  const questionType = Form.useWatch('type', form);
  // ✨ 监听题目分值变化（用于超分警告）
  const questionPoints = Form.useWatch('points', form);

  // 判断是否为选择题
  const isChoiceQuestion =
    questionType === QuestionType.SINGLE_CHOICE ||
    questionType === QuestionType.MULTIPLE_CHOICE;

  // 初始化表单数据（编辑模式）
  useEffect(() => {
    if (open && mode === 'edit' && initialData) {
      form.setFieldsValue(initialData);
    }
  }, [open, mode, initialData, form]);

  // 处理表单提交
  const handleFinish = async (values: CreateQuestionDto) => {
    // 验证选择题必须有选项
    if (isChoiceQuestion) {
      if (!values.options || values.options.length < 2) {
        form.setFields([
          {
            name: 'options',
            errors: ['选择题至少需要2个选项'],
          },
        ]);
        return;
      }

      // 验证所有选项都有文本内容
      const hasEmptyOption = values.options.some((opt) => !opt.text || opt.text.trim() === '');
      if (hasEmptyOption) {
        form.setFields([
          {
            name: 'options',
            errors: ['所有选项都必须填写内容'],
          },
        ]);
        return;
      }
    }

    await onFinish(values);
  };

  return (
    <FormModal
      title={mode === 'create' ? '创建新题目' : '编辑题目'}
      open={open}
      form={form}
      loading={loading}
      width={800}
      okText={mode === 'create' ? '创建题目' : '保存修改'}
      okIcon={<QuestionCircleOutlined />}
      onCancel={onCancel}
      onFinish={handleFinish}
    >
      {/* 题目类型选择 */}
      <Form.Item
        label="题目类型"
        name="type"
        rules={[{ required: true, message: '请选择题目类型' }]}
        initialValue={QuestionType.SINGLE_CHOICE}
      >
        <QuestionTypeSelector />
      </Form.Item>

      <Divider />

      {/* 题目标题 */}
      <Form.Item
        label="题目标题"
        name="title"
        rules={[
          { required: true, message: '请输入题目标题' },
          { max: 500, message: '题目标题不能超过500个字符' },
        ]}
      >
        <Input.TextArea
          rows={3}
          placeholder="请输入题目内容..."
          showCount
          maxLength={500}
        />
      </Form.Item>

      {/* 题目描述（可选） */}
      <Form.Item
        label="题目描述"
        name="description"
        tooltip="可选的补充说明或提示信息"
      >
        <Input.TextArea
          rows={2}
          placeholder="可选：题目的补充说明或提示信息..."
          maxLength={1000}
        />
      </Form.Item>

      {/* 题目维度（可选） */}
      <Form.Item
        label="题目维度"
        name="dimension"
        tooltip="可选：心理测试的维度分类，如'家庭生活'、'学业表现'等"
      >
        <Input
          placeholder="可选：如'家庭生活'、'学业表现'、'同伴压力'等..."
          maxLength={100}
          showCount
        />
      </Form.Item>

      {/* 选项编辑（仅选择题） */}
      {isChoiceQuestion && (
        <Form.Item
          name="options"
          rules={[{ required: true, message: '请添加选项' }]}
        >
          <OptionEditor questionType={questionType} questionPoints={questionPoints} />
        </Form.Item>
      )}

      {/* 答案解析 */}
      <Form.Item label="答案解析" name="explanation" tooltip="答题后显示的解析内容">
        <Input.TextArea
          rows={3}
          placeholder="可选：答题后显示的正确答案解析..."
          maxLength={1000}
        />
      </Form.Item>

      {/* 显示条件配置（高级功能） */}
      {availableQuestions.length > 0 && (
        <Collapse
          ghost
          items={[
            {
              key: 'condition',
              label: '显示条件（高级功能）',
              children: (
                <Form.Item
                  name="displayCondition"
                  tooltip="配置此题目的显示条件，可以根据前面题目的答案决定是否显示"
                >
                  <ConditionBuilder
                    availableQuestions={availableQuestions}
                    currentQuestionId={currentQuestionId}
                  />
                </Form.Item>
              ),
            },
          ]}
        />
      )}

      <Divider />

      {/* 高级设置 */}
      <div className="grid grid-cols-3 gap-4">
        <Form.Item
          label="题目分值"
          name="points"
          initialValue={1}
          tooltip="该题目的得分"
        >
          <InputNumber min={0} max={100} className="w-full" addonAfter="分" />
        </Form.Item>

        <Form.Item
          label="题目序号"
          name="order"
          initialValue={0}
          tooltip="用于排序，数字越小越靠前"
        >
          <InputNumber min={0} max={9999} className="w-full" />
        </Form.Item>

        <Form.Item
          label="是否必答"
          name="required"
          initialValue={true}
          valuePropName="checked"
        >
          <Switch checkedChildren="必答" unCheckedChildren="选答" />
        </Form.Item>
      </div>
    </FormModal>
  );
}

export default QuestionEditor;
