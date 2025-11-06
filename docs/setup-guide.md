# 心理测试平台2.0 - 开发环境搭建指南

> 本指南适用于从GitHub克隆项目后的首次环境搭建

---

## 📋 前置要求

### 必需软件

| 软件 | 版本要求 | 用途 | 安装方式 |
|------|---------|------|---------|
| **Node.js** | ≥ 18.x | 前后端运行时 | https://nodejs.org/ |
| **pnpm** | ≥ 8.x | 包管理器 | `npm install -g pnpm` |
| **PostgreSQL** | ≥ 15.x | 主数据库 | https://www.postgresql.org/ |
| **Redis** | ≥ 7.x | 缓存/会话 | https://redis.io/ |
| **Python** | 3.11 | AI服务 | https://www.python.org/ |
| **Miniconda** | 最新版 | Python环境管理 | https://docs.conda.io/en/latest/miniconda.html |

### 可选软件（AI监控功能需要）

| 软件 | 版本要求 | 用途 |
|------|---------|------|
| **MediaMTX** | ≥ 1.14.0 | WebRTC流媒体服务器 |

---

## 🚀 快速开始（5步上手）

### Step 1: 克隆项目

```bash
git clone <your-repo-url>
cd refactor
```

### Step 2: 安装Node.js依赖

```bash
# 安装所有工作区依赖
pnpm install

# 预期输出：
# ✓ Packages installed successfully
```

### Step 3: 配置环境变量

```bash
# 复制环境变量模板
cp .env.example .env

# 编辑.env文件，配置以下关键项：
# - DATABASE_URL (PostgreSQL连接)
# - JWT_SECRET (随机生成的密钥)
# - AI_SERVICE_URL (如果启用AI功能)
```

**`.env` 配置示例**：
```bash
# 数据库配置
DATABASE_URL="postgresql://psychology_user:psychology_refactor_pass@localhost:5435/psychology_refactor?schema=public"

# JWT密钥（请修改为随机字符串）
JWT_SECRET="your-random-secret-key-change-me"

# Redis配置
REDIS_URL="redis://localhost:6379"

# AI服务配置（可选）
AI_SERVICE_URL="http://localhost:5678"
AI_SERVICE_TOKEN="your-ai-service-token"

# MediaMTX配置（可选，AI监控需要）
MEDIAMTX_HOST="http://localhost:8889"
MEDIAMTX_RTSP_URL="rtsp://localhost:8554"
```

### Step 4: 启动数据库服务

**方式A: 使用Docker Compose（推荐）**
```bash
# 启动PostgreSQL + Redis
pnpm docker:up

# 验证服务状态
docker ps | grep -E "postgres|redis"
```

**方式B: 本地安装**
```bash
# 启动PostgreSQL (默认端口5432)
# 启动Redis (默认端口6379)

# 创建数据库和用户
psql -U postgres << 'SQL'
CREATE DATABASE psychology_refactor;
CREATE USER psychology_user WITH PASSWORD 'psychology_refactor_pass';
GRANT ALL PRIVILEGES ON DATABASE psychology_refactor TO psychology_user;
SQL
```

### Step 5: 初始化数据库

```bash
# 生成Prisma Client
pnpm db:generate

# 推送数据库Schema
pnpm db:push

# 填充初始数据（创建默认管理员账户等）
pnpm db:seed
```

**预期输出**：
```
✅ Database schema applied successfully
✅ Seed data inserted:
   - Default admin user created (admin / admin123)
```

---

## 🎯 启动开发服务

### 方式A: 启动核心服务（不含AI）

```bash
# 在项目根目录执行
pnpm dev:core
```

这会启动：
- ✅ 后端API服务 (http://localhost:4001)
- ✅ 前端Web应用 (http://localhost:4000)

### 方式B: 分别启动服务

**终端1 - 后端API**:
```bash
cd apps/api
pnpm dev
# 监听端口: 4001
```

**终端2 - 前端Web**:
```bash
cd apps/web
pnpm dev
# 监听端口: 4000
```

### 访问应用

- **前端应用**: http://localhost:4000
- **后端API**: http://localhost:4001/health
- **API文档**: http://localhost:4001/api-docs (如果启用)

**默认管理员账户**:
- 用户名: `admin`
- 密码: `admin123`

---

## 🤖 AI分析服务配置（可选）

如果需要启用AI情绪分析功能，需要额外配置AI服务。

### Step 1: 创建Conda环境

```bash
# 创建Python 3.11环境
conda create -n emotion python=3.11 -y

# 激活环境
conda activate emotion
```

### Step 2: 安装AI服务依赖

```bash
cd services/emotion-ai

# 安装依赖
pip install -r requirements.txt

# 预期需要5-10分钟（下载深度学习模型）
```

### Step 3: 配置AI服务环境变量

```bash
# 在 services/emotion-ai 目录
cp .env.example .env

# 编辑 .env 文件
nano .env
```

**AI服务 `.env` 配置**:
```bash
# 后端API地址
BACKEND_API_URL="http://localhost:4001"

# AI服务Token（需与后端.env中的AI_SERVICE_TOKEN一致）
AI_SERVICE_TOKEN="your-ai-service-token"

# MediaMTX RTSP地址
MEDIAMTX_RTSP_BASE_URL="rtsp://localhost:8554"
```

### Step 4: 启动AI服务

```bash
cd services/emotion-ai

# 使用conda环境启动
conda run -n emotion python main.py

# 或激活环境后启动
conda activate emotion
python main.py
```

**验证AI服务**:
```bash
curl http://localhost:5678/health
# 预期输出: {"status":"ok","models_loaded":{"deepface":true,...}}
```

---

## 🎥 MediaMTX配置（AI视频流需要）

如果需要AI实时视频分析功能，需要配置MediaMTX。

### Step 1: 下载MediaMTX

```bash
# Linux x64
wget https://github.com/bluenviron/mediamtx/releases/download/v1.14.0/mediamtx_v1.14.0_linux_amd64.tar.gz
tar -xzf mediamtx_v1.14.0_linux_amd64.tar.gz

# Windows x64
# 下载: https://github.com/bluenviron/mediamtx/releases/download/v1.14.0/mediamtx_v1.14.0_windows_amd64.zip
```

### Step 2: 配置MediaMTX

```bash
# 使用项目提供的配置
cp mediamtx.yml ./mediamtx.yml

# 或手动创建基础配置
cat > mediamtx.yml << 'YAML'
# 基础配置
logLevel: info
logDestinations: [stdout]

# WebRTC配置
webrtcAddress: :8889
webrtcServerKey: server.key
webrtcServerCert: server.crt
webrtcAllowOrigin: "*"

# RTSP配置
rtspAddress: :8554
YAML
```

### Step 3: 启动MediaMTX

```bash
./mediamtx
# 监听端口: 8889 (WebRTC), 8554 (RTSP)
```

**验证MediaMTX**:
```bash
curl http://localhost:8889/v3/config/global/get
```

---

## 🔧 常见问题排查

### 1. 数据库连接失败

**错误**: `Error: Can't reach database server`

**解决**:
```bash
# 检查PostgreSQL是否运行
docker ps | grep postgres
# 或
sudo systemctl status postgresql

# 检查端口是否正确
psql -h localhost -p 5435 -U postgres -l
```

### 2. pnpm install失败

**错误**: `ERR_PNPM_FETCH_...`

**解决**:
```bash
# 清理缓存
pnpm store prune

# 删除node_modules重新安装
rm -rf node_modules
pnpm install
```

### 3. Prisma生成失败

**错误**: `Prisma schema loading failed`

**解决**:
```bash
# 检查DATABASE_URL是否正确
echo $DATABASE_URL

# 重新生成
pnpm db:generate --force
```

### 4. AI服务模型加载失败

**错误**: `ModuleNotFoundError: No module named 'deepface'`

**解决**:
```bash
# 确认在正确的conda环境
conda activate emotion

# 重新安装依赖
pip install -r requirements.txt --force-reinstall
```

### 5. 端口占用

**错误**: `Port 4000 is already in use`

**解决**:
```bash
# 查找占用端口的进程
lsof -i :4000

# 杀死进程
kill -9 <PID>

# 或修改端口
# 前端: apps/web/package.json → "dev": "next dev -p 4001"
# 后端: apps/api/src/main.ts → await app.listen(4002)
```

---

## 📂 项目结构说明

```
refactor/
├── apps/                      # 应用程序
│   ├── web/                   # 前端 (Next.js 15 + React 19)
│   │   ├── src/
│   │   │   ├── app/          # App Router页面
│   │   │   ├── components/   # React组件
│   │   │   ├── hooks/        # 自定义Hooks
│   │   │   └── services/     # API客户端
│   │   └── package.json
│   └── api/                   # 后端 (NestJS)
│       ├── src/
│       │   ├── auth/         # 认证模块
│       │   ├── exams/        # 考试管理
│       │   ├── results/      # 结果管理
│       │   └── ai/           # AI集成
│       └── package.json
├── packages/                  # 共享包
│   └── database/             # Prisma配置
│       ├── prisma/
│       │   └── schema.prisma # 数据库Schema
│       └── package.json
├── services/                  # 微服务
│   └── emotion-ai/           # AI分析服务 (Python)
│       ├── api/              # FastAPI路由
│       ├── services/         # 分析逻辑
│       ├── main.py           # 入口文件
│       └── requirements.txt
├── docs/                      # 项目文档
├── docker-compose.yml         # Docker配置
├── pnpm-workspace.yaml        # pnpm工作区配置
└── turbo.json                # Turbo构建配置
```

---

## 🔐 安全注意事项

### 生产环境部署前必做

1. **修改所有默认密码**
   - 数据库密码
   - JWT_SECRET
   - AI_SERVICE_TOKEN
   - 默认管理员密码

2. **配置HTTPS**
   - 使用Let's Encrypt获取SSL证书
   - 配置Nginx反向代理

3. **环境变量保护**
   - .env文件不要提交到Git
   - 使用.env.example作为模板
   - 生产环境使用环境变量或密钥管理服务

4. **数据库安全**
   - 限制数据库访问IP
   - 使用强密码
   - 定期备份

---

## 📚 开发资源

### 技术文档
- [Next.js 15文档](https://nextjs.org/docs)
- [NestJS文档](https://docs.nestjs.com/)
- [Prisma文档](https://www.prisma.io/docs)
- [Ant Design文档](https://ant.design/)

### 项目文档
- [完整架构说明](./CLAUDE.md)
- [AI分析数据流](./ai_data_flow_analysis.md)
- [测试指南](./ai_fix_test_guide.md)

### 开发工具推荐
- **VSCode插件**:
  - Prisma
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense

---

## 🆘 获取帮助

### 报告问题
如果遇到问题：
1. 检查本文档的"常见问题排查"章节
2. 查看项目docs/目录下的相关文档
3. 在GitHub提Issue（提供错误日志和环境信息）

### 开发者联系
- 项目维护者: [Your Name]
- Email: [Your Email]

---

**最后更新**: 2025-11-06
**文档版本**: v1.0.0
