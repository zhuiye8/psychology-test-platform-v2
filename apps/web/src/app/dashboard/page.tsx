'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Row, Col, Statistic, Typography, Button, Spin, Progress, Space } from 'antd';
import {
  FileTextOutlined,
  ExperimentOutlined,
  UserOutlined,
  BarChartOutlined,
  PlusOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';
import { useAuth } from '@/hooks/useAuth';
import papersApi from '@/services/papers';
import examsApi, { ExamStatus } from '@/services/exams';
import resultsApi, { type ResultStats } from '@/services/results';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

interface DashboardStats {
  totalPapers: number;
  publishedExams: number;
  totalParticipants: number;
  monthlyResults: number;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  // --------------------------------------------------------------------------
  // State 状态管理
  // --------------------------------------------------------------------------

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalPapers: 0,
    publishedExams: 0,
    totalParticipants: 0,
    monthlyResults: 0,
  });
  const [recentResults, setRecentResults] = useState<any[]>([]);

  // --------------------------------------------------------------------------
  // 数据加载
  // --------------------------------------------------------------------------

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // 并行加载所有数据
      const [papersData, examsData, resultsStatsData, recentResultsData] =
        await Promise.all([
          papersApi.list({ page: 1, limit: 1 }),
          examsApi.list({ page: 1, limit: 100 }),
          resultsApi.getResultStats(),
          resultsApi.getResultsList({ page: 1, limit: 5, sortBy: 'submittedAt', sortOrder: 'desc' }),
        ]);

      // 计算统计数据
      const publishedCount = examsData.data.filter(
        (exam) => exam.status === ExamStatus.PUBLISHED
      ).length;

      // 计算本月完成的测试数（假设从统计数据获取）
      const monthlyCount = resultsStatsData.totalResults; // 可以根据实际API返回调整

      setStats({
        totalPapers: papersData.meta.total,
        publishedExams: publishedCount,
        totalParticipants: resultsStatsData.totalParticipants,
        monthlyResults: monthlyCount,
      });

      setRecentResults(recentResultsData.data);
    } catch (error) {
      console.error('加载Dashboard数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 趋势指示器（模拟数据）
  const getTrendIndicator = () => {
    const isUp = Math.random() > 0.5;
    const percent = Math.floor(Math.random() * 20) + 1;
    return {
      icon: isUp ? <ArrowUpOutlined /> : <ArrowDownOutlined />,
      value: `${isUp ? '+' : '-'}${percent}%`,
      color: isUp ? '#52c41a' : '#ff4d4f',
    };
  };

  const statsData = [
    {
      title: '试卷总数',
      value: stats.totalPapers,
      icon: FileTextOutlined,
      suffix: '份',
      color: '#1890ff',
      bgColor: 'rgba(24, 144, 255, 0.1)',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      progress: 75,
      progressLabel: '本月活跃试卷占比',
    },
    {
      title: '进行中的考试',
      value: stats.publishedExams,
      icon: ExperimentOutlined,
      suffix: '场',
      color: '#52c41a',
      bgColor: 'rgba(82, 196, 26, 0.1)',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      progress: 60,
      progressLabel: '进行中考试占比',
    },
    {
      title: '参与学生',
      value: stats.totalParticipants,
      icon: UserOutlined,
      suffix: '人',
      color: '#fa8c16',
      bgColor: 'rgba(250, 140, 22, 0.1)',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      progress: 85,
      progressLabel: '本月新增用户',
    },
    {
      title: '总完成测试',
      value: stats.monthlyResults,
      icon: BarChartOutlined,
      suffix: '次',
      color: '#722ed1',
      bgColor: 'rgba(114, 46, 209, 0.1)',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      progress: 90,
      progressLabel: '本月完成测试增长',
    },
  ];

  // 加载时显示Spin
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" tip="加载中...">
          <div />
        </Spin>
      </div>
    );
  }

  return (
    <div className="space-y-6 modern-page-enter">
      {/* Hero Section */}
      <Card className="modern-card-enter border-0 overflow-hidden" style={{ position: 'relative' }}>
        <div
          className="absolute inset-0 opacity-5"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}
        />
        <div className="relative z-10">
          <Row align="middle" justify="space-between">
            <Col>
              <Space direction="vertical" size={4}>
                <Title level={1} className="mb-0" style={{ fontSize: '2.5rem' }}>
                  欢迎回来，{user?.name}
                </Title>
                <Text className="text-lg text-gray-600">
                  今天是美好的一天，开始管理您的心理测试项目吧！
                </Text>
                <Space size={16} className="mt-2">
                  <Text type="secondary">
                    <ClockCircleOutlined className="mr-1" />
                    实时更新于 {new Date().toLocaleString()}
                  </Text>
                  <Text type="secondary">
                    <CheckCircleOutlined className="mr-1" />
                    系统运行正常
                  </Text>
                </Space>
              </Space>
            </Col>
            <Col>
              <Space>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  size="large"
                  onClick={() => router.push('/dashboard/papers')}
                  className="shadow-lg"
                >
                  创建试卷
                </Button>
                <Button
                  icon={<ExperimentOutlined />}
                  size="large"
                  onClick={() => router.push('/dashboard/exams')}
                >
                  新建考试
                </Button>
              </Space>
            </Col>
          </Row>
        </div>
      </Card>

      {/* Statistics Cards */}
      <Row gutter={[24, 24]}>
        {statsData.map((stat, index) => {
          const trend = getTrendIndicator();
          const IconComponent = stat.icon;
          return (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card className="modern-card-enter hover-lift border-0">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="flex items-center justify-center w-12 h-12 rounded-xl"
                        style={{ background: stat.bgColor }}
                      >
                        <IconComponent className="text-xl" style={{ color: stat.color }} />
                      </div>
                      <div>
                        <Text type="secondary" className="text-xs font-medium uppercase">
                          {stat.title}
                        </Text>
                        <div className="mt-1">
                          <span className="text-sm flex items-center gap-1" style={{ color: trend.color }}>
                            {trend.icon}
                            {trend.value}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Statistic
                      value={stat.value}
                      suffix={stat.suffix}
                      className="mb-0"
                      valueStyle={{
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        background: stat.gradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    />
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <Progress
                    percent={stat.progress}
                    strokeColor={stat.color}
                    trailColor={stat.bgColor}
                    showInfo={false}
                    size={6}
                  />
                  <Text type="secondary" className="text-xs mt-2 block">
                    {stat.progressLabel}
                  </Text>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>

      {/* Quick Actions */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card title="快速操作" className="modern-card-enter border-0">
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Card
                  hoverable
                  className="text-center cursor-pointer hover-lift border-0"
                  cover={
                    <div className="p-6">
                      <div
                        className="flex items-center justify-center w-16 h-16 rounded-2xl mx-auto"
                        style={{ background: 'rgba(24, 144, 255, 0.1)' }}
                      >
                        <PlusOutlined className="text-3xl" style={{ color: '#1890ff' }} />
                      </div>
                    </div>
                  }
                  onClick={() => router.push('/dashboard/papers')}
                >
                  <Card.Meta
                    title={<span className="font-semibold">创建试卷</span>}
                    description="设计新的心理测试试卷"
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  hoverable
                  className="text-center cursor-pointer hover-lift border-0"
                  cover={
                    <div className="p-6">
                      <div
                        className="flex items-center justify-center w-16 h-16 rounded-2xl mx-auto"
                        style={{ background: 'rgba(82, 196, 26, 0.1)' }}
                      >
                        <ExperimentOutlined className="text-3xl" style={{ color: '#52c41a' }} />
                      </div>
                    </div>
                  }
                  onClick={() => router.push('/dashboard/exams')}
                >
                  <Card.Meta
                    title={<span className="font-semibold">发布考试</span>}
                    description="为学生创建新的测试"
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  hoverable
                  className="text-center cursor-pointer hover-lift border-0"
                  cover={
                    <div className="p-6">
                      <div
                        className="flex items-center justify-center w-16 h-16 rounded-2xl mx-auto"
                        style={{ background: 'rgba(114, 46, 209, 0.1)' }}
                      >
                        <BarChartOutlined className="text-3xl" style={{ color: '#722ed1' }} />
                      </div>
                    </div>
                  }
                  onClick={() => router.push('/dashboard/analytics')}
                >
                  <Card.Meta
                    title={<span className="font-semibold">查看报告</span>}
                    description="分析测试结果和数据"
                  />
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="最近活动" className="modern-card-enter border-0">
            {recentResults.length > 0 ? (
              <div className="space-y-4">
                {recentResults.map((result, index) => (
                  <div
                    key={result.id}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        index % 4 === 0
                          ? 'bg-blue-500'
                          : index % 4 === 1
                          ? 'bg-green-500'
                          : index % 4 === 2
                          ? 'bg-orange-500'
                          : 'bg-purple-500'
                      }`}
                    />
                    <Text className="flex-1 truncate">
                      {result.participantName} 完成了 "{result.exam?.title || '考试'}"
                    </Text>
                  </div>
                ))}
              </div>
            ) : (
              <Text type="secondary">暂无最近活动</Text>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}