import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

/**
 * LLM服务
 *
 * 支持通过统一配置使用多个LLM提供商：
 * - DeepSeek (https://api.deepseek.com)
 * - OpenAI (https://api.openai.com/v1)
 * - 任何OpenAI兼容的API
 *
 * 环境变量配置：
 * - LLM_API_KEY: API密钥（必填）
 * - LLM_BASE_URL: API服务地址（可选，默认OpenAI）
 * - LLM_MODEL: 模型名称（可选，默认deepseek-chat）
 * - LLM_TIMEOUT_MS: 请求超时（可选，默认120秒）
 */
@Injectable()
export class LlmService {
  private readonly logger = new Logger(LlmService.name);
  private client: OpenAI | null = null;
  private model: string;
  private timeout: number;
  private enabled: boolean;

  constructor(private readonly config: ConfigService) {
    this.initializeClient();
  }

  /**
   * 初始化LLM客户端
   */
  private initializeClient() {
    // 获取配置
    const apiKey = this.config.get<string>('LLM_API_KEY');

    if (!apiKey) {
      this.logger.warn('⚠️ LLM_API_KEY 未配置，报告生成功能将被禁用');
      this.enabled = false;
      return;
    }

    const baseURL = this.config.get<string>('LLM_BASE_URL', 'https://api.openai.com/v1');
    this.model = this.config.get<string>('LLM_MODEL', 'deepseek-chat');
    this.timeout = this.config.get<number>('LLM_TIMEOUT_MS', 120000);

    // 初始化OpenAI客户端（兼容所有OpenAI API格式）
    this.client = new OpenAI({
      apiKey,
      baseURL,
      timeout: this.timeout,
    });

    this.enabled = true;
    this.logger.log(`✅ LLM客户端初始化成功: baseURL=${baseURL}, model=${this.model}, timeout=${this.timeout}ms`);
  }

  /**
   * 生成心理分析报告
   *
   * @param prompt 提示词
   * @returns Markdown格式的报告内容
   */
  async analyze(prompt: string): Promise<string> {
    // 检查是否启用
    if (!this.enabled || !this.client) {
      throw new Error('LLM服务未启用，请配置 LLM_API_KEY');
    }

    this.logger.log(`[analyze] 开始调用LLM: model=${this.model}`);
    this.logger.log(`[analyze] 提示词长度: ${prompt.length} 字符`);

    const startTime = Date.now();

    try {
      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: this.getSystemPrompt(),
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.3, // 较低温度，确保输出稳定专业
        max_tokens: 4000, // 最大输出4000 tokens
      });

      const duration = Date.now() - startTime;
      const content = response.choices[0].message.content || '';
      const usage = response.usage;

      this.logger.log(
        `[analyze] ✅ LLM调用成功: duration=${duration}ms, input_tokens=${usage?.prompt_tokens}, output_tokens=${usage?.completion_tokens}, total_tokens=${usage?.total_tokens}`,
      );

      return content;
    } catch (error) {
      this.logger.error(`[analyze] ❌ LLM调用失败: ${error.message}`, error.stack);
      throw new Error(`LLM调用失败: ${error.message}`);
    }
  }

  /**
   * 获取系统提示词
   */
  private getSystemPrompt(): string {
    return `你是一位专业的心理咨询师和数据分析专家。你的任务是基于学生的心理测试结果生成专业的心理评估报告。

重要要求：
1. **专业性**：使用临床心理学和教育心理学的专业术语，但要确保家长和教师能够理解
2. **谨慎性**：避免下诊断性结论，使用"可能"、"倾向于"等谨慎表述
3. **数据驱动**：所有结论必须基于提供的数据，不要做无根据的推测
4. **结构化**：严格按照要求的Markdown格式输出
5. **建设性**：提供具体可行的建议，而非简单的评价
6. **边界意识**：明确说明这是筛查性评估，不能替代临床诊断

输出格式：
- 使用中文
- Markdown格式
- 包含6个必需章节
- 使用二级标题(##)分隔章节
- 使用列表、粗体等格式增强可读性

安全注意事项：
- 如果数据质量低（data_quality < 0.5），必须在报告中说明
- 如果发现高风险指标，使用温和但明确的语言提示关注
- 强调这是教育性评估，不是临床诊断`;
  }

  /**
   * 获取当前配置信息（用于调试）
   */
  getConfig() {
    return {
      enabled: this.enabled,
      model: this.model,
      timeout: this.timeout,
    };
  }

  /**
   * 检查LLM服务是否可用
   */
  isEnabled(): boolean {
    return this.enabled;
  }
}
