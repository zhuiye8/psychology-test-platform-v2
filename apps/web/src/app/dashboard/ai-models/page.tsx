'use client';

import { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Typography,
  Button,
  Spin,
  Space,
  Alert,
  App,
} from 'antd';
import {
  ReloadOutlined,
  CloudDownloadOutlined,
  RobotOutlined,
} from '@ant-design/icons';
import * as aiModelsApi from '../../../services/aiModels';
import type { ModelInfo, DownloadProgress } from '../../../services/aiModels';
import { ModelCard } from './components/ModelCard';
import { useDownloadProgress } from '../../../hooks/useDownloadProgress';

const { Title, Paragraph } = Typography;

// ============================================================================
// 主组件
// ============================================================================

export default function AiModelsPage() {
  const { message } = App.useApp();

  const [loading, setLoading] = useState(true);
  const [models, setModels] = useState<ModelInfo[]>([]);
  const [initializingAll, setInitializingAll] = useState(false);

  // 下载进度追踪 - 使用Map存储每个模型的进度
  const [downloadProgressMap, setDownloadProgressMap] = useState<
    Map<string, DownloadProgress>
  >(new Map());

  // 下载进度Hook
  const { progress, startPolling, stopPolling } = useDownloadProgress({
    pollInterval: 1000, // 每1秒轮询一次
    onCompleted: (completedProgress) => {
      // 下载完成，刷新模型信息
      message.success(`${completedProgress.model_id} 下载完成！`);
      loadModels(true);
      // 从Map中移除已完成的进度
      setDownloadProgressMap((prev) => {
        const newMap = new Map(prev);
        newMap.delete(completedProgress.model_id);
        return newMap;
      });
    },
    onError: (error) => {
      message.error(`下载失败: ${error}`);
      loadModels(true);
    },
  });

  // 当progress更新时，更新Map
  useEffect(() => {
    if (progress) {
      setDownloadProgressMap((prev) => {
        const newMap = new Map(prev);
        newMap.set(progress.model_id, progress);
        return newMap;
      });
    }
  }, [progress]);

  // --------------------------------------------------------------------------
  // 数据加载
  // --------------------------------------------------------------------------

  useEffect(() => {
    loadModels();
  }, []);

  const loadModels = async (silent = false) => {
    try {
      if (!silent) setLoading(true);

      const response = await aiModelsApi.getAllModelsInfo();
      setModels(response.models);
    } catch (error) {
      console.error('Failed to load models:', error);
      message.error('加载模型信息失败');
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------------------------------
  // 操作处理
  // --------------------------------------------------------------------------

  const handleInitializeAll = async () => {
    try {
      setInitializingAll(true);
      message.loading({ content: '正在初始化所有模型...', key: 'init-all', duration: 0 });

      const response = await aiModelsApi.initializeModel('all');

      if (response.success) {
        message.success({
          content: '所有模型初始化成功！',
          key: 'init-all',
          duration: 3,
        });
        await loadModels(true);
      } else {
        throw new Error(response.error || '初始化失败');
      }
    } catch (error: any) {
      console.error('Failed to initialize all models:', error);
      message.error({
        content: `初始化失败: ${error.message}`,
        key: 'init-all',
        duration: 5,
      });
    } finally {
      setInitializingAll(false);
    }
  };

  const handleInitializeModel = async (modelId: string) => {
    try {
      message.loading({
        content: '正在初始化模型...',
        key: `init-${modelId}`,
        duration: 0,
      });

      const response = await aiModelsApi.initializeModel(modelId);

      if (response.success) {
        // 检查是否有task_id（异步下载）
        if (response.task_id) {
          // 有task_id，启动进度轮询
          message.info({
            content: '后台下载已启动，请稍候...',
            key: `init-${modelId}`,
            duration: 2,
          });
          startPolling(response.task_id);
        } else {
          // 无task_id，说明是同步完成（小模型）
          message.success({
            content: '模型初始化成功！',
            key: `init-${modelId}`,
            duration: 3,
          });
          await loadModels(true);
        }
      } else {
        throw new Error(response.error || '初始化失败');
      }
    } catch (error: any) {
      console.error(`Failed to initialize model ${modelId}:`, error);
      message.error({
        content: `初始化失败: ${error.message}`,
        key: `init-${modelId}`,
        duration: 5,
      });
    }
  };

  const handleValidateModel = async (modelId: string) => {
    try {
      message.loading({
        content: '正在验证模型...',
        key: `validate-${modelId}`,
        duration: 0,
      });

      const response = await aiModelsApi.validateModel(modelId);

      if (response.is_valid) {
        message.success({
          content: '模型验证通过！',
          key: `validate-${modelId}`,
          duration: 3,
        });
      } else {
        message.warning({
          content: `验证失败: ${response.message}`,
          key: `validate-${modelId}`,
          duration: 5,
        });
      }

      await loadModels(true);
    } catch (error: any) {
      console.error(`Failed to validate model ${modelId}:`, error);
      message.error({
        content: `验证失败: ${error.message}`,
        key: `validate-${modelId}`,
        duration: 5,
      });
    }
  };

  const handleDeleteModel = async (modelId: string) => {
    try {
      message.loading({
        content: '正在删除模型...',
        key: `delete-${modelId}`,
        duration: 0,
      });

      const response = await aiModelsApi.deleteModel(modelId);

      if (response.success) {
        message.success({
          content: '模型已删除',
          key: `delete-${modelId}`,
          duration: 3,
        });
        await loadModels(true);
      } else {
        throw new Error('删除失败');
      }
    } catch (error: any) {
      console.error(`Failed to delete model ${modelId}:`, error);
      message.error({
        content: `删除失败: ${error.message}`,
        key: `delete-${modelId}`,
        duration: 5,
      });
    }
  };

  // --------------------------------------------------------------------------
  // 渲染
  // --------------------------------------------------------------------------

  // 计算统计信息
  const totalSize = models.reduce((sum, m) => sum + m.total_size_mb, 0);
  const downloadedCount = models.filter((m) => m.status !== 'not_downloaded').length;
  const readyCount = models.filter((m) => m.status === 'ready').length;

  return (
    <div className="p-6">
      {/* 页面头部 */}
      <div className="mb-6">
        <Space align="center" className="mb-4">
          <RobotOutlined className="text-3xl text-blue-500" />
          <Title level={2} className="!mb-0">
            AI模型管理
          </Title>
        </Space>

        <Paragraph type="secondary" className="!mb-4">
          管理AI分析服务所需的模型文件，包括DeepFace情绪识别、YOLOv8人脸检测和emotion2vec音频分析模型。
        </Paragraph>

        <Alert
          type="info"
          showIcon
          message="备用下载方案"
          description="如果Docker预装模型失败或模型文件损坏，可以在此页面手动触发模型下载。首次下载可能需要几分钟，取决于网络速度。"
          className="mb-4"
        />

        <Space>
          <Button
            type="primary"
            icon={<CloudDownloadOutlined />}
            onClick={handleInitializeAll}
            loading={initializingAll}
            disabled={readyCount === models.length}
          >
            初始化所有模型
          </Button>
          <Button icon={<ReloadOutlined />} onClick={() => loadModels()}>
            刷新
          </Button>
          <div className="text-gray-500">
            已下载: {downloadedCount}/{models.length} | 就绪: {readyCount}/
            {models.length} | 总大小: {totalSize.toFixed(1)} MB
          </div>
        </Space>
      </div>

      {/* 模型卡片列表 */}
      <Spin spinning={loading}>
        <Row gutter={[16, 16]}>
          {models.map((model) => (
            <Col xs={24} lg={12} xl={8} key={model.model_id}>
              <ModelCard
                model={model}
                downloadProgress={downloadProgressMap.get(model.model_id) || null}
                onInitialize={handleInitializeModel}
                onValidate={handleValidateModel}
                onDelete={handleDeleteModel}
              />
            </Col>
          ))}
        </Row>

        {models.length === 0 && !loading && (
          <div className="text-center text-gray-400 py-12">
            <RobotOutlined className="text-5xl mb-4" />
            <p>无法连接到AI服务</p>
            <p className="text-sm">请确保AI服务正在运行</p>
          </div>
        )}
      </Spin>
    </div>
  );
}
