# CLAUDE.md - 心理测试平台2.0重构版

本文档为Claude Code提供项目架构、开发规范和当前进度的完整指引。

## 📋 项目概述

### 项目信息
- **项目名称**：心理测试平台2.0重构版
- **版本**：v2.0.0
- **架构**：Monorepo（pnpm workspace + Turbo）
- **技术栈**：Next.js 15 + React 19 + NestJS + Prisma + PostgreSQL + Redis

### 核心目标
基于领域驱动设计（DDD）重构原心理测试平台，实现：
- 清晰的代码架构和模块划分
- 完整的类型安全体系
- 统一的代码规范
- 高可维护性和可扩展性

---

## 🏗️ Monorepo架构

### 工作区结构
```
refactor/
├── apps/                    # 应用程序
│   ├── web/                # 教师端管理后台 + 学生端考试界面 (4000端口)
│   └── api/                # 后端API服务 (4001端口)
├── packages/               # 共享包
│   └── database/           # Prisma数据库配置
├── services/               # 微服务
│   └── emotion-ai/         # AI分析服务 (5678端口, Python + FastAPI)
└── scripts/                # 部署和初始化脚本
```

### 应用职责划分

#### 1. web应用 (@psychology/web) - **核心开发重点**
**一体化应用**：教师端 + 学生端

**教师端功能** (`/dashboard/*`)：
- Papers管理：创建、编辑、删除试卷
- Questions管理：4种题型支持（单选、多选、文本、问答）
- Exams管理：5状态生命周期（看板视图）
- Results管理：查看结果、筛选、导出Excel
- Analytics分析：数据统计、图表展示
- AI实时监控：系统状态、会话监控、异常检测
- Dashboard主页：统计卡片、快速操作、最近活动
- Settings设置：个人信息、密码修改

**学生端功能** (`/exam/*`)：
- `/exam/[examId]/join`：加入考试（输入学号、姓名、访问码）
- `/exam/[examId]/session/[resultId]`：答题界面（倒计时、导航、自动保存）
- `/exam/[examId]/result/[resultId]`：查看结果（成绩、正确率、答题详情）

**端口**：4000
**技术栈**：Next.js 15 App Router + React 19 + Ant Design + Tailwind CSS

#### 2. api应用 (@psychology/api)
**后端API服务**：NestJS + Prisma

**提供接口**：
- Papers CRUD
- Questions CRUD
- Exams CRUD（5状态管理）
- Results管理（学生端公开接口 + 教师端认证接口）
- WebRTC WHIP/WHEP代理（流管理）
- 统计数据API
- AI分析数据API（读取 + 写入）

**端口**：4001
**技术栈**：NestJS + TypeScript + Prisma + PostgreSQL + Redis

#### 3. emotion-ai服务 (services/emotion-ai)
**AI分析服务**：实时情绪、注意力、心率检测

**核心功能**：
- RTSP流消费（从MediaMTX拉取视频流）
- DeepFace情绪识别（7种情绪）
- emotion2vec音频情绪分析
- PPG心率检测（非接触式）
- 注意力监测（视线追踪）
- 异常行为检测（多人入镜、无人检测等）
- 数据写入后端API（检查点、聚合、异常）

**端口**：5678
**技术栈**：Python 3.11 + FastAPI + DeepFace + OpenCV + emotion2vec

---

## 💻 开发命令

### 快速启动
```bash
# 启动核心服务（API + Web）
pnpm dev:core

# 启动单个应用
pnpm web:dev        # 教师端+学生端 (4000端口)
pnpm api:dev        # 后端API (4001端口)

# 启动AI服务（需要单独启动，Python环境）
cd services/emotion-ai
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py            # AI服务 (5678端口)
```

### 数据库操作
```bash
# 生成Prisma Client
pnpm db:generate

# 推送schema到数据库
pnpm db:push

# 运行数据库迁移
pnpm db:migrate

# 数据库填充
pnpm db:seed

# 打开Prisma Studio
pnpm db:studio
```

### Docker操作
```bash
# 启动PostgreSQL + Redis
pnpm docker:up

# 停止服务
pnpm docker:down

# 清理数据
pnpm docker:clean
```

---

## 🎯 核心功能模块（已完成）

### 1. Papers（试卷管理）✅
**文件**：`apps/web/src/app/dashboard/papers/page.tsx`
**功能**：
- 试卷列表（分页、搜索）
- 创建/编辑试卷
- 删除试卷
- 试卷详情查看

**API服务**：`apps/web/src/services/papers.ts`

### 2. Questions（题目管理）✅
**文件**：`apps/web/src/app/dashboard/questions/page.tsx`
**功能**：
- 题目列表（按试卷筛选、按题型筛选）
- 创建/编辑题目
- 4种题型支持：
  - SINGLE_CHOICE：单选题
  - MULTIPLE_CHOICE：多选题
  - TEXT：文本题（短答案）
  - ESSAY：问答题（长文本）
- 选项编辑器（拖拽排序、正确答案标记）

**组件**：
- `QuestionTypeSelector.tsx`：题型选择器
- `OptionEditor.tsx`：选项编辑器
- `QuestionEditor.tsx`：完整题目编辑器

**API服务**：`apps/web/src/services/questions.ts`

### 3. Exams（考试管理 - 5状态生命周期）✅
**文件**：`apps/web/src/app/dashboard/exams/page.tsx`
**功能**：
- 看板视图（按状态分组）
- 5状态管理：
  - DRAFT：草稿（可编辑）
  - PUBLISHED：进行中（学生可参加）
  - SUCCESS：已完成（正常结束）
  - EXPIRED：已过期（强制结束）
  - ARCHIVED：已归档（回收站）
- 状态转换操作
- 考试创建/编辑
- 高级设置（摄像头、麦克风、AI分析）

**组件**：
- `ExamStatusBadge.tsx`：5状态徽章
- `ExamForm.tsx`：考试表单
- `ExamCard.tsx`：看板卡片

**API服务**：`apps/web/src/services/exams.ts`

### 4. Results（结果管理）✅
**教师端页面**：
- `apps/web/src/app/dashboard/results/page.tsx`：结果列表
- `apps/web/src/app/dashboard/results/[resultId]/page.tsx`：结果详情

**功能**：
- 结果列表（分页、多条件筛选）
- 导出Excel
- 结果详情（完整答题信息、每题得分）
- 统计数据（平均分、正确率、通过率）

**API服务**：`apps/web/src/services/results.ts`（学生端 + 教师端）

### 5. 学生端考试流程✅
**页面流程**：
1. `/exam/[examId]/join`：加入考试
2. `/exam/[examId]/session/[resultId]`：答题界面
3. `/exam/[examId]/result/[resultId]`：查看结果

**功能**：
- 学号、姓名、访问码输入
- 实时答题（自动保存）
- 倒计时功能（时间到自动提交）
- 题目导航网格
- 进度跟踪
- 成绩展示

**组件**：
- `AnswerInput.tsx`：答题输入（自动适配4种题型）

### 6. Dashboard主页✅
**文件**：`apps/web/src/app/dashboard/page.tsx`
**功能**：
- 统计卡片（试卷总数、进行中考试、参与学生、完成测试）
- 快速操作（创建试卷、发布考试、查看报告）
- 最近活动（基于真实结果数据）
- 真实API数据驱动

### 7. Analytics分析页✅
**文件**：`apps/web/src/app/dashboard/analytics/page.tsx`
**功能**：
- 核心指标统计
- 分数分布图表
- 详细结果表格
- 考试筛选器
- 导出报告
- AI分析图表占位（情绪、注意力）

### 8. AI实时监控页✅
**文件**：`apps/web/src/app/dashboard/ai-monitor/page.tsx`
**功能**：
- 系统状态监控（AI服务、MediaMTX服务状态）
- 实时统计卡片（活跃会话、完成会话、异常事件）
- AI指标展示（平均情绪得分、注意力得分、心率）
- 活跃会话表格（详细会话数据、分析结果）
- 异常事件时间线（实时异常检测）
- 自动刷新功能（每5秒）

**组件**：
- `SystemStatusCard.tsx`：系统状态卡片
- `RealtimeStatsCards.tsx`：实时统计卡片
- `ActiveSessionsTable.tsx`：活跃会话表格
- `AnomalyTimeline.tsx`：异常事件时间线

**API服务**：`apps/web/src/services/ai.ts`

---

## 🤖 AI分析集成架构（重要！）

### 核心数据流

```
学生浏览器
    ↓ (getUserMedia)
设备权限请求 → MediaStreamContext保存流
    ↓
开始考试 → WHIP推流 → 后端代理(/api/webrtc/whip)
    ↓
MediaMTX (Windows: 192.168.0.95:8889)
    ↓ (RTSP拉流)
AI服务 (WSL/Linux: localhost:5678)
    ↓ (实时分析)
情绪/心率/注意力数据
    ↓ (HTTP API调用)
后端API (apps/api:4001) → PostgreSQL数据库
```

### ⚠️ 重要：实时数据流 vs 聚合数据

系统实现了**两套独立的数据流架构**，针对不同的使用场景：

#### 1. 实时数据流（考试进行中）

**用途**：教师端 `/ai-live` 页面的实时监控

**数据流**：
```
AI服务 (RTSP消费器)
    ↓ 每帧分析 (15 FPS)
Redis Pub/Sub
    ↓ Channel: ai:session:{sessionId}
后端WebSocket网关 (/ai-stream)
    ↓ Socket.IO转发
前端 useRealtimeAIStream Hook
    ↓ 实时更新UI
/ai-live 页面（饼图、趋势图、心率）
```

**关键配置**：
- AI服务必须配置 `REDIS_*` 环境变量
- Redis服务必须运行（`pnpm docker:up` 启动）
- `REDIS_REALTIME_ENABLED=true` 开启推送

**数据特点**：
- 更新频率：15 FPS
- 数据类型：`video_emotion`, `audio_emotion`, `heart_rate`
- 不持久化（仅内存传输）
- WebSocket实时推送

**相关文件**：
- AI推送：`services/emotion-ai/services/redis_publisher.py`
- 后端网关：`apps/api/src/ai/ai-stream.gateway.ts`
- 前端Hook：`apps/web/src/app/ai-live/hooks/useRealtimeAIStream.ts`

#### 2. 聚合数据（考试结束后）

**用途**：教师端 `/dashboard/results/:resultId` 详情页的历史报告

**数据流**：
```
AI服务分析过程
    ↓ 每秒采样写入
Checkpoint JSON文件
    ↓ 考试结束时
AI服务计算统计指标
    ↓ HTTP API调用
POST /api/ai/aggregates
    ↓ 写入数据库
AiAnalysisAggregate表
    ↓ 教师查询
GET /api/ai/aggregates/result/:resultId
```

**数据特点**：
- 生成时机：考试提交后2秒内
- 数据类型：平均值、标准差、分布等统计指标
- 永久存储（PostgreSQL）
- 一次性生成，不实时更新

**相关文件**：
- 文件写入：`services/emotion-ai/services/checkpoint_file_writer.py`
- 聚合计算：AI服务 `_generate_aggregates()` 函数
- 后端API：`apps/api/src/ai/ai.service.ts` 的 `saveAggregate()`

#### 3. 常见错误与解决方案

❌ **错误用法**：在考试进行中调用 `GET /api/ai/aggregates/result/:resultId`
- **结果**：返回404 "AI aggregate not found"
- **原因**：Aggregate只在考试结束后才生成
- **正确做法**：使用WebSocket实时数据流

✅ **正确用法**：
- **考试进行中**：使用 `useRealtimeAIStream(sessionId)` 获取实时数据
- **考试结束后**：使用 `aiApi.getAggregateByResultId(resultId)` 获取聚合报告

#### 4. 故障排查

**实时数据不更新**：
1. 检查Redis服务是否运行：`docker ps | grep redis`
2. 检查AI服务配置：`REDIS_REALTIME_ENABLED=true`
3. 检查AI服务日志：`redis_publisher_connected` 和 `analysis_result_published`
4. 检查浏览器Console：是否收到 `ai-data` 事件

**Aggregate返回404**：
1. 确认考试是否已结束（`exam_results.is_completed = true`）
2. 检查AI服务是否生成聚合数据（查看日志）
3. 查询数据库：`SELECT * FROM ai_analysis_aggregates WHERE exam_result_id = '...'`

### 关键组件说明

#### 1. MediaMTX媒体服务器
**部署位置**：Windows (192.168.0.95)
**关键端口**：
- 8889: WebRTC信令(WHIP/WHEP)
- 8189: WebRTC UDP媒体传输
- 8554: RTSP流输出

**配置文件**：`/home/aaron/心理测试平台/mediamtx.yml`

**核心功能**：
- 接收浏览器的WHIP推流
- 转换为RTSP流供AI服务消费
- 支持多路并发流

#### 2. AI分析服务
**部署位置**：WSL/Linux (localhost:5678)
**技术栈**：Python + FastAPI + OpenCV + DeepFace
**主文件**：`/home/aaron/心理测试平台/emotion/app_lan.py`

**分析能力**：
- 情绪识别（7种情绪）
- 心率检测（PPG算法）
- 注意力监测（视线追踪）
- 异常行为检测

#### 3. 后端WebRTC模块
**位置**：`apps/api/src/webrtc/`
**职责**：
- WHIP/WHEP协议代理
- 流名称管理（exam_uuid + participant_id）
- AI服务通知（启动/停止RTSP消费）
- 流状态监控

#### 4. 前端设备管理
**位置**：`apps/web/src/`
**核心Hook**：
- `useDeviceManager`：设备枚举、权限请求、流管理
- `useAIConnection`：AI会话管理、推流控制、实时数据接收
- `useStreamManager`：全局流生命周期管理

**关键Context**：
- `MediaStreamContext`：跨页面共享媒体流

### 学生端完整流程

```
1. /exam/[examId]/join
   ↓ 填写学号、姓名

2. /exam/[examId]/device-check (新增)
   ↓
   - 请求摄像头/麦克风权限
   - 显示预览和音量检测
   - 保存流到MediaStreamContext
   ↓ 确认连接正常

3. /exam/[examId]/session/[resultId]
   ↓
   - 自动启动WHIP推流（使用Context中的流）
   - 显示AI状态指示器
   - 正常答题
   ↓ 提交考试

4. /exam/[examId]/success/[resultId]
   ↓
   - 停止推流
   - 清理流资源
```

### 环境配置（关键！）

#### 后端环境变量 (apps/api/.env)
```bash
# MediaMTX地址（Windows IP + 端口）
MEDIAMTX_HOST=http://192.168.0.95:8889

# AI服务地址
AI_SERVICE_URL=http://localhost:5678

# 可选：自动启动AI RTSP消费
AI_AUTOSTART_RTSP=false
```

**注意**：
- `MEDIAMTX_HOST`必须是WSL可访问的Windows IP
- 获取方式：Windows CMD执行 `ipconfig`
- 测试连通性：`curl http://192.168.0.95:8889`

### 技术要点

#### 1. 流的生命周期管理
```typescript
// ❌ 错误做法：多次获取权限
useEffect(() => {
  navigator.mediaDevices.getUserMedia(...);  // 每次都请求
}, []);

// ✅ 正确做法：全局Context管理
// DeviceCheck页面：获取并保存
const stream = await getUserMedia(...);
mediaStreamContext.setStreams(stream);

// Session页面：复用流
const { videoStream } = useMediaStream();
publisher.start({ streams: { video: videoStream } });
```

#### 2. WebRTC编码参数配置
```typescript
// ⚠️ MUST在createOffer之前设置
const sender = pc.getSenders().find(s => s.track?.kind === 'video');
const params = sender.getParameters();
params.encodings[0].maxBitrate = 6_000_000;  // 6 Mbps
params.encodings[0].maxFramerate = 60;
params.encodings[0].degradationPreference = 'maintain-resolution';
await sender.setParameters(params);

// THEN create offer
const offer = await pc.createOffer();
```

#### 3. WHIP协议流程
```typescript
// 1. 获取streamName和WHIP端点
POST /api/webrtc/start
→ { streamName: "exam_uuid_participant_id", whipUrl: "/api/webrtc/whip?stream=..." }

// 2. WebRTC连接建立
createOffer() → setLocalDescription()

// 3. WHIP握手（通过后端代理）
POST /api/webrtc/whip
Content-Type: application/sdp
Body: <offer SDP>
→ <answer SDP>

// 4. 设置远程描述
setRemoteDescription(answer)

// 5. 通知AI服务消费RTSP
后端自动调用 AI_SERVICE_URL/api/rtsp/start
```

#### 4. 错误处理策略
```typescript
// 设备权限被拒绝
→ 显示清晰提示 + 操作指引 + 允许跳过

// MediaMTX不可达
→ 降级：允许答题，禁用AI监控

// AI服务不可达
→ 降级：推流正常，无分析结果

// 推流中断
→ 自动重连3次 → 失败后降级
```

### 性能指标

- WebRTC延迟: < 500ms
- 视频质量: 640x480 @ 15fps
- 音频质量: 16kHz 单声道
- 并发支持: ≥ 10路流
- 码率: 6 Mbps (可自适应)

### 已知问题和注意事项

#### WSL环境特殊性
- MediaMTX运行在Windows，通过IP访问
- 不能使用localhost，必须使用实际IP
- 网络稳定性：WSL↔Windows通信可能不稳定
- 生产环境建议部署在同一网络环境

#### React Strict Mode
- Dev模式useEffect执行两次
- 需要使用ref防止重复初始化
- 流资源需要正确清理

#### 浏览器兼容性
- 优先支持Chrome/Edge
- Safari需要特殊处理
- Firefox部分WebRTC API有差异

---

## 🛠️ UI组件库

### ui-kit组件（已完成）
**位置**：`apps/web/src/components/ui-kit/`

**组件列表**：
- `PageHeader.tsx`：页面头部（标题 + 描述 + 操作按钮）
- `DataTable.tsx`：通用数据表格（分页封装）
- `FormModal.tsx`：通用表单对话框
- `StatusBadge.tsx`：状态徽章（5种状态）

**导出文件**：`index.ts`

### 业务组件
**Questions**：
- `QuestionTypeSelector.tsx`：题型选择器
- `OptionEditor.tsx`：选项编辑器
- `QuestionEditor.tsx`：题目编辑器

**Exams**：
- `ExamStatusBadge.tsx`：5状态徽章
- `ExamForm.tsx`：考试表单
- `ExamCard.tsx`：看板卡片

**Exam**：
- `AnswerInput.tsx`：答题输入组件

---

## 📐 开发规范

### 代码规范

#### 1. 文件长度限制
- **单文件≤500行**（不计算import语句）
- 必要时拆分，但避免过度拆分

#### 2. 代码分区
每个文件必须清晰分区：
```typescript
// ============================================================================
// 类型定义
// ============================================================================

// ============================================================================
// 常量定义
// ============================================================================

// ============================================================================
// 工具函数
// ============================================================================

// ============================================================================
// 主组件/服务
// ============================================================================
```

#### 3. 命名规范
- **后端API字段**：snake_case（如：`time_limit`, `participant_id`）
- **前端TypeScript**：camelCase（如：`timeLimit`, `participantId`）
- **需要数据转换**：使用transformer工具

#### 4. 注释要求
- **必须使用中文注释**
- 组件/函数必须有JSDoc说明
- 复杂逻辑必须添加行内注释

#### 5. 类型定义
- **API原始类型**（snake_case）单独定义
- **视图模型类型**（camelCase）单独定义
- 使用transformer转换

### API设计规范

#### 统一响应格式
```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp?: string;
}

interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

#### 错误处理
```typescript
try {
  // API调用
} catch (error) {
  message.error('操作失败');
  console.error('详细错误:', error);
}
```

### 数据库设计

#### 5状态生命周期（Exams）
```
DRAFT → PUBLISHED → SUCCESS/EXPIRED → ARCHIVED
```

#### 关键实体关系
```
Teacher → Paper → Question
Teacher → Exam (based on Paper) → ExamResult
ExamResult → AI Analysis
```

---

## 🔄 数据转换层

### Transformer工具
**位置**：`apps/web/src/utils/transformers/`

**示例**：
```typescript
// API原始类型（snake_case）
interface PaperApiData {
  time_limit: number;
  allow_retake: boolean;
}

// 前端视图模型（camelCase）
interface Paper {
  timeLimit: number;
  allowRetake: boolean;
}

// 转换函数
export function transformPaperFromApi(apiData: PaperApiData): Paper {
  return {
    timeLimit: apiData.time_limit,
    allowRetake: apiData.allow_retake,
  };
}
```

---

## 📊 当前开发进度

### 已完成模块 ✅
- [x] Papers管理（完整CRUD）
- [x] Questions管理（4种题型）
- [x] Exams管理（5状态生命周期）
- [x] Results管理（教师端）
- [x] 学生端考试流程（join → session → result）
- [x] Dashboard主页（真实数据）
- [x] Analytics分析页（真实数据）
- [x] AI实时监控页（系统状态、会话监控、异常检测）
- [x] UI组件库（PageHeader、DataTable、FormModal、StatusBadge）

### 已完成功能补充 ✅

10. **条件逻辑支持**（2025-10-23）
   - ✅ ConditionBuilder可视化编辑器
   - ✅ AND/OR逻辑配置
   - ✅ 前端运行时条件判断（shouldDisplayQuestion）
   - ✅ Session页面动态题目显示/隐藏
   - ✅ 自动调整currentQuestionIndex（题目可见性变化时）
   - ✅ 必填题验证（只验证可见题目）
   - ✅ 测试指南文档（docs/conditional-logic-testing-guide.md）

11. **Papers详细功能**
   - ✅ 试卷详情页（`papers/[paperId]/page.tsx`）
   - ✅ 题目拖拽排序（DnD Kit）
   - ✅ 题目统计卡片

12. **Settings页面**
   - ✅ 个人信息编辑
   - ✅ 密码修改
   - ✅ 系统设置

### 待完成功能 🚧

#### 高优先级
1. **端到端测试与优化**
   - 完整考试流程测试
   - AI监控数据流测试
   - 条件逻辑功能测试
   - 性能优化

#### 中优先级
2. **测试覆盖**
   - 单元测试
   - 集成测试
   - E2E测试

3. **文档完善**
   - API文档生成
   - 部署文档
   - 用户手册

---

## ⚠️ 架构说明

### 1. 简化的Monorepo结构
**设计原则**：
- 仅保留实际使用的应用和包
- web应用采用一体化设计（教师端 + 学生端）
- AI服务独立部署（Python微服务）
- 共享配置集中在packages/database

### 2. AI服务实现进度
**已完成**：
- ✅ FastAPI应用框架（结构化日志、配置管理）
- ✅ 后端AI数据写入API（6个端点）
- ✅ RTSP流消费器 + DeepFace情绪识别
- ✅ emotion2vec音频情绪分析
- ✅ PPG心率检测
- ✅ AI监控UI集成（web应用）

**待实现**：
- ⏳ 端到端集成测试与优化

---

## 🔐 安全与认证

### JWT认证
- 教师端需要JWT Token认证
- 学生端公开接口无需认证
- Token存储在localStorage

### XSS防护
- 禁止使用`innerHTML`
- 使用Ant Design组件（自带XSS防护）
- 用户输入必须验证和清理

---

## 🚀 性能优化

### 前端优化
- React 19 Server Components
- Next.js 15 App Router
- 图片优化（next/image）
- 代码分割（动态import）

### 后端优化
- Redis缓存（多层缓存）
- 数据库索引优化
- 智能分页策略（Cursor/Offset）

---

## 📝 重要开发原则

### 代码与文档同步原则 ⚠️
- **修改代码时必须同步更新文档**
- **修改文档时必须同步更新代码**
- 确保代码、文档、API接口的一致性
- 删除功能时必须删除所有相关代码和文档

### 单一职责原则
- 每个组件/函数只做一件事
- 复杂组件拆分为多个子组件
- 业务逻辑与UI分离

### 类型安全原则
- 所有API响应必须定义类型
- 避免使用`any`类型
- 利用TypeScript的类型推导

---

## 🔧 开发工具

### 推荐VSCode扩展
- ESLint
- Prettier
- TypeScript Vue Plugin
- Tailwind CSS IntelliSense
- Prisma

### 代码质量工具
- ESLint：代码规范检查
- Prettier：代码格式化
- TypeScript：类型检查
- Turbo：Monorepo构建

---

## 📚 技术文档链接

- [Next.js 15文档](https://nextjs.org/docs)
- [React 19文档](https://react.dev/)
- [Ant Design文档](https://ant.design/)
- [NestJS文档](https://docs.nestjs.com/)
- [Prisma文档](https://www.prisma.io/docs)
- [Turbo文档](https://turbo.build/repo/docs)

---

## 📧 联系方式

如有问题或建议，请联系项目团队。

---

## 🐛 重要Bug修复记录

### Bug #1: AI Session未创建导致数据流断裂 (2025-11-06)

#### 问题表现
- ✅ Checkpoint文件正常生成（AI服务收到视频流）
- ❌ 数据库ai_sessions表为空
- ❌ GET /api/ai/aggregates/result/{resultId} 返回404
- ❌ AI大屏页面显示"等待AI分析"
- ❌ 后端日志显示：`RTSP consumer not found for session_id`

#### 根本原因
**文件**: `apps/web/src/hooks/useAIConnection.ts`

1. **useMemo依赖问题（Line 463-476）**
   ```typescript
   // ❌ 错误：依赖数组包含函数引用
   return useMemo(
     () => ({ aiAvailable, aiConfigLoading, sessionId, initAISession, disconnect }),
     [aiAvailable, aiConfigLoading, sessionId, initAISession, disconnect]
     // ☝️ initAISession和disconnect是useCallback函数，引用可能变化
   );
   ```

   **影响**:
   - `useMemo`频繁返回新对象
   - Session页面的`useEffect`重复触发
   - React Strict Mode双重执行 + cleanup干扰
   - `POST /api/ai/sessions` 永远无法执行到

2. **缺少防重入守卫**
   - 没有防止并发初始化的机制
   - React Strict Mode会导致useEffect执行两次
   - 第二次执行时可能清空了第一次的状态

#### 修复方案

**修复1: 稳定化useMemo返回值（Line 475）**
```typescript
// ✅ 修复后：移除函数依赖
return useMemo(
  () => ({ aiAvailable, aiConfigLoading, sessionId, initAISession, disconnect }),
  [aiAvailable, aiConfigLoading, sessionId]
  // ✅ 只依赖基础值，函数引用保持稳定
);
```

**修复2: 添加执行守卫（Line 89, 139-151, 373-376）**
```typescript
// 新增ref
const isInitializingRef = useRef(false);

// 函数开头守卫
if (isInitializingRef.current) {
  console.log('[useAIConnection] ⚠️ 已在初始化中，跳过重复调用');
  return null;
}
isInitializingRef.current = true;

try {
  // ... 原有逻辑 ...
} finally {
  isInitializingRef.current = false;
}
```

#### 技术要点

1. **React Hooks依赖规则**
   - `useMemo`的依赖数组应该只包含**基础值**（primitive values）
   - 函数引用（`useCallback`返回值）不应作为`useMemo`的依赖
   - 函数稳定性由`useCallback`自身保证

2. **React 18+ Strict Mode**
   - Dev模式下`useEffect`执行两次（mount → cleanup → mount）
   - 需要使用ref防止重复初始化
   - cleanup函数必须正确清理资源

3. **数据流完整性验证**
   ```
   必须的API调用顺序：
   1. POST /api/webrtc/start ✅
   2. WHIP推流建立 ✅
   3. POST /api/ai/sessions ⚠️ (本次修复的关键)
   4. POST AI服务 /api/rtsp/start ⚠️
   5. AI分析开始
   6. POST /api/ai/aggregates (聚合数据保存)
   ```

#### 验证清单

修复后必须验证以下几点：

- [ ] 浏览器Console看到`[useAIConnection] 初始化AI会话`（仅一次）
- [ ] 后端日志出现`POST /api/ai/sessions`
- [ ] 数据库ai_sessions表有新记录
- [ ] AI服务日志显示RTSP consumer启动
- [ ] 考试结束后ai_analysis_aggregates表有记录
- [ ] `GET /api/ai/aggregates/result/{resultId}` 返回200
- [ ] AI大屏页面正常显示分析数据
- [ ] 没有404 "RTSP consumer not found"错误

#### 相关文件
- `apps/web/src/hooks/useAIConnection.ts` - 主要修复文件
- `apps/web/src/app/exam/[examId]/session/[resultId]/page.tsx` - 调用initAISession
- `apps/api/src/ai/ai.service.ts` - 后端session创建服务
- `services/emotion-ai/services/rtsp_consumer.py` - RTSP消费器

#### 经验教训

1. **Hook依赖管理至关重要**
   - 仔细检查`useMemo`/`useCallback`的依赖数组
   - 理解React的重新渲染机制
   - 避免循环依赖

2. **异步流程需要防重入**
   - 使用ref守卫防止并发执行
   - 考虑Strict Mode的影响
   - 正确清理资源

3. **完整的数据流调试**
   - 逐步验证每个环节
   - 检查数据库状态
   - 对比checkpoint文件和数据库记录

---

**最后更新**：2025-11-06
**文档版本**：v2.1.0 (AI Session创建Bug修复)
