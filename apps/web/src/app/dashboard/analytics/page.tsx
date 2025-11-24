'use client';

import { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Select,
  DatePicker,
  Typography,
  Space,
  Button,
  Spin,
  App,
} from 'antd';
import { DownloadOutlined, ReloadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import resultsApi, {
  type ResultStats,
  type ExamResult as ApiExamResult,
} from '../../../services/results';
import examsApi, { type Exam } from '../../../services/exams';
import aiApi, { type AiAggregate } from '../../../services/ai';

// 组件导入
import { StatsCards } from './components/StatsCards';
import { ScoreChart, type ScoreDistribution } from './components/ScoreChart';
import { EmotionChart, type EmotionData } from './components/EmotionChart';
import {
  AttentionChart,
  type AttentionData,
} from './components/AttentionChart';
import { ResultsTable } from './components/ResultsTable';
import { type ExamResult } from './components/columns';

const { Title } = Typography;

// ============================================================================
// 主组件
// ============================================================================

export default function AnalyticsPage() {
  const { message } = App.useApp();

  const [timeRange, setTimeRange] = useState<string>('week');
  const [selectedExam, setSelectedExam] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [exams, setExams] = useState<Exam[]>([]);
  const [stats, setStats] = useState<ResultStats | null>(null);
  const [results, setResults] = useState<ApiExamResult[]>([]);
  const [aiAggregatesMap, setAiAggregatesMap] = useState<
    Record<string, AiAggregate>
  >({});

  // --------------------------------------------------------------------------
  // 数据加载
  // --------------------------------------------------------------------------

  useEffect(() => {
    loadExams();
  }, []);

  useEffect(() => {
    loadAnalyticsData();
  }, [selectedExam, timeRange]);

  const loadExams = async () => {
    try {
      const data = await examsApi.list();
      setExams(data.data);
    } catch (error) {
      console.error('加载考试列表失败:', error);
    }
  };

  const loadAnalyticsData = async () => {
    try {
      setLoading(true);

      // 获取统计数据和结果列表
      const examId = selectedExam === 'all' ? undefined : selectedExam;
      const [statsData, resultsData] = await Promise.all([
        resultsApi.getResultStats(examId),
        resultsApi.getResultsList({
          examId,
          page: 1,
          limit: 100,
        }),
      ]);

      setStats(statsData);
      setResults(resultsData.data);

      // 批量检查并获取AI分析数据
      if (resultsData.data.length > 0) {
        try {
          const resultIds = resultsData.data.map((r) => r.id);
          const batchCheck = await aiApi.batchCheckAiAnalysis(resultIds);

          // 为有AI数据的结果获取聚合数据
          const aiAggregates = await Promise.allSettled(
            resultIds
              .filter((id) => batchCheck.aiStatusMap[id])
              .map(async (id) => {
                try {
                  const aggregate = await aiApi.getAggregateByResultId(id);
                  return { id, aggregate };
                } catch {
                  return null;
                }
              })
          );

          // 构建AI数据映射
          const aiMap: Record<string, AiAggregate> = {};
          aiAggregates.forEach((result) => {
            if (result.status === 'fulfilled' && result.value && result.value.aggregate) {
              aiMap[result.value.id] = result.value.aggregate;
            }
          });

          setAiAggregatesMap(aiMap);
        } catch (error) {
          console.error('加载AI数据失败:', error);
        }
      }
    } catch (error) {
      message.error('加载分析数据失败');
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------------------------------
  // 数据处理
  // --------------------------------------------------------------------------

  // 转换结果数据为表格数据
  const examResults: ExamResult[] = results.map((result) => {
    const aiData = aiAggregatesMap[result.id];

    // 将AI分析指标转换为0-100分制
    const emotionScore = aiData?.avgValence
      ? Math.round(((aiData.avgValence + 1) / 2) * 100)
      : 0;
    const attentionScore = aiData?.avgAttention
      ? Math.round(aiData.avgAttention * 100)
      : 0;

    return {
      id: result.id,
      studentName: result.participantName,
      examTitle: result.exam?.title || '-',
      score: result.score || 0,
      emotionScore,
      attentionScore,
      completionTime: result.timeSpent ? Math.ceil(result.timeSpent / 60) : 0,
      submitTime: result.submittedAt
        ? dayjs(result.submittedAt).format('YYYY-MM-DD HH:mm')
        : '-',
      aiAnalysisStatus: aiData ? 'completed' : 'processing',
    };
  });

  // 计算分数分布
  const scoreDistribution: ScoreDistribution[] =
    stats?.scoreDistribution || [];

  // 计算情绪数据
  const emotionData: EmotionData[] = (() => {
    const emotionCounts = { 积极: 0, 中性: 0, 焦虑: 0, 疲劳: 0 };
    const totalWithAi = Object.keys(aiAggregatesMap).length;

    if (totalWithAi === 0) {
      return [
        { emotion: '积极', count: 0, percentage: 0 },
        { emotion: '中性', count: 0, percentage: 0 },
        { emotion: '焦虑', count: 0, percentage: 0 },
        { emotion: '疲劳', count: 0, percentage: 0 },
      ];
    }

    // 根据avgValence分类情绪
    Object.values(aiAggregatesMap).forEach((aiData) => {
      if (aiData.avgValence !== undefined && aiData.avgValence !== null) {
        if (aiData.avgValence > 0.5) emotionCounts.积极++;
        else if (aiData.avgValence > -0.2) emotionCounts.中性++;
        else if (aiData.avgValence > -0.6) emotionCounts.焦虑++;
        else emotionCounts.疲劳++;
      }
    });

    return Object.entries(emotionCounts).map(([emotion, count]) => ({
      emotion,
      count,
      percentage: totalWithAi > 0 ? Math.round((count / totalWithAi) * 100) : 0,
    }));
  })();

  // 计算注意力数据
  const attentionData: AttentionData[] = (() => {
    if (Object.keys(aiAggregatesMap).length === 0) return [];

    const timeSlots = ['0-15min', '15-30min', '30-45min', '45-60min', '60min+'];
    return timeSlots.map((slot) => {
      const attentionValues = Object.values(aiAggregatesMap)
        .filter((ai) => ai.avgAttention !== undefined && ai.avgAttention !== null)
        .map((ai) => ai.avgAttention || 0);

      const avgAttention =
        attentionValues.length > 0
          ? attentionValues.reduce((sum, val) => sum + val, 0) /
            attentionValues.length
          : 0;

      return {
        timeSlot: slot,
        attentionLevel: Math.round(avgAttention * 100),
        participantCount: attentionValues.length,
      };
    });
  })();

  // 导出报告
  const handleExport = async () => {
    try {
      const examId = selectedExam === 'all' ? undefined : selectedExam;
      const blob = await resultsApi.exportResults({ examId });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `数据分析报告_${dayjs().format('YYYYMMDD_HHmmss')}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      message.success('导出成功');
    } catch (error) {
      message.error('导出失败');
    }
  };

  // --------------------------------------------------------------------------
  // 渲染
  // --------------------------------------------------------------------------

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" tip="加载分析数据...">
          <div />
        </Spin>
      </div>
    );
  }

  return (
    <div className="space-y-6 modern-page-enter">
      {/* 页面标题和筛选器 */}
      <div className="flex items-center justify-between">
        <div>
          <Title level={2} className="mb-2">
            数据分析
          </Title>
          <p className="text-gray-600">心理测试结果统计与AI分析报告</p>
        </div>
        <Space>
          <Select
            value={selectedExam}
            onChange={setSelectedExam}
            style={{ width: 200 }}
          >
            <Select.Option value="all">全部考试</Select.Option>
            {exams.map((exam) => (
              <Select.Option key={exam.id} value={exam.id}>
                {exam.title}
              </Select.Option>
            ))}
          </Select>
          <Select
            value={timeRange}
            onChange={setTimeRange}
            style={{ width: 120 }}
          >
            <Select.Option value="week">最近一周</Select.Option>
            <Select.Option value="month">最近一月</Select.Option>
            <Select.Option value="quarter">最近三月</Select.Option>
          </Select>
          <Button icon={<DownloadOutlined />} onClick={handleExport}>
            导出报告
          </Button>
          <Button icon={<ReloadOutlined />} onClick={loadAnalyticsData}>
            刷新数据
          </Button>
        </Space>
      </div>

      {/* 核心指标统计卡片 */}
      <StatsCards
        totalExams={stats?.totalResults || 0}
        totalParticipants={stats?.totalParticipants || 0}
        averageScore={stats?.averageScore || 0}
        averageCompletionTime={
          stats?.averageTimeSpent ? Math.ceil(stats.averageTimeSpent / 60) : 0
        }
        aiAnalysisRate={
          results.length > 0
            ? Math.round(
                (Object.keys(aiAggregatesMap).length / results.length) * 100
              )
            : 0
        }
        aiDataCount={Object.keys(aiAggregatesMap).length}
        totalResults={results.length}
      />

      {/* 图表分析 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <ScoreChart data={scoreDistribution} />
        </Col>
        <Col xs={24} lg={12}>
          <EmotionChart data={emotionData} />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <AttentionChart data={attentionData} />
        </Col>
      </Row>

      {/* 详细结果表格 */}
      <ResultsTable data={examResults} />
    </div>
  );
}
