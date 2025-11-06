# 心理测试平台 2.0 重构版 - 项目结构概览

**项目路径**: `/home/aaron/心理测试平台/refactor`  
**架构**: Monorepo (pnpm workspace + Turbo)  
**版本**: v2.0.0  
**总代码量**: ~16,794 行代码

---

## 📦 Monorepo 整体架构

```
refactor/
├── apps/                    # 应用程序（2个）
│   ├── web/                # 教师端 + 学生端一体化应用 (Next.js 15 + React 19)
│   └── api/                # 后端API服务 (NestJS + TypeScript)
├── packages/               # 共享包（1个）
│   └── database/           # Prisma数据库配置（PostgreSQL驱动）
├── services/               # 微服务（1个）
│   └── emotion-ai/         # AI分析服务 (Python + FastAPI)
├── scripts/                # 部署和初始化脚本
├── docs/                   # 文档（AI数据流、修复指南、设置指南）
├── data/                   # 运行时数据目录
│   ├── ai_analysis/        # AI分析输出
│   ├── exports/            # Excel导出文件
│   ├── logs/               # 日志文件
│   ├── temp/               # 临时文件
│   └── uploads/            # 用户上传文件
├── .env                    # 环境配置
├── docker-compose.yml      # 容器编排（PostgreSQL 15 + Redis 7）
└── package.json            # Monorepo根配置

```

---

## 🎯 核心应用详解

### 1. apps/web (5,644行代码)
**一体化Web应用**：教师管理端 + 学生答题端

**技术栈**:
- Next.js 15 (App Router)
- React 19 + TypeScript
- Ant Design (UI组件库)
- Tailwind CSS (样式)

#### 页面结构 (apps/web/src/app/)
```
app/
├── layout.tsx                    # 根布局
├── loading.tsx                   # 全局加载态
├── page.tsx                      # 首页（重定向到dashboard）
├── login/                        # 教师登录
│   └── page.tsx
├── dashboard/                    # 教师端管理后台
│   ├── page.tsx                 # Dashboard主页（统计卡片、快速操作、最近活动）
│   ├── papers/                  # 试卷管理
│   │   ├── page.tsx            # 试卷列表
│   │   ├── [paperId]/          # 试卷详情
│   │   └── create/             # 创建试卷
│   ├── questions/               # 题目管理
│   │   ├── page.tsx            # 题目列表
│   │   └── editor/             # 题目编辑器
│   ├── exams/                   # 考试管理（5状态看板）
│   │   ├── page.tsx            # 看板视图
│   │   └── create/             # 创建考试
│   ├── results/                 # 结果查看
│   │   ├── page.tsx            # 结果列表
│   │   └── [resultId]/         # 结果详情（含AI分析）
│   ├── analytics/               # 数据分析
│   │   └── page.tsx            # 统计图表、报告
│   ├── ai-monitor/              # AI实时监控
│   │   └── page.tsx            # 系统状态、会话监控、异常检测
│   ├── ai-models/               # AI模型管理
│   │   └── page.tsx
│   ├── settings/                # 设置
│   │   └── page.tsx            # 个人信息、密码修改
│   └── teachers/                # 教师管理
│       └── page.tsx
├── exam/                         # 学生端考试流程
│   └── [examId]/
│       ├── join/               # 加入考试（输入学号、姓名、访问码）
│       ├── device-check/       # 设备检查（摄像头、麦克风权限）
│       ├── session/
│       │   └── [resultId]/     # 答题界面（核心功能）
│       └── result/
│           └── [resultId]/     # 结果展示（成绩、答题分析）
└── ai-live/                      # AI直播分析（备用功能）
    └── [sessionId]/
```

#### 组件结构 (apps/web/src/components/)
```
components/
├── ui-kit/                       # 通用UI组件库
│   ├── PageHeader.tsx           # 页面头部（标题、描述、操作）
│   ├── DataTable.tsx            # 通用数据表格（含分页）
│   ├── FormModal.tsx            # 表单对话框
│   ├── StatusBadge.tsx          # 5状态徽章（DRAFT/PUBLISHED/SUCCESS/EXPIRED/ARCHIVED）
│   └── index.ts                 # 导出
├── papers/                       # 试卷相关组件
│   ├── PaperList.tsx            # 试卷列表
│   ├── PaperForm.tsx            # 试卷表单
│   ├── PaperPreviewModal.tsx    # 预览弹窗
│   └── PaperQuestionList.tsx    # 试卷题目列表
├── questions/                    # 题目相关组件
│   ├── QuestionTypeSelector.tsx # 题型选择器（单选/多选/文本/问答）
│   ├── OptionEditor.tsx         # 选项编辑器（拖拽排序）
│   ├── QuestionEditor.tsx       # 题目编辑器
│   ├── ConditionBuilder.tsx     # 条件逻辑编辑器（AND/OR）
│   └── QuestionList.tsx         # 题目列表
├── exams/                        # 考试相关组件
│   ├── ExamStatusBadge.tsx      # 5状态徽章
│   ├── ExamCard.tsx             # 看板卡片
│   ├── CompactExamCard.tsx      # 紧凑型卡片
│   ├── KanbanLayout.tsx         # 看板布局（4列状态分组）
│   ├── ExamForm.tsx             # 考试表单
│   └── ExamList.tsx             # 考试列表
├── results/                      # 结果相关组件
│   ├── ResultDetails.tsx        # 结果详情
│   ├── ResultTable.tsx          # 结果表格
│   ├── AiAnalysisTab.tsx        # AI分析标签页
│   ├── AnomalyTimeline.tsx      # 异常事件时间线
│   ├── AiStatusBadge.tsx        # AI状态徽章
│   ├── GenerateReportButton.tsx # 生成报告按钮
│   └── ReportViewer.tsx         # 报告查看器
├── exam/                         # 学生答题相关组件
│   ├── AnswerInput.tsx          # 答题输入（自适配4种题型）
│   ├── QuestionNavigator.tsx    # 题目导航网格
│   ├── TimerDisplay.tsx         # 倒计时显示
│   └── device/                  # 设备检查组件
│       ├── DeviceCheckForm.tsx  # 设备检查表单
│       ├── VideoPreview.tsx     # 视频预览
│       └── AudioLevelMeter.tsx  # 音量检测
├── common/                       # 通用组件
│   └── GlobalLoading.tsx        # 全局加载指示器
└── ai-live/                      # AI直播相关组件
    └── ...
```

#### Hooks (apps/web/src/hooks/)
```
hooks/
├── useAuth.ts                    # 认证状态管理
├── useAIConnection.ts           # AI连接管理（重要！Bug修复记录详见CLAUDE.md）
├── useDeviceCheck.ts            # 设备检查（摄像头、麦克风）
├── useAnswerTimestamps.ts       # 答题时间戳追踪
├── useDebounce.ts               # 防抖hook
└── useDownloadProgress.ts       # 下载进度追踪
```

#### 类型定义 (apps/web/src/types/)
```
types/
├── api.ts                       # API类型定义（API Request/Response）
├── auth.ts                      # 认证相关类型
├── condition.ts                 # 条件逻辑类型（AND/OR表达式）
├── device.ts                    # 设备检查类型
└── webrtc.ts                    # WebRTC相关类型
```

#### 服务层 (apps/web/src/services/)
```
services/
├── ai.ts                        # AI服务客户端（聚合数据、会话管理）
├── aiModels.ts                  # AI模型查询服务
├── aiReports.ts                 # AI报告生成服务
├── exams.ts                     # 考试API客户端
├── papers.ts                    # 试卷API客户端
├── questions.ts                 # 题目API客户端
├── results.ts                   # 结果API客户端（含学生端公开接口）
├── teachers.ts                  # 教师API客户端
├── webrtc.ts                    # WebRTC会话管理（WHIP推流）
├── webrtcPublisher.ts           # WHIP推流详细实现
└── webrtcSubscriber.ts          # WHEP订阅实现
```

#### 其他
```
contexts/                        # React Context
├── MediaStreamContext.tsx       # 全局媒体流管理（跨页面共享）
└── ...

providers/                       # 应用提供者
├── SessionProvider.tsx          # 会话提供者
├── AntdConfigProvider.tsx       # Ant Design配置
└── ...

styles/                          # 全局样式
└── globals.css

utils/                           # 工具函数
└── transformers/               # 数据转换工具（snake_case ↔ camelCase）
```

---

### 2. apps/api (5,353行代码)
**后端API服务**：NestJS + TypeScript + Prisma

**技术栈**:
- NestJS (TypeScript框架)
- Prisma ORM (数据库交互)
- PostgreSQL (数据库)
- Redis (缓存)
- JWT (认证)

#### 模块结构 (apps/api/src/)
```
src/
├── main.ts                      # 应用入口
├── app.module.ts                # 根模块
├── auth/                        # 认证模块
│   ├── auth.controller.ts       # 登录、注册、token刷新
│   ├── auth.service.ts
│   ├── jwt.strategy.ts
│   ├── jwt.guard.ts
│   └── dto/                     # 数据传输对象
│       ├── login.dto.ts
│       └── register.dto.ts
├── teachers/                    # 教师管理
│   ├── teachers.controller.ts
│   ├── teachers.service.ts
│   └── dto/
│       ├── create-teacher.dto.ts
│       └── update-teacher.dto.ts
├── users/                       # 用户管理
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── dto/
├── papers/                      # 试卷管理
│   ├── papers.controller.ts     # CRUD
│   ├── papers.service.ts
│   └── dto/
│       ├── create-paper.dto.ts
│       ├── update-paper.dto.ts
│       └── query-paper.dto.ts
├── questions/                   # 题目管理
│   ├── questions.controller.ts  # CRUD、批量操作
│   ├── questions.service.ts
│   └── dto/
│       ├── create-question.dto.ts
│       ├── update-question.dto.ts
│       └── batch-question.dto.ts
├── exams/                       # 考试管理（5状态）
│   ├── exams.controller.ts      # CRUD、状态转换、导出
│   ├── exams.service.ts         # 状态机逻辑
│   └── dto/
│       ├── create-exam.dto.ts
│       ├── update-exam.dto.ts
│       └── publish-exam.dto.ts
├── results/                     # 结果管理
│   ├── results.controller.ts    # 学生端公开 + 教师端认证
│   ├── results.service.ts
│   └── dto/
│       ├── create-result.dto.ts
│       ├── submit-answer.dto.ts
│       └── query-result.dto.ts
├── ai/                          # AI会话管理
│   ├── ai.controller.ts         # 会话CRUD、流管理
│   ├── ai.service.ts            # AI业务逻辑
│   └── dto/
│       ├── create-session.dto.ts
│       └── update-session.dto.ts
├── ai-analysis/                 # AI分析数据
│   ├── ai-analysis.controller.ts # 聚合、异常、检查点查询
│   ├── ai-analysis.service.ts
│   ├── services/                # 子服务
│   │   ├── aggregates.service.ts
│   │   ├── anomalies.service.ts
│   │   └── checkpoints.service.ts
│   └── types/                   # AI分析类型
├── webrtc/                      # WebRTC代理
│   ├── webrtc.controller.ts     # WHIP/WHEP端点、流管理
│   ├── webrtc.service.ts        # MediaMTX代理逻辑
│   └── dto/
│       ├── start-session.dto.ts
│       └── whip-answer.dto.ts
├── health/                      # 健康检查
│   ├── health.controller.ts     # 应用、数据库、缓存、AI服务检查
│   ├── health.service.ts
│   └── dto/
│       └── health-response.dto.ts
├── system/                      # 系统管理
│   ├── system.controller.ts     # 系统状态、统计
│   └── system.service.ts
├── common/                      # 通用模块
│   ├── config/                  # 环境配置管理
│   │   └── environment.ts
│   ├── filters/                 # 异常过滤器
│   │   └── exception.filter.ts
│   └── interceptors/            # 拦截器
│       ├── logging.interceptor.ts
│       └── response.interceptor.ts
└── database/                    # 数据库配置
    └── database.service.ts      # Prisma连接管理
```

#### 关键服务
- **ExamsService**: 5状态管理 (DRAFT → PUBLISHED → SUCCESS/EXPIRED → ARCHIVED)
- **ResultsService**: 学生答题提交、成绩计算、AI数据关联
- **AIService**: 会话创建、RTSP消费通知、数据聚合
- **WebRtcService**: WHIP/WHEP代理、媒体服务器交互
- **HealthService**: 依赖检查（DB、Redis、AI服务）

---

### 3. services/emotion-ai (5,797行代码)
**AI分析微服务**：Python + FastAPI

**技术栈**:
- Python 3.11
- FastAPI (异步Web框架)
- OpenCV (视频处理)
- DeepFace (情绪识别)
- emotion2vec (音频情绪)
- PPG (心率检测)

#### 项目结构
```
services/emotion-ai/
├── main.py                      # FastAPI应用入口
├── config.py                    # 配置管理（环境变量、设置）
├── requirements.txt             # 依赖列表
│
├── api/                         # 路由层
│   ├── __init__.py
│   ├── health.py               # 健康检查端点
│   ├── rtsp.py                 # RTSP流消费API
│   │   ├── POST /api/rtsp/start     # 启动RTSP消费
│   │   └── POST /api/rtsp/stop      # 停止消费
│   ├── models.py               # 模型查询API
│   │   └── GET /api/models     # 列出可用模型
│   └── tts.py                  # TTS语音生成API
│       ├── POST /api/tts       # 生成语音
│       └── GET /api/tts/{id}   # 获取语音文件
│
├── models/                      # AI模型层
│   ├── __init__.py
│   ├── deepface_analyzer.py    # DeepFace情绪分析
│   │   ├── detect_emotion()    # 检测7种情绪
│   │   └── process_frame()
│   ├── emotion2vec_analyzer.py # 音频情绪分析
│   │   └── analyze_audio()
│   ├── ppg_detector.py         # 心率检测（PPG算法）
│   │   └── detect_heart_rate()
│   ├── video_processor.py      # 视频处理通用工具
│   │   └── extract_frames()
│   └── voxcpm_tts.py          # VoxCPM文本转语音
│
├── services/                    # 业务逻辑层
│   ├── __init__.py
│   ├── rtsp_manager.py         # RTSP管理器（单例）
│   │   ├── add_consumer()      # 添加RTSP消费者
│   │   └── remove_consumer()   # 移除消费者
│   ├── rtsp_consumer.py        # RTSP消费者
│   │   ├── consume_stream()    # 消费RTSP流
│   │   ├── analyze()           # 实时分析
│   │   └── write_data()        # 写入后端API
│   ├── checkpoint_file_writer.py # 检查点文件存储
│   │   ├── write_checkpoint()  # 生成checkpoint JSON
│   │   └── read_checkpoint()
│   ├── data_writer.py          # 数据写入后端API
│   │   ├── post_aggregates()   # POST聚合数据
│   │   ├── post_anomalies()    # POST异常数据
│   │   └── post_checkpoints()  # POST检查点
│   ├── aggregator.py           # 数据聚合
│   │   ├── aggregate_emotions()
│   │   ├── aggregate_attention()
│   │   └── aggregate_ppg()
│   ├── audio_extractor.py      # 音频提取
│   │   └── extract_audio_from_rtsp()
│   ├── audio_encoder.py        # 音频编码
│   │   └── encode_to_wav()
│   ├── redis_publisher.py      # Redis实时推送
│   │   ├── publish_emotion()
│   │   └── publish_anomaly()
│   ├── tts_stream_manager.py   # TTS流管理
│   └── ...
│
├── utils/                       # 工具函数
│   ├── __init__.py
│   ├── logger.py               # 结构化日志
│   └── ...
│
└── docs/                        # 文档
    └── API文档、架构设计
```

#### 核心数据流
```
1. RTSP消费 (rtsp://localhost:8554/exam_uuid_participant_id)
2. 视频帧提取 (OpenCV)
3. AI分析
   - DeepFace: 情绪识别 (7种: angry, disgust, fear, happy, sad, surprise, neutral)
   - emotion2vec: 音频情绪分析
   - PPG: 非接触式心率检测
4. 数据聚合 (5秒/10秒窗口)
5. 异常检测 (多人入镜、无人检测等)
6. 数据写入
   - /api/ai/aggregates (聚合数据)
   - /api/ai/anomalies (异常数据)
   - /api/ai/checkpoints (检查点文件)
7. 实时推送 (Redis发布)
```

---

### 4. packages/database
**共享数据库配置**：Prisma

#### 文件结构
```
packages/database/
├── prisma/
│   └── schema.prisma            # Prisma Schema（5个Domain）
│       ├── Domain 1: User Management (Teachers, Students)
│       ├── Domain 2: Content (Papers, Questions)
│       ├── Domain 3: Exams (5状态管理)
│       ├── Domain 4: Results (学生答题)
│       └── Domain 5: AI Analysis (会话、聚合、异常、检查点)
├── generated/
│   └── client/                  # 自动生成的Prisma Client
├── src/
│   └── index.ts                 # 导出Prisma实例
└── package.json
```

#### 核心表
- **Teachers**: 教师用户
- **Students**: 学生用户
- **Papers**: 试卷模板
- **Questions**: 题目（支持4种题型）
- **Exams**: 考试实例（5状态）
- **ExamResults**: 学生答题结果
- **Answers**: 单题答案
- **AISession**: AI分析会话
- **AIAggregates**: AI聚合数据（情绪、注意力、心率）
- **AIAnomalies**: 异常事件
- **AICheckpoints**: 检查点（原始分析数据）

---

## 🔗 服务间通信

### 前端 ↔ 后端 API
```
Web (4000) → API (4001)
- 教师端认证 (JWT)
- CRUD操作 (Papers, Questions, Exams, Results)
- WebRTC会话管理 (WHIP起点)
- AI数据查询 (Aggregates, Anomalies)
```

### 后端 ↔ MediaMTX
```
API (4001) ↔ MediaMTX (192.168.0.95:8889)
- WHIP代理 (浏览器→MediaMTX→RTSP)
- 流元数据管理
```

### 后端 ↔ AI服务
```
API (4001) ↔ AI Service (5678)
- POST /api/rtsp/start (启动RTSP消费)
- POST /api/rtsp/stop (停止消费)
- POST /api/ai/aggregates (写入聚合数据)
- POST /api/ai/anomalies (写入异常)
- POST /api/ai/checkpoints (写入检查点)
```

### 后端 ↔ 数据库
```
API (4001) ↔ PostgreSQL (Docker容器)
- Prisma ORM交互
- 所有业务数据持久化
- 5状态事务管理
```

### 后端 ↔ Redis
```
API (4001) ↔ Redis (Docker容器)
- 会话缓存
- 实时数据推送 (WebSocket)
- 分布式锁
```

---

## 📊 数据库Schema概览

### 5 Domain Model

#### Domain 1: User Management
```
Teacher → Papers, Exams (一对多)
Student → ExamResults (一对多)
```

#### Domain 2: Content Management
```
Paper (试卷) → Questions (题目)
  - 支持4种题型：SINGLE_CHOICE, MULTIPLE_CHOICE, TEXT, ESSAY
  - 条件逻辑：display_condition (JSON AND/OR表达式)
  - 拖拽排序：sequence_number
```

#### Domain 3: Exams
```
Exam (考试实例)
  - 5状态：DRAFT → PUBLISHED → SUCCESS/EXPIRED → ARCHIVED
  - basedOn: Paper (模板关系)
  - createdBy: Teacher
  - 配置：timeLimit, enableCamera, enableMicrophone, enableAI
```

#### Domain 4: Results
```
ExamResult (学生答题记录)
  - exam: Exam
  - student: Student
  - answers: Answer[] (每题一条)
  - aiSession: AISession (分析会话)
  - 状态：ONGOING, SUBMITTED, GRADED
```

#### Domain 5: AI Analysis
```
AISession
  - result: ExamResult
  - rtspStreamName (映射到MediaMTX)
  - 生命周期：CREATED → RUNNING → COMPLETED

AIAggregate (聚合统计)
  - session: AISession
  - 数据：情绪得分、注意力得分、心率、异常计数

AIAnomaly (异常事件)
  - session: AISession
  - type: 多人入镜、无人检测、环境变化等
  - timestamp

AICheckpoint (原始检查点)
  - session: AISession
  - frame_index, emotion_scores, heart_rate等
  - 用于回放和详细分析
```

---

## 🚀 核心流程

### 考试流程（5阶段）
```
1. 创建考试 (DRAFT)
   Teacher → Papers → create Exam
   
2. 发布考试 (PUBLISHED)
   Teacher → publish Exam
   Students can join
   
3. 学生答题
   Student → join → device-check → session → submit
   → AI分析开始 (会话创建)
   
4. 提交结果 (SUBMITTED)
   AutoGrade或Manual Grade
   
5. 归档/过期 (SUCCESS/EXPIRED → ARCHIVED)
   Teacher → archive Exam
```

### 学生答题完整流程
```
1. /exam/[examId]/join
   └─ 输入学号、姓名、访问码
   
2. /exam/[examId]/device-check
   └─ 请求摄像头/麦克风权限
   └─ 保存流到MediaStreamContext
   
3. /exam/[examId]/session/[resultId]
   └─ POST /api/ai/sessions (创建AI会话)
   └─ POST /api/webrtc/start (获取WHIP端点)
   └─ WebRTC推流开始 (WHIP→MediaMTX)
   └─ AI服务自动消费RTSP流
   └─ 学生正常答题 (自动保存)
   
4. 提交答卷
   └─ POST /api/results/{resultId}/submit
   
5. /exam/[examId]/result/[resultId]
   └─ 查看成绩和分析数据
```

### AI分析数据流
```
1. 学生推流 (WHIP) → MediaMTX (192.168.0.95:8889)
   
2. AI服务拉流 (RTSP) ← MediaMTX (localhost:8554)
   
3. 实时分析
   - 每帧：DeepFace情绪识别
   - 音频：emotion2vec分析
   - 心率：PPG检测
   
4. 数据写入（每5-10秒）
   ├─ Checkpoint文件 (原始数据)
   ├─ API POST聚合数据
   └─ Redis推送实时数据
   
5. 后端存储到数据库
   └─ ai_aggregates, ai_anomalies, ai_checkpoints
```

---

## 🔧 开发命令速查表

### 快速启动
```bash
pnpm dev:core           # 启动API + Web
pnpm docker:up          # 启动PostgreSQL + Redis
pnpm db:seed            # 数据库初始化
```

### 数据库操作
```bash
pnpm db:generate        # 生成Prisma Client
pnpm db:push            # 推送Schema
pnpm db:migrate         # 运行迁移
pnpm db:studio          # 打开Prisma Studio
```

### 单应用启动
```bash
pnpm web:dev            # 教师端 + 学生端 (4000)
pnpm api:dev            # 后端API (4001)
```

### AI服务启动
```bash
cd services/emotion-ai
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py          # AI服务 (5678)
```

---

## 📈 项目规模统计

| 部分 | 代码行数 | 技术栈 |
|------|--------|--------|
| apps/web | 5,644行 | Next.js + React 19 + TS |
| apps/api | 5,353行 | NestJS + TS |
| services/emotion-ai | 5,797行 | Python + FastAPI |
| packages/database | 配置 | Prisma ORM |
| **总计** | **~16,794行** | **Monorepo** |

---

## 🎯 关键特性

✅ **完整考试生命周期**: 5状态管理 (DRAFT → PUBLISHED → SUCCESS/EXPIRED → ARCHIVED)  
✅ **灵活题目系统**: 4种题型 + 条件逻辑 (AND/OR表达式)  
✅ **实时AI分析**: 情绪、注意力、心率检测  
✅ **WebRTC集成**: WHIP推流、WHEP订阅、MediaMTX支持  
✅ **完整数据管理**: Papers → Questions → Exams → Results → AI Analysis  
✅ **Teacher Dashboard**: 统计、分析、AI监控、实时告警  
✅ **Student Portal**: 设备检查、答题界面、成绩查看  
✅ **API一致性**: snake_case后端 + camelCase前端 + Transformer转换  

---

## ⚠️ 重要笔记

### Bug修复记录
**AI Session创建失败** (2025-11-06)
- 问题：AI会话未创建导致数据流断裂
- 原因：useAIConnection.ts的useMemo依赖问题 + React Strict Mode
- 修复：稳定化返回值、添加执行守卫
- 详见: CLAUDE.md "重要Bug修复记录"

### 架构特色
- **Monorepo设计**: 统一管理、共享类型、共享Database配置
- **Domain-Driven Design**: 5个清晰的业务域
- **类型安全**: TypeScript全栈 + API类型定义
- **分层架构**: 控制层 → 服务层 → 数据层

---

**最后更新**: 2025-11-06  
**文档版本**: v1.0.0

