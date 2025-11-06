'use client';

/**
 * FormModal - 通用表单对话框组件
 *
 * 用于创建和编辑数据的模态框组件，内置表单管理和状态处理
 */

import { Modal, Form, Button, Space } from 'antd';
import type { FormInstance, FormProps } from 'antd';
import type { ReactNode } from 'react';

// ============================================================================
// 类型定义
// ============================================================================

export interface FormModalProps<T = any> {
  /** 对话框标题 */
  title: string;
  /** 是否显示对话框 */
  open: boolean;
  /** 表单实例 */
  form: FormInstance<T>;
  /** 加载状态 */
  loading?: boolean;
  /** 对话框宽度 */
  width?: number | string;
  /** 表单布局 */
  layout?: FormProps['layout'];
  /** 确认按钮文本 */
  okText?: string;
  /** 取消按钮文本 */
  cancelText?: string;
  /** 确认按钮图标 */
  okIcon?: ReactNode;
  /** 子元素（表单项） */
  children: ReactNode;
  /** 关闭对话框回调 */
  onCancel: () => void;
  /** 表单提交回调 */
  onFinish: (values: T) => void | Promise<void>;
}

// ============================================================================
// 组件实现
// ============================================================================

export function FormModal<T = any>({
  title,
  open,
  form,
  loading = false,
  width = 600,
  layout = 'vertical',
  okText = '确定',
  cancelText = '取消',
  okIcon,
  children,
  onCancel,
  onFinish,
}: FormModalProps<T>) {
  // 处理表单提交
  const handleFinish = async (values: T) => {
    await onFinish(values);
  };

  // 处理对话框关闭
  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title={title}
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={width}
      afterClose={() => form.resetFields()}
    >
      <Form
        form={form}
        layout={layout}
        onFinish={handleFinish}
        disabled={loading}
      >
        {children}

        <Form.Item className="mb-0 mt-6 flex justify-end">
          <Space>
            <Button onClick={handleCancel} disabled={loading}>
              {cancelText}
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              icon={okIcon}
            >
              {okText}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default FormModal;
