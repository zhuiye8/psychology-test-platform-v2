'use client';

/**
 * 考试提交成功页面
 *
 * 学生端：显示提交成功信息，提供再考一次或关闭页面选项
 *
 * UI特性：
 * - 彩纸飘落动画（纯CSS）
 * - 成功图标多层粒子效果
 * - 按钮悬停动画
 * - 庆祝氛围
 */

import { useParams, useRouter } from 'next/navigation';
import { Button, Typography, Space } from 'antd';
import {
  CheckCircleOutlined,
  ReloadOutlined,
  CloseOutlined,
  TrophyOutlined,
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

// ============================================================================
// 主组件
// ============================================================================

export default function ExamSuccessPage() {
  const params = useParams();
  const router = useRouter();
  const examId = params.examId as string;
  const resultId = params.resultId as string;

  // --------------------------------------------------------------------------
  // 事件处理函数
  // --------------------------------------------------------------------------

  /** 再考一次 - 跳转到信息填写页面 */
  const handleRetry = () => {
    router.push(`/exam/${examId}/join`);
  };

  /** 关闭页面 */
  const handleClose = () => {
    // 尝试关闭当前标签页（仅在用户允许的情况下有效）
    window.close();

    // 如果无法关闭（浏览器安全限制），提示用户手动关闭
    setTimeout(() => {
      // 如果页面还在，说明close()失败了
      if (!document.hidden) {
        alert('请手动关闭此页面标签');
      }
    }, 100);
  };

  // --------------------------------------------------------------------------
  // 渲染 JSX
  // --------------------------------------------------------------------------

  return (
    <div className="success-page">
      {/* 彩纸飘落背景 */}
      <div className="confetti-container">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="confetti"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              backgroundColor: [
                '#FF6B6B',
                '#4ECDC4',
                '#45B7D1',
                '#FFA07A',
                '#98D8C8',
                '#F7DC6F',
                '#BB8FCE',
              ][Math.floor(Math.random() * 7)],
            }}
          />
        ))}
      </div>

      {/* 主卡片 */}
      <div className="success-card">
        {/* 成功图标 + 粒子效果 */}
        <div className="icon-wrapper">
          <div className="icon-particles">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  transform: `rotate(${i * 45}deg) translateY(-60px)`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
          <div className="success-icon">
            <CheckCircleOutlined style={{ fontSize: 100, color: '#10B981' }} />
          </div>
          <div className="trophy-icon">
            <TrophyOutlined style={{ fontSize: 40, color: '#F59E0B' }} />
          </div>
        </div>

        {/* 标题 */}
        <Title level={1} className="success-title">
          🎉 恭喜！考试已提交
        </Title>

        {/* 描述 */}
        <Paragraph className="success-desc">
          感谢您的参与！
        </Paragraph>
        <Paragraph className="success-subdesc">
          我们正在分析您的答案，请等待结果通知
        </Paragraph>

        {/* 提交信息 */}
        <div className="submit-info">
          <Paragraph className="text-sm text-gray-600 mb-1">
            提交时间：{new Date().toLocaleString('zh-CN')}
          </Paragraph>
          <Paragraph className="text-xs text-gray-400 mb-0">
            考试ID: {resultId}
          </Paragraph>
        </div>

        {/* 操作按钮 */}
        <Space size="large" className="action-buttons">
          <Button
            type="primary"
            size="large"
            icon={<ReloadOutlined />}
            onClick={handleRetry}
            className="retry-button"
          >
            再考一次
          </Button>
          <Button
            size="large"
            icon={<CloseOutlined />}
            onClick={handleClose}
            className="close-button"
          >
            关闭页面
          </Button>
        </Space>

        {/* 温馨提示 */}
        <Paragraph className="hint-text">
          您可以关闭此页面，或点击"再考一次"重新参加考试
        </Paragraph>
      </div>

      {/* ====================================================================== */}
      {/* CSS样式定义 */}
      {/* ====================================================================== */}
      <style jsx global>{`
        /* 页面容器 - 渐变背景 */
        .success-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          position: relative;
          overflow: hidden;
        }

        /* 彩纸容器 */
        .confetti-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }

        /* 单个彩纸 */
        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          top: -10px;
          opacity: 0;
          animation: confettiFall 3s linear infinite;
        }

        /* 彩纸飘落动画 */
        @keyframes confettiFall {
          0% {
            top: -10px;
            opacity: 1;
            transform: translateX(0) rotateZ(0deg);
          }
          100% {
            top: 110%;
            opacity: 0;
            transform: translateX(100px) rotateZ(720deg);
          }
        }

        /* 主卡片 */
        .success-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 2rem;
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.2);
          padding: 3rem 2rem;
          max-width: 36rem;
          width: 100%;
          text-align: center;
          animation: cardBounceIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          z-index: 1;
        }

        @keyframes cardBounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(100px);
          }
          50% {
            transform: scale(1.05) translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        /* 图标包装器 */
        .icon-wrapper {
          position: relative;
          display: inline-block;
          margin-bottom: 2rem;
        }

        /* 粒子容器 */
        .icon-particles {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        /* 单个粒子 */
        .particle {
          position: absolute;
          width: 8px;
          height: 8px;
          background: #FCD34D;
          border-radius: 50%;
          animation: particlePulse 1.5s ease-out infinite;
        }

        @keyframes particlePulse {
          0% {
            transform: rotate(var(--rotate, 0deg)) translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: rotate(var(--rotate, 0deg)) translateY(-80px) scale(0);
            opacity: 0;
          }
        }

        /* 成功图标 */
        .success-icon {
          position: relative;
          z-index: 2;
          animation: iconRotate 0.6s ease-out, iconGlow 2s ease-in-out infinite;
        }

        @keyframes iconRotate {
          0% {
            transform: rotate(-180deg) scale(0);
          }
          100% {
            transform: rotate(0deg) scale(1);
          }
        }

        @keyframes iconGlow {
          0%,
          100% {
            filter: drop-shadow(0 0 10px rgba(16, 185, 129, 0.5));
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(16, 185, 129, 0.8));
          }
        }

        /* 奖杯图标 */
        .trophy-icon {
          position: absolute;
          top: -20px;
          right: -20px;
          animation: trophyBounce 1s ease-in-out infinite;
        }

        @keyframes trophyBounce {
          0%,
          100% {
            transform: translateY(0) rotate(-10deg);
          }
          50% {
            transform: translateY(-10px) rotate(10deg);
          }
        }

        /* 标题 */
        .success-title {
          font-size: 2rem !important;
          font-weight: 700 !important;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1.5rem !important;
          animation: titleSlideIn 0.6s ease-out 0.2s both;
        }

        @keyframes titleSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* 描述文字 */
        .success-desc {
          font-size: 1.25rem !important;
          color: #374151 !important;
          margin-bottom: 0.5rem !important;
          animation: fadeInUp 0.6s ease-out 0.3s both;
        }

        .success-subdesc {
          font-size: 1rem !important;
          color: #6b7280 !important;
          margin-bottom: 2rem !important;
          animation: fadeInUp 0.6s ease-out 0.4s both;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* 提交信息 */
        .submit-info {
          background: linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%);
          border-radius: 1rem;
          padding: 1.5rem;
          margin-bottom: 2rem;
          animation: fadeInUp 0.6s ease-out 0.5s both;
          border: 1px solid rgba(99, 102, 241, 0.1);
        }

        /* 按钮容器 */
        .action-buttons {
          width: 100%;
          justify-content: center;
          flex-wrap: wrap;
          animation: fadeInUp 0.6s ease-out 0.6s both;
        }

        /* 重试按钮 */
        .retry-button {
          padding: 0 2rem !important;
          height: 3rem !important;
          font-size: 1rem !important;
          font-weight: 600 !important;
          border-radius: 0.75rem !important;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
          border: none !important;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4) !important;
          transition: all 0.3s ease !important;
        }

        .retry-button:hover {
          transform: translateY(-3px) scale(1.05) !important;
          box-shadow: 0 8px 25px rgba(16, 185, 129, 0.6) !important;
        }

        .retry-button:active {
          transform: translateY(0) scale(1) !important;
        }

        /* 关闭按钮 */
        .close-button {
          padding: 0 2rem !important;
          height: 3rem !important;
          font-size: 1rem !important;
          font-weight: 600 !important;
          border-radius: 0.75rem !important;
          border: 2px solid #e5e7eb !important;
          transition: all 0.3s ease !important;
        }

        .close-button:hover {
          transform: translateY(-3px) !important;
          border-color: #9ca3af !important;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;
        }

        .close-button:active {
          transform: translateY(0) !important;
        }

        /* 提示文字 */
        .hint-text {
          font-size: 0.875rem !important;
          color: #9ca3af !important;
          margin-top: 2rem !important;
          margin-bottom: 0 !important;
          animation: fadeInUp 0.6s ease-out 0.7s both;
        }

        /* 响应式优化 */
        @media (max-width: 768px) {
          .success-card {
            padding: 2rem 1.5rem;
          }

          .success-title {
            font-size: 1.5rem !important;
          }

          .success-icon {
            font-size: 80px !important;
          }
        }
      `}</style>
    </div>
  );
}
