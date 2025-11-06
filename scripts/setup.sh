#!/bin/bash

# Psychology Testing Platform 2.0 Setup Script
# 心理测试平台2.0一键安装脚本

set -e

echo "🎯 心理测试平台 2.0 重构版 - 安装脚本"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    print_status "检查环境依赖..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js 未安装。请安装 Node.js >= 20.0.0"
        exit 1
    fi
    
    NODE_VERSION=$(node -v | cut -d'v' -f2)
    print_success "Node.js 版本: $NODE_VERSION"
    
    # Check pnpm
    if ! command -v pnpm &> /dev/null; then
        print_warning "pnpm 未安装，正在安装..."
        npm install -g pnpm
    fi
    
    PNPM_VERSION=$(pnpm -v)
    print_success "pnpm 版本: $PNPM_VERSION"
    
    # Check Docker
    if ! command -v docker &> /dev/null; then
        print_error "Docker 未安装。请安装 Docker 和 Docker Compose"
        exit 1
    fi
    
    print_success "Docker 已安装"
    
    # Check Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose 未安装"
        exit 1
    fi
    
    print_success "Docker Compose 已安装"
}

# Start services
start_services() {
    print_status "启动数据库服务..."
    
    # Start Docker services
    docker-compose up -d
    
    # Wait for services to be ready
    print_status "等待数据库服务启动..."
    sleep 10
    
    # Check if PostgreSQL is running
    if docker ps | grep -q postgres_refactor; then
        print_success "PostgreSQL 服务已启动 (端口: 5435)"
    else
        print_error "PostgreSQL 启动失败"
        exit 1
    fi
    
    # Check if Redis is running
    if docker ps | grep -q redis_refactor; then
        print_success "Redis 服务已启动 (端口: 6380)"
    else
        print_error "Redis 启动失败"
        exit 1
    fi
}

# Install dependencies
install_dependencies() {
    print_status "安装项目依赖..."
    
    # Install root dependencies
    pnpm install
    
    print_success "依赖安装完成"
}

# Initialize database
init_database() {
    print_status "初始化数据库..."
    
    # Check network connectivity
    if ! curl -s --connect-timeout 5 https://registry.npmjs.org >/dev/null; then
        print_warning "网络连接问题，跳过 Prisma 初始化"
        print_warning "请稍后手动运行: pnpm db:generate && pnpm db:push && pnpm db:seed"
        return
    fi
    
    # Generate Prisma client
    cd packages/database
    if pnpm prisma generate; then
        print_success "Prisma 客户端生成成功"
    else
        print_warning "Prisma 客户端生成失败，请稍后手动运行"
    fi
    
    # Push schema to database
    if DATABASE_URL="postgresql://psychology_user:psychology_refactor_pass@localhost:5435/psychology_refactor" pnpm prisma db push; then
        print_success "数据库 Schema 推送成功"
    else
        print_warning "数据库 Schema 推送失败，请稍后手动运行"
    fi
    
    # Run seed data
    if pnpm db:seed; then
        print_success "测试数据填充成功"
    else
        print_warning "测试数据填充失败，请稍后手动运行"
    fi
    
    cd ../..
}

# Create .env.local if not exists
create_env_local() {
    if [ ! -f .env.local ]; then
        print_status "创建本地环境配置..."
        cp .env.example .env.local
        print_success "已创建 .env.local 文件，您可以根据需要修改配置"
    fi
}

# Print next steps
print_next_steps() {
    echo ""
    echo "🎉 安装完成！"
    echo "=================================================="
    echo ""
    echo "📱 服务访问地址:"
    echo "  • 教师端:      http://localhost:4000"
    echo "  • 后端API:     http://localhost:4001"
    echo "  • 学生端:      http://localhost:4002"
    echo "  • AI监控台:    http://localhost:5680"
    echo "  • 数据库管理:  http://localhost:5436"
    echo "  • Redis管理:   http://localhost:6381"
    echo ""
    echo "🚀 启动命令:"
    echo "  • 启动所有服务:   pnpm dev:all"
    echo "  • 启动核心服务:   pnpm dev:core"
    echo "  • 启动单个服务:   pnpm web:dev / pnpm api:dev"
    echo "  • 数据库管理:     pnpm db:studio"
    echo ""
    echo "🔧 其他命令:"
    echo "  • 查看服务状态:   pnpm check:all"
    echo "  • 重建项目:       pnpm reset"
    echo "  • 查看日志:       pnpm docker:logs"
    echo ""
    echo "测试账号: T2025001 / 123456"
    echo ""
}

# Main execution
main() {
    check_prerequisites
    start_services
    install_dependencies
    create_env_local
    init_database
    print_next_steps
}

main "$@"