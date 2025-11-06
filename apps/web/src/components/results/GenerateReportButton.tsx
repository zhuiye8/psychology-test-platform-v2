/**
 * 生成AI报告按钮组件
 *
 * 功能：
 * - 触发LLM报告生成
 * - 显示生成进度
 * - 错误处理和重试
 */

'use client';

import { useState } from 'react';
import { Button, Modal, Select, Progress, Space, Alert, App, Spin } from 'antd';
import { FileTextOutlined, ReloadOutlined, WarningOutlined } from '@ant-design/icons';
import aiReportsApi, { type ReportType } from '../../services/aiReports';
import aiApi from '../../services/ai';

// ============================================================================
// 类型定义
// ============================================================================

export interface GenerateReportButtonProps {
  examResultId: string;
  /** 按钮文字（可选） */
  buttonText?: string;
  /** 按钮类型（可选） */
  buttonType?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
  /** 按钮大小（可选） */
  buttonSize?: 'small' | 'middle' | 'large';
  /** 只显示图标（可选） */
  iconOnly?: boolean;
  /** 生成成功回调（可选） */
  onSuccess?: () => void;
  /** 禁用按钮（可选） */
  disabled?: boolean;
}

// ============================================================================
// 主组件
// ============================================================================

export function GenerateReportButton({
  examResultId,
  buttonText = '生成AI报告',
  buttonType = 'primary',
  buttonSize = 'middle',
  iconOnly = false,
  onSuccess,
  disabled = false,
}: GenerateReportButtonProps) {
  const { message } = App.useApp();

  const [showModal, setShowModal] = useState(false);
  const [reportType, setReportType] = useState<ReportType>('comprehensive');
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);
  const [hasAiData, setHasAiData] = useState<boolean | null>(null);

  // 打开Modal前检查AI数据是否存在
  const handleOpenModal = async () => {
    try {
      setChecking(true);
      setShowModal(true);
      setError(null);
      setProgress(0);
      setCurrentStep('');
      setHasAiData(null);

      // 检查该考试结果是否有AI分析数据
      const checkResult = await aiApi.checkAiAnalysis(examResultId);
      setHasAiData(checkResult.hasAiAnalysis);

      if (!checkResult.hasAiAnalysis) {
        setError('该考试未启用AI监控或数据尚未生成，无法生成报告');
      }
    } catch (err: any) {
      console.error('检查AI数据失败:', err);
      setError('检查AI数据失败，请稍后重试');
      setHasAiData(false);
    } finally {
      setChecking(false);
    }
  };

  // 生成报告
  const handleGenerate = async () => {
    try {
      setGenerating(true);
      setError(null);
      setProgress(10);
      setCurrentStep('正在提交请求...');

      // 调用API生成报告
      await aiReportsApi.generateReport(examResultId, { reportType });

      setProgress(100);
      setCurrentStep('报告生成完成！');
      message.success('AI报告生成成功');

      // 延迟关闭Modal
      setTimeout(() => {
        setShowModal(false);
        setGenerating(false);
        onSuccess?.();
      }, 1000);
    } catch (err: any) {
      console.error('生成报告失败:', err);
      const errorMsg = err.response?.data?.error || err.message || '生成失败';
      setError(errorMsg);
      setProgress(0);
      setCurrentStep('');
      message.error(`生成报告失败: ${errorMsg}`);
    } finally {
      if (error) {
        setGenerating(false);
      }
    }
  };

  // 重试
  const handleRetry = () => {
    setError(null);
    handleGenerate();
  };

  return (
    <>
      {/* 触发按钮 */}
      <Button
        type={buttonType}
        size={buttonSize}
        icon={<FileTextOutlined />}
        onClick={handleOpenModal}
        disabled={disabled}
      >
        {!iconOnly && buttonText}
      </Button>

      {/* 生成报告Modal */}
      <Modal
        title="生成AI心理分析报告"
        open={showModal}
        onCancel={() => !generating && setShowModal(false)}
        footer={
          checking ? null : hasAiData === false ? (
            <Button onClick={() => setShowModal(false)}>关闭</Button>
          ) : error ? (
            <Space>
              <Button onClick={() => setShowModal(false)}>关闭</Button>
              <Button type="primary" icon={<ReloadOutlined />} onClick={handleRetry}>
                重试
              </Button>
            </Space>
          ) : generating ? (
            <Button onClick={() => setShowModal(false)} disabled>
              生成中...
            </Button>
          ) : (
            <Space>
              <Button onClick={() => setShowModal(false)}>取消</Button>
              <Button type="primary" onClick={handleGenerate}>
                开始生成
              </Button>
            </Space>
          )
        }
        closable={!generating}
        maskClosable={!generating}
      >
        <div className="space-y-4">
          {/* 检查AI数据中 */}
          {checking && (
            <div className="flex items-center justify-center py-8">
              <Spin tip="检查AI数据...">
                <div />
              </Spin>
            </div>
          )}

          {/* 无AI数据提示 */}
          {!checking && hasAiData === false && error && (
            <Alert
              type="warning"
              icon={<WarningOutlined />}
              message="无法生成报告"
              description={
                <div>
                  <div className="mb-2">{error}</div>
                  <div className="text-sm text-gray-600">
                    提示：只有启用了AI监控且学生完成考试的结果才能生成心理分析报告
                  </div>
                </div>
              }
              showIcon
            />
          )}

          {/* 报告类型选择 */}
          {!checking && !generating && !error && hasAiData && (
            <div>
              <div className="mb-2 font-medium">选择报告类型：</div>
              <Select
                value={reportType}
                onChange={setReportType}
                style={{ width: '100%' }}
                options={[
                  {
                    value: 'comprehensive',
                    label: '综合报告',
                    description: '题目级分析 + 异常解读（推荐）',
                  },
                  {
                    value: 'anomaly-focused',
                    label: '异常聚焦报告',
                    description: '深度分析检测到的异常事件',
                  },
                  {
                    value: 'summary',
                    label: '摘要报告',
                    description: '快速概览（仅执行摘要）',
                  },
                ]}
              />
              <div className="mt-2 text-sm text-gray-500">
                {reportType === 'comprehensive' && '包含每道题的心理分析和整体评估'}
                {reportType === 'anomaly-focused' && '重点分析异常行为和心理风险'}
                {reportType === 'summary' && '简洁的整体评估和建议'}
              </div>
            </div>
          )}

          {/* 生成进度 */}
          {generating && (
            <div>
              <Progress percent={progress} status={progress === 100 ? 'success' : 'active'} />
              {currentStep && (
                <div className="mt-2 text-sm text-gray-600">{currentStep}</div>
              )}
              <div className="mt-4 text-sm text-gray-500">
                提示：报告生成需要30-60秒，请耐心等待...
              </div>
            </div>
          )}

          {/* 生成过程中的错误提示 */}
          {!checking && hasAiData && error && (
            <Alert
              type="error"
              message="生成失败"
              description={error}
              showIcon
            />
          )}
        </div>
      </Modal>
    </>
  );
}
