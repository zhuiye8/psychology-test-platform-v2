/**
 * AI模型管理服务
 * 与AI服务的模型管理API交互
 */

// ============================================================================
// 类型定义
// ============================================================================

export interface ModelFileInfo {
  name: string;
  path: string;
  expected_size_mb: number;
  actual_size_mb: number;
  exists: boolean;
  is_valid: boolean;
}

export interface ModelInfo {
  model_id: string;
  display_name: string;
  description: string;
  status: 'not_downloaded' | 'downloading' | 'downloaded' | 'initializing' | 'ready' | 'error';
  files: ModelFileInfo[];
  total_size_mb: number;
  initialized: boolean;
  error?: string;
}

export interface ModelsInfoResponse {
  success: boolean;
  models: ModelInfo[];
}

export interface InitializeModelRequest {
  model_name: string; // 'deepface' | 'emotion2vec' | 'yolov8' | 'all'
}

export interface InitializeModelResponse {
  success: boolean;
  message: string;
  model_name: string;
  initialized: boolean;
  task_id?: string; // 新增：异步下载任务ID（用于轮询进度）
  error?: string;
}

export interface ValidateModelResponse {
  success: boolean;
  model_id: string;
  is_valid: boolean;
  message: string;
}

export interface DeleteModelResponse {
  success: boolean;
  model_id: string;
  message: string;
}

export interface DownloadProgress {
  task_id: string;
  model_id: string;
  status: 'downloading' | 'initializing' | 'completed' | 'error';
  progress: number; // 0-100
  downloaded_mb: number;
  total_mb: number;
  speed_mbps: number;
  eta_seconds: number | null;
  error_message?: string;
}

// ============================================================================
// 常量定义
// ============================================================================

// AI服务地址（从环境变量读取，开发环境默认localhost:5678）
const AI_SERVICE_URL = process.env.NEXT_PUBLIC_AI_SERVICE_URL || 'http://localhost:5678';

// ============================================================================
// API函数
// ============================================================================

/**
 * 获取所有模型信息
 */
export async function getAllModelsInfo(): Promise<ModelsInfoResponse> {
  try {
    const response = await fetch(`${AI_SERVICE_URL}/api/models/info`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch models info:', error);
    throw error;
  }
}

/**
 * 获取单个模型信息
 */
export async function getModelInfo(modelId: string): Promise<ModelInfo> {
  try {
    const response = await fetch(`${AI_SERVICE_URL}/api/models/info/${modelId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch model info for ${modelId}:`, error);
    throw error;
  }
}

/**
 * 初始化模型（触发下载）
 */
export async function initializeModel(
  modelName: string
): Promise<InitializeModelResponse> {
  try {
    const response = await fetch(`${AI_SERVICE_URL}/api/models/initialize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model_name: modelName }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to initialize model ${modelName}:`, error);
    throw error;
  }
}

/**
 * 验证模型完整性
 */
export async function validateModel(modelId: string): Promise<ValidateModelResponse> {
  try {
    const response = await fetch(`${AI_SERVICE_URL}/api/models/validate/${modelId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to validate model ${modelId}:`, error);
    throw error;
  }
}

/**
 * 删除模型文件
 */
export async function deleteModel(modelId: string): Promise<DeleteModelResponse> {
  try {
    const response = await fetch(`${AI_SERVICE_URL}/api/models/${modelId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to delete model ${modelId}:`, error);
    throw error;
  }
}

/**
 * 获取模型状态（简化版，仅返回初始化状态）
 */
export async function getModelsStatus(): Promise<{
  success: boolean;
  models: Record<string, boolean>;
}> {
  try {
    const response = await fetch(`${AI_SERVICE_URL}/api/models/status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch models status:', error);
    throw error;
  }
}

/**
 * 获取下载进度
 * 用于轮询异步下载任务的进度
 */
export async function getDownloadProgress(taskId: string): Promise<DownloadProgress> {
  try {
    const response = await fetch(`${AI_SERVICE_URL}/api/models/progress/${taskId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Task not found: ${taskId}`);
      }
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch download progress for task ${taskId}:`, error);
    throw error;
  }
}
