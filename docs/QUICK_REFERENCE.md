# 心理测试平台 2.0 - 快速参考指南

## 📂 文件查找速查表

### 教师端功能

| 功能 | 位置 | 说明 |
|------|------|------|
| Dashboard主页 | `apps/web/src/app/dashboard/page.tsx` | 统计卡片、快速操作、最近活动 |
| 试卷管理 | `apps/web/src/app/dashboard/papers/` | 试卷CRUD、详情、题目拖拽 |
| 题目管理 | `apps/web/src/app/dashboard/questions/` | 题目CRUD、4种题型、条件逻辑编辑器 |
| 考试管理 | `apps/web/src/app/dashboard/exams/` | 5状态看板视图（DRAFT/PUBLISHED/SUCCESS/EXPIRED/ARCHIVED） |
| 结果查看 | `apps/web/src/app/dashboard/results/` | 结果列表、详情、AI分析标签页 |
| 数据分析 | `apps/web/src/app/dashboard/analytics/` | 统计图表、分数分布、导出 |
| AI监控 | `apps/web/src/app/dashboard/ai-monitor/` | 系统状态、实时统计、会话表格、异常时间线 |
| 设置 | `apps/web/src/app/dashboard/settings/` | 个人信息、密码修改、系统设置 |

### 学生端功能

| 功能 | 位置 | 说明 |
|------|------|------|
| 加入考试 | `apps/web/src/app/exam/[examId]/join/` | 输入学号、姓名、访问码 |
| 设备检查 | `apps/web/src/app/exam/[examId]/device-check/` | 摄像头、麦克风权限检查 |
| 答题界面 | `apps/web/src/app/exam/[examId]/session/[resultId]/page.tsx` | 核心答题功能 |
| 成绩查看 | `apps/web/src/app/exam/[examId]/result/[resultId]/` | 成绩展示、答题分析 |

### 关键React组件

| 组件 | 路径 | 用途 |
|------|------|------|
| PageHeader | `apps/web/src/components/ui-kit/PageHeader.tsx` | 页面标题、描述、操作按钮 |
| DataTable | `apps/web/src/components/ui-kit/DataTable.tsx` | 通用表格组件（含分页） |
| FormModal | `apps/web/src/components/ui-kit/FormModal.tsx` | 表单弹窗 |
| StatusBadge | `apps/web/src/components/ui-kit/StatusBadge.tsx` | 5状态徽章 |
| ExamStatusBadge | `apps/web/src/components/exams/ExamStatusBadge.tsx` | 考试5状态显示 |
| KanbanLayout | `apps/web/src/components/exams/KanbanLayout.tsx` | 看板布局（4列） |
| ConditionBuilder | `apps/web/src/components/questions/ConditionBuilder.tsx` | 条件逻辑编辑器 |
| QuestionTypeSelector | `apps/web/src/components/questions/QuestionTypeSelector.tsx` | 题型选择器 |
| AnswerInput | `apps/web/src/components/exam/AnswerInput.tsx` | 答题输入（4种题型自适配） |
| AiAnalysisTab | `apps/web/src/components/results/AiAnalysisTab.tsx` | AI分析标签页 |
| AnomalyTimeline | `apps/web/src/components/results/AnomalyTimeline.tsx` | 异常事件时间线 |

### 关键React Hooks

| Hook | 路径 | 功能 |
|------|------|------|
| useAuth | `apps/web/src/hooks/useAuth.ts` | 认证状态管理 |
| useAIConnection | `apps/web/src/hooks/useAIConnection.ts` | AI会话管理、WHIP推流（含Bug修复） |
| useDeviceCheck | `apps/web/src/hooks/useDeviceCheck.ts` | 设备权限检查 |
| useAnswerTimestamps | `apps/web/src/hooks/useAnswerTimestamps.ts` | 答题时间追踪 |

### API服务层

| 服务 | 路径 | 功能 |
|------|------|------|
| Papers | `apps/web/src/services/papers.ts` | 试卷API客户端 |
| Questions | `apps/web/src/services/questions.ts` | 题目API客户端 |
| Exams | `apps/web/src/services/exams.ts` | 考试API客户端 |
| Results | `apps/web/src/services/results.ts` | 结果API客户端 |
| AI | `apps/web/src/services/ai.ts` | AI聚合数据查询 |
| WebRTC | `apps/web/src/services/webrtc.ts` | WebRTC会话管理 |
| WebRTCPublisher | `apps/web/src/services/webrtcPublisher.ts` | WHIP推流实现 |

---

## 🖥️ 后端API文件结构

| 模块 | 文件 | 职责 |
|------|------|------|
| Auth | `apps/api/src/auth/auth.controller.ts` | 登录、token刷新 |
| Papers | `apps/api/src/papers/papers.controller.ts` | 试卷CRUD |
| Questions | `apps/api/src/questions/questions.controller.ts` | 题目CRUD、批量操作 |
| Exams | `apps/api/src/exams/exams.controller.ts` | 考试CRUD、5状态转换 |
| Results | `apps/api/src/results/results.controller.ts` | 学生端公开 + 教师端认证 |
| AI | `apps/api/src/ai/ai.controller.ts` | AI会话管理 |
| AI Analysis | `apps/api/src/ai-analysis/ai-analysis.controller.ts` | 聚合、异常、检查点查询 |
| WebRTC | `apps/api/src/webrtc/webrtc.controller.ts` | WHIP/WHEP代理 |
| Health | `apps/api/src/health/health.controller.ts` | 健康检查 |

---

## 🐍 AI服务文件结构

| 功能 | 文件 | 说明 |
|------|------|------|
| 应用入口 | `services/emotion-ai/main.py` | FastAPI应用 |
| RTSP消费 | `services/emotion-ai/api/rtsp.py` | RTSP API端点 |
| 情绪识别 | `services/emotion-ai/models/deepface_analyzer.py` | DeepFace 7种情绪 |
| 音频情绪 | `services/emotion-ai/models/emotion2vec_analyzer.py` | emotion2vec分析 |
| 心率检测 | `services/emotion-ai/models/ppg_detector.py` | PPG算法 |
| RTSP管理 | `services/emotion-ai/services/rtsp_manager.py` | 单例RTSP管理器 |
| RTSP消费者 | `services/emotion-ai/services/rtsp_consumer.py` | 流消费逻辑 |
| 数据写入 | `services/emotion-ai/services/data_writer.py` | 写入后端API |
| 检查点 | `services/emotion-ai/services/checkpoint_file_writer.py` | 检查点文件 |
| 数据聚合 | `services/emotion-ai/services/aggregator.py` | 数据聚合逻辑 |

---

## 💾 数据库关键表

| 表 | 位置 | 说明 |
|----|----|------|
| Teachers | `packages/database/prisma/schema.prisma` | 教师用户 |
| Papers | | 试卷模板 |
| Questions | | 题目（4种题型） |
| Exams | | 考试实例（5状态） |
| ExamResults | | 学生答题 |
| Answers | | 单题答案 |
| AISession | | AI分析会话 |
| AIAggregate | | AI聚合数据 |
| AIAnomaly | | 异常事件 |
| AICheckpoint | | 检查点（原始数据） |

**Schema查看**: `packages/database/prisma/schema.prisma`

---

## 🔍 代码位置速查

### 题型支持
- 单选题（SINGLE_CHOICE）: `QuestionEditor.tsx`
- 多选题（MULTIPLE_CHOICE）: `QuestionEditor.tsx`
- 文本题（TEXT）: `QuestionEditor.tsx`
- 问答题（ESSAY）: `QuestionEditor.tsx`

### 5状态管理
- DRAFT（草稿）: `exams.service.ts` (NestJS)
- PUBLISHED（进行中）: `exams.service.ts`
- SUCCESS（已完成）: `exams.service.ts`
- EXPIRED（已过期）: `exams.service.ts`
- ARCHIVED（已归档）: `exams.service.ts`

### 条件逻辑
- 编辑器: `apps/web/src/components/questions/ConditionBuilder.tsx`
- 类型: `apps/web/src/types/condition.ts`
- 运行时判断: `apps/web/src/app/exam/[examId]/session/[resultId]/page.tsx`

### WebRTC/推流
- WHIP推流: `apps/web/src/services/webrtcPublisher.ts`
- 后端代理: `apps/api/src/webrtc/webrtc.controller.ts`
- MediaMTX配置: `/home/aaron/心理测试平台/mediamtx.yml`

### AI分析
- 前端连接: `apps/web/src/hooks/useAIConnection.ts`（包含Bug修复）
- 后端会话: `apps/api/src/ai/ai.service.ts`
- AI服务: `services/emotion-ai/services/rtsp_consumer.py`

---

## 📝 文档位置

| 文档 | 位置 |
|------|------|
| 项目说明 | `refactor/CLAUDE.md` |
| README | `refactor/README.md` |
| 贡献指南 | `refactor/CONTRIBUTING.md` |
| AI数据流分析 | `refactor/docs/ai_data_flow_analysis.md` |
| AI修复指南 | `refactor/docs/ai_fix_test_guide.md` |
| 设置指南 | `refactor/docs/setup-guide.md` |
| 项目结构 | `refactor/docs/PROJECT_STRUCTURE_OVERVIEW.md` (本报告) |
| 条件逻辑测试 | `refactor/docs/conditional-logic-testing-guide.md` |

---

## 🚀 常用命令

```bash
# 启动开发
pnpm dev:core              # 启动API + Web
pnpm docker:up             # 启动PostgreSQL + Redis
pnpm db:seed               # 初始化数据库

# 数据库
pnpm db:generate           # 生成Prisma Client
pnpm db:push               # 推送Schema
pnpm db:studio             # Prisma Studio

# 单应用
pnpm web:dev               # Web应用 (4000)
pnpm api:dev               # API服务 (4001)

# AI服务
cd services/emotion-ai
python main.py             # AI服务 (5678)
```

---

## 🔗 端口映射

| 服务 | 端口 | 说明 |
|------|------|------|
| Web应用 | 4000 | 教师端 + 学生端 |
| API服务 | 4001 | 后端API |
| AI服务 | 5678 | Python FastAPI |
| PostgreSQL | 5432 | 数据库 |
| Redis | 6379 | 缓存/消息队列 |
| MediaMTX | 8889 | WebRTC/WHIP信令 |
| | 8189 | WebRTC/UDP媒体 |
| | 8554 | RTSP流输出 |

---

**快速参考生成时间**: 2025-11-06
