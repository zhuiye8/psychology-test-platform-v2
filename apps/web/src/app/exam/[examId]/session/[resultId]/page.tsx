'use client';

/**
 * 考试答题界面
 *
 * 学生端：答题、导航、倒计时、提交
 *
 * UI特性：
 * - 题目切换滑动动画
 * - 渐变进度条
 * - 答题反馈动画
 * - 导航点击波纹效果
 */

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Card, Modal, message, App } from 'antd';
import { ExamHeader } from './components/ExamHeader';
import { QuestionCard } from './components/QuestionCard';
import { NavigationGrid } from './components/NavigationGrid';
import { SubmitModal } from './components/SubmitModal';
import { GlobalLoading } from '../../../../../components/common/GlobalLoading';
import { type AnswerValue } from '../../../../../components/exam/AnswerInput';
import resultsApi, { type StartExamResponse } from '../../../../../services/results';
import { useAIConnection } from '../../../../../hooks/useAIConnection';
import { useAnswerTimestamps } from '../../../../../hooks/useAnswerTimestamps';
import { AIStatusPanel } from '../../../../../components/exam/ai/AIStatusPanel';
import { shouldDisplayQuestion } from '../../../../../types/condition';

// ============================================================================
// 类型定义
// ============================================================================

interface AnswerState {
  [questionId: string]: AnswerValue;
}

// ============================================================================
// 主组件
// ============================================================================

export default function ExamSessionPage() {
  const { message } = App.useApp();

  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const examId = params.examId as string;
  const resultId = params.resultId as string;

  // --------------------------------------------------------------------------
  // AI监控状态
  // --------------------------------------------------------------------------

  const aiOptOut = searchParams.get('aiOptOut') === 'true';
  const aiConnection = useAIConnection({ aiEnabled: !aiOptOut });

  // --------------------------------------------------------------------------
  // State 状态管理
  // --------------------------------------------------------------------------

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [examData, setExamData] = useState<StartExamResponse | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerState>({});
  const [timeDeadline, setTimeDeadline] = useState<number>(0);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showRequiredWarning, setShowRequiredWarning] = useState(false);
  const [requiredCount, setRequiredCount] = useState(0);
  const [questionTransition, setQuestionTransition] = useState<'slide-in' | 'none'>('none');

  // 使用ref防止StrictMode下的重复加载
  const isDataLoaded = useRef(false);

  // --------------------------------------------------------------------------
  // 计算属性
  // --------------------------------------------------------------------------

  /**
   * 可见题目列表（根据条件逻辑过滤）
   * 当用户答题时，根据displayCondition动态显示/隐藏题目
   */
  const visibleQuestions = useMemo(() => {
    if (!examData?.questions) return [];

    return examData.questions.filter((question) =>
      shouldDisplayQuestion(question.displayCondition, answers)
    );
  }, [examData?.questions, answers]);

  const currentQuestion = visibleQuestions[currentQuestionIndex];

  // --------------------------------------------------------------------------
  // 答题时间戳追踪（必须在currentQuestion之后）
  // --------------------------------------------------------------------------

  const answerTimestamps = useAnswerTimestamps(currentQuestion?.id || null);
  const totalQuestions = visibleQuestions.length;
  const answeredCount = Object.keys(answers).filter(
    (qId) => answers[qId]?.selectedOptions?.length || answers[qId]?.textAnswer
  ).length;

  // --------------------------------------------------------------------------
  // 数据加载
  // --------------------------------------------------------------------------

  /** 初始化加载考试数据（只执行一次，防止StrictMode重复执行） */
  useEffect(() => {
    if (!isDataLoaded.current) {
      isDataLoaded.current = true;
      loadExamData();
    }

    // 组件真正卸载时清除缓存（不依赖resultId，避免Strict Mode触发cleanup）
    return () => {
      // 只在真正卸载时清除（非路由导航或提交成功的情况）
      // 提交成功时会在submitExam函数中清除
      const storageKey = `exam_session_${resultId}`;
      const cachedData = sessionStorage.getItem(storageKey);
      if (cachedData) {
        sessionStorage.removeItem(storageKey);
        console.log('[SESSION] 组件卸载，已清除缓存');
      }
    };
  }, []); // 空依赖数组，只在mount和unmount时执行

  // --------------------------------------------------------------------------
  // AI会话初始化（在考试数据加载完成后）
  // --------------------------------------------------------------------------

  /** 初始化AI监控会话 */
  useEffect(() => {
    if (!examData || aiOptOut) {
      console.log('[SESSION] 跳过AI监控初始化:', { examData: !!examData, aiOptOut });
      return;
    }

    console.log('[SESSION] 初始化AI监控会话:', {
      examId,
      participantId: examData.examResult.participantId,
      resultId,
    });

    // 启动AI监控（传递resultId确保会话能在AI大屏显示）
    aiConnection.initAISession(examId, examData.examResult.participantId, resultId);

    // 组件卸载时断开AI连接
    return () => {
      console.log('[SESSION] 组件卸载，断开AI连接');
      aiConnection.disconnect();
    };
  }, [examData, aiOptOut, examId, resultId, aiConnection.initAISession, aiConnection.disconnect]);

  const loadExamData = async () => {
    try {
      setLoading(true);
      console.log('[SESSION] 开始加载考试数据，resultId:', resultId);

      // 从sessionStorage读取考试数据（由join页面存储）
      const storageKey = `exam_session_${resultId}`;
      const cachedData = sessionStorage.getItem(storageKey);
      console.log('[SESSION] 尝试读取缓存，key:', storageKey, '是否存在:', !!cachedData);

      if (cachedData) {
        const data: StartExamResponse = JSON.parse(cachedData);
        console.log('[SESSION] 从缓存加载考试数据成功:', data);
        setExamData(data);

        // 设置倒计时截止时间
        if (data.exam.timeLimit) {
          const deadline = Date.now() + data.exam.timeLimit * 60 * 1000;
          setTimeDeadline(deadline);
          console.log('[SESSION] 设置倒计时:', new Date(deadline));
        }

        // 注意：不要立即清除缓存，因为React StrictMode会导致useEffect执行两次
        // 缓存会在组件卸载时或提交考试后清除
        console.log('[SESSION] 考试数据加载完成，保留缓存以防止重复加载');
      } else {
        console.error('[SESSION] 未找到缓存的考试数据，可用的keys:', Object.keys(sessionStorage));
        message.error('考试数据加载失败，请重新开始');
        setTimeout(() => {
          router.push(`/exam/${examId}/join`);
        }, 1500);
      }
    } catch (error) {
      console.error('[SESSION] 加载考试数据失败:', error);
      message.error('加载考试数据失败');
      setTimeout(() => {
        router.push(`/exam/${examId}/join`);
      }, 1500);
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------------------------------
  // 事件处理函数
  // --------------------------------------------------------------------------

  /** 保存答案 */
  const handleAnswerChange = useCallback((value: AnswerValue) => {
    if (!currentQuestion) return;

    // 记录交互（用于时间戳和行为分析）
    answerTimestamps.recordInteraction(currentQuestion.id);

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));

    // 自动保存到服务器（包含时间戳数据）
    saveAnswerToServer(currentQuestion.id, value);
  }, [currentQuestion, answerTimestamps]);

  /** 保存答案到服务器 */
  const saveAnswerToServer = async (questionId: string, value: AnswerValue) => {
    try {
      // 获取该题目的时间戳数据
      const timestamps = answerTimestamps.getQuestionTimestamps(questionId);

      await resultsApi.submitAnswer(resultId, {
        questionId,
        selectedOptions: value.selectedOptions,
        textAnswer: value.textAnswer,
        // ⭐ 包含时间戳数据（用于AI分析相关性）
        questionDisplayedAt: timestamps?.questionDisplayedAt,
        firstInteractionAt: timestamps?.firstInteractionAt,
        lastModifiedAt: timestamps?.lastModifiedAt,
        totalViewTime: timestamps?.totalViewTime,
        interactionCount: timestamps?.interactionCount,
        hesitationScore: timestamps?.hesitationScore,
      });
    } catch (error) {
      console.error('保存答案失败:', error);
      // 不阻塞用户操作，只记录错误
    }
  };

  /** 上一题 */
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setQuestionTransition('slide-in');
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  /** 下一题 */
  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setQuestionTransition('slide-in');
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  /** 跳转到指定题目 */
  const handleJumpToQuestion = (index: number) => {
    setQuestionTransition('slide-in');
    setCurrentQuestionIndex(index);
  };

  /** 验证必填题（只验证可见题目） */
  const validateRequired = (): boolean => {
    if (!examData) return false;

    // 找出所有未回答的必填题（只检查可见题目）
    const unansweredRequired = visibleQuestions
      .filter(q => q.required)
      .filter(q => {
        const answer = answers[q.id];
        // 判断是否已回答：单选/多选需要有选项，文本题需要有内容
        const hasAnswer = answer?.selectedOptions?.length || answer?.textAnswer?.trim();
        return !hasAnswer;
      });

    if (unansweredRequired.length > 0) {
      // 显示警告对话框（使用声明式Modal）
      setRequiredCount(unansweredRequired.length);
      setShowRequiredWarning(true);
      return false;
    }

    return true;
  };

  /** 提交考试 */
  const handleSubmit = () => {
    console.log('[SESSION] 点击提交按钮', { answeredCount, totalQuestions, examData: !!examData });

    // 验证必填题
    if (!validateRequired()) {
      console.log('[SESSION] 必填题验证失败');
      return;
    }

    // 显示确认对话框
    setShowSubmitModal(true);
  };

  /** 确认提交 */
  const handleConfirmSubmit = async () => {
    console.log('[SESSION] 用户点击确认提交');
    setShowSubmitModal(false);
    await submitExam();
  };

  /** 取消提交 */
  const handleCancelSubmit = () => {
    console.log('[SESSION] 用户取消提交');
    setShowSubmitModal(false);
  };

  /** 执行提交 */
  const submitExam = async () => {
    const MAX_RETRIES = 3;
    let retryCount = 0;

    const attemptSubmit = async (): Promise<boolean> => {
      try {
        setSubmitting(true);

        // 转换答案格式（包含时间戳数据）
        const submitAnswers = Object.keys(answers).map((questionId) => {
          const timestamps = answerTimestamps.getQuestionTimestamps(questionId);
          return {
            questionId,
            selectedOptions: answers[questionId]?.selectedOptions,
            textAnswer: answers[questionId]?.textAnswer,
            // ⭐ 包含时间戳数据（用于AI分析相关性）
            questionDisplayedAt: timestamps?.questionDisplayedAt,
            firstInteractionAt: timestamps?.firstInteractionAt,
            lastModifiedAt: timestamps?.lastModifiedAt,
            totalViewTime: timestamps?.totalViewTime,
            interactionCount: timestamps?.interactionCount,
            hesitationScore: timestamps?.hesitationScore,
          };
        });

        await resultsApi.submitExam(resultId, { answers: submitAnswers });

        // 提交成功
        console.log('[SESSION] ✅ 提交成功');

        // ✅ 延迟2秒断开连接，确保AI服务有时间生成aggregate
        console.log('[SESSION] ⏰ 延迟2秒断开AI连接，等待aggregate生成...');
        await new Promise((resolve) => setTimeout(resolve, 2000));

        console.log('[SESSION] 断开AI连接（不清理数据）');
        aiConnection.disconnect(false);  // 不清理数据，因为已提交成功

        // 清除缓存
        const storageKey = `exam_session_${resultId}`;
        sessionStorage.removeItem(storageKey);
        console.log('[SESSION] 已清除缓存');

        // 跳转成功页面
        router.push(`/exam/${examId}/success/${resultId}`);
        return true;
      } catch (error: any) {
        // ✅ 检测"已提交"情况（后端幂等性返回成功）
        const errorMessage = error?.message || error?.response?.data?.error || '';
        const isAlreadySubmitted =
          errorMessage.includes('already submitted') ||
          errorMessage.includes('已提交') ||
          errorMessage.includes('isCompleted');

        if (isAlreadySubmitted) {
          console.log('[SESSION] ✅ 检测到考试已提交，视为成功');

          // ✅ 延迟2秒断开连接，确保AI服务有时间生成aggregate
          console.log('[SESSION] ⏰ 延迟2秒断开AI连接，等待aggregate生成...');
          await new Promise((resolve) => setTimeout(resolve, 2000));

          aiConnection.disconnect(false);
          sessionStorage.removeItem(`exam_session_${resultId}`);

          message.success('考试已提交成功');
          router.push(`/exam/${examId}/success/${resultId}`);
          return true;
        }

        retryCount++;
        console.error(`[SESSION] 提交失败 (${retryCount}/${MAX_RETRIES}):`, error);

        if (retryCount >= MAX_RETRIES) {
          // ✅ 修复：不再调用cleanup（避免400错误）
          // 只断开连接和清除缓存，不清理后端数据
          console.log('[SESSION] ❌ 提交失败3次，断开连接但不清理后端数据');
          message.error('提交失败，请联系管理员或稍后重试');

          aiConnection.disconnect();
          sessionStorage.removeItem(`exam_session_${resultId}`);

          // 跳转回join页面
          setTimeout(() => {
            router.push(`/exam/${examId}/join`);
          }, 2000);

          return false;
        }

        // 继续重试
        message.warning(`提交失败，正在重试 (${retryCount}/${MAX_RETRIES})...`);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return attemptSubmit();
      } finally {
        setSubmitting(false);
      }
    };

    await attemptSubmit();
  };

  /** 时间到自动提交 */
  const handleTimeUp = () => {
    message.warning('考试时间已到，自动提交！');
    submitExam();
  };

  // --------------------------------------------------------------------------
  // 题目可见性变化处理
  // --------------------------------------------------------------------------

  /**
   * 当题目可见性变化时，自动调整currentQuestionIndex
   * 例如：用户改变答案导致当前题目或后续题目隐藏
   */
  useEffect(() => {
    if (visibleQuestions.length === 0) return;

    // 如果当前索引超出可见题目范围，跳转到最后一题
    if (currentQuestionIndex >= visibleQuestions.length) {
      setCurrentQuestionIndex(visibleQuestions.length - 1);
    }
  }, [visibleQuestions.length, currentQuestionIndex]);

  // --------------------------------------------------------------------------
  // 题目切换动画重置
  // --------------------------------------------------------------------------

  /** 题目切换后重置动画状态 */
  useEffect(() => {
    if (questionTransition === 'slide-in') {
      const timer = setTimeout(() => {
        setQuestionTransition('none');
      }, 500); // 动画持续时间
      return () => clearTimeout(timer);
    }
  }, [questionTransition, currentQuestionIndex]);

  // --------------------------------------------------------------------------
  // 渲染 JSX
  // --------------------------------------------------------------------------

  if (loading || !examData || !currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card loading={true} style={{ width: 400 }}>
          加载中...
        </Card>
      </div>
    );
  }

  return (
    <div className="exam-session-page">
      {/* 顶部工具栏 */}
      <ExamHeader
        examTitle={examData.exam.title}
        currentQuestionNumber={currentQuestionIndex + 1}
        totalQuestions={totalQuestions}
        answeredCount={answeredCount}
        timeDeadline={timeDeadline}
        submitting={submitting}
        onSubmit={handleSubmit}
        onTimeUp={handleTimeUp}
      />

      {/* AI监控状态面板 */}
      <div className="container mx-auto px-6 pt-6 max-w-4xl">
        <AIStatusPanel
          aiEnabled={!aiOptOut}
          aiAvailable={aiConnection.aiAvailable}
          aiConfigLoading={aiConnection.configLoading}
        />
      </div>

      {/* 主内容区 */}
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="grid grid-cols-4 gap-6">
          {/* 题目卡片 - 带切换动画 */}
          <div className={`col-span-3 question-card-wrapper ${questionTransition}`}>
            <QuestionCard
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              value={answers[currentQuestion.id]}
              onChange={handleAnswerChange}
              isFirst={currentQuestionIndex === 0}
              isLast={currentQuestionIndex === totalQuestions - 1}
              onPrevious={handlePrevious}
              onNext={handleNext}
            />
          </div>

          {/* 题目导航（只显示可见题目） */}
          <div className="col-span-1">
            <NavigationGrid
              questions={visibleQuestions}
              currentIndex={currentQuestionIndex}
              answers={answers}
              onJumpTo={handleJumpToQuestion}
            />
          </div>
        </div>
      </div>

      {/* 提交确认对话框 */}
      <SubmitModal
        open={showSubmitModal}
        answeredCount={answeredCount}
        totalQuestions={totalQuestions}
        loading={submitting}
        onConfirm={handleConfirmSubmit}
        onCancel={handleCancelSubmit}
      />

      {/* 必填题警告对话框 */}
      <Modal
        title="⚠️ 请完成必答题"
        open={showRequiredWarning}
        onOk={() => setShowRequiredWarning(false)}
        onCancel={() => setShowRequiredWarning(false)}
        okText="知道了"
        cancelButtonProps={{ style: { display: 'none' } }}
        centered
      >
        <p className="text-base">
          还有 <span className="text-red-500 font-bold">{requiredCount}</span> 道必答题未完成
        </p>
        <p className="text-sm text-gray-500">请完成所有必答题后再提交</p>
      </Modal>

      {/* 全局加载遮罩 */}
      <GlobalLoading visible={submitting} tip="正在提交考试..." />

      {/* ====================================================================== */}
      {/* CSS样式定义 */}
      {/* ====================================================================== */}
      <style jsx global>{`
        /* 页面容器 - 柔和背景 */
        .exam-session-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          background-attachment: fixed;
        }

        /* 题目卡片包装器 */
        .question-card-wrapper {
          transition: opacity 0.3s ease;
        }

        /* 题目切换滑入动画 */
        .question-card-wrapper.slide-in {
          animation: questionSlideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes questionSlideIn {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* ExamHeader进度条渐变优化 */
        .ant-progress-bg {
          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%) !important;
        }

        /* 答案选项悬停效果增强 */
        .ant-radio-wrapper:hover,
        .ant-checkbox-wrapper:hover {
          transform: translateX(4px);
          transition: all 0.2s ease;
        }

        /* 答案选项选中反馈 */
        .ant-radio-wrapper-checked,
        .ant-checkbox-wrapper-checked {
          animation: answerPulse 0.4s ease-out;
        }

        @keyframes answerPulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }

        /* 卡片样式优化 */
        .ant-card {
          border-radius: 1rem !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08) !important;
          transition: box-shadow 0.3s ease;
        }

        .ant-card:hover {
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12) !important;
        }

        /* 按钮悬停效果 */
        .ant-btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
          border: none !important;
          transition: all 0.3s ease !important;
        }

        .ant-btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4) !important;
        }
      `}</style>
    </div>
  );
}
