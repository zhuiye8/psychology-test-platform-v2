# 贡献指南

感谢您对心理测试平台2.0的贡献！本文档提供了参与项目开发的指南。

## 📋 目录

- [开发环境设置](#开发环境设置)
- [代码规范](#代码规范)
- [提交规范](#提交规范)
- [分支管理](#分支管理)
- [Pull Request流程](#pull-request流程)
- [测试要求](#测试要求)

---

## 🛠️ 开发环境设置

### 前置要求

- **Node.js**: v20.x 或更高
- **pnpm**: v9.x 或更高
- **PostgreSQL**: v15 或更高
- **Redis**: v7 或更高
- **Python**: v3.11 或更高（AI服务）
- **Docker**: 用于运行PostgreSQL和Redis

### 快速开始

1. **克隆仓库**
```bash
git clone <repository-url>
cd refactor
```

2. **安装依赖**
```bash
pnpm install
```

3. **启动基础设施**
```bash
# 启动PostgreSQL和Redis
pnpm docker:up
```

4. **配置环境变量**
```bash
# 复制示例环境变量
cp .env.example .env

# 编辑.env文件，填入必要的配置
# 特别注意：DATABASE_URL、MEDIAMTX_HOST、AI_SERVICE_URL
```

5. **数据库设置**
```bash
# 生成Prisma Client
pnpm db:generate

# 推送schema到数据库
pnpm db:push

# (可选) 填充测试数据
pnpm db:seed
```

6. **启动开发服务器**
```bash
# 启动所有核心服务（API + Web）
pnpm dev:core

# 或单独启动
pnpm api:dev    # 后端API (端口4001)
pnpm web:dev    # 前端Web (端口4000)
```

7. **启动AI服务**（可选，用于情绪分析功能）
```bash
cd services/emotion-ai
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py  # AI服务 (端口5678)
```

---

## 📐 代码规范

### 命名约定

- **后端API字段**: `snake_case` (例如: `time_limit`, `participant_id`)
- **前端TypeScript变量**: `camelCase` (例如: `timeLimit`, `participantId`)
- **组件名**: `PascalCase` (例如: `ExamList`, `QuestionEditor`)
- **文件名**:
  - 组件: `PascalCase.tsx`
  - 工具/服务: `kebab-case.ts`

### 文件组织

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

### 文件长度限制

- **单文件≤500行**（不计算import语句）
- 超过限制时拆分，但避免过度拆分

### 注释要求

- **必须使用中文注释**
- 组件/函数必须有JSDoc说明
- 复杂逻辑必须添加行内注释
- 示例：

```typescript
/**
 * 提交考试
 *
 * @param examResultId 考试结果ID
 * @param answers 学生答案数组
 * @returns 提交结果
 */
async function submitExam(examResultId: string, answers: Answer[]) {
  // 使用事务确保原子性
  return await db.$transaction(async (tx) => {
    // ...
  });
}
```

### 类型安全

- 所有API响应必须定义类型
- 避免使用`any`类型
- 利用TypeScript的类型推导
- 使用transformer转换API响应

---

## 💬 提交规范

我们使用[Conventional Commits](https://www.conventionalcommits.org/)规范。

### 提交消息格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type类型

- `feat`: 新功能
- `fix`: Bug修复
- `docs`: 文档更新
- `style`: 代码格式调整（不影响功能）
- `refactor`: 重构（不改变功能）
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建/工具链相关

### Scope范围

- `api`: 后端API
- `web`: 前端Web应用
- `ai`: AI分析服务
- `database`: 数据库相关
- `common`: 通用配置

### 示例

```bash
# 好的提交示例
git commit -m "feat(web): 添加考试结果导出Excel功能"
git commit -m "fix(api): 修复提交考试时的竞态条件"
git commit -m "docs: 更新README安装说明"

# 不好的示例
git commit -m "update"
git commit -m "fix bug"
git commit -m "修改了一些东西"
```

---

## 🌳 分支管理

### 主要分支

- `main`: 主分支，保持稳定，所有功能完成后合并到此
- `develop`: 开发分支，日常开发在此进行

### 功能分支

从`develop`创建功能分支：

```bash
# 命名格式: feature/<功能名称>
git checkout develop
git pull
git checkout -b feature/exam-result-export

# 开发完成后提交PR到develop
```

### Bug修复分支

```bash
# 命名格式: fix/<问题描述>
git checkout develop
git checkout -b fix/submission-race-condition
```

### 紧急修复分支

```bash
# 命名格式: hotfix/<问题描述>
git checkout main
git checkout -b hotfix/critical-bug
```

---

## 🔄 Pull Request流程

### 1. 创建PR前

- [ ] 确保代码通过所有lint检查: `pnpm lint`
- [ ] 确保代码符合格式规范: `pnpm format`
- [ ] 本地测试通过
- [ ] 提交消息符合规范
- [ ] 更新相关文档

### 2. 创建PR

- 使用清晰的标题描述改动
- 填写PR模板（如果有）
- 关联相关Issue
- 添加截图（UI改动）

### 3. PR描述模板

```markdown
## 📝 改动说明
简要描述本次PR的改动内容和目的

## 🎯 解决的问题
- 关联Issue: #123
- 问题描述: ...

## ✨ 主要改动
- [ ] 改动点1
- [ ] 改动点2

## 🧪 测试
- [ ] 单元测试
- [ ] 集成测试
- [ ] 手动测试

## 📸 截图
（如有UI改动请附上截图）

## ⚠️ 注意事项
（如有需要注意的地方请说明）
```

### 4. 代码审查

- 至少需要1位团队成员审查
- 根据反馈修改代码
- 所有对话解决后才能合并

### 5. 合并

- 使用"Squash and merge"（压缩提交）
- 删除已合并的分支

---

## 🧪 测试要求

### 单元测试

```bash
# 运行测试
pnpm test

# 运行特定文件测试
pnpm test <file-path>

# 查看覆盖率
pnpm test:coverage
```

### 端到端测试

```bash
# 运行E2E测试（暂未实现）
pnpm test:e2e
```

### 测试覆盖要求

- 新功能必须有测试
- 关键业务逻辑测试覆盖率≥80%
- Bug修复必须添加回归测试

---

## 📚 常见问题

### 如何添加新的npm包？

使用pnpm的workspace功能：

```bash
# 添加到特定应用
pnpm --filter @psychology/web add <package>
pnpm --filter @psychology/api add <package>

# 添加到根workspace（共享依赖）
pnpm add -w <package>
```

### 如何更新Prisma Schema？

```bash
# 1. 修改 packages/database/prisma/schema.prisma
# 2. 生成新的Prisma Client
pnpm db:generate

# 3. 推送到数据库
pnpm db:push

# 4. 创建迁移（生产环境）
pnpm db:migrate
```

### 遇到TypeScript类型错误？

```bash
# 清除TypeScript缓存
pnpm clean

# 重新生成Prisma Client
pnpm db:generate

# 重新安装依赖
rm -rf node_modules
pnpm install
```

---

## 💡 最佳实践

1. **频繁提交**: 小步提交，每次提交只做一件事
2. **保持同步**: 经常从develop拉取最新代码
3. **及时沟通**: 遇到问题及时在团队中讨论
4. **代码审查**: 认真对待代码审查，给出建设性意见
5. **文档优先**: 修改代码时同步更新文档
6. **安全意识**: 不要提交敏感信息（密钥、密码等）

---

## 📞 联系方式

如有问题或建议，请：
- 创建Issue
- 在团队群中讨论
- 联系项目负责人

---

**感谢您的贡献！** 🎉
