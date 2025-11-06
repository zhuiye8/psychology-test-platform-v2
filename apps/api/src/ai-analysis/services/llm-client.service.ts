/**
 * LLM客户端服务（通用）
 *
 * 职责：
 * - 支持多种LLM API（OpenRouter、OpenAI官方、DeepSeek官方等）
 * - 请求重试和错误处理
 * - Token计数和成本估算
 */

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface LLMMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface LLMResponse {
  content: string;
  tokensUsed: number;
  model: string;
}

@Injectable()
export class LLMClientService {
  private readonly logger = new Logger(LLMClientService.name);
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly defaultModel: string;
  private readonly maxRetries = 3;
  private readonly isOpenRouter: boolean;
  private readonly timeoutMs: number;

  constructor(private readonly config: ConfigService) {
    // 优先使用LLM_API_KEY，向后兼容OPENROUTER_API_KEY
    this.apiKey =
      this.config.get<string>('LLM_API_KEY') ||
      this.config.get<string>('OPENROUTER_API_KEY', '');

    // 支持自定义base URL（OpenAI官方、DeepSeek官方等）
    this.baseUrl =
      this.config.get<string>('LLM_BASE_URL') || 'https://openrouter.ai/api/v1';

    // 检测是否为OpenRouter
    this.isOpenRouter = this.baseUrl.includes('openrouter.ai');

    // 默认模型
    this.defaultModel = this.config.get<string>(
      'LLM_MODEL',
      this.config.get<string>('OPENROUTER_MODEL', 'deepseek/deepseek-chat'),
    );

    // ✅ 超时配置：默认120秒（适应外部LLM API，如DeepSeek/OpenRouter）
    this.timeoutMs = this.config.get<number>('LLM_TIMEOUT_MS', 120000);

    if (!this.apiKey) {
      this.logger.warn('LLM_API_KEY not configured, LLM features disabled');
    } else {
      this.logger.log(
        `LLM Client initialized: ${this.isOpenRouter ? 'OpenRouter' : 'Official API'} (${this.baseUrl}), timeout: ${this.timeoutMs}ms`,
      );
    }
  }

  // ==========================================================================
  // 公开方法
  // ==========================================================================

  /**
   * 生成完成（chat completion）
   */
  async complete(
    messages: LLMMessage[],
    options?: {
      model?: string;
      temperature?: number;
      maxTokens?: number;
    },
  ): Promise<LLMResponse> {
    if (!this.apiKey) {
      throw new Error('LLM API key not configured');
    }

    const model = options?.model || this.defaultModel;
    const temperature = options?.temperature ?? 0.7;
    const maxTokens = options?.maxTokens || 4096;

    let lastError: Error;

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        // ✅ 创建超时控制器
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);

        try {
          // 构建headers（OpenRouter需要额外字段）
          const headers: Record<string, string> = {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          };

          if (this.isOpenRouter) {
            headers['HTTP-Referer'] = 'https://psychology-platform.local';
            headers['X-Title'] = 'Psychology Test Platform';
          }

          const response = await fetch(`${this.baseUrl}/chat/completions`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
              model,
              messages,
              temperature,
              max_tokens: maxTokens,
            }),
            signal: controller.signal, // ✅ 添加超时信号
          });

          // ✅ 清除超时计时器
          clearTimeout(timeoutId);

          if (!response.ok) {
            const error = await response.text();
            throw new Error(`LLM API error: ${response.status} - ${error}`);
          }

          const data = await response.json();

          return {
            content: data.choices[0].message.content,
            tokensUsed: data.usage.total_tokens,
            model: data.model,
          };
        } finally {
          // ✅ 确保清除超时计时器（即使出错）
          clearTimeout(timeoutId);
        }
      } catch (error) {
        lastError = error as Error;

        // ✅ 区分超时错误和其他错误
        const errorMessage = error.name === 'AbortError'
          ? `LLM request timeout (${this.timeoutMs}ms)`
          : error.message;

        this.logger.warn(
          `LLM request failed (attempt ${attempt}/${this.maxRetries}): ${errorMessage}`,
        );

        if (attempt < this.maxRetries) {
          await this.delay(Math.pow(2, attempt) * 1000); // 指数退避
        }
      }
    }

    throw new Error(`LLM request failed after ${this.maxRetries} attempts: ${lastError!.message}`);
  }

  /**
   * 估算token数量（近似值）
   */
  estimateTokens(text: string): number {
    // 简单估算：1 token ≈ 4个字符（英文）或1.5个字符（中文）
    const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
    const otherChars = text.length - chineseChars;
    return Math.ceil(chineseChars / 1.5 + otherChars / 4);
  }

  /**
   * 检查是否可用
   */
  isAvailable(): boolean {
    return !!this.apiKey;
  }

  // ==========================================================================
  // 私有方法
  // ==========================================================================

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
