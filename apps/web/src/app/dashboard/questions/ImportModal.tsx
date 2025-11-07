'use client';

import { useState } from 'react';
import { Modal, Upload, Button, App, Alert } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd';
import questionsApi, { type BatchImportDto } from '@/services/questions';

// ============================================================================
// 类型定义
// ============================================================================

export interface ImportModalProps {
  open: boolean;
  paperId: string;
  onCancel: () => void;
  onSuccess: () => void;
}

// ============================================================================
// 组件实现
// ============================================================================

export function ImportModal({ open, paperId, onCancel, onSuccess }: ImportModalProps) {
  const { message } = App.useApp();
  const [importFile, setImportFile] = useState<UploadFile | null>(null);
  const [importing, setImporting] = useState(false);

  /** 处理批量导入 */
  const handleImport = async () => {
    if (!importFile) {
      message.warning('请先选择文件');
      return;
    }

    if (paperId === 'all') {
      message.warning('请先选择试卷');
      return;
    }

    try {
      setImporting(true);
      const fileContent = await importFile.originFileObj?.text();
      if (!fileContent) {
        message.error('读取文件失败');
        return;
      }

      const data = JSON.parse(fileContent) as BatchImportDto;

      // 验证数据格式
      if (!data.questions || !Array.isArray(data.questions)) {
        message.error('文件格式错误：缺少 questions 数组');
        return;
      }

      const result = await questionsApi.batchImport(paperId, data);

      if (result.successCount > 0) {
        message.success(`成功导入 ${result.successCount} 道题目`);
        if (result.failedCount > 0) {
          Modal.warning({
            title: `${result.failedCount} 道题目导入失败`,
            content: (
              <div className="max-h-60 overflow-y-auto">
                {result.errors?.map((err, idx) => (
                  <div key={idx} className="mb-2">
                    <strong>第 {err.index} 题：{err.title}</strong>
                    <div className="text-red-500 text-sm">{err.error}</div>
                  </div>
                ))}
              </div>
            ),
          });
        }
        handleClose();
        onSuccess();
      } else {
        message.error('所有题目导入失败，请检查文件格式');
      }
    } catch (error: any) {
      message.error(error.message || '导入失败，请检查文件格式');
    } finally {
      setImporting(false);
    }
  };

  /** 关闭对话框 */
  const handleClose = () => {
    setImportFile(null);
    onCancel();
  };

  return (
    <Modal
      title="批量导入题目"
      open={open}
      onCancel={handleClose}
      onOk={handleImport}
      confirmLoading={importing}
      okText="导入"
      cancelText="取消"
    >
      <div className="space-y-4">
        <div>
          <p className="mb-2 text-gray-600">请上传JSON格式的题目文件</p>
          <Upload
            accept=".json"
            maxCount={1}
            beforeUpload={(file) => {
              setImportFile(file as any);
              return false;
            }}
            onRemove={() => setImportFile(null)}
          >
            <Button icon={<UploadOutlined />}>选择文件</Button>
          </Upload>
        </div>

        <Alert
          message="JSON文件格式示例"
          description={
            <pre className="mt-2 text-xs bg-gray-50 p-2 rounded overflow-x-auto">
{`{
  "questions": [
    {
      "title": "你最近感到压力大吗？",
      "dimension": "家庭生活",
      "type": "SINGLE_CHOICE",
      "points": 5,
      "options": [
        { "text": "非常符合", "score": 5 },
        { "text": "比较符合", "score": 4 },
        { "text": "一般", "score": 3 },
        { "text": "不太符合", "score": 2 },
        { "text": "完全不符合", "score": 1 }
      ]
    }
  ]
}`}
            </pre>
          }
          type="info"
        />
      </div>
    </Modal>
  );
}

export default ImportModal;
