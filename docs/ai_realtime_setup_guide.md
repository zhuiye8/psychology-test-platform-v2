# AI实时监控功能配置指南

## 📋 问题说明

如果你在使用 `/ai-live` 页面时遇到以下问题：
- ❌ 控制台报错：`GET /api/ai/aggregates/result/{resultId}` 返回 404
- ❌ AI分析数据没有动态渲染
- ✅ 但音视频流显示正常

**原因**：AI服务缺少Redis配置，导致实时数据推送功能未启用。

---

## 🎯 快速修复步骤

### 步骤1：配置AI服务环境变量

1. **进入AI服务目录**：
   ```bash
   cd services/emotion-ai
   ```

2. **复制环境变量模板**：
   ```bash
   cp .env.example .env
   ```

3. **编辑 `.env` 文件**（已包含Redis配置）：
   ```bash
   # 使用你喜欢的编辑器打开
   nano .env
   # 或
   vim .env
   # 或
   code .env
   ```

4. **确认以下Redis配置已存在**：
   ```bash
   # Redis配置（实时数据推送）
   REDIS_HOST="localhost"
   REDIS_PORT="6379"
   REDIS_DB="0"
   REDIS_PASSWORD=""
   REDIS_REALTIME_ENABLED="true"
   ```

   💡 **提示**：如果你的Redis配置不同，请根据实际情况修改。

### 步骤2：确保Redis服务运行

1. **检查Redis是否运行**：
   ```bash
   docker ps | grep redis
   ```

   如果看到类似输出，说明Redis正在运行：
   ```
   xxx   redis:7   ...   0.0.0.0:6379->6379/tcp   redis_refactor
   ```

2. **如果Redis未运行，启动所有基础服务**：
   ```bash
   # 返回项目根目录
   cd ../..

   # 启动PostgreSQL + Redis
   pnpm docker:up
   ```

3. **验证Redis连接**：
   ```bash
   # 测试Redis连接（可选）
   redis-cli ping
   # 应该返回：PONG
   ```

### 步骤3：重启AI服务

1. **停止当前运行的AI服务**（如果正在运行）：
   - 在AI服务的终端按 `Ctrl+C`

2. **进入AI服务目录并启动**：
   ```bash
   cd services/emotion-ai

   # 激活虚拟环境（如果使用）
   source venv/bin/activate  # Linux/Mac
   # 或
   venv\Scripts\activate     # Windows

   # 启动服务
   python main.py
   ```

3. **检查启动日志**，应该看到：
   ```json
   {
     "timestamp": "...",
     "level": "INFO",
     "message": "redis_publisher_connected",
     "host": "localhost",
     "port": 6379,
     "db": 0
   }
   ```

   ✅ 如果看到这条日志，说明Redis连接成功！

### 步骤4：验证实时数据流

1. **开始一个新的考试**：
   - 学生端加入考试
   - 完成设备检查
   - 开始答题

2. **打开AI实时监控页面**：
   - 访问 `http://localhost:4000/ai-live`
   - 从学生列表中选择正在考试的学生

3. **检查浏览器Console**（F12开发者工具）：
   ```javascript
   [useRealtimeAIStream] Connected to AI stream for session: xxx
   [useRealtimeAIStream] Received AI data: {data_type: "video_emotion", ...}
   ```

4. **观察UI动态更新**：
   - ✅ 情绪饼图实时变化
   - ✅ 情绪趋势图动态绘制
   - ✅ 心率数值实时更新
   - ✅ 人脸检测状态动态显示

---

## 🔍 详细验证清单

### AI服务日志验证

启动AI服务后，应该看到以下关键日志：

1. **Redis连接成功**：
   ```json
   {
     "message": "redis_publisher_connected",
     "host": "localhost",
     "port": 6379
   }
   ```

2. **RTSP消费开始**（学生开始考试后）：
   ```json
   {
     "message": "rtsp_consumer_started",
     "session_id": "...",
     "stream_name": "..."
   }
   ```

3. **实时分析数据推送**（每帧）：
   ```json
   {
     "message": "analysis_result_published",
     "session_id": "...",
     "data_type": "video_emotion",
     "channel": "ai:session:..."
   }
   ```

### 后端API日志验证

后端应该显示WebSocket连接和消息转发：

```
[AiStreamGateway] Client xyz connected for session: xxx
[AiStreamGateway] Subscribed to Redis channel: ai:session:xxx
[AiStreamGateway] Forwarded message to client xyz for session xxx
```

### 前端浏览器验证

打开浏览器开发者工具 (F12)，检查：

1. **Console日志**：
   - 无404错误
   - 看到WebSocket连接成功日志
   - 看到AI数据接收日志

2. **Network标签**：
   - WebSocket连接显示为绿色（已连接）
   - 持续收到 `ai-data` 消息

3. **UI响应**：
   - 饼图每秒更新
   - 趋势图曲线持续绘制
   - 心率数值变化

---

## ❌ 常见问题排查

### 问题1：AI服务日志显示 `redis_connection_failed`

**原因**：Redis服务未运行或配置错误

**解决方案**：
1. 检查Docker容器：`docker ps | grep redis`
2. 如果未运行：`pnpm docker:up`
3. 检查 `.env` 中的 `REDIS_HOST` 和 `REDIS_PORT` 是否正确
4. 测试连接：`redis-cli -h localhost -p 6379 ping`

### 问题2：AI服务启动正常，但前端无数据

**原因**：WebSocket连接失败或后端网关问题

**排查步骤**：
1. **检查后端API是否运行**：
   ```bash
   curl http://localhost:4001/api/health
   ```

2. **检查WebSocket端口是否被占用**：
   ```bash
   lsof -i :4001
   ```

3. **查看后端日志**：
   - 是否有 `AiStreamGateway` 相关日志
   - 是否有错误信息

4. **检查浏览器Console**：
   - WebSocket连接状态
   - 是否有CORS错误

### 问题3：仍然看到404错误（aggregate API）

**原因**：前端代码可能有缓存或未正确使用实时数据流

**解决方案**：
1. **清除浏览器缓存**（硬刷新）：
   - Chrome/Edge：`Ctrl+Shift+R` (Windows/Linux) 或 `Cmd+Shift+R` (Mac)
   - Firefox：`Ctrl+F5` (Windows/Linux) 或 `Cmd+Shift+R` (Mac)

2. **重启前端开发服务器**：
   ```bash
   # 返回项目根目录
   cd /home/aaron/心理测试平台/refactor

   # 重启Web应用
   pnpm web:dev
   ```

3. **检查 `/ai-live` 页面代码**：
   - 确认使用了 `useRealtimeAIStream` Hook
   - 而不是调用 `aiApi.getAggregateByResultId`

### 问题4：数据更新很慢或卡顿

**原因**：Redis消息积压或网络延迟

**解决方案**：
1. **检查Redis内存使用**：
   ```bash
   redis-cli info memory
   ```

2. **检查网络延迟**：
   ```bash
   ping localhost
   ```

3. **降低AI分析帧率**（如果性能不足）：
   编辑 `services/emotion-ai/.env`：
   ```bash
   VIDEO_FPS="10"  # 从15降低到10
   ```

---

## 📊 架构理解

### 两套数据流对比

| 特性 | 实时数据流 | 聚合数据 |
|-----|----------|---------|
| **使用场景** | 考试进行中监控 | 考试结束后报告 |
| **传输方式** | Redis + WebSocket | HTTP API |
| **更新频率** | 15 FPS | 一次性生成 |
| **数据存储** | 仅内存（不持久化） | PostgreSQL永久存储 |
| **前端页面** | `/ai-live` | `/dashboard/results/:id` |
| **前端Hook** | `useRealtimeAIStream` | `aiApi.getAggregateByResultId` |
| **数据源** | RTSP实时分析 | Checkpoint文件聚合 |

### 为什么会出现404错误？

原因：`/ai-live` 页面在**考试进行中**错误地调用了**考试结束后**才生成的aggregate API。

**时序对比**：
```
考试开始 (0s)
  ↓
  ├─ ✅ 实时数据开始推送（立即可用）
  ↓
考试进行中 (60s)
  ↓
  ├─ ✅ 实时数据持续推送
  ├─ ❌ Aggregate API调用 → 404（数据还不存在）
  ↓
考试结束 (120s)
  ↓
  ├─ ❌ 实时数据停止推送
  ├─ ✅ AI服务生成聚合数据 (+2s)
  ↓
考试结束后 (122s)
  ↓
  └─ ✅ Aggregate API调用 → 200（数据已生成）
```

---

## ✅ 成功标志

当一切配置正确时，你应该看到：

1. **AI服务终端**：
   - ✅ `redis_publisher_connected`
   - ✅ `analysis_result_published`（每秒多次）

2. **后端API终端**：
   - ✅ `Client connected for session: xxx`
   - ✅ `Forwarded message to client xxx`（持续）

3. **浏览器Console**：
   - ✅ `Connected to AI stream for session: xxx`
   - ✅ `Received AI data`（每秒多次）
   - ❌ **无404错误**

4. **AI Live页面UI**：
   - ✅ 饼图动态旋转
   - ✅ 趋势图曲线延伸
   - ✅ 心率数字跳动
   - ✅ 人脸检测状态实时更新

---

## 🎓 参考文档

- [CLAUDE.md - AI分析集成架构](../CLAUDE.md#-ai分析集成架构重要)
- [AI数据流分析](./ai_data_flow_analysis.md)
- [Redis配置说明](../services/emotion-ai/.env.example)

---

## 💬 需要帮助？

如果按照本指南操作后仍有问题，请检查：

1. **环境依赖**：
   - Node.js >= 20.0.0
   - Python >= 3.11
   - Docker Desktop 已启动
   - pnpm >= 9.0.0

2. **端口占用**：
   - 4000 (Web前端)
   - 4001 (API后端)
   - 5678 (AI服务)
   - 6379 (Redis)
   - 5435 (PostgreSQL)

3. **日志文件**：
   - AI服务日志：`services/emotion-ai/logs/`
   - 后端API日志：控制台输出

---

**最后更新**：2025-11-06
**文档版本**：v1.0
