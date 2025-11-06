# LLM配置示例

本文档提供三种主流LLM API的配置示例。

## 方式1: OpenRouter（推荐，支持多模型）

### 优点
- 统一接口，支持多种模型（Claude、GPT-4、DeepSeek等）
- 无需切换API端点即可更换模型
- 自动负载均衡和容错

### 配置
```bash
# .env配置
LLM_API_KEY=sk-or-v1-xxxxx           # 从 https://openrouter.ai/keys 获取
LLM_BASE_URL=                        # 留空，使用默认值
LLM_MODEL=deepseek/deepseek-chat     # 支持的模型见下方
```

### 支持的模型
```bash
# 高性价比（推荐）
LLM_MODEL=deepseek/deepseek-chat

# 最强分析能力
LLM_MODEL=anthropic/claude-3.5-sonnet

# OpenAI最新
LLM_MODEL=openai/gpt-4o

# 综合性价比
LLM_MODEL=openai/gpt-4-turbo

# 长上下文
LLM_MODEL=google/gemini-pro-1.5
```

---

## 方式2: OpenAI官方API

### 优点
- 官方直连，稳定性高
- 支持最新GPT-4系列模型

### 配置
```bash
# .env配置
LLM_API_KEY=sk-xxxxx                      # 从 https://platform.openai.com/api-keys 获取
LLM_BASE_URL=https://api.openai.com/v1   # 官方API端点
LLM_MODEL=gpt-4-turbo                     # 无命名空间
```

### 支持的模型
```bash
# GPT-4 Turbo（推荐）
LLM_MODEL=gpt-4-turbo

# GPT-4o（最新）
LLM_MODEL=gpt-4o

# GPT-4（经典）
LLM_MODEL=gpt-4

# GPT-3.5 Turbo（经济型）
LLM_MODEL=gpt-3.5-turbo
```

---

## 方式3: DeepSeek官方API

### 优点
- 中文支持优秀
- 价格最便宜（约OpenAI的1/10）
- 长上下文支持（128K tokens）

### 配置
```bash
# .env配置
LLM_API_KEY=sk-xxxxx                         # 从 https://platform.deepseek.com/api_keys 获取
LLM_BASE_URL=https://api.deepseek.com/v1     # 官方API端点
LLM_MODEL=deepseek-chat                      # 无命名空间
```

### 支持的模型
```bash
# DeepSeek Chat（推荐）
LLM_MODEL=deepseek-chat

# DeepSeek Coder（代码优化）
LLM_MODEL=deepseek-coder
```

---

## 配置验证

配置完成后，重启API服务并查看日志：

```bash
cd /home/aaron/心理测试平台/refactor
pnpm api:dev
```

**成功日志示例**：
```
[LLMClientService] LLM Client initialized: OpenRouter (https://openrouter.ai/api/v1)
```

或

```
[LLMClientService] LLM Client initialized: Official API (https://api.openai.com/v1)
```

---

## 快速切换

### 从OpenRouter切换到OpenAI官方
```bash
# 只需修改两个变量
LLM_BASE_URL=https://api.openai.com/v1
LLM_MODEL=gpt-4-turbo   # 注意：去掉 openai/ 命名空间
```

### 从OpenAI切换到DeepSeek
```bash
LLM_BASE_URL=https://api.deepseek.com/v1
LLM_MODEL=deepseek-chat
```

### 切换回OpenRouter
```bash
LLM_BASE_URL=   # 留空
LLM_MODEL=deepseek/deepseek-chat   # 注意：加上命名空间
```

---

## 成本对比（30题报告，约8K tokens）

| 服务商 | 模型 | 估算成本 |
|--------|------|----------|
| DeepSeek官方 | deepseek-chat | $0.01 |
| OpenRouter | deepseek/deepseek-chat | $0.02 |
| OpenRouter | openai/gpt-4-turbo | $0.08 |
| OpenAI官方 | gpt-4-turbo | $0.10 |
| OpenRouter | anthropic/claude-3.5-sonnet | $0.15 |

**推荐方案**：DeepSeek官方API（性价比最高，中文优秀）

---

## 故障排除

### 问题1: API key无效
```bash
Error: LLM API error: 401 - Unauthorized
```
**解决**: 检查API密钥是否正确，是否已激活

### 问题2: 模型不存在
```bash
Error: LLM API error: 404 - Model not found
```
**解决**:
- OpenRouter：确保模型名带命名空间（如 `deepseek/deepseek-chat`）
- 官方API：确保模型名不带命名空间（如 `gpt-4-turbo`）

### 问题3: 超出配额
```bash
Error: LLM API error: 429 - Rate limit exceeded
```
**解决**: 等待或升级账户配额

---

## 向后兼容

如果你已经配置了旧版本的环境变量，系统会自动兼容：

```bash
# 旧版本（仍然有效）
OPENROUTER_API_KEY=sk-or-v1-xxxxx
OPENROUTER_MODEL=deepseek/deepseek-chat

# 等价于新版本
LLM_API_KEY=sk-or-v1-xxxxx
LLM_MODEL=deepseek/deepseek-chat
```
