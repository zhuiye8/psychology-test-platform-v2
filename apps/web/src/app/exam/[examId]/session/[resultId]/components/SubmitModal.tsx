'use client';

/**
 * SubmitModal - 提交确认对话框组件
 *
 * 功能：
 * - 显示提交确认对话框
 * - 显示答题统计信息
 * - 提交/取消操作
 */

import { Modal } from 'antd';

// ============================================================================
// 类型定义
// ============================================================================

export interface SubmitModalProps {
  /** 是否显示 */
  open: boolean;
  /** 已答题数 */
  answeredCount: number;
  /** 总题数 */
  totalQuestions: number;
  /** 提交中状态 */
  loading: boolean;
  /** 确认回调 */
  onConfirm: () => void;
  /** 取消回调 */
  onCancel: () => void;
}

// ============================================================================
// 组件实现
// ============================================================================

export function SubmitModal({
  open,
  answeredCount,
  totalQuestions,
  loading,
  onConfirm,
  onCancel,
}: SubmitModalProps) {
  return (
    <Modal
      title="确认提交考试？"
      open={open}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="确定提交"
      cancelText="继续答题"
      confirmLoading={loading}
      centered
    >
      <p>您已回答 {answeredCount} / {totalQuestions} 题，确定要提交吗？</p>
      <p className="text-gray-500 text-sm">提交后将无法修改答案</p>
    </Modal>
  );
}
