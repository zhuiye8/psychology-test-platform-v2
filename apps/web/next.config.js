/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['antd', '@ant-design/icons'],
  // 暂时禁用 optimizePackageImports，可能导致 ChunkLoadError
  // experimental: {
  //   optimizePackageImports: ['antd'],
  // },
  env: {
    // ✅ 修复：正确映射环境变量名称（从 .env.local 读取）
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001',
    NEXT_PUBLIC_AI_SERVICE_URL: process.env.NEXT_PUBLIC_AI_SERVICE_URL || 'http://localhost:5678',
    NEXT_PUBLIC_MEDIAMTX_RTSP_URL: process.env.NEXT_PUBLIC_MEDIAMTX_RTSP_URL || 'rtsp://192.168.0.95:8554',
    NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:4001',
    // 保留其他配置
    NEXT_PUBLIC_EXAM_CLIENT_URL: process.env.NEXT_PUBLIC_EXAM_CLIENT_URL || 'http://localhost:4002',
    NEXT_PUBLIC_AI_MONITOR_URL: process.env.NEXT_PUBLIC_AI_MONITOR_URL || 'http://localhost:5680',
  },
  // Enable React Strict Mode
  reactStrictMode: true,
  // Disable X-Powered-By header
  poweredByHeader: false,
  // Gzip compression
  compress: true,
  // Output configuration for standalone deployment
  output: process.env.BUILD_STANDALONE === 'true' ? 'standalone' : undefined,

  // API rewrites - 代理 /api/* 请求到后端API服务器
  // 解决 sendBeacon 同源限制和统一API访问路径
  async rewrites() {
    const apiUrl = process.env.API_URL || 'http://localhost:4001';
    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;