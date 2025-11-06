'use client';

import { useState, useEffect } from 'react';
import { Layout, Menu, Avatar, Dropdown, Typography, Button, Spin } from 'antd';
import {
  DashboardOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
  ExperimentOutlined,
  CheckCircleOutlined,
  BarChartOutlined,
  RobotOutlined,
  CloudServerOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  MonitorOutlined,
} from '@ant-design/icons';
import { useAuth } from '@/hooks/useAuth';
import { useRouter, usePathname } from 'next/navigation';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const menuItems = [
  {
    key: '/dashboard',
    icon: <DashboardOutlined />,
    label: '工作台',
  },
  {
    key: '/dashboard/papers',
    icon: <FileTextOutlined />,
    label: '试卷管理',
  },
  {
    key: '/dashboard/questions',
    icon: <QuestionCircleOutlined />,
    label: '题目管理',
  },
  {
    key: '/dashboard/exams',
    icon: <ExperimentOutlined />,
    label: '考试管理',
  },
  {
    key: '/dashboard/results',
    icon: <CheckCircleOutlined />,
    label: '结果管理',
  },
  {
    key: '/dashboard/analytics',
    icon: <BarChartOutlined />,
    label: '数据分析',
  },
  {
    key: '/dashboard/ai-monitor',
    icon: <RobotOutlined />,
    label: 'AI实时监控',
  },
  {
    key: '/ai-live',
    icon: <MonitorOutlined />,
    label: 'AI实时大屏',
  },
  {
    key: '/dashboard/ai-models',
    icon: <CloudServerOutlined />,
    label: 'AI模型管理',
  },
  {
    key: '/dashboard/teachers',
    icon: <TeamOutlined />,
    label: '教师管理',
  },
  {
    key: '/dashboard/settings',
    icon: <SettingOutlined />,
    label: '系统设置',
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // 路由守卫：未登录用户重定向到登录页
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // 路由变化时重置 loading 状态
  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

  // 加载中显示loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" tip="加载中...">
          <div />
        </Spin>
      </div>
    );
  }

  // 未登录显示loading（即将跳转）
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" tip="正在跳转...">
          <div />
        </Spin>
      </div>
    );
  }

  const handleMenuClick = ({ key }: { key: string }) => {
    // AI实时大屏在新标签页打开
    if (key === '/ai-live') {
      window.open(key, '_blank');
      return;
    }

    setIsNavigating(true);
    router.push(key);
  };

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人资料',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleLogout,
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        width={240}
        className="shadow-medium"
      >
        <div className="p-4 text-center border-b border-gray-100">
          <Title level={4} className="text-blue-600 mb-0">
            {collapsed ? '心理' : '心理测试平台'}
          </Title>
        </div>
        
        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          className="border-r-0"
        />
      </Sider>
      
      <Layout>
        <Header className="bg-white px-4 flex items-center justify-between shadow-soft">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="w-16 h-16"
          />
          
          <Dropdown
            menu={{ items: userMenuItems }}
            placement="bottomRight"
            arrow
          >
            <div className="flex items-center cursor-pointer hover:bg-gray-50 rounded-lg p-2">
              <Avatar icon={<UserOutlined />} className="mr-2" />
              <div className="text-left">
                <div className="text-sm font-medium">{user?.name}</div>
                <div className="text-xs text-gray-500">{user?.title}</div>
              </div>
            </div>
          </Dropdown>
        </Header>

        <Content className="p-6 bg-gray-50">
          <Spin spinning={isNavigating} tip="加载中...">
            {children}
          </Spin>
        </Content>
      </Layout>
    </Layout>
  );
}