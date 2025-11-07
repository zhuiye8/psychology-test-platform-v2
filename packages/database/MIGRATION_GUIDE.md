# 数据库Migration指南

## 📋 背景

本项目从 `isCorrect` 布尔评分系统迁移到 `points/maxPoints` 统一评分系统。

### Schema变化

**Answer表字段变更**:
```diff
- isCorrect Boolean @default(false)  ❌ 已删除
+ points    Float   @default(0)      ✅ 实际得分
+ maxPoints Float   @default(0)      ✅ 题目最大分
```

---

## 🚀 部署方法

### 方法1：使用Prisma DB Push（推荐）

**适用场景**：开发环境、测试环境、可接受数据丢失的场景

```bash
cd packages/database

# 生成Prisma Client
pnpm db:generate

# 推送schema到数据库（会自动删除is_correct列）
pnpm db:push --accept-data-loss

# 验证schema
pnpm prisma db pull
```

**优点**：
- ✅ 简单快速
- ✅ 自动处理schema同步
- ✅ 无需编写migration脚本

**缺点**：
- ⚠️ 会丢失is_correct列的数据（但我们不需要这些数据）

---

### 方法2：手动执行SQL清理脚本（生产环境）

**适用场景**：生产环境、需要精确控制的场景

#### Step 1: 备份数据库
```bash
# PostgreSQL备份
pg_dump -U postgres psychology_db > backup_$(date +%Y%m%d_%H%M%S).sql
```

#### Step 2: 执行清理脚本
```bash
# 使用psql执行
psql -U postgres -d psychology_db -f cleanup_is_correct.sql

# 或使用环境变量
PGPASSWORD=your_password psql -U postgres -h localhost -d psychology_db -f cleanup_is_correct.sql
```

#### Step 3: 验证结果
脚本会自动输出验证结果，确认：
- ✅ is_correct列不存在
- ✅ points列存在（类型：double precision，默认值：0）
- ✅ max_points列存在（类型：double precision，默认值：0）

#### Step 4: 生成Prisma Client
```bash
cd packages/database
pnpm db:generate
```

---

## 🔍 验证清理结果

### 检查数据库schema
```sql
-- 查看Answer表的列定义
SELECT
  column_name,
  data_type,
  column_default
FROM information_schema.columns
WHERE table_name = 'answers'
ORDER BY column_name;
```

**预期结果**：
- ✅ 包含 `points` 列（double precision, default 0）
- ✅ 包含 `max_points` 列（double precision, default 0）
- ❌ 不包含 `is_correct` 列

### 测试应用功能
```bash
# 启动后端API
cd apps/api
pnpm dev

# 启动前端
cd apps/web
pnpm dev

# 测试流程：
# 1. 创建试卷 → 添加题目（配置选项分数）
# 2. 发布考试
# 3. 学生答题 → 查看结果（得分率显示）
# 4. 教师查看Results详情（超分标记、选项分数）
```

---

## 📊 数据兼容性说明

### Q: 旧数据的is_correct字段怎么办？
**A**: 删除即可，因为：
1. 新评分系统不使用isCorrect字段
2. 所有评分逻辑基于option.score
3. 历史数据的isCorrect值无法转换为新的points系统

### Q: 执行cleanup后会丢失数据吗？
**A**: 只会删除is_correct列，其他数据保留：
- ✅ 保留：selectedOptions、textAnswer、answeredAt等
- ✅ 保留：ExamResult、Question、Option等关联数据
- ❌ 删除：Answer.isCorrect列

### Q: 需要重新计算历史考试的分数吗？
**A**: 不需要，因为：
1. ExamResult.score字段已经保存了总分
2. 新考试会自动使用新评分系统
3. 历史考试结果仍然有效（基于旧的isCorrect逻辑）

---

## ⚠️ 注意事项

1. **备份数据库**：执行任何schema变更前务必备份
2. **停止服务**：执行migration期间停止应用服务
3. **测试验证**：生产环境部署前在测试环境完整验证
4. **回滚计划**：准备回滚方案（恢复备份）
5. **监控日志**：部署后监控应用日志，确认无错误

---

## 🎯 完整部署检查清单

### 部署前
- [ ] 备份数据库
- [ ] 测试环境验证通过
- [ ] 代码已合并到main分支
- [ ] 前后端代码已构建成功

### 部署中
- [ ] 停止应用服务
- [ ] 执行数据库清理（方法1或方法2）
- [ ] 验证schema同步成功
- [ ] 生成Prisma Client
- [ ] 重启应用服务

### 部署后
- [ ] 健康检查：GET /health
- [ ] 数据库连接正常
- [ ] Redis缓存正常
- [ ] 创建测试考试并完成答题
- [ ] 学生端得分率显示正确
- [ ] 教师端Results详情页正常
- [ ] 试卷预览显示选项分数
- [ ] 超分场景UI正常

---

## 📞 故障排查

### 问题1：points列不存在
**错误信息**：`column "points" does not exist`

**解决方案**：
```bash
# 重新推送schema
cd packages/database
pnpm db:push --accept-data-loss
```

### 问题2：is_correct列仍然存在
**错误信息**：数据库中仍有is_correct列

**解决方案**：
```bash
# 手动删除
psql -U postgres -d psychology_db -c 'ALTER TABLE "answers" DROP COLUMN IF EXISTS "is_correct";'
```

### 问题3：Prisma Client未更新
**错误信息**：TypeScript类型错误，仍然显示isCorrect字段

**解决方案**：
```bash
# 重新生成Prisma Client
cd packages/database
pnpm db:generate

# 重启应用
cd apps/api
pnpm dev
```

---

**最后更新**：2025-11-07
**版本**：v2.1.0
