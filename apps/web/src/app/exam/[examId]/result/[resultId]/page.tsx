'use client';

/**
 * 考试结果页面
 *
 * 学生端：查看成绩和答题详情
 */

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
  Card,
  Result,
  Button,
  Statistic,
  Row,
  Col,
  Typography,
  Tag,
  Divider,
  Space,
  App,
} from 'antd';
import {
  TrophyOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import resultsApi, { type ExamResult } from '../../../../../services/results';

const { Title, Paragraph } = Typography;

// ============================================================================
// 主组件
// ============================================================================

export default function ExamResultPage() {
  const { message } = App.useApp();

  const params = useParams();
  const resultId = params.resultId as string;

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<ExamResult | null>(null);

  // --------------------------------------------------------------------------
  // 数据加载
  // --------------------------------------------------------------------------

  useEffect(() => {
    loadResult();
  }, []);

  const loadResult = async () => {
    try {
      setLoading(true);
      const data = await resultsApi.getResult(resultId);
      setResult(data);
    } catch (error) {
      message.error('加载结果失败');
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------------------------------
  // 计算属性
  // --------------------------------------------------------------------------

  const totalQuestions = result?.answers.length || 0;
  // ✨ 基于points计算得分率（替代isCorrect的正确率）
  const totalEarned = result?.answers.reduce((sum, a) => sum + (a.points || 0), 0) || 0;
  const totalMax = result?.answers.reduce((sum, a) => sum + (a.maxPoints || 0), 0) || 0;
  const scoreRate = totalMax > 0 ? Math.round((totalEarned / totalMax) * 100) : 0;
  const passed = result?.passed ?? false;

  // 格式化时长
  const formatDuration = (seconds?: number) => {
    if (!seconds) return '-';
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes} 分 ${secs} 秒`;
  };

  // --------------------------------------------------------------------------
  // 渲染 JSX
  // --------------------------------------------------------------------------

  if (loading || !result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card loading={true} style={{ width: 400 }}>
          加载中...
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto p-6 max-w-4xl">
        {/* 结果卡片 */}
        <Card className="shadow-lg">
          {/* 成绩展示 */}
          <Result
            status={passed ? 'success' : 'warning'}
            title={
              <Space direction="vertical" size={0}>
                <Title level={2} className="mb-0">
                  {passed ? '考试通过！' : '考试完成'}
                </Title>
                {result.exam && (
                  <Paragraph className="text-gray-600">
                    {result.exam.title}
                  </Paragraph>
                )}
              </Space>
            }
            icon={
              passed ? (
                <TrophyOutlined style={{ color: '#52c41a' }} />
              ) : (
                <CheckCircleOutlined style={{ color: '#faad14' }} />
              )
            }
            extra={[
              <Button
                key="home"
                size="large"
                icon={<HomeOutlined />}
                onClick={() => window.location.href = '/'}
              >
                返回首页
              </Button>,
            ]}
          >
            {/* 统计数据 */}
            <Row gutter={16} className="my-6">
              <Col span={8}>
                <Card>
                  <Statistic
                    title="总分"
                    value={result.score || 0}
                    suffix="分"
                    valueStyle={{ color: passed ? '#3f8600' : '#cf1322' }}
                    prefix={<TrophyOutlined />}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="得分率"
                    value={scoreRate}
                    suffix="%"
                    valueStyle={{ color: '#1890ff' }}
                    prefix={<CheckCircleOutlined />}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="用时"
                    value={formatDuration(result.timeSpent)}
                    valueStyle={{ color: '#722ed1' }}
                    prefix={<ClockCircleOutlined />}
                  />
                </Card>
              </Col>
            </Row>

            <Divider />

            {/* 答题详情 */}
            <div className="text-left">
              <Title level={4} className="mb-4">
                答题详情
              </Title>

              <div className="space-y-3">
                <Row gutter={16}>
                  <Col span={6}>
                    <div className="text-gray-600">总题数</div>
                    <div className="text-xl font-medium">{totalQuestions} 题</div>
                  </Col>
                  <Col span={6}>
                    <div className="text-gray-600">实际得分</div>
                    <div className="text-xl font-medium text-blue-600">
                      <TrophyOutlined /> {totalEarned.toFixed(1)} 分
                    </div>
                  </Col>
                  <Col span={6}>
                    <div className="text-gray-600">总分</div>
                    <div className="text-xl font-medium text-gray-600">
                      {totalMax.toFixed(1)} 分
                    </div>
                  </Col>
                  <Col span={6}>
                    <div className="text-gray-600">状态</div>
                    <div className="text-xl">
                      {passed ? (
                        <Tag color="success">通过</Tag>
                      ) : (
                        <Tag color="warning">未通过</Tag>
                      )}
                    </div>
                  </Col>
                </Row>
              </div>
            </div>

            <Divider />

            {/* 考试信息 */}
            <div className="text-left">
              <Title level={5} className="mb-3">
                考试信息
              </Title>
              <Row gutter={[16, 8]}>
                <Col span={12}>
                  <Text className="text-gray-600">考生姓名：</Text>
                  <Text strong>{result.participantName}</Text>
                </Col>
                <Col span={12}>
                  <Text className="text-gray-600">考生编号：</Text>
                  <Text strong>{result.participantId}</Text>
                </Col>
                <Col span={12}>
                  <Text className="text-gray-600">开始时间：</Text>
                  <Text>{new Date(result.startedAt).toLocaleString('zh-CN')}</Text>
                </Col>
                <Col span={12}>
                  <Text className="text-gray-600">提交时间：</Text>
                  <Text>
                    {result.submittedAt
                      ? new Date(result.submittedAt).toLocaleString('zh-CN')
                      : '-'}
                  </Text>
                </Col>
              </Row>
            </div>
          </Result>
        </Card>

        {/* 温馨提示 */}
        <Card className="mt-4" size="small">
          <Paragraph className="mb-0 text-center text-gray-500">
            <Space>
              <CheckCircleOutlined />
              <span>考试结果已保存，您可以关闭此页面</span>
            </Space>
          </Paragraph>
        </Card>
      </div>
    </div>
  );
}

function Text({ className, strong, children }: { className?: string; strong?: boolean; children: React.ReactNode }) {
  if (strong) {
    return <span className={`font-medium ${className || ''}`}>{children}</span>;
  }
  return <span className={className}>{children}</span>;
}
