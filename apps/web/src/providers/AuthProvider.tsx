'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { App } from 'antd';
import { apiClient } from '@/utils/api';
import type { Teacher } from '@/types/auth';

interface UpdateProfileData {
  name?: string;
  email?: string;
  title?: string;
  phone?: string;
}

interface UpdatePasswordData {
  currentPassword: string;
  newPassword: string;
}

interface AuthContextType {
  user: Teacher | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
  updatePassword: (data: UpdatePasswordData) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { message } = App.useApp();
  const [user, setUser] = useState<Teacher | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    // 在登录页面、根路径和学生端公开路径跳过认证检查，避免不必要的401请求和超时等待
    if (typeof window !== 'undefined' &&
        (window.location.pathname.startsWith('/login') ||
         window.location.pathname === '/' ||
         window.location.pathname.startsWith('/exam'))) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await apiClient.get('/auth/profile');
      setUser(response.data.data);
    } catch (error) {
      // User not authenticated or session expired
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await apiClient.post('/auth/login', {
        username,
        password,
      });

      setUser(response.data.data.user);
      message.success('登录成功！');
    } catch (error: any) {
      // 错误已在 API 拦截器中处理，避免重复提示
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiClient.post('/auth/logout');
      setUser(null);
      message.success('已安全退出');
    } catch (error) {
      // Even if logout request fails, clear local state
      setUser(null);
      message.info('已退出登录');
    }
  };

  const refreshProfile = async () => {
    if (!user) return;

    try {
      const response = await apiClient.get('/auth/profile');
      setUser(response.data.data);
    } catch (error) {
      console.error('Failed to refresh profile:', error);
    }
  };

  const updateProfile = async (data: UpdateProfileData) => {
    try {
      const response = await apiClient.put('/auth/profile', data);
      setUser(response.data.data);
      message.success('个人资料更新成功');
    } catch (error: any) {
      // 错误已在 API 拦截器中处理，避免重复提示
      throw error;
    }
  };

  const updatePassword = async (data: UpdatePasswordData) => {
    try {
      await apiClient.put('/auth/password', data);
      message.success('密码修改成功');
    } catch (error: any) {
      // 错误已在 API 拦截器中处理，避免重复提示
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    refreshProfile,
    updateProfile,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}