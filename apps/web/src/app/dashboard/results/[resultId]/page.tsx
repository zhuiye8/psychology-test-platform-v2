'use client';

/**
 * Results详情页面
 *
 * 教师端：查看考试结果的详细信息和答题详情
 */

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Card,
  Row,
  Col,
  Statistic,
  Tag,
  Button,
  Space,
  Descriptions,
  Divider,
  Typography,
  App,
  Spin,
  Tabs,
} from 'antd';
import {
  ArrowLeftOutlined,
  TrophyOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import resultsApi, { type ResultDetail } from '../../../../services/results';
import aiApi, { type AiAnomaly } from '../../../../services/ai';
import { AiAnalysisTab } from '../../../../components/results/AiAnalysisTab';
import { ReportViewer } from '../../../../components/results/ReportViewer';
import { AnomalyTimeline } from '../../../../components/results/AnomalyTimeline';

const { Title, Paragraph, Text } = Typography;

// ============================================================================
// 主组件
// ============================================================================

export default function ResultDetailPage() {
  const { message } = App.useApp();

  const params = useParams();
  const router = useRouter();
  const resultId = params.resultId as string;

  // --------------------------------------------------------------------------
  // State 状态管理
  // --------------------------------------------------------------------------

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<ResultDetail | null>(null);
  const [anomalies, setAnomalies] = useState<AiAnomaly[]>([]);
  const [loadingAnomalies, setLoadingAnomalies] = useState(false);

  // --------------------------------------------------------------------------
  // 数据加载
  // --------------------------------------------------------------------------

  useEffect(() => {
    loadResultDetail();
  }, [resultId]);

  const loadResultDetail = async () => {
    try {
      setLoading(true);
      const data = await resultsApi.getResultDetail(resultId);
      setResult(data);
    } catch (error) {
      message.error('加载结果详情失败');
      router.push('/dashboard/results');
    } finally {
      setLoading(false);
    }
  };

  /** 加载异常事件（仅在切换到异常事件Tab时调用） */
  const loadAnomalies = async () => {
    if (anomalies.length > 0) return; // 已加载过，避免重复请求

    try {
      setLoadingAnomalies(true);
      const session = await aiApi.getSessionByResultId(resultId);
      if (session) {
        const anomaliesList = await aiApi.getAnomaliesBySessionId(session.sessionId);
        setAnomalies(anomaliesList);
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        // 无AI数据，不显示错误
        console.log('该考试未启用AI监控');
      } else {
        console.error('加载异常事件失败:', error);
        message.error('加载异常事件失败');
      }
    } finally {
      setLoadingAnomalies(false);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* 返回按钮 */}
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => router.push('/dashboard/results')}
      >
        返回列表
      </Button>

      {/* 学生信息卡片 */}
      <Card>
        <Row gutter={16}>
          <Col span={6}>
            <Statistic
              title="学生姓名"
              value={result.participantName}
              prefix={<UserOutlined />}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="学号/编号"
              value={result.participantId}
              formatter={(value) => value?.toString() || ''}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="总分"
              value={result.score || 0}
              suffix="分"
              valueStyle={{
                color: result.passed ? '#3f8600' : '#cf1322',
              }}
              prefix={<TrophyOutlined />}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="用时"
              value={formatDuration(result.timeSpent)}
              prefix={<ClockCircleOutlined />}
            />
          </Col>
        </Row>

        <Divider />

        <Descriptions column={2} bordered>
          <Descriptions.Item label="考试名称">
            {result.exam?.title || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="是否通过">
            {result.passed !== undefined ? (
              <Tag color={result.passed ? 'success' : 'error'}>
                {result.passed ? '通过' : '未通过'}
              </Tag>
            ) : (
              '-'
            )}
          </Descriptions.Item>
          <Descriptions.Item label="开始时间">
            {dayjs(result.startedAt).format('YYYY-MM-DD HH:mm:ss')}
          </Descriptions.Item>
          <Descriptions.Item label="提交时间">
            {result.submittedAt
              ? dayjs(result.submittedAt).format('YYYY-MM-DD HH:mm:ss')
              : '-'}
          </Descriptions.Item>
          <Descriptions.Item label="总题数">
            <Text>{totalQuestions} 题</Text>
          </Descriptions.Item>
          <Descriptions.Item label="得分率">
            <Tag color={scoreRate >= 80 ? 'success' : scoreRate >= 60 ? 'warning' : 'error'}>
              {scoreRate}%
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="实际得分" span={2}>
            <Text strong style={{ fontSize: 16 }}>
              {totalEarned.toFixed(1)} / {totalMax.toFixed(1)} 分
            </Text>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* 详细信息Tab */}
      <Tabs
        defaultActiveKey="answers"
        onChange={(key) => {
          // 切换到异常事件Tab时加载数据
          if (key === 'anomalies') {
            loadAnomalies();
          }
        }}
      >
        <Tabs.TabPane tab="答题详情" key="answers">
          <Card>
            <div className="space-y-6">
              {result.answers.map((answer, index) => {
                const question = answer.question;
                const isChoiceQuestion = question.type === 'SINGLE_CHOICE' || question.type === 'MULTIPLE_CHOICE';

                return (
                  <Card
                    key={answer.id}
                    size="small"
                    className={`border-l-4 ${
                      (() => {
                        // ✨ 基于得分率计算边框颜色
                        const scorePercent = answer.maxPoints > 0
                          ? (answer.points / answer.maxPoints) * 100
                          : 0;
                        return scorePercent >= 100
                          ? 'border-l-green-500'  // 满分或超分
                          : scorePercent >= 50
                          ? 'border-l-yellow-500'  // 部分得分
                          : 'border-l-gray-400';   // 低分或零分
                      })()
                    }`}
                  >
                    {/* 题目标题 */}
                    <div className="flex items-start justify-between mb-3">
                      <Space>
                        <Tag color="blue">第 {index + 1} 题</Tag>
                        <Tag>{question.type === 'SINGLE_CHOICE' ? '单选题' : question.type === 'MULTIPLE_CHOICE' ? '多选题' : question.type === 'TEXT' ? '文本题' : '问答题'}</Tag>
                        {/* ✨ 显示维度（如果有） */}
                        {question.dimension && (
                          <Tag color="cyan">{question.dimension}</Tag>
                        )}
                        {/* ✨ 显示实际得分 */}
                        <Tag color={
                          answer.points >= answer.maxPoints ? 'success' :
                          answer.points > 0 ? 'warning' : 'default'
                        }>
                          {answer.points} / {answer.maxPoints} 分
                        </Tag>
                      </Space>
                      <Tag color="purple">题目分值: {question.points} 分</Tag>
                    </div>

                    {/* 题目内容 */}
                    <div className="mb-3">
                      <Title level={5} className="mb-2">
                        {question.title}
                      </Title>
                      {question.description && (
                        <Paragraph className="text-gray-500 text-sm">
                          {question.description}
                        </Paragraph>
                      )}
                    </div>

                    {/* 选择题选项 */}
                    {isChoiceQuestion && question.options && (
                      <div className="mb-3 space-y-2">
                        {question.options.map((option, optIndex) => {
                          const isSelected = answer.selectedOptions?.includes(option.id);

                          return (
                            <div
                              key={option.id}
                              className={`p-2 rounded ${
                                isSelected
                                  ? 'bg-blue-50 border border-blue-300'  // 学生选择
                                  : 'bg-gray-50'  // 未选择
                              }`}
                            >
                              <Space className="w-full justify-between">
                                <Space>
                                  <Text strong>
                                    {String.fromCharCode(65 + optIndex)}.
                                  </Text>
                                  <Text>{option.text}</Text>
                                  {isSelected && (
                                    <Tag color="blue">已选择</Tag>
                                  )}
                                </Space>
                                {/* ✨ 显示选项分数 */}
                                <Tag color="purple">{option.score || 0}分</Tag>
                              </Space>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* 文本题答案 */}
                    {!isChoiceQuestion && (
                      <div className="mb-3">
                        <div className="mb-2">
                          <Text strong>学生答案：</Text>
                          <Paragraph className="mt-1 p-2 bg-gray-50 rounded whitespace-pre-wrap">
                            {answer.textAnswer || '（未作答）'}
                          </Paragraph>
                        </div>
                      </div>
                    )}

                    {/* 得分（支持超分显示）*/}
                    <div className="flex items-center justify-between pt-3 border-t">
                      <Text type="secondary">本题得分：</Text>
                      <Space>
                        <Tag color={
                          answer.points >= answer.maxPoints ? 'success' :
                          answer.points > 0 ? 'warning' : 'default'
                        }>
                          {answer.points} / {answer.maxPoints} 分
                        </Tag>
                        {/* ✨ 超分标记 */}
                        {answer.points > answer.maxPoints && (
                          <Tag color="gold" icon={<TrophyOutlined />}>
                            超分 +{(answer.points - answer.maxPoints).toFixed(1)}
                          </Tag>
                        )}
                      </Space>
                    </div>
                  </Card>
                );
              })}
            </div>
          </Card>
        </Tabs.TabPane>

        <Tabs.TabPane tab="AI情绪分析报告" key="ai">
          <AiAnalysisTab resultId={resultId} />
        </Tabs.TabPane>

        <Tabs.TabPane tab="AI报告" key="aiReport">
          <ReportViewer examResultId={resultId} />
        </Tabs.TabPane>

        <Tabs.TabPane tab="异常事件" key="anomalies">
          {loadingAnomalies ? (
            <div className="flex items-center justify-center py-12">
              <Spin size="large" tip="加载异常事件...">
                <div />
              </Spin>
            </div>
          ) : (
            <Card>
              <AnomalyTimeline anomalies={anomalies} showInterpretation />
            </Card>
          )}
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
