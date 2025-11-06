import { Button, Badge, List, Empty, Progress, Alert } from 'antd';
import { UserOutlined, EyeOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

// ============================================================================
// 类型定义
// ============================================================================

interface Student {
  id: string;
  name: string;
  examId: string;
  status: 'active' | 'completed' | 'failed';
  duration?: number;
}

interface DeviceCheck {
  cameraOk: boolean;
  micOk: boolean;
  isChecking: boolean;
  error: string | null;
  volumeLevel: number;
  videoStream: MediaStream | null;
  audioStream: MediaStream | null;
  start: () => Promise<void>;
  stop: () => void;
}

interface ControlPanelProps {
  mode: 'local' | 'monitor';
  students?: Student[];
  currentStudent?: Student | null;
  onSelectStudent?: (student: Student) => void;
  onDisconnect?: () => void;
  deviceCheck?: DeviceCheck | null;
  onStartLocal?: () => Promise<void>;
  onStopLocal?: () => Promise<void>;
}

// ============================================================================
// 组件
// ============================================================================

export function ControlPanel({
  mode,
  students = [],
  currentStudent,
  onSelectStudent,
  onDisconnect,
  deviceCheck,
  onStartLocal,
  onStopLocal,
}: ControlPanelProps) {
  const isLocalStarted = deviceCheck?.videoStream !== null;

  // 本机检测模式
  if (mode === 'local') {
    return (
      <div className="local-controls">
        <div className="panel-section">
          <h4 style={{ color: '#00ffff', fontSize: '14px', marginBottom: '12px' }}>
            <i className="fas fa-video" style={{ marginRight: '8px' }}></i>
            本机检测控制
          </h4>

          {/* 错误提示 */}
          {deviceCheck?.error && (
            <Alert
              type="error"
              message={deviceCheck.error}
              style={{ marginBottom: '12px' }}
              closable
            />
          )}

          {/* 设备状态指示器 */}
          <div style={{
            background: 'rgba(0, 255, 255, 0.1)',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '12px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#cccccc', fontSize: '12px' }}>
                <i className="fas fa-camera" style={{ marginRight: '6px' }}></i>
                摄像头:
              </span>
              {deviceCheck?.cameraOk ? (
                <CheckCircleOutlined style={{ color: '#52c41a', fontSize: '16px' }} />
              ) : (
                <CloseCircleOutlined style={{ color: '#ff4d4f', fontSize: '16px' }} />
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#cccccc', fontSize: '12px' }}>
                <i className="fas fa-microphone" style={{ marginRight: '6px' }}></i>
                麦克风:
              </span>
              {deviceCheck?.micOk ? (
                <CheckCircleOutlined style={{ color: '#52c41a', fontSize: '16px' }} />
              ) : (
                <CloseCircleOutlined style={{ color: '#ff4d4f', fontSize: '16px' }} />
              )}
            </div>

            {/* 音量条 */}
            {deviceCheck?.micOk && (
              <div style={{ marginTop: '12px' }}>
                <div style={{ color: '#cccccc', fontSize: '11px', marginBottom: '4px' }}>
                  麦克风音量:
                </div>
                <Progress
                  percent={Math.round((deviceCheck.volumeLevel || 0) * 100)}
                  size="small"
                  strokeColor={{
                    '0%': '#00ffff',
                    '100%': '#ff00ff',
                  }}
                  showInfo={false}
                />
              </div>
            )}
          </div>

          {/* 启动/停止按钮 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Button
              type="primary"
              block
              loading={deviceCheck?.isChecking}
              disabled={isLocalStarted}
              onClick={onStartLocal}
            >
              <i className="fas fa-play" style={{ marginRight: '6px' }}></i>
              {deviceCheck?.isChecking ? '正在启动...' : '启动本机检测'}
            </Button>
            <Button
              danger
              block
              disabled={!isLocalStarted}
              onClick={onStopLocal}
            >
              <i className="fas fa-stop" style={{ marginRight: '6px' }}></i>
              停止检测
            </Button>
          </div>
        </div>

        {/* 检测状态信息 */}
        <div className="panel-section" style={{ marginTop: '20px' }}>
          <h4 style={{ color: '#00ffff', fontSize: '14px', marginBottom: '12px' }}>
            <i className="fas fa-chart-line" style={{ marginRight: '8px' }}></i>
            检测状态
          </h4>
          <div style={{
            background: 'rgba(0, 255, 255, 0.1)',
            borderRadius: '8px',
            padding: '12px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#cccccc', fontSize: '12px' }}>检测状态:</span>
              <span style={{ color: isLocalStarted ? '#52c41a' : '#999', fontSize: '12px', fontWeight: 'bold' }}>
                {isLocalStarted ? '运行中' : '未启动'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#cccccc', fontSize: '12px' }}>设备状态:</span>
              <span style={{ color: '#00ffff', fontSize: '12px', fontWeight: 'bold' }}>
                {deviceCheck?.cameraOk && deviceCheck?.micOk ? '就绪' : '未就绪'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#cccccc', fontSize: '12px' }}>数据质量:</span>
              <span style={{ color: '#00ffff', fontSize: '12px', fontWeight: 'bold' }}>
                {isLocalStarted ? '良好' : '--'}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 学生监控模式
  return (
    <div className="monitor-controls">
      {/* 监控状态 */}
      <div className="panel-section">
        <div style={{
          background: 'rgba(0, 255, 255, 0.1)',
          borderRadius: '8px',
          padding: '12px',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#cccccc', fontSize: '12px', marginBottom: '4px' }}>
              在线学生
            </div>
            <div style={{ color: '#00ffff', fontSize: '20px', fontWeight: 'bold' }}>
              {students.filter(s => s.status === 'active').length}
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#cccccc', fontSize: '12px', marginBottom: '4px' }}>
              活跃会话
            </div>
            <div style={{ color: '#00ffff', fontSize: '20px', fontWeight: 'bold' }}>
              {students.length}
            </div>
          </div>
        </div>
      </div>

      {/* 学生列表 */}
      <div className="panel-section" style={{ marginTop: '20px', flex: 1, overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h4 style={{ color: '#00ffff', fontSize: '14px', margin: 0 }}>
            <i className="fas fa-list" style={{ marginRight: '8px' }}></i>
            学生列表
          </h4>
          <Button
            size="small"
            type="text"
            icon={<i className="fas fa-sync-alt" style={{ color: '#00ffff' }}></i>}
          />
        </div>

        <div style={{ maxHeight: '300px', overflow: 'auto' }}>
          {students.length === 0 ? (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <span style={{ color: '#666' }}>
                  <i className="fas fa-user-slash" style={{ marginRight: '6px' }}></i>
                  暂无在线学生
                </span>
              }
            />
          ) : (
            <List
              dataSource={students}
              renderItem={(student) => (
                <List.Item
                  style={{
                    background: currentStudent?.id === student.id
                      ? 'rgba(0, 255, 255, 0.2)'
                      : 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(0, 255, 255, 0.3)',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    marginBottom: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                  }}
                  onClick={() => onSelectStudent?.(student)}
                >
                  <div style={{ width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <UserOutlined style={{ color: '#00ffff' }} />
                        <span style={{ color: '#ffffff', fontSize: '13px', fontWeight: 'bold' }}>
                          {student.name}
                        </span>
                      </div>
                      <Badge
                        status={student.status === 'active' ? 'success' : student.status === 'completed' ? 'default' : 'error'}
                        text={
                          <span style={{ color: '#cccccc', fontSize: '11px' }}>
                            {student.status === 'active' ? '进行中' : student.status === 'completed' ? '已完成' : '异常'}
                          </span>
                        }
                      />
                    </div>
                    <div style={{ fontSize: '11px', color: '#999', marginLeft: '24px' }}>
                      考试ID: {student.examId.slice(0, 8)}...
                    </div>
                  </div>
                </List.Item>
              )}
            />
          )}
        </div>
      </div>

      {/* 当前监控学生信息 */}
      <div className="panel-section" style={{ marginTop: '20px' }}>
        <h4 style={{ color: '#00ffff', fontSize: '14px', marginBottom: '12px' }}>
          <EyeOutlined style={{ marginRight: '8px' }} />
          当前监控
        </h4>
        {currentStudent ? (
          <div>
            <div style={{
              background: 'rgba(0, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '12px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#cccccc', fontSize: '12px' }}>学生ID:</span>
                <span style={{ color: '#00ffff', fontSize: '12px' }}>{currentStudent.id.slice(0, 12)}...</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#cccccc', fontSize: '12px' }}>考试ID:</span>
                <span style={{ color: '#00ffff', fontSize: '12px' }}>{currentStudent.examId.slice(0, 12)}...</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#cccccc', fontSize: '12px' }}>连接时长:</span>
                <span style={{ color: '#00ffff', fontSize: '12px' }}>
                  {currentStudent.duration ? `${Math.floor(currentStudent.duration / 60)}:${(currentStudent.duration % 60).toString().padStart(2, '0')}` : '--'}
                </span>
              </div>
            </div>
            <Button
              danger
              block
              onClick={onDisconnect}
            >
              <i className="fas fa-unlink" style={{ marginRight: '6px' }}></i>
              断开连接
            </Button>
          </div>
        ) : (
          <div style={{ color: '#666', textAlign: 'center', padding: '20px' }}>
            <i className="fas fa-eye-slash" style={{ fontSize: '24px', marginBottom: '8px', display: 'block' }}></i>
            <span style={{ fontSize: '12px' }}>未选择学生</span>
          </div>
        )}
      </div>
    </div>
  );
}
