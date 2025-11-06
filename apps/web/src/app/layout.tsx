import type { Metadata } from 'next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider, App } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

import './globals.css';
import { AuthProvider } from '@/providers/AuthProvider';
import { QueryProvider } from '@/providers/QueryProvider';

// Configure dayjs
dayjs.locale('zh-cn');

export const metadata: Metadata = {
  title: '心理测试平台 - 教师端',
  description: '专业的心理测试与分析平台，为教师提供完整的测试管理解决方案',
  keywords: '心理测试,心理评估,教育测量,数据分析',
};

// Ant Design theme configuration
const themeConfig = {
  token: {
    colorPrimary: '#1890ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1890ff',
    borderRadius: 6,
    fontSize: 14,
    fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
  },
  components: {
    Layout: {
      bodyBg: '#f5f5f5',
      headerBg: '#ffffff',
      siderBg: '#ffffff',
    },
    Menu: {
      itemBg: 'transparent',
      itemSelectedBg: '#e6f7ff',
      itemHoverBg: '#f5f5f5',
    },
    Button: {
      borderRadius: 6,
    },
    Card: {
      borderRadius: 8,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <AntdRegistry>
          <ConfigProvider locale={zhCN} theme={themeConfig}>
            <App>
              <QueryProvider>
                <AuthProvider>
                  {children}
                </AuthProvider>
              </QueryProvider>
            </App>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}