'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Button, Card, Typography, Spin } from 'antd';
import { UserOutlined, LockOutlined, BookOutlined } from '@ant-design/icons';
import { useAuth } from '@/hooks/useAuth';

const { Title, Text } = Typography;

interface LoginForm {
  username: string;
  password: string;
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const { user, isLoading, login } = useAuth();
  const router = useRouter();

  // 反向路由守卫：已登录用户自动跳转到Dashboard
  useEffect(() => {
    if (!isLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isLoading, router]);

  // 加载中或已登录显示loading
  if (isLoading || user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Spin size="large" tip={user ? '正在跳转...' : '加载中...'}>
          <div />
        </Spin>
      </div>
    );
  }

  const handleSubmit = async (values: LoginForm) => {
    setLoading(true);
    try {
      await login(values.username, values.password);
      router.push('/dashboard');
    } catch (error) {
      // Error handled in AuthProvider
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <BookOutlined className="text-2xl text-white" />
          </div>
          <Title level={2} className="text-gray-800 mb-2">
            心理测试平台
          </Title>
          <Text className="text-gray-600">
            教师管理系统
          </Text>
        </div>

        <Card
          className="shadow-strong border-0"
          styles={{ body: { padding: '32px' } }}
        >
          <Form
            name="login"
            onFinish={handleSubmit}
            autoComplete="off"
            size="large"
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: '请输入用户名' },
                { min: 3, message: '用户名至少3个字符' },
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="用户名 (如: T2025001)"
                autoComplete="username"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: '请输入密码' },
                { min: 6, message: '密码至少6个字符' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="密码"
                autoComplete="current-password"
              />
            </Form.Item>

            <Form.Item className="mb-0">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full h-12 text-base font-medium"
              >
                {loading ? '登录中...' : '登录'}
              </Button>
            </Form.Item>
          </Form>

          <div className="mt-6 text-center">
            <Text className="text-gray-500 text-sm">
              测试账号: T2025001 / 123456
            </Text>
          </div>
        </Card>

        <div className="text-center mt-8">
          <Text className="text-gray-400 text-xs">
            © 2024 心理测试平台. All rights reserved.
          </Text>
        </div>
      </div>
    </div>
  );
}