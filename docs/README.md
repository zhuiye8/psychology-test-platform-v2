# 项目文档中心

本目录包含心理测试平台 2.0 重构版的完整文档。快速导航到你需要的内容。

## 文档索引

### 快速开始
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - 快速参考指南
  - 文件位置速查表
  - 常用命令
  - 端口映射
  - 快速查找代码

### 架构和结构
- **[PROJECT_STRUCTURE_OVERVIEW.md](./PROJECT_STRUCTURE_OVERVIEW.md)** - 完整项目结构概览
  - Monorepo架构详解
  - 4个核心应用介绍（Web、API、AI、Database）
  - 每个应用的详细文件结构
  - 服务间通信架构
  - 数据库Schema概览
  - 核心业务流程

- **[DIRECTORY_TREE.txt](./DIRECTORY_TREE.txt)** - 目录树（可视化结构）
  - 完整的文件树状结构
  - 快速定位文件
  - 模块关系图

### 功能和特性
- **[setup-guide.md](./setup-guide.md)** - 项目设置和环境配置
  - 环境变量配置
  - Docker启动
  - 数据库初始化
  - AI服务配置

- **[conditional-logic-testing-guide.md](./conditional-logic-testing-guide.md)** - 条件逻辑功能测试指南
  - 条件逻辑语法
  - 编辑器使用
  - 运行时判断
  - 测试用例

### AI集成和问题解决
- **[ai_data_flow_analysis.md](./ai_data_flow_analysis.md)** - AI数据流分析
  - WebRTC数据流
  - RTSP消费流程
  - AI分析管道
  - 数据写入流程

- **[ai_fix_test_guide.md](./ai_fix_test_guide.md)** - AI修复和测试指南
  - 已知问题和修复
  - 测试验证清单
  - 调试技巧

### 项目说明
参考项目根目录的文档：
- **[../CLAUDE.md](../CLAUDE.md)** - Claude AI开发指南（重要！）
  - 项目概述
  - 开发命令
  - Bug修复记录
  - 架构说明
  - 重要开发原则

- **[../README.md](../README.md)** - 项目README
- **[../CONTRIBUTING.md](../CONTRIBUTING.md)** - 贡献指南

---

## 按用途查找文档

### 我想快速上手开发
1. 阅读 [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)
2. 查看 [PROJECT_STRUCTURE_OVERVIEW.md](./PROJECT_STRUCTURE_OVERVIEW.md)
3. 参考 [setup-guide.md](./setup-guide.md)

### 我想了解项目整体架构
1. 阅读 [PROJECT_STRUCTURE_OVERVIEW.md](./PROJECT_STRUCTURE_OVERVIEW.md)
2. 查看 [DIRECTORY_TREE.txt](./DIRECTORY_TREE.txt)
3. 参考 [../CLAUDE.md](../CLAUDE.md)

### 我想找某个具体功能的代码
1. 查看 [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) 中的文件位置速查表
2. 使用 [DIRECTORY_TREE.txt](./DIRECTORY_TREE.txt) 定位文件
3. 查看 [PROJECT_STRUCTURE_OVERVIEW.md](./PROJECT_STRUCTURE_OVERVIEW.md) 了解详细信息

### 我在做教师端功能开发
1. 查看 [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) 中的教师端功能表
2. 参考 [PROJECT_STRUCTURE_OVERVIEW.md](./PROJECT_STRUCTURE_OVERVIEW.md) 中的Web应用部分

### 我在做学生端功能开发
1. 查看 [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) 中的学生端功能表
2. 参考 [PROJECT_STRUCTURE_OVERVIEW.md](./PROJECT_STRUCTURE_OVERVIEW.md) 中的学生端流程

### 我在做后端API开发
1. 查看 [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) 中的后端API文件结构
2. 参考 [PROJECT_STRUCTURE_OVERVIEW.md](./PROJECT_STRUCTURE_OVERVIEW.md) 中的API应用部分

### 我在做AI服务开发
1. 阅读 [ai_data_flow_analysis.md](./ai_data_flow_analysis.md)
2. 查看 [ai_fix_test_guide.md](./ai_fix_test_guide.md)
3. 参考 [PROJECT_STRUCTURE_OVERVIEW.md](./PROJECT_STRUCTURE_OVERVIEW.md) 中的AI服务部分

### 我在做条件逻辑功能
1. 阅读 [conditional-logic-testing-guide.md](./conditional-logic-testing-guide.md)
2. 参考 [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) 中的条件逻辑代码位置

### 遇到问题或Bug
1. 查看 [../CLAUDE.md](../CLAUDE.md) 中的"重要Bug修复记录"
2. 参考 [ai_fix_test_guide.md](./ai_fix_test_guide.md)
3. 查看相关功能的测试指南

---

## 核心概念快速了解

### 项目规模
- **总代码量**: ~16,794行代码
  - Web应用: 5,644行 (Next.js 15 + React 19)
  - API服务: 5,353行 (NestJS + TypeScript)
  - AI服务: 5,797行 (Python + FastAPI)

### 技术栈
- **前端**: Next.js 15 + React 19 + Ant Design + Tailwind CSS
- **后端**: NestJS + TypeScript + Prisma + PostgreSQL + Redis
- **AI**: Python + FastAPI + DeepFace + emotion2vec + OpenCV

### 核心特性
- **5状态考试生命周期**: DRAFT → PUBLISHED → SUCCESS/EXPIRED → ARCHIVED
- **4种题型支持**: 单选、多选、文本、问答
- **条件逻辑**: AND/OR表达式支持
- **实时AI分析**: 情绪、注意力、心率检测
- **WebRTC集成**: WHIP推流、WHEP订阅、MediaMTX支持

### 主要端口
| 服务 | 端口 | 说明 |
|------|------|------|
| Web应用 | 4000 | 教师端 + 学生端 |
| API服务 | 4001 | 后端API |
| AI服务 | 5678 | Python FastAPI |
| 数据库 | 5432 | PostgreSQL |
| 缓存 | 6379 | Redis |
| MediaMTX | 8889 | WebRTC信令 |

---

## 开发流程

### 启动项目
```bash
# 1. 启动基础设施
pnpm docker:up
pnpm db:seed

# 2. 启动应用
pnpm dev:core

# 3. 启动AI服务（另一个终端）
cd services/emotion-ai
python main.py
```

### 常用命令
```bash
# 数据库
pnpm db:generate    # 生成Prisma Client
pnpm db:push        # 推送Schema
pnpm db:migrate     # 数据库迁移
pnpm db:studio      # Prisma Studio

# 开发
pnpm web:dev        # Web应用
pnpm api:dev        # API服务
pnpm lint           # 代码检查
pnpm format         # 代码格式化
```

---

## 重要笔记

### 开发原则
- **代码与文档同步**: 修改代码时必须同步更新文档
- **类型安全**: 所有API响应必须定义类型，避免使用any
- **单一职责**: 每个组件/函数只做一件事
- **注释要求**: 必须使用中文注释，复杂逻辑添加行内注释

### 常见问题
- AI会话创建失败: 参考 [../CLAUDE.md](../CLAUDE.md) 中的Bug修复记录
- WebRTC推流问题: 查看 [ai_data_flow_analysis.md](./ai_data_flow_analysis.md)
- 条件逻辑不工作: 参考 [conditional-logic-testing-guide.md](./conditional-logic-testing-guide.md)

---

## 文档维护

| 文档 | 最后更新 | 版本 |
|------|---------|------|
| PROJECT_STRUCTURE_OVERVIEW.md | 2025-11-06 | v1.0.0 |
| QUICK_REFERENCE.md | 2025-11-06 | v1.0.0 |
| DIRECTORY_TREE.txt | 2025-11-06 | v1.0.0 |
| README.md (本文件) | 2025-11-06 | v1.0.0 |

---

**生成时间**: 2025-11-06  
**文档中心版本**: v1.0.0
