'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Button, Typography, Spin } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import { useAuth } from '@/hooks/useAuth';
import styles from './LoginPage.module.css';

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

  // 登录页独占视口，禁用滚动
  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, []);

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
    <div className={styles.scene}>
      <div className={styles.glow} />
      <div className={styles.blur} />
      <div className={styles.card}>
        <div className={styles.cardHead}>
          <div className={styles.logo}>
            <BookOutlined />
          </div>
          <div>
            <Text className={styles.tagline}>AI 心理测评平台</Text>
            <Title level={3} className={styles.title}>
              欢迎回来，开启今日心理守护
            </Title>
          </div>
        </div>
        <Text className={styles.subtitle}>
          智能监测考试环境与学生状态，让测评过程更安心、更高效。
        </Text>

        <Form
          name="login"
          layout="vertical"
          size="large"
          onFinish={handleSubmit}
          autoComplete="off"
          className={styles.form}
        >
          <Form.Item
            label="教师账号"
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              { min: 3, message: '用户名至少3个字符' },
            ]}
          >
            <Input
              prefix={<span className={styles.prefixIcon}>👤</span>}
              placeholder="示例：T2025001"
              autoComplete="username"
            />
          </Form.Item>

          <Form.Item
            label="登录密码"
            name="password"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码至少6个字符' },
            ]}
          >
            <Input.Password
              prefix={<span className={styles.prefixIcon}>🔒</span>}
              placeholder="请输入密码"
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item className={styles.submitItem}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className={styles.submitBtn}
            >
              {loading ? '登录中…' : '进入控制台'}
            </Button>
          </Form.Item>
        </Form>

        <div className={styles.meta}>
          <Text className={styles.helper}>测试账号：T2025001 / 123456</Text>
          <Text className={styles.copy}>© 2024 心理测试平台</Text>
        </div>
      </div>
    </div>
  );
}
