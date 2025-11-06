import { Card, Tag, Button, Space, Popconfirm, Descriptions, Tooltip, Progress } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloudDownloadOutlined,
  SafetyOutlined,
  DeleteOutlined,
  WarningOutlined,
  SyncOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import type { ModelInfo, DownloadProgress } from '../../../../services/aiModels';

// ============================================================================
// 类型定义
// ============================================================================

interface ModelCardProps {
  model: ModelInfo;
  downloadProgress?: DownloadProgress | null; // 实时下载进度（可选）
  onInitialize: (modelId: string) => void;
  onValidate: (modelId: string) => void;
  onDelete: (modelId: string) => void;
}

// ============================================================================
// 辅助函数
// ============================================================================

const getStatusConfig = (status: ModelInfo['status']) => {
  switch (status) {
    case 'ready':
      return { color: 'success', text: '就绪', icon: <CheckCircleOutlined /> };
    case 'downloaded':
      return { color: 'processing', text: '已下载', icon: <FileTextOutlined /> };
    case 'downloading':
      return { color: 'processing', text: '下载中', icon: <SyncOutlined spin /> };
    case 'initializing':
      return { color: 'processing', text: '初始化中', icon: <SyncOutlined spin /> };
    case 'error':
      return { color: 'error', text: '错误', icon: <CloseCircleOutlined /> };
    case 'not_downloaded':
    default:
      return { color: 'default', text: '未下载', icon: <WarningOutlined /> };
  }
};

// ============================================================================
// 组件
// ============================================================================

export function ModelCard({
  model,
  downloadProgress,
  onInitialize,
  onValidate,
  onDelete,
}: ModelCardProps) {
  const statusConfig = getStatusConfig(model.status);
  const allFilesValid = model.files.every((f) => f.is_valid);

  // 格式化速度和ETA
  const formatSpeed = (mbps: number) => `${mbps.toFixed(2)} MB/s`;
  const formatETA = (seconds: number) => {
    if (seconds < 60) return `${Math.round(seconds)}秒`;
    const minutes = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    return `${minutes}分${secs}秒`;
  };

  return (
    <Card
      title={
        <Space>
          <span>{model.display_name}</span>
          <Tag color={statusConfig.color} icon={statusConfig.icon}>
            {statusConfig.text}
          </Tag>
          {model.initialized && (
            <Tag color="green" icon={<CheckCircleOutlined />}>
              已初始化
            </Tag>
          )}
        </Space>
      }
      extra={
        <Tooltip title={model.model_id}>
          <Tag>{model.model_id}</Tag>
        </Tooltip>
      }
      className="h-full"
    >
      {/* 描述 */}
      <p className="text-gray-600 text-sm mb-4">{model.description}</p>

      {/* 错误信息 */}
      {model.error && (
        <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
          <WarningOutlined className="mr-2" />
          {model.error}
        </div>
      )}

      {/* 实时下载进度（使用hook提供的数据） */}
      {downloadProgress &&
        (downloadProgress.status === 'downloading' ||
          downloadProgress.status === 'initializing') && (
          <div className="mb-4">
            <Progress
              percent={Math.round(downloadProgress.progress)}
              status="active"
              size="small"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>
                {downloadProgress.downloaded_mb.toFixed(1)} /{' '}
                {downloadProgress.total_mb > 0
                  ? `${downloadProgress.total_mb.toFixed(1)} MB`
                  : '未知大小'}
              </span>
              <span>
                {downloadProgress.speed_mbps > 0 && formatSpeed(downloadProgress.speed_mbps)}
                {downloadProgress.eta_seconds !== null && downloadProgress.eta_seconds > 0 && (
                  <span className="ml-2">剩余 {formatETA(downloadProgress.eta_seconds)}</span>
                )}
              </span>
            </div>
          </div>
        )}

      {/* 文件信息 */}
      <Descriptions size="small" column={1} className="mb-4">
        <Descriptions.Item label="文件数量">{model.files.length}</Descriptions.Item>
        <Descriptions.Item label="预期大小">
          {model.files.reduce((sum, f) => sum + f.expected_size_mb, 0).toFixed(1)} MB
        </Descriptions.Item>
        <Descriptions.Item label="实际大小">
          {model.total_size_mb.toFixed(1)} MB
        </Descriptions.Item>
      </Descriptions>

      {/* 文件列表 */}
      <div className="mb-4">
        <div className="text-xs font-semibold text-gray-500 mb-2">模型文件：</div>
        {model.files.map((file, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between py-1 px-2 bg-gray-50 rounded mb-1"
          >
            <div className="flex items-center gap-2">
              {file.is_valid ? (
                <CheckCircleOutlined className="text-green-500" />
              ) : file.exists ? (
                <WarningOutlined className="text-yellow-500" />
              ) : (
                <CloseCircleOutlined className="text-gray-400" />
              )}
              <Tooltip title={file.path}>
                <span className="text-xs truncate max-w-[200px]">{file.name}</span>
              </Tooltip>
            </div>
            <div className="text-xs text-gray-500">
              {file.actual_size_mb > 0
                ? `${file.actual_size_mb.toFixed(1)}/${file.expected_size_mb.toFixed(1)} MB`
                : `${file.expected_size_mb.toFixed(1)} MB`}
            </div>
          </div>
        ))}
      </div>

      {/* 操作按钮 */}
      <Space className="w-full" direction="vertical">
        {/* 初始化按钮 - 修复：错误状态下也显示重试按钮 */}
        {(!model.initialized || model.status === 'error') && (
          <Button
            type="primary"
            icon={<CloudDownloadOutlined />}
            onClick={() => onInitialize(model.model_id)}
            block
            disabled={model.status === 'downloading' || model.status === 'initializing'}
          >
            {model.status === 'not_downloaded'
              ? '下载并初始化'
              : model.status === 'error'
                ? '重试下载'
                : '重新初始化'}
          </Button>
        )}

        {/* 验证按钮 */}
        {model.status !== 'not_downloaded' && (
          <Button
            icon={<SafetyOutlined />}
            onClick={() => onValidate(model.model_id)}
            block
            type={allFilesValid ? 'default' : 'dashed'}
          >
            验证完整性
          </Button>
        )}

        {/* 删除按钮 */}
        {model.status !== 'not_downloaded' && (
          <Popconfirm
            title="确认删除？"
            description={`删除后需要重新下载 ${model.display_name}（${model.files.reduce((s, f) => s + f.expected_size_mb, 0).toFixed(1)} MB）`}
            onConfirm={() => onDelete(model.model_id)}
            okText="确认删除"
            cancelText="取消"
            okButtonProps={{ danger: true }}
          >
            <Button danger icon={<DeleteOutlined />} block>
              删除模型
            </Button>
          </Popconfirm>
        )}
      </Space>
    </Card>
  );
}
