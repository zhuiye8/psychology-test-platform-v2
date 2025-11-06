# AI分析数据流完整调研报告

## 🎯 核心问题

**现象**: 检查点文件中 `exam_result_id` 始终为 `null`，导致：
1. 前端查询 `GET /api/ai/aggregates/result/{examResultId}` 返回 404
2. 聚合数据表为空（0条记录）
3. 无法通过 exam_result_id 关联 AI 分析数据与考试结果

---

## 📋 完整数据流时序图

### 正常考试流程 (Normal Exam)

```
T1: 学生进入考试页面 (/exam/[examId]/session/[resultId])
    ↓
T2: useAIConnection.connect() 被调用
    ↓
T3: 前端POST /api/ai/sessions (Backend API)
    {
      "session_id": "cmhms9s7h000om1iwlbvjqx68",  // UUID string
      "exam_result_id": "cmhms9s7h000om1iwlbvjqx68",  // ✅ resultId from URL
      "client_info": {...},
      "stream_info": {...}
    }
    ↓
T4: Backend创建AI session记录（Prisma）
    AiSession {
      id: "cmhms9znv000qm1iwl7ytam1n",              // Prisma ID (cuid2)
      sessionId: "cmhms9s7h000om1iwlbvjqx68",       // UUID string
      examResultId: "cmhms9s7h000om1iwlbvjqx68",    // ✅ 正确存储
      status: "ACTIVE"
    }
    ↓
T5: 前端直接调用 AI Service: POST http://localhost:5678/api/rtsp/start
    {
      "stream_name": "exam_uuid_participant_id",
      "session_id": "cmhms9znv000qm1iwl7ytam1n",    // ✅ Prisma ID
      "rtsp_url": "rtsp://192.168.0.95:8554/stream_name"
      // ❌ 缺少 exam_result_id
    }
    ↓
T6: AI Service启动RTSPConsumer
    RTSPConsumer.__init__(
      stream_name="exam_uuid_participant_id",
      session_id="cmhms9znv000qm1iwl7ytam1n",
      exam_result_id=None  // ❌ 前端未传递，默认为None
    )
    ↓
T7: RTSPConsumer初始化checkpoint文件
    CheckpointFileWriter.initialize_file(
      session_id="cmhms9znv000qm1iwl7ytam1n",
      exam_result_id=None  // ❌ 永久写入null
    )
    ↓
    生成文件: data/ai_analysis/checkpoints/2025/11/06/cmhms9znv000qm1iwl7ytam1n_data.json
    {
      "session_id": "cmhms9znv000qm1iwl7ytam1n",
      "exam_result_id": null,  // ❌ 问题根源
      "video_emotions": [],
      ...
    }
```

### 本机检测流程 (Device Check)

```
T1: 学生进入设备检测页面 (/exam/[examId]/device-check)
    ↓
T2: useAIConnection.connect() 被调用 (resultId = undefined)
    ↓
T3: 前端POST /api/ai/sessions
    {
      "session_id": "random_uuid",
      // ❌ 无 exam_result_id 字段（设计如此，因为设备检测不创建ExamResult）
      "client_info": {...}
    }
    ↓
T4-T7: 同上，但 exam_result_id 为 null 是正确的（设计期望）
```

---

## 🔍 关键代码路径分析

### 1. 前端：创建AI Session（✅ 正确）

**文件**: `apps/web/src/hooks/useAIConnection.ts:213-227`

```typescript
const requestBody = {
  session_id: uuidv4(),  // 生成UUID
  client_info: { ... },
  stream_info: { ... }
};

// ✅ 核心修复：只有正常考试时才包含exam_result_id
if (resultId) {
  requestBody.exam_result_id = resultId;  // ✅ 传递给后端
}

const sessionResp = await fetch(`${API_BASE_URL}/api/ai/sessions`, {
  method: 'POST',
  body: JSON.stringify(requestBody),
});
```

**结论**: ✅ 前端正确传递 exam_result_id 给后端API

---

### 2. 后端：存储AI Session（✅ 正确）

**文件**: `apps/api/src/ai/ai.service.ts:179-227`

```typescript
const session = await this.db.aiSession.upsert({
  where: { sessionId: dto.session_id },
  create: {
    sessionId: dto.session_id,
    examResultId: dto.exam_result_id,  // ✅ 存储到数据库
    clientInfo: dto.client_info,
    status: AiSessionStatus.ACTIVE,
  },
});
```

**数据库验证**:
```sql
SELECT * FROM ai_sessions ORDER BY createdAt DESC LIMIT 1;
-- 结果：examResultId 字段确实有值
```

**结论**: ✅ 后端正确存储 exam_result_id 到数据库

---

### 3. 前端：通知AI服务启动RTSP消费（❌ 缺失exam_result_id）

**文件**: `apps/web/src/hooks/useAIConnection.ts:298-306`

```typescript
const rtspStartResp = await fetch(`${aiServiceUrl}/api/rtsp/start`, {
  method: 'POST',
  body: JSON.stringify({
    stream_name: streamName,
    session_id: dbSessionId,  // ✅ Prisma数据库ID
    rtsp_url: `${mediamtxRtspUrl}/${streamName}`,
    // ❌ 问题：没有传递 exam_result_id
  }),
});
```

**结论**: ❌ 前端调用AI服务时丢失了 exam_result_id

---

### 4. AI服务：启动RTSP消费（❌ exam_result_id = None）

**文件**: `services/emotion-ai/api/rtsp.py:56-76`

```python
class StartRTSPRequest(BaseModel):
    stream_name: str
    session_id: str
    exam_result_id: Optional[str] = Field(None, description="考试结果ID")  # 默认None

@router.post("/start")
async def start_rtsp_consumer(request: StartRTSPRequest):
    success = await manager.start_consumer(
        stream_name=request.stream_name,
        session_id=request.session_id,
        exam_result_id=request.exam_result_id,  # ❌ None
    )
```

**文件**: `services/emotion-ai/services/rtsp_manager.py:58-62`

```python
consumer = RTSPConsumer(
    stream_name=stream_name,
    session_id=session_id,
    exam_result_id=exam_result_id,  # ❌ None
)
```

**文件**: `services/emotion-ai/services/rtsp_consumer.py:31-40`

```python
def __init__(self, stream_name: str, session_id: str, exam_result_id: Optional[str] = None):
    self.stream_name = stream_name
    self.session_id = session_id
    self.exam_result_id = exam_result_id  # ❌ 存储为None，后续无法更新
```

**结论**: ❌ RTSPConsumer实例变量固化为None，无法后续更新

---

### 5. AI服务：初始化检查点文件（❌ 永久写入null）

**文件**: `services/emotion-ai/services/checkpoint_file_writer.py:119-133`

```python
initial_data = {
    "session_id": session_id,
    "exam_result_id": exam_result_id,  # ❌ None写入文件
    "created_at": datetime.utcnow().isoformat() + "Z",
    "video_emotions": [],
    ...
}
with open(checkpoint_path, 'w', encoding='utf-8') as f:
    json.dump(initial_data, f, indent=2, ensure_ascii=False)
```

**结果文件**: `data/ai_analysis/checkpoints/.../cmhms9znv000qm1iwl7ytam1n_data.json`

```json
{
  "session_id": "cmhms9znv000qm1iwl7ytam1n",
  "exam_result_id": null,  // ❌ 永久丢失
  "video_emotions": [],
  ...
}
```

**结论**: ❌ 检查点文件一旦初始化，exam_result_id 永久为 null

---

## 🔧 根本原因总结

### 数据流断裂点

```
Frontend → Backend API → Database ✅ exam_result_id正确存储
    ↓
Frontend → AI Service → RTSPConsumer ❌ exam_result_id丢失
    ↓
RTSPConsumer → Checkpoint File ❌ exam_result_id=null永久化
```

### 三个关键问题

1. **前端调用AI服务时遗漏参数**
   - 位置: `useAIConnection.ts:298-306`
   - 原因: 未将 resultId 传递给 AI 服务

2. **AI服务无法动态获取exam_result_id**
   - 位置: `rtsp_consumer.py:40`
   - 原因: RTSPConsumer将exam_result_id存储为实例变量，初始化后无法更新
   - 设计缺陷: AI服务未调用后端API查询session数据

3. **检查点文件初始化时机过早**
   - 位置: `checkpoint_file_writer.py:119`
   - 原因: 文件在RTSP消费开始时立即创建，此时exam_result_id已丢失
   - 后果: 无法通过后续更新修复（文件已写死null）

---

## 📊 数据库状态验证

### AI Sessions表
```sql
SELECT id, sessionId, examResultId, status FROM ai_sessions;

-- 结果示例：
id                            | sessionId                     | examResultId                  | status
cmhms9znv000qm1iwl7ytam1n    | cmhms9s7h000om1iwlbvjqx68     | cmhms9s7h000om1iwlbvjqx68     | ACTIVE
```

**结论**: ✅ 数据库中examResultId字段有正确的值

### AI Aggregates表
```sql
SELECT COUNT(*) FROM ai_analysis_aggregates;

-- 结果：0 rows
```

**结论**: ❌ 聚合数据为空，因为checkpoint文件exam_result_id为null，无法生成聚合

### Exam Results表
```sql
SELECT id, participantId, status FROM exam_results ORDER BY createdAt DESC LIMIT 5;

-- 结果示例：
id                            | participantId | status
cmhms9s7h000om1iwlbvjqx68    | 232323232     | COMPLETED
```

**结论**: ✅ 考试结果正常存储

---

## 🆚 本机检测 vs 正常考试对比

| 维度 | 本机检测 | 正常考试 |
|------|----------|----------|
| **URL路径** | `/exam/[examId]/device-check` | `/exam/[examId]/session/[resultId]` |
| **resultId参数** | ❌ undefined | ✅ examResultId |
| **ExamResult创建** | ❌ 不创建 | ✅ 提前创建 |
| **AI Session exam_result_id** | ❌ null（设计期望） | ❌ null（BUG） |
| **Checkpoint文件exam_result_id** | ❌ null（设计期望） | ❌ null（BUG） |
| **数据库ai_sessions.examResultId** | NULL（正确） | ✅ 有值（正确） |
| **前端查询聚合数据** | ❌ 不查询 | ❌ 404错误 |

**关键发现**: 正常考试和本机检测的Checkpoint文件结构完全相同，都是exam_result_id=null

---

## 🎯 设计缺陷识别

### 1. 数据冗余与同步问题

**问题**: exam_result_id 同时存储在：
- Backend数据库 (ai_sessions.examResultId)
- AI服务内存 (RTSPConsumer.exam_result_id)
- Checkpoint文件 (JSON文件)

**后果**: 三处数据不一致

### 2. 时序依赖问题

**问题**: 数据流依赖时序：
```
T1: 创建AI Session (Backend) → examResultId存入数据库
T2: 启动RTSP消费 (AI Service) → 需要exam_result_id但未传递
T3: 初始化checkpoint文件 → exam_result_id已丢失
```

**后果**: T2和T3依赖T1的数据，但缺少传递机制

### 3. 无状态更新机制

**问题**: RTSPConsumer初始化后，无法动态更新exam_result_id

**缺失功能**:
- AI服务未提供PATCH /api/rtsp/{session_id}/metadata接口
- RTSPConsumer未实现update_exam_result_id()方法
- Checkpoint文件不支持exam_result_id字段补充更新

---

## ✅ 解决方案设计

### 方案A：前端传递exam_result_id（推荐）

**修改位置**: `apps/web/src/hooks/useAIConnection.ts:298-306`

```typescript
// 修改前
body: JSON.stringify({
  stream_name: streamName,
  session_id: dbSessionId,
  rtsp_url: `${mediamtxRtspUrl}/${streamName}`,
}),

// 修改后
body: JSON.stringify({
  stream_name: streamName,
  session_id: dbSessionId,
  exam_result_id: resultId || null,  // ✅ 添加exam_result_id
  rtsp_url: `${mediamtxRtspUrl}/${streamName}`,
}),
```

**优点**:
- 最小改动
- 前端已有resultId数据
- 无需AI服务查询后端

**缺点**:
- 需要前端保证参数正确性

---

### 方案B：AI服务查询后端（备选）

**新增功能**: AI服务在启动RTSP消费时，主动查询Backend获取exam_result_id

**修改位置**: `services/emotion-ai/services/rtsp_manager.py:35-90`

```python
async def start_consumer(self, stream_name: str, session_id: str, exam_result_id: Optional[str] = None):
    # ✅ 如果未提供exam_result_id，从后端API查询
    if not exam_result_id:
        async with DataWriter() as writer:
            session_data = await writer.get_session(session_id)
            exam_result_id = session_data.get('examResultId')
    
    consumer = RTSPConsumer(
        stream_name=stream_name,
        session_id=session_id,
        exam_result_id=exam_result_id,  // ✅ 使用查询到的值
    )
```

**优点**:
- AI服务自主完整
- 不依赖前端传参

**缺点**:
- 增加HTTP请求开销
- 需要新增Backend API接口

---

### 方案C：延迟初始化checkpoint文件（复杂）

**思路**: checkpoint文件不在RTSP消费开始时立即创建，而是在第一次写入数据时创建，届时exam_result_id已确定

**缺点**:
- 重构较大
- 可能影响现有逻辑
- 不推荐

---

## 📝 建议修复步骤

1. **立即修复**（方案A）
   - 修改 `useAIConnection.ts:302` 添加 `exam_result_id: resultId`
   - 测试正常考试流程
   - 验证checkpoint文件包含正确的exam_result_id

2. **后续优化**（方案B）
   - AI服务新增查询接口作为fallback
   - Backend提供 GET /api/ai/sessions/{sessionId} 接口
   - 增强系统健壮性

3. **完善测试**
   - 正常考试流程端到端测试
   - 本机检测流程测试
   - 验证聚合数据生成和查询

---

## 🔍 待验证问题

1. **AI Session创建时机**
   - 前端何时调用POST /api/ai/sessions?
   - 是否在WHIP推流之前还是之后?

2. **session_id vs examResultId混淆**
   - Backend日志显示: `session_id: cmhms9s7h000om1iwlbvjqx68, exam_result_id: cmhms9s7h000om1iwlbvjqx68`
   - 为什么两者值相同? 这是设计还是BUG?

3. **Backend自动启动RTSP消费**
   - `AI_AUTOSTART_RTSP=false` 时，Backend不主动调用AI服务
   - 前端直接调用AI服务是否是唯一触发方式?

---

**生成时间**: 2025-11-06
**调研者**: Claude Code
**文档版本**: v1.0 - Complete Investigation
