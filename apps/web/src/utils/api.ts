import axios from 'axios';

// 简单的提示函数，避免使用 Ant Design 静态 message
const showMessage = (type: 'error' | 'success' | 'warning', content: string) => {
  // 使用浏览器原生通知，避免 Ant Design context 问题
  // TODO: 后续可以改用 App context 的 message
  console[type === 'success' ? 'log' : 'error'](`[${type}] ${content}`);

  // 简单的 toast 提示
  if (typeof window !== 'undefined') {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 20px;
      background: ${type === 'error' ? '#ff4d4f' : type === 'warning' ? '#faad14' : '#52c41a'};
      color: white;
      border-radius: 4px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 99999;
      animation: slideIn 0.3s ease;
    `;
    toast.textContent = content;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
  }
};

// API client configuration
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
  timeout: 10000,
  withCredentials: true, // Include cookies for authentication
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
// 注意：不再添加_t时间戳参数，因为会导致后端DTO验证失败
// 如需防止缓存，应在response header设置Cache-Control
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    
    if (response) {
      const { status, data } = response;
      
      switch (status) {
        case 401:
          // Unauthorized - redirect to login
          // 学生端公开路径不重定向
          if (window.location.pathname.startsWith('/login') ||
              window.location.pathname.startsWith('/exam')) {
            // 登录页面或学生端显示错误但不跳转
            const errorMessage = data?.error?.message?.[0] || (
              window.location.pathname.startsWith('/login')
                ? '用户名或密码错误'
                : '访问被拒绝，请检查考试链接或访问码'
            );
            showMessage('error', errorMessage);
          } else {
            // 教师端页面显示错误并跳转
            showMessage('error', '登录已过期，请重新登录');
            setTimeout(() => {
              window.location.href = '/login';
            }, 1000);
          }
          break;

        case 403:
          showMessage('error', '权限不足，无法访问');
          break;

        case 404:
          showMessage('error', '请求的资源不存在');
          break;

        case 429:
          showMessage('error', '请求过于频繁，请稍后再试');
          break;

        case 500:
          showMessage('error', '服务器内部错误，请稍后再试');
          break;

        default:
          const errorMessage = data?.error?.message?.[0] || '请求失败';
          showMessage('error', errorMessage);
      }
    } else if (error.code === 'ECONNABORTED') {
      showMessage('error', '请求超时，请检查网络连接');
    } else if (error.message === 'Network Error') {
      showMessage('error', '网络连接失败，请检查网络');
    } else {
      showMessage('error', '未知错误，请稍后再试');
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;