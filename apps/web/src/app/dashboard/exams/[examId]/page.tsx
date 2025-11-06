'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Spin, Empty, Modal, App } from 'antd';

// 组件和服务导入
import examsApi, { type Exam, ExamStatus } from '@/services/exams';
import resultsApi, { type ExamResult } from '@/services/results';
import { ExamDetailHeader } from './components/ExamDetailHeader';
import { ExamStats } from './components/ExamStats';
import { ExamInfoCard } from './components/ExamInfoCard';
import { ExamResultsTable } from './components/ExamResultsTable';

// ============================================================================
// 主组件
// ============================================================================

export default function ExamDetailPage() {
  const { message } = App.useApp();

  // --------------------------------------------------------------------------
  // Hooks
  // --------------------------------------------------------------------------

  const router = useRouter();
  const params = useParams();
  const examId = params.examId as string;

  // --------------------------------------------------------------------------
  // State 状态管理
  // --------------------------------------------------------------------------

  const [exam, setExam] = useState<Exam | null>(null);
  const [results, setResults] = useState<ExamResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [resultsLoading, setResultsLoading] = useState(false);

  // --------------------------------------------------------------------------
  // 数据加载函数
  // --------------------------------------------------------------------------

  /** 加载考试详情 */
  const loadExamDetail = async () => {
    try {
      setLoading(true);
      const examData = await examsApi.findById(examId);
      setExam(examData);
    } catch (error) {
      message.error('加载考试详情失败');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /** 加载考试结果 */
  const loadExamResults = async () => {
    try {
      setResultsLoading(true);
      const response = await resultsApi.getResultsList({
        examId,
        limit: 1000, // 加载全部结果
        isCompleted: true, // 只显示已完成的结果
      });
      setResults(response.data);
    } catch (error) {
      message.error('加载考试结果失败');
      console.error(error);
    } finally {
      setResultsLoading(false);
    }
  };

  /** 刷新全部数据 */
  const handleRefreshAll = async () => {
    await Promise.all([loadExamDetail(), loadExamResults()]);
    message.success('数据已刷新');
  };

  // --------------------------------------------------------------------------
  // 生命周期 Effects
  // --------------------------------------------------------------------------

  /** 初始化加载 */
  useEffect(() => {
    if (examId) {
      loadExamDetail();
      loadExamResults();
    }
  }, [examId]);

  // --------------------------------------------------------------------------
  // 事件处理函数
  // --------------------------------------------------------------------------

  /** 返回列表 */
  const handleBack = () => {
    router.push('/dashboard/exams');
  };

  /** 复制公开链接 */
  const handleCopyPublicUrl = () => {
    if (!exam?.id) return;

    const fullUrl = `${window.location.origin}/exam/${exam.id}/join`;
    navigator.clipboard.writeText(fullUrl).then(
      () => {
        message.success('公开链接已复制');
      },
      () => {
        message.error('复制失败');
      }
    );
  };

  /** 编辑考试 */
  const handleEditExam = () => {
    router.push(`/dashboard/exams?edit=${examId}`);
  };

  /** 发布考试 */
  const handlePublish = async () => {
    try {
      await examsApi.publish(examId);
      message.success('考试已发布');
      loadExamDetail();
    } catch (error: any) {
      message.error(error.response?.data?.message || '发布失败');
    }
  };

  /** 标记成功 */
  const handleMarkSuccess = async () => {
    try {
      await examsApi.markSuccess(examId);
      message.success('考试已标记为成功');
      loadExamDetail();
    } catch (error: any) {
      message.error(error.response?.data?.message || '操作失败');
    }
  };

  /** 停止考试（回到草稿） */
  const handleStop = async () => {
    try {
      await examsApi.stop(examId);
      message.success('考试已停止并回到草稿');
      loadExamDetail();
    } catch (error: any) {
      message.error(error.response?.data?.message || '操作失败');
    }
  };

  /** 归档考试 */
  const handleArchive = async () => {
    try {
      await examsApi.archive(examId);
      message.success('考试已归档');
      loadExamDetail();
    } catch (error: any) {
      message.error(error.response?.data?.message || '归档失败');
    }
  };

  /** 删除考试 */
  const handleDeleteExam = async () => {
    try {
      await examsApi.delete(examId);
      message.success('考试删除成功');
      router.push('/dashboard/exams');
    } catch (error: any) {
      message.error(error.response?.data?.message || '删除失败');
    }
  };

  /** 导出结果 */
  const handleExportResults = async () => {
    try {
      const blob = await resultsApi.exportResults({ examId });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${exam?.title || '考试结果'}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      message.success('导出成功');
    } catch (error) {
      message.error('导出失败');
    }
  };

  /** 查看结果详情 */
  const handleViewDetail = (result: ExamResult) => {
    router.push(`/dashboard/results/${result.id}`);
  };

  // --------------------------------------------------------------------------
  // 计算统计数据
  // --------------------------------------------------------------------------

  const stats = {
    participantCount: results.length,
    questionCount: exam?.paper?.questions?.length || 0, // 从paper.questions获取题目数
    durationMinutes: exam?.timeLimit || 0,
    completionRate: results.length > 0 ? 100 : 0, // 简化：已提交即完成
  };

  // --------------------------------------------------------------------------
  // 渲染条件
  // --------------------------------------------------------------------------

  if (loading && !exam) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" tip="加载中...">
          <div />
        </Spin>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="space-y-6">
        <Empty description="考试不存在或已被删除" />
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 渲染 JSX
  // --------------------------------------------------------------------------

  return (
    <div className="space-y-6">
      {/* 页面头部 */}
      <ExamDetailHeader title={exam.title} status={exam.status} onBack={handleBack} />

      {/* 统计信息 */}
      <ExamStats
        participantCount={stats.participantCount}
        questionCount={stats.questionCount}
        durationMinutes={stats.durationMinutes}
        completionRate={stats.completionRate}
      />

      {/* 考试信息 */}
      <ExamInfoCard
        exam={exam}
        loading={loading}
        onRefresh={handleRefreshAll}
        onCopyPublicUrl={handleCopyPublicUrl}
        onEdit={handleEditExam}
        onPublish={handlePublish}
        onMarkSuccess={handleMarkSuccess}
        onStop={handleStop}
        onArchive={handleArchive}
        onDelete={handleDeleteExam}
      />

      {/* 考试结果 */}
      <ExamResultsTable
        results={results}
        loading={resultsLoading}
        onReload={loadExamResults}
        onExport={handleExportResults}
        onViewDetail={handleViewDetail}
      />
    </div>
  );
}
