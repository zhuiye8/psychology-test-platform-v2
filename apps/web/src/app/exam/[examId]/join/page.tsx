'use client';

/**
 * 考试加入页面
 *
 * 学生端：输入信息加入考试
 *
 * UI特性：
 * - 渐变动画背景 + 浮动气泡
 * - 卡片欢迎动画（淡入 + 上移）
 * - 表单输入聚焦效果
 * - 按钮悬停动画
 */

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, Form, Input, Button, Typography, Alert, App } from 'antd';
import {
  UserOutlined,
  IdcardOutlined,
  LockOutlined,
  RightCircleOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import resultsApi, { type StartExamDto } from '../../../../services/results';

const { Title, Paragraph } = Typography;

// ============================================================================
// 主组件
// ============================================================================

export default function ExamJoinPage() {
  const { message } = App.useApp();

  const params = useParams();
  const router = useRouter();
  const examId = params.examId as string;

  const [form] = Form.useForm<StartExamDto>();
  const [loading, setLoading] = useState(false);

  // --------------------------------------------------------------------------
  // 事件处理函数
  // --------------------------------------------------------------------------

  /** 开始考试 */
  const handleStart = async (values: StartExamDto) => {
    // 防重复提交
    if (loading) {
      console.log('[JOIN] 正在提交中，忽略重复请求');
      return;
    }

    try {
      setLoading(true);
      message.loading({ content: '正在准备考试...', key: 'startExam', duration: 0 });
      console.log('[JOIN] 开始考试请求:', { examId, values });

      const response = await resultsApi.startExam(examId, values);
      console.log('[JOIN] 开始考试响应:', response);
      message.destroy('startExam');

      // 验证响应数据
      if (!response.examResult || !response.examResult.id) {
        console.error('[JOIN] 响应数据格式错误:', response);
        message.error('服务器返回数据格式错误');
        return;
      }

      message.success('考试开始！');

      // 将考试数据存储到sessionStorage，供session页面使用
      const storageKey = `exam_session_${response.examResult.id}`;
      sessionStorage.setItem(storageKey, JSON.stringify(response));
      console.log('[JOIN] 已将考试数据存储到sessionStorage:', storageKey);

      // 跳转到设备检测页面
      const targetUrl = `/exam/${examId}/device-check?resultId=${response.examResult.id}`;
      console.log('[JOIN] 跳转到设备检测页面:', targetUrl);
      router.push(targetUrl);
    } catch (error: any) {
      console.error('[JOIN] 开始考试失败:', error);
      const errorMessage = error.response?.data?.message?.[0] ||
                          error.response?.data?.message ||
                          error.message ||
                          '加入考试失败，请检查您的信息是否正确';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------------------------------
  // 渲染 JSX
  // --------------------------------------------------------------------------

  return (
    <div className="exam-join-page">
      {/* 浮动气泡背景 */}
      <div className="bubbles-container">
        <div className="bubble bubble-1"></div>
        <div className="bubble bubble-2"></div>
        <div className="bubble bubble-3"></div>
        <div className="bubble bubble-4"></div>
        <div className="bubble bubble-5"></div>
      </div>

      {/* 主内容卡片 */}
      <div className="join-card-container">
        <Card className="join-card">
          {/* 标题 + 欢迎图标 */}
          <div className="text-center mb-6">
            <div className="welcome-icon">
              <SmileOutlined style={{ fontSize: 60, color: '#6366F1' }} />
            </div>
            <Title level={2} className="mb-2 title-gradient">
              心理测试平台
            </Title>
            <Paragraph className="text-gray-600">
              请输入您的信息以开始考试
            </Paragraph>
          </div>

          {/* 提示信息 */}
          <Alert
            message="注意事项"
            description="请确保网络连接稳定，考试期间请勿刷新页面或关闭浏览器"
            type="info"
            showIcon
            className="mb-4 info-alert"
          />

          {/* 表单 */}
          <Form
            form={form}
            layout="vertical"
            onFinish={handleStart}
            size="large"
          >
            {/* 学生ID */}
            <Form.Item
              label="学号/编号"
              name="participantId"
              rules={[
                { required: true, message: '请输入学号或编号' },
                { max: 50, message: '编号不能超过50个字符' },
              ]}
            >
              <Input
                prefix={<IdcardOutlined />}
                placeholder="请输入您的学号或编号"
                className="form-input"
              />
            </Form.Item>

            {/* 学生姓名 */}
            <Form.Item
              label="姓名"
              name="participantName"
              rules={[
                { required: true, message: '请输入姓名' },
                { max: 100, message: '姓名不能超过100个字符' },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="请输入您的姓名"
                className="form-input"
              />
            </Form.Item>

            {/* 访问码（可选） */}
            <Form.Item
              label="访问码"
              name="accessCode"
              tooltip="如果考试需要访问码，请向老师索取"
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="如需访问码，请输入"
                className="form-input"
              />
            </Form.Item>

            {/* 提交按钮 */}
            <Form.Item className="mb-0">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                icon={<RightCircleOutlined />}
                block
                size="large"
                className="submit-button"
              >
                开始考试
              </Button>
            </Form.Item>
          </Form>

          {/* 底部说明 */}
          <div className="text-center mt-6 text-sm text-gray-500">
            <p>遇到问题？请联系监考老师</p>
          </div>
        </Card>
      </div>

      {/* ====================================================================== */}
      {/* CSS样式定义 */}
      {/* ====================================================================== */}
      <style jsx global>{`
        /* 页面容器 - 渐变动画背景 */
        .exam-join-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
          position: relative;
          overflow: hidden;
        }

        /* 背景渐变动画 */
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        /* 浮动气泡容器 */
        .bubbles-container {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
        }

        /* 气泡基础样式 */
        .bubble {
          position: absolute;
          bottom: -150px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          opacity: 0.5;
          animation: rise 15s infinite ease-in;
        }

        /* 气泡上升动画 */
        @keyframes rise {
          0% {
            bottom: -150px;
            transform: translateX(0);
          }
          50% {
            transform: translateX(100px);
          }
          100% {
            bottom: 110%;
            transform: translateX(-100px);
          }
        }

        /* 不同气泡的大小和延迟 */
        .bubble-1 {
          width: 80px;
          height: 80px;
          left: 10%;
          animation-duration: 12s;
          animation-delay: 0s;
        }

        .bubble-2 {
          width: 60px;
          height: 60px;
          left: 30%;
          animation-duration: 14s;
          animation-delay: 2s;
        }

        .bubble-3 {
          width: 100px;
          height: 100px;
          left: 50%;
          animation-duration: 16s;
          animation-delay: 4s;
        }

        .bubble-4 {
          width: 70px;
          height: 70px;
          left: 70%;
          animation-duration: 13s;
          animation-delay: 1s;
        }

        .bubble-5 {
          width: 90px;
          height: 90px;
          left: 85%;
          animation-duration: 15s;
          animation-delay: 3s;
        }

        /* 卡片容器 - 淡入上移动画 */
        .join-card-container {
          width: 100%;
          max-width: 28rem;
          animation: cardFadeInUp 0.8s ease-out;
        }

        @keyframes cardFadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* 卡片样式 */
        .join-card {
          background: rgba(255, 255, 255, 0.95) !important;
          backdrop-filter: blur(20px);
          border-radius: 1.5rem !important;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15) !important;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        /* 欢迎图标 - 缩放动画 */
        .welcome-icon {
          animation: iconBounce 1s ease-out;
          display: inline-block;
          margin-bottom: 1rem;
        }

        @keyframes iconBounce {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        /* 标题渐变文字 */
        .title-gradient {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 700 !important;
        }

        /* 提示框样式优化 */
        .info-alert {
          border-radius: 0.75rem !important;
          border: 1px solid #91caff !important;
        }

        /* 表单输入框 - 聚焦效果 */
        .form-input {
          transition: all 0.3s ease;
          border-radius: 0.5rem !important;
        }

        .form-input:focus,
        .form-input:hover {
          border-color: #6366f1 !important;
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1) !important;
          transform: translateY(-2px);
        }

        /* 提交按钮 - 悬停动画 */
        .submit-button {
          height: 3rem !important;
          border-radius: 0.75rem !important;
          font-size: 1.125rem !important;
          font-weight: 600 !important;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
          border: none !important;
          transition: all 0.3s ease !important;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4) !important;
        }

        .submit-button:hover:not(:disabled) {
          transform: translateY(-2px) !important;
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6) !important;
        }

        .submit-button:active:not(:disabled) {
          transform: translateY(0) !important;
        }

        /* Ant Design Form Label样式优化 */
        .ant-form-item-label > label {
          font-weight: 500;
          color: #374151;
        }
      `}</style>
    </div>
  );
}
