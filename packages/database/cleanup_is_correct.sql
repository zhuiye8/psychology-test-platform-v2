-- ============================================================================
-- 数据库清理脚本：删除is_correct字段
-- ============================================================================
-- 用途：删除Answer表中已废弃的is_correct列
-- 运行时机：部署新版本前执行
-- 注意：此操作不可逆，请提前备份数据库
-- ============================================================================

-- 1. 删除is_correct列（如果存在）
ALTER TABLE "answers" DROP COLUMN IF EXISTS "is_correct";

-- 2. 确保points和max_points列存在且有默认值
-- （正常情况下已由Prisma schema创建，此处为保险起见）
DO $$
BEGIN
  -- 添加points列（如果不存在）
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name='answers' AND column_name='points'
  ) THEN
    ALTER TABLE "answers" ADD COLUMN "points" DOUBLE PRECISION NOT NULL DEFAULT 0;
  END IF;

  -- 添加max_points列（如果不存在）
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name='answers' AND column_name='max_points'
  ) THEN
    ALTER TABLE "answers" ADD COLUMN "max_points" DOUBLE PRECISION NOT NULL DEFAULT 0;
  END IF;
END $$;

-- 3. 验证清理结果
SELECT
  column_name,
  data_type,
  column_default
FROM information_schema.columns
WHERE table_name = 'answers'
  AND column_name IN ('is_correct', 'points', 'max_points')
ORDER BY column_name;

-- ============================================================================
-- 预期结果：
-- - is_correct列不存在（查询无结果）
-- - points列存在，类型为double precision，默认值为0
-- - max_points列存在，类型为double precision，默认值为0
-- ============================================================================

-- 使用方法：
-- psql -U postgres -d psychology_db -f cleanup_is_correct.sql
-- 或者在Prisma中：
-- pnpm db:push --accept-data-loss
