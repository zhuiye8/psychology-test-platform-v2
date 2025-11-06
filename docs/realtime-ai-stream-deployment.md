# AI实时数据流架构部署指南

## 📋 架构概览

```
AI服务(Python) → Redis Pub/Sub → 后端(NestJS) → WebSocket → 前端(React)
       ↓
  JSON文件（持久化存储）
```

### 核心特性

- ✅ **实时推送**：每帧分析结果实时推送（15fps）
- ✅ **持久化**：JSON文件采样存储（每秒1条）
- ✅ **多会话支持**：独立channel，支持10+并发
- ✅ **降级友好**：Redis故障不影响持久化
- ✅ **自动重连**：WebSocket断线自动重连

---

## 🚀 部署步骤

### 1. 安装依赖

#### 1.1 AI服务依赖（Python）

```bash
cd services/emotion-ai
pip install redis==5.2.1
```

#### 1.2 后端依赖（NestJS）

```bash
cd apps/api
pnpm install
# 新增依赖：
# - @nestjs/websockets
# - @nestjs/platform-socket.io
# - ioredis
```

#### 1.3 前端依赖（React）

```bash
cd apps/web
pnpm install
# 新增依赖：
# - socket.io-client
```

---

### 2. 环境变量配置

#### 2.1 AI服务配置（`services/emotion-ai/.env`）

```bash
# Redis配置（新增）
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_DB=0
REDIS_PASSWORD=  # 可选
REDIS_REALTIME_ENABLED=true  # 是否启用实时推送

# 其他配置保持不变
BACKEND_API_URL=http://localhost:4001
MEDIAMTX_HOST=http://192.168.0.95:8889
```

#### 2.2 后端配置（`apps/api/.env`）

```bash
# Redis配置（新增）
REDIS_HOST=localhost
REDIS_PORT=6379

# 其他配置保持不变
DATABASE_URL=postgresql://...
```

#### 2.3 前端配置（`apps/web/.env.local`）

```bash
# WebSocket地址（新增）
NEXT_PUBLIC_WS_URL=http://localhost:4001

# 其他配置保持不变
NEXT_PUBLIC_API_URL=http://localhost:4001
```

---

### 3. 启动服务

#### 3.1 确认Redis运行

```bash
# 检查Redis是否运行
redis-cli ping
# 输出：PONG

# 如果未运行，启动Redis
# Docker方式（推荐）
docker run -d -p 6379:6379 redis:7

# 或使用项目docker-compose
cd /home/aaron/心理测试平台/refactor
pnpm docker:up
```

#### 3.2 启动AI服务

```bash
cd services/emotion-ai
conda activate emotion  # 激活conda环境
python main.py

# 查看日志确认Redis连接成功
# 输出：{"event": "redis_publisher_connected", ...}
```

#### 3.3 启动后端API

```bash
cd apps/api
pnpm dev

# 端口：4001
# 检查AiStreamGateway已注册
```

#### 3.4 启动前端Web

```bash
cd apps/web
pnpm dev

# 端口：4000
# 访问 http://localhost:4000/ai-live
```

---

## 🧪 测试验证

### 1. WebSocket连接测试

打开浏览器控制台，访问 `http://localhost:4000/ai-live`，查看日志：

```
[useRealtimeAIStream] Connected to AI stream for session: xxx
[useRealtimeAIStream] Connection confirmed
[useRealtimeAIStream] Received AI data: {...}
```

### 2. Redis消息测试

在终端监听Redis频道：

```bash
redis-cli
SUBSCRIBE ai:session:*
```

启动AI分析后，应该看到实时消息：

```
1) "message"
2) "ai:session:6483e20e-598a-48c6-8d62-16697682e028"
3) "{\"session_id\":\"...\",\"data_type\":\"emotion\",\"data\":{...}}"
```

### 3. 端到端流程测试

1. **本机检测模式**：
   - 访问 `/ai-live` 页面
   - 切换到"本机检测"标签
   - 点击"开始检测"
   - 观察趋势图和饼状图是否实时更新

2. **监控模式**：
   - 学生端开始考试（带AI分析）
   - 教师端访问 `/ai-live`
   - 切换到"学生监控"标签
   - 选择学生
   - 观察图表是否实时更新

---

## 📊 数据流详解

### 实时推送流程

```
1. RTSPConsumer分析每一帧（15fps）
   ↓
2. 调用 redis_publisher.publish_analysis_result()
   ↓
3. Redis Pub/Sub 推送到 channel: ai:session:{session_id}
   ↓
4. AiStreamGateway 订阅channel并接收消息
   ↓
5. WebSocket 转发给前端 socket.emit('ai-data', data)
   ↓
6. useRealtimeAIStream Hook 接收数据
   ↓
7. useRealtimeAnalysis 处理数据并更新图表
```

### 持久化流程（并行）

```
1. RTSPConsumer分析每一帧（15fps）
   ↓
2. 时间窗口采样（每秒1条）
   ↓
3. 追加到 checkpoint_buffer
   ↓
4. 每5秒批量写入JSON文件
   ↓
5. 会话结束时计算聚合数据
   ↓
6. 保存到数据库（用于历史查询）
```

---

## 🔧 故障排查

### 问题1：前端无法连接WebSocket

**症状**：控制台报错 `Failed to connect`

**排查**：
```bash
# 1. 检查后端是否运行
curl http://localhost:4001/health

# 2. 检查WebSocket端点
curl http://localhost:4001/socket.io/

# 3. 检查防火墙/代理设置
```

**解决**：
- 确认后端4001端口正常监听
- 确认CORS配置允许前端域名
- 检查nginx/代理配置WebSocket升级

---

### 问题2：Redis连接失败

**症状**：AI服务日志显示 `redis_publisher_connection_failed`

**排查**：
```bash
# 1. 检查Redis是否运行
redis-cli ping

# 2. 检查Redis端口
netstat -tlnp | grep 6379

# 3. 检查Redis配置
redis-cli CONFIG GET bind
```

**解决**：
- 启动Redis服务
- 修改Redis配置允许外部访问（`bind 0.0.0.0`）
- 检查防火墙规则

---

### 问题3：收到消息但图表不更新

**症状**：WebSocket连接正常，控制台显示收到数据，但图表不动

**排查**：
```typescript
// 在 useRealtimeAnalysis.ts 中添加调试日志
useEffect(() => {
  if (!realtimeStream.latestData) return;
  console.log('[DEBUG] Processing data:', realtimeStream.latestData);
  // ...
}, [realtimeStream.latestData]);
```

**解决**：
- 检查数据格式是否正确（data_type, data字段）
- 检查emotion_scores是否为对象
- 检查是否有JavaScript错误

---

### 问题4：多会话混乱

**症状**：切换学生时，图表显示其他学生的数据

**原因**：旧的WebSocket连接未断开

**解决**：
```typescript
// useRealtimeAnalysis 在切换学生时调用
disconnect();  // 断开旧连接
selectStudent(newStudent);  // 连接新session
```

---

## 📈 性能指标

### 预期性能

- **实时延迟**：< 200ms（AI分析完成 → 前端显示）
- **消息频率**：15条/秒（按帧率）
- **内存占用**：
  - Redis：< 10MB（临时消息，无持久化）
  - WebSocket：~1KB/连接
  - 前端：~100KB（最近30个数据点）

### 优化建议

1. **降低推送频率**（如果性能不足）：
   ```python
   # rtsp_consumer.py
   # 添加节流逻辑
   if self.frames_processed % 3 == 0:  # 每3帧推送1次
       await self.redis_publisher.publish_analysis_result(...)
   ```

2. **前端节流渲染**：
   ```typescript
   // 使用lodash throttle
   const throttledUpdate = useCallback(
     throttle((data) => {
       setData(...);
     }, 200),  // 最多每200ms更新一次
     []
   );
   ```

3. **限制历史数据点**：
   ```typescript
   // 保留最近N个点
   trendDataRef.current = [...trendDataRef.current, newPoint].slice(-20);
   ```

---

## 🎯 下一步优化

### 短期（1周内）

- [ ] 添加WebSocket认证（JWT）
- [ ] 添加Redis连接池
- [ ] 添加监控指标（Prometheus）
- [ ] 添加错误重试策略

### 中期（1个月内）

- [ ] 支持音频情绪数据实时推送
- [ ] 支持注意力数据实时推送
- [ ] 支持心率数据实时推送
- [ ] 添加数据压缩（protobuf/msgpack）

### 长期（3个月内）

- [ ] 迁移到Redis Streams（持久化）
- [ ] 支持多节点部署（负载均衡）
- [ ] 添加消息队列（Kafka/RabbitMQ）
- [ ] 支持数据回放功能

---

## 📞 支持联系

如遇到问题，请提供以下信息：

1. **错误日志**：
   - AI服务日志（`services/emotion-ai/logs/`）
   - 后端日志（`apps/api/logs/`）
   - 浏览器控制台截图

2. **环境信息**：
   - Redis版本：`redis-server --version`
   - Node.js版本：`node -v`
   - Python版本：`python --version`

3. **网络拓扑**：
   - 各服务IP和端口
   - 防火墙/代理配置

---

**最后更新**：2025-10-22
**架构版本**：v2.0 (Redis Pub/Sub + WebSocket)
