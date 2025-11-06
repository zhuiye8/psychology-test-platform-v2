'use client';

import { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Typography,
  Space,
  Button,
  Spin,
  App,
  Select,
  Empty,
  Modal,
} from 'antd';
import { ReloadOutlined, RobotOutlined, DisconnectOutlined } from '@ant-design/icons';
import aiApi, { type AiSession, type AiAggregate, type AiAnomaly } from '../../../services/ai';
import resultsApi from '../../../services/results';
import { SystemStatusCard } from './components/SystemStatusCard';
import { RealtimeStatsCards } from './components/RealtimeStatsCards';
import { ActiveSessionsTable } from './components/ActiveSessionsTable';
import { AnomalyTimeline } from './components/AnomalyTimeline';
import { StudentVideoPreview } from './components/StudentVideoPreview';

const { Title } = Typography;

// ============================================================================
// 类型定义
// ============================================================================

interface SessionWithData {
  session: AiSession;
  aggregate?: AiAggregate;
  anomalies: AiAnomaly[];
  participantName?: string;
  examTitle?: string;
}

// ============================================================================
// 主组件
// ============================================================================

export default function AiMonitorPage() {
  const { message } = App.useApp();

  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState<SessionWithData[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [selectedSession, setSelectedSession] = useState<SessionWithData | null>(null);
  const [healthStatus, setHealthStatus] = useState({
    aiServiceStatus: 'checking' as 'online' | 'offline' | 'error' | 'checking',
    mediaMtxStatus: 'checking' as 'online' | 'offline' | 'error' | 'checking',
    lastUpdateTime: new Date().toISOString(),
  });

  // --------------------------------------------------------------------------
  // 数据加载
  // --------------------------------------------------------------------------

  useEffect(() => {
    loadData();
    checkHealth(); // 初始健康检查
  }, [statusFilter]);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      loadData(true); // 静默刷新
      checkHealth(); // 同时刷新健康状态
    }, 5000); // 每5秒刷新

    return () => clearInterval(interval);
  }, [autoRefresh, statusFilter]);

  const checkHealth = async () => {
    try {
      const AI_SERVICE_URL = process.env.NEXT_PUBLIC_AI_SERVICE_URL || 'http://localhost:5678';
      const response = await fetch(`${AI_SERVICE_URL}/health`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const data = await response.json();
        setHealthStatus({
          aiServiceStatus: data.status === 'ok' ? 'online' : 'error',
          mediaMtxStatus: data.mediamtx_available ? 'online' : 'offline',
          lastUpdateTime: data.timestamp,
        });
      } else {
        setHealthStatus({
          aiServiceStatus: 'error',
          mediaMtxStatus: 'offline',
          lastUpdateTime: new Date().toISOString(),
        });
      }
    } catch (error) {
      // AI服务不可达
      setHealthStatus({
        aiServiceStatus: 'offline',
        mediaMtxStatus: 'offline',
        lastUpdateTime: new Date().toISOString(),
      });
    }
  };

  const loadData = async (silent = false) => {
    try {
      if (!silent) setLoading(true);

      // ✅ 修复：直接获取所有活跃AI会话（包括本机检测的会话）
      const activeSessions = await aiApi.getActiveSessions();

      if (activeSessions.length === 0) {
        setSessions([]);
        return;
      }

      // 为每个会话获取聚合数据和异常数据
      const sessionPromises = activeSessions.map(async (sessionWithResult) => {
        try {
          const [aggregate, anomalies] = await Promise.allSettled([
            // 聚合数据：优先通过examResultId查询，否则尝试通过sessionId查询
            sessionWithResult.examResult?.id
              ? aiApi.getAggregateByResultId(sessionWithResult.examResult.id)
              : Promise.resolve(undefined),
            // 异常数据：通过sessionId查询
            aiApi.getAnomaliesBySessionId(sessionWithResult.sessionId),
          ]);

          const sessionWithData: SessionWithData = {
            session: sessionWithResult,
            aggregate:
              aggregate.status === 'fulfilled' && aggregate.value
                ? aggregate.value
                : undefined,
            anomalies:
              anomalies.status === 'fulfilled' ? anomalies.value : [],
            // ✅ 严格区分：本机检测(无examResult) vs 正常考试(有examResult但可能数据为空)
            participantName: sessionWithResult.examResult
              ? (sessionWithResult.examResult.studentName || '未知学生')
              : '设备测试',
            examTitle: sessionWithResult.examResult
              ? (sessionWithResult.examResult.examTitle || '未命名考试')
              : '本机检测',
          };

          return sessionWithData;
        } catch (error) {
          console.error(
            `加载会话数据失败 (sessionId: ${sessionWithResult.sessionId}):`,
            error
          );
          return null;
        }
      });

      const allSessions = (await Promise.all(sessionPromises)).filter(
        (s): s is SessionWithData => s !== null
      );

      // 根据状态筛选
      const filteredSessions =
        statusFilter === 'all'
          ? allSessions
          : allSessions.filter((s) => s.session.status === statusFilter);

      setSessions(filteredSessions);
    } catch (error) {
      if (!silent) {
        message.error('加载AI监控数据失败');
      }
      console.error('加载AI监控数据失败:', error);
    } finally {
      if (!silent) setLoading(false);
    }
  };

  // --------------------------------------------------------------------------
  // 断开连接
  // --------------------------------------------------------------------------

  const handleDisconnect = async (session: SessionWithData) => {
    console.log('[AI Monitor] handleDisconnect 被调用', {
      session: session.session,
      examResultId: session.session.examResultId,
      participantName: session.participantName,
    });

    const examResultId = session.session.examResultId;
    const isDeviceCheck = !examResultId;

    console.log('[AI Monitor] 显示确认对话框');
    Modal.confirm({
      title: '确认断开连接？',
      content: isDeviceCheck
        ? `断开 ${session.participantName || '设备测试'} 的连接后，AI会话数据将被删除。`
        : `断开 ${session.participantName || '未知学生'} 的连接后，该学生的所有考试数据将被清除，无法恢复。`,
      okText: '确认断开',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        console.log('[AI Monitor] 用户确认断开', {
          examResultId,
          isDeviceCheck,
        });

        try {
          if (isDeviceCheck) {
            // ✅ 修复：本机检测 → 删除AI会话
            console.log('[AI Monitor] 本机检测断开：删除session', session.session.id);
            await aiApi.deleteSession(session.session.id);
            message.success('已停止设备检测并清理数据');
          } else {
            // 正常考试 → 清理考试数据（会级联删除AI会话）
            console.log('[AI Monitor] 正常考试断开：cleanupExamSession', examResultId);
            await resultsApi.cleanupExamSession(examResultId!);
            message.success('已断开连接并清理数据');
          }

          // 清除选中状态
          if (selectedSession?.session.id === session.session.id) {
            setSelectedSession(null);
          }

          // 刷新列表
          await loadData();
        } catch (error) {
          console.error('[AI Monitor] 断开连接失败:', error);
          message.error('断开连接失败');
        }
      },
      onCancel: () => {
        console.log('[AI Monitor] 用户取消断开');
      },
    });
  };

  // --------------------------------------------------------------------------
  // 统计计算
  // --------------------------------------------------------------------------

  const activeSessions = sessions.filter(
    (s) => s.session.status === 'ACTIVE'
  ).length;
  const completedSessions = sessions.filter(
    (s) => s.session.status === 'COMPLETED'
  ).length;
  const failedSessions = sessions.filter(
    (s) => s.session.status === 'FAILED'
  ).length;

  const totalAnomalies = sessions.reduce(
    (sum, s) => sum + s.anomalies.length,
    0
  );
  const criticalAnomalies = sessions.reduce(
    (sum, s) =>
      sum + s.anomalies.filter((a) => a.severity === 'CRITICAL').length,
    0
  );

  const avgEmotionScore =
    sessions.length > 0
      ? sessions.reduce((sum, s) => {
          if (s.aggregate?.avgValence !== undefined) {
            return sum + ((s.aggregate.avgValence + 1) / 2) * 100;
          }
          return sum;
        }, 0) / sessions.filter((s) => s.aggregate?.avgValence !== undefined).length
      : 0;

  const avgAttentionScore =
    sessions.length > 0
      ? sessions.reduce((sum, s) => {
          if (s.aggregate?.avgAttention !== undefined) {
            return sum + s.aggregate.avgAttention * 100;
          }
          return sum;
        }, 0) /
        sessions.filter((s) => s.aggregate?.avgAttention !== undefined).length
      : 0;

  // --------------------------------------------------------------------------
  // 渲染
  // --------------------------------------------------------------------------

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" tip="加载AI监控数据...">
          <div />
        </Spin>
      </div>
    );
  }

  return (
    <div className="space-y-6 modern-page-enter">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <Title level={2} className="mb-2">
            <RobotOutlined className="mr-2" />
            AI实时监控
          </Title>
          <p className="text-gray-600">实时情绪分析、心率检测、注意力监测</p>
        </div>
        <Space>
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: 150 }}
          >
            <Select.Option value="all">全部状态</Select.Option>
            <Select.Option value="ACTIVE">进行中</Select.Option>
            <Select.Option value="COMPLETED">已完成</Select.Option>
            <Select.Option value="FAILED">失败</Select.Option>
          </Select>
          <Button
            type={autoRefresh ? 'primary' : 'default'}
            onClick={() => setAutoRefresh(!autoRefresh)}
          >
            {autoRefresh ? '已启用自动刷新' : '已禁用自动刷新'}
          </Button>
          <Button
            icon={<ReloadOutlined />}
            onClick={() => loadData()}
            loading={loading}
          >
            手动刷新
          </Button>
        </Space>
      </div>

      {/* 系统状态卡片 */}
      <SystemStatusCard
        aiServiceStatus={healthStatus.aiServiceStatus}
        mediaMtxStatus={healthStatus.mediaMtxStatus}
        lastUpdateTime={healthStatus.lastUpdateTime}
      />

      {/* 实时统计卡片 */}
      <RealtimeStatsCards
        activeSessions={activeSessions}
        completedSessions={completedSessions}
        failedSessions={failedSessions}
        totalAnomalies={totalAnomalies}
        criticalAnomalies={criticalAnomalies}
        avgEmotionScore={Math.round(avgEmotionScore)}
        avgAttentionScore={Math.round(avgAttentionScore)}
      />

      {/* 活跃会话表格 + 视频预览 */}
      {sessions.length > 0 ? (
        <>
          <Row gutter={16}>
            <Col xs={24} xl={14}>
              <ActiveSessionsTable
                sessions={sessions}
                onSelectSession={setSelectedSession}
              />
            </Col>
            <Col xs={24} xl={10}>
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                <StudentVideoPreview
                  session={selectedSession?.session || null}
                  aggregate={selectedSession?.aggregate}
                  participantName={selectedSession?.participantName}
                  examTitle={selectedSession?.examTitle}
                />
                {selectedSession && (
                  <Button
                    danger
                    block
                    icon={<DisconnectOutlined />}
                    onClick={() => handleDisconnect(selectedSession)}
                  >
                    断开连接并清除数据
                  </Button>
                )}
              </Space>
            </Col>
          </Row>

          {/* 异常事件时间线 */}
          {totalAnomalies > 0 && (
            <AnomalyTimeline
              anomalies={sessions.flatMap((s) =>
                s.anomalies.map((a) => ({
                  ...a,
                  participantName: s.participantName,
                }))
              )}
            />
          )}
        </>
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="暂无AI分析会话数据"
        />
      )}
    </div>
  );
}
