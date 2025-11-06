'use client';

import { useState } from 'react';
import { Typography, Tabs, Space, Button } from 'antd';
import { MonitorOutlined, ReloadOutlined, DesktopOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { ControlPanel } from './components/ControlPanel';
import { VideoDisplay } from './components/VideoDisplay';
import { EmotionTrendChart } from './components/EmotionTrendChart';
import { EmotionPieChart } from './components/EmotionPieChart';
import { HeartRateDisplay } from './components/HeartRateDisplay';
import { useRealtimeAnalysis } from './hooks/useRealtimeAnalysis';

const { Title } = Typography;

// ============================================================================
// 类型定义
// ============================================================================

type DisplayMode = 'local' | 'monitor';

// ============================================================================
// 主组件
// ============================================================================

export default function AiLivePage() {
  const [mode, setMode] = useState<DisplayMode>('monitor');
  const [autoRefresh, setAutoRefresh] = useState(true);

  // 使用实时分析Hook
  const {
    data,
    loading,
    error,
    deviceCheck,
    aiConnection,
    startLocalDetection,
    stopLocalDetection,
    refresh,
    clearTrendData,
    selectStudent,
    disconnect,
    // ⭐ 新增：monitor模式的视频流和AI数据
    monitorStream,
    currentSession,
    currentAggregate,
    realtimeStream,
  } = useRealtimeAnalysis(mode, autoRefresh, 3000);

  const handleRefresh = () => {
    refresh();
  };

  return (
    <div className="ai-live-container" style={{
      minHeight: 'calc(100vh - 64px)',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      padding: '24px',
    }}>
      {/* 页面头部 */}
      <div className="header-section" style={{
        marginBottom: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Space align="center">
          <MonitorOutlined style={{ fontSize: '32px', color: '#00ffff' }} />
          <Title level={2} style={{
            margin: 0,
            background: 'linear-gradient(45deg, #00ffff, #ff00ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            AI实时大屏
          </Title>
        </Space>

        <Space>
          <Tabs
            activeKey={mode}
            onChange={(key) => setMode(key as DisplayMode)}
            items={[
              {
                key: 'local',
                label: (
                  <span>
                    <DesktopOutlined /> 本机检测
                  </span>
                ),
              },
              {
                key: 'monitor',
                label: (
                  <span>
                    <UsergroupAddOutlined /> 学生监控
                  </span>
                ),
              },
            ]}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '4px',
            }}
          />
          <Button
            type={autoRefresh ? 'primary' : 'default'}
            onClick={() => setAutoRefresh(!autoRefresh)}
          >
            {autoRefresh ? '自动刷新: 开' : '自动刷新: 关'}
          </Button>
          <Button
            icon={<ReloadOutlined />}
            onClick={handleRefresh}
          >
            刷新
          </Button>
        </Space>
      </div>

      {/* 🔧 诊断面板 - 显示WebSocket连接状态 */}
      <div style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        background: 'rgba(0, 0, 0, 0.9)',
        color: '#00ff00',
        padding: '16px',
        borderRadius: '8px',
        fontSize: '13px',
        zIndex: 9999,
        fontFamily: 'Monaco, Consolas, monospace',
        border: '2px solid #00ff00',
        boxShadow: '0 0 20px rgba(0, 255, 0, 0.3)',
        minWidth: '280px',
      }}>
        <div style={{
          marginBottom: '12px',
          fontSize: '14px',
          fontWeight: 'bold',
          borderBottom: '1px solid #00ff00',
          paddingBottom: '8px',
        }}>
          🔧 实时诊断面板
        </div>
        <div style={{ lineHeight: '1.8' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>WebSocket:</span>
            <span style={{
              color: realtimeStream?.connected ? '#00ff00' : '#ff0000',
              fontWeight: 'bold'
            }}>
              {realtimeStream?.connected ? '✅ 已连接' : '❌ 未连接'}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>数据点:</span>
            <span style={{ color: '#00ffff' }}>
              {realtimeStream?.dataPointsCount || 0}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>最新数据:</span>
            <span style={{
              color: realtimeStream?.latestData ? '#00ff00' : '#ffff00'
            }}>
              {realtimeStream?.latestData
                ? `${realtimeStream.latestData.data_type}`
                : '无'}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>SessionID:</span>
            <span style={{
              color: data.currentStudent ? '#00ffff' : '#666',
              fontSize: '11px',
              wordBreak: 'break-all',
              maxWidth: '150px',
            }}>
              {data.currentStudent?.id || '未选择'}
            </span>
          </div>
          {realtimeStream?.error && (
            <div style={{
              marginTop: '8px',
              padding: '8px',
              background: 'rgba(255, 0, 0, 0.2)',
              borderRadius: '4px',
              color: '#ff6666',
              fontSize: '11px',
            }}>
              ⚠️ {realtimeStream.error}
            </div>
          )}
        </div>
      </div>

      {/* 主要内容区域 - 三栏响应式布局 */}
      <div className="main-layout" style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(280px, 320px) 1fr minmax(320px, 380px)',
        gap: 'clamp(16px, 2vw, 24px)',
        height: 'calc(100vh - 180px)',
        maxHeight: 'calc(100vh - 180px)',
        minHeight: 0,
      }}>
        {/* 左侧控制面板 */}
        <div className="control-panel" style={{
          background: 'rgba(0, 0, 0, 0.4)',
          border: '1px solid rgba(0, 255, 255, 0.3)',
          borderRadius: '15px',
          padding: '20px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 255, 255, 0.1)',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <ControlPanel
            mode={mode}
            students={data.students}
            currentStudent={data.currentStudent}
            onSelectStudent={selectStudent}
            onDisconnect={disconnect}
            deviceCheck={deviceCheck}
            onStartLocal={startLocalDetection}
            onStopLocal={stopLocalDetection}
          />
        </div>

        {/* 中央显示区域 */}
        <div className="display-area" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          height: '100%',
          minHeight: 0, // 防止flex子元素溢出
        }}>
          {/* 视频预览区域 - 占3份 */}
          <div className="video-container" style={{
            flex: 3,
            minHeight: 0,
            background: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(0, 255, 255, 0.3)',
            borderRadius: '15px',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0, 255, 255, 0.1)',
            overflow: 'hidden',
          }}>
            <VideoDisplay
              mode={mode}
              stream={mode === 'local' ? (deviceCheck?.videoStream || null) : monitorStream}
              studentName={data.currentStudent?.name}
              connectionStatus={aiConnection?.webrtcConnectionState.status === 'connected' ? 'connected' : aiConnection?.webrtcConnectionState.status === 'connecting' ? 'connecting' : 'disconnected'}
              aggregate={currentAggregate}
              session={currentSession}
              realtimeData={realtimeStream.latestData?.data_type === 'video_emotion'
                ? realtimeStream.latestData.data
                : null}
            />
          </div>

          {/* 情绪趋势图 - 占1份 */}
          <div className="trend-chart-container" style={{
            flex: 1,
            minHeight: 180, // 确保趋势图最小可读高度
            background: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(0, 255, 255, 0.3)',
            borderRadius: '15px',
            padding: '20px',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0, 255, 255, 0.1)',
          }}>
            <EmotionTrendChart
              data={data.trendData}
              showAudio={true}
              showVideo={true}
              onClear={clearTrendData}
            />
          </div>
        </div>

        {/* 右侧分析面板 */}
        <div className="analysis-panel" style={{
          background: 'rgba(0, 0, 0, 0.4)',
          border: '1px solid rgba(0, 255, 255, 0.3)',
          borderRadius: '15px',
          padding: '20px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 255, 255, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          overflow: 'auto',
        }}>
          {/* 面部情绪分析 */}
          <div className="emotion-section">
            <div style={{
              height: '220px',
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '8px',
              padding: '12px',
            }}>
              <EmotionPieChart
                data={data.videoEmotions}
                type="video"
                title="面部情绪分析"
              />
            </div>
          </div>

          {/* 语音情绪分析 */}
          <div className="emotion-section">
            <div style={{
              height: '220px',
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '8px',
              padding: '12px',
            }}>
              <EmotionPieChart
                data={data.audioEmotions}
                type="audio"
                title="语音情绪分析"
              />
            </div>
          </div>

          {/* 心率显示 */}
          <div className="heart-rate-section">
            <HeartRateDisplay heartRate={data.heartRate} />
          </div>
        </div>
      </div>
    </div>
  );
}
