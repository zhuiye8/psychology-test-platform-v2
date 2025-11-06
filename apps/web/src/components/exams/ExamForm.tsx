'use client';

/**
 * ExamForm - 考试创建/编辑表单组件
 *
 * 用于创建新考试或编辑草稿状态的考试
 */

import { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Switch, Select, DatePicker, Divider, App } from 'antd';
import type { FormInstance } from 'antd';
import dayjs from 'dayjs';
import { FormModal } from '../ui-kit';
import { ExperimentOutlined } from '@ant-design/icons';
import type { CreateExamDto, Exam } from '../../services/exams';
import papersApi, { type Paper } from '../../services/papers';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

// ============================================================================
// 类型定义
// ============================================================================

export interface ExamFormProps {
  /** 是否显示表单 */
  open: boolean;
  /** 表单实例 */
  form: FormInstance<CreateExamDto>;
  /** 加载状态 */
  loading?: boolean;
  /** 编辑模式（创建/编辑） */
  mode?: 'create' | 'edit';
  /** 初始数据（编辑模式） */
  initialData?: Exam;
  /** 关闭回调 */
  onCancel: () => void;
  /** 提交回调 */
  onFinish: (values: CreateExamDto) => void | Promise<void>;
}

// ============================================================================
// 组件实现
// ============================================================================

export function ExamForm({
  open,
  form,
  loading = false,
  mode = 'create',
  initialData,
  onCancel,
  onFinish,
}: ExamFormProps) {
  const { message } = App.useApp();

  // --------------------------------------------------------------------------
  // State 状态管理
  // --------------------------------------------------------------------------

  const [papers, setPapers] = useState<Paper[]>([]);
  const [loadingPapers, setLoadingPapers] = useState(false);

  // --------------------------------------------------------------------------
  // 数据加载
  // --------------------------------------------------------------------------

  /** 加载试卷列表 */
  const loadPapers = async () => {
    try {
      setLoadingPapers(true);
      const response = await papersApi.list({ limit: 100 });
      setPapers(response.data);
    } catch (error) {
      message.error('加载试卷列表失败');
      console.error(error);
    } finally {
      setLoadingPapers(false);
    }
  };

  // --------------------------------------------------------------------------
  // 生命周期 Effects
  // --------------------------------------------------------------------------

  /** 对话框打开时加载数据 */
  useEffect(() => {
    if (open) {
      loadPapers();

      // 编辑模式：设置初始值
      if (mode === 'edit' && initialData) {
        const { startTime, endTime, ...restData } = initialData;
        form.setFieldsValue({
          ...restData,
          timeRange: [dayjs(startTime), dayjs(endTime)],
        } as any);
      }
    }
  }, [open, mode, initialData]);

  // --------------------------------------------------------------------------
  // 事件处理函数
  // --------------------------------------------------------------------------

  /** 处理表单提交 */
  const handleFinish = async (values: any) => {
    // 转换时间范围为startTime和endTime
    const [startTime, endTime] = values.timeRange || [];
    if (!startTime || !endTime) {
      message.error('请选择考试时间范围');
      return;
    }

    // 移除UI专用字段timeRange，添加API需要的startTime和endTime
    const { timeRange, ...restValues } = values;
    const submitData: CreateExamDto = {
      ...restValues,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
    };

    // 编辑模式：移除paperId（试卷创建后不可更改）
    if (mode === 'edit' && 'paperId' in submitData) {
      delete (submitData as any).paperId;
    }

    await onFinish(submitData);
  };

  // --------------------------------------------------------------------------
  // 渲染 JSX
  // --------------------------------------------------------------------------

  return (
    <FormModal
      title={mode === 'create' ? '创建新考试' : '编辑考试'}
      open={open}
      form={form}
      loading={loading}
      width={800}
      okText={mode === 'create' ? '创建考试' : '保存修改'}
      okIcon={<ExperimentOutlined />}
      onCancel={onCancel}
      onFinish={handleFinish}
    >
      {/* 选择试卷 */}
      <Form.Item
        label="选择试卷"
        name="paperId"
        rules={[{ required: true, message: '请选择试卷' }]}
      >
        <Select
          placeholder="请选择要发布的试卷"
          loading={loadingPapers}
          showSearch
          optionFilterProp="children"
          disabled={mode === 'edit'} // 编辑模式不可修改试卷
        >
          {papers.map((paper) => (
            <Select.Option key={paper.id} value={paper.id}>
              {paper.title}
              {paper._count && ` (${paper._count.questions} 题)`}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      {/* 考试标题 */}
      <Form.Item
        label="考试标题"
        name="title"
        rules={[
          { required: true, message: '请输入考试标题' },
          { max: 200, message: '标题不能超过200个字符' },
        ]}
      >
        <Input placeholder="例如：2025年春季心理测评" maxLength={200} showCount />
      </Form.Item>

      {/* 考试描述 */}
      <Form.Item label="考试描述" name="description">
        <TextArea
          rows={3}
          placeholder="可选：考试的详细说明..."
          maxLength={500}
        />
      </Form.Item>

      {/* 考试时间范围 */}
      <Form.Item
        label="考试时间"
        name="timeRange"
        rules={[{ required: true, message: '请选择考试时间范围' }]}
      >
        <RangePicker
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          className="w-full"
          placeholder={['开始时间', '结束时间']}
        />
      </Form.Item>

      <Divider />

      {/* 高级设置 */}
      <div className="grid grid-cols-2 gap-4">
        {/* 时间限制 */}
        <Form.Item
          label="答题时间限制"
          name="timeLimit"
          tooltip="单个学生完成考试的最大时长（分钟）"
        >
          <InputNumber
            min={1}
            max={180}
            placeholder="默认试卷时限"
            className="w-full"
            addonAfter="分钟"
          />
        </Form.Item>

        {/* 最大尝试次数 */}
        <Form.Item
          label="最大尝试次数"
          name="maxAttempts"
          initialValue={1}
          tooltip="每个学生可以参加考试的次数"
        >
          <InputNumber min={1} max={10} className="w-full" addonAfter="次" />
        </Form.Item>

        {/* 访问码 */}
        <Form.Item
          label="访问码"
          name="accessCode"
          tooltip="学生需要输入访问码才能参加考试"
        >
          <Input placeholder="可选：设置访问码" maxLength={20} />
        </Form.Item>
      </div>

      <Divider />

      {/* 监控设置 */}
      <div className="grid grid-cols-3 gap-4">
        <Form.Item
          label="需要摄像头"
          name="requireCamera"
          initialValue={false}
          valuePropName="checked"
        >
          <Switch checkedChildren="是" unCheckedChildren="否" />
        </Form.Item>

        <Form.Item
          label="需要麦克风"
          name="requireMicrophone"
          initialValue={false}
          valuePropName="checked"
        >
          <Switch checkedChildren="是" unCheckedChildren="否" />
        </Form.Item>

        <Form.Item
          label="启用AI分析"
          name="enableAIAnalysis"
          initialValue={false}
          valuePropName="checked"
        >
          <Switch checkedChildren="启用" unCheckedChildren="关闭" />
        </Form.Item>
      </div>
    </FormModal>
  );
}

export default ExamForm;
