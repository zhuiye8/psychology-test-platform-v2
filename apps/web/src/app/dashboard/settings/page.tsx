'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import {
  Card,
  Form,
  Input,
  Button,
  Switch,
  Select,
  InputNumber,
  Typography,
  Divider,
  App,
  Space,
  Alert,
  Upload,
  Avatar,
  Tabs,
} from 'antd';
import {
  UserOutlined,
  SettingOutlined,
  SecurityScanOutlined,
  BellOutlined,
  SaveOutlined,
  UploadOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from '@ant-design/icons';
import type { UploadProps } from 'antd';

const { Title, Text } = Typography;
const { Password } = Input;
const { TabPane } = Tabs;

interface UserSettings {
  name: string;
  email: string;
  title: string;
  phone: string;
  avatar?: string;
  department?: string;
}

interface SystemSettings {
  enableAI: boolean;
  aiServiceUrl: string;
  maxConcurrentExams: number;
  defaultExamDuration: number;
  enableEmailNotifications: boolean;
  enableSMSNotifications: boolean;
  autoArchiveDays: number;
  maxFileSize: number;
}

interface SecuritySettings {
  enableTwoFactor: boolean;
  sessionTimeout: number;
  maxLoginAttempts: number;
  passwordMinLength: number;
  requirePasswordChange: boolean;
}

export default function SettingsPage() {
  const { message } = App.useApp();

  const { user, updateProfile, updatePassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  // 从user对象初始化用户设置
  const [userSettings, setUserSettings] = useState<UserSettings>({
    name: user?.name || '',
    email: user?.email || '',
    title: user?.title || '',
    phone: user?.phoneNumber || '',
    department: user?.department || '',
  });

  // 当user变化时更新表单数据
  useEffect(() => {
    if (user) {
      setUserSettings({
        name: user.name || '',
        email: user.email || '',
        title: user.title || '',
        phone: user.phoneNumber || '',
        department: user.department || '',
      });
    }
  }, [user]);

  // 初始化系统设置
  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    enableAI: true,
    aiServiceUrl: 'http://localhost:5000',
    maxConcurrentExams: 10,
    defaultExamDuration: 30,
    enableEmailNotifications: true,
    enableSMSNotifications: false,
    autoArchiveDays: 30,
    maxFileSize: 10,
  });

  // 初始化安全设置
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    enableTwoFactor: false,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    requirePasswordChange: false,
  });

  const handleSaveProfile = async (values: UserSettings) => {
    try {
      setLoading(true);
      await updateProfile(values);
      setUserSettings(values);
    } catch (error) {
      // Error handled in AuthProvider
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSystem = async (values: SystemSettings) => {
    try {
      setLoading(true);
      // 这里会调用API保存系统设置
      setSystemSettings(values);
      message.success('系统设置保存成功');
    } catch (error) {
      message.error('保存失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSecurity = async (values: SecuritySettings) => {
    try {
      setLoading(true);
      // 这里会调用API保存安全设置
      setSecuritySettings(values);
      message.success('安全设置保存成功');
    } catch (error) {
      message.error('保存失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (values: { currentPassword: string; newPassword: string }) => {
    try {
      setLoading(true);
      await updatePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      // 清空表单
      // Note: Form.resetFields() will be called in the form component
    } catch (error) {
      // Error handled in AuthProvider
    } finally {
      setLoading(false);
    }
  };

  const uploadProps: UploadProps = {
    name: 'avatar',
    action: '/api/upload/avatar',
    showUploadList: false,
    beforeUpload: (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('只能上传 JPG/PNG 格式的图片!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('图片大小不能超过 2MB!');
      }
      return isJpgOrPng && isLt2M;
    },
    onChange: (info) => {
      if (info.file.status === 'done') {
        message.success('头像上传成功');
        // 更新头像URL
      } else if (info.file.status === 'error') {
        message.error('头像上传失败');
      }
    },
  };

  return (
    <div className="space-y-6">
      <div>
        <Title level={2} className="mb-2">系统设置</Title>
        <p className="text-gray-600">管理个人资料、系统配置和安全设置</p>
      </div>

      <Card>
        <Tabs activeKey={activeTab} onChange={setActiveTab} type="card">
          <TabPane tab={<span><UserOutlined />个人资料</span>} key="profile">
            <div className="max-w-2xl">
              <div className="mb-6 text-center">
                <Avatar size={80} icon={<UserOutlined />} className="mb-4" />
                <div>
                  <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />}>更换头像</Button>
                  </Upload>
                </div>
              </div>

              <Form
                layout="vertical"
                initialValues={userSettings}
                onFinish={handleSaveProfile}
              >
                <Form.Item
                  label="姓名"
                  name="name"
                  rules={[{ required: true, message: '请输入姓名' }]}
                >
                  <Input placeholder="请输入姓名" />
                </Form.Item>

                <Form.Item
                  label="邮箱"
                  name="email"
                  rules={[
                    { required: true, message: '请输入邮箱' },
                    { type: 'email', message: '请输入有效的邮箱地址' }
                  ]}
                >
                  <Input placeholder="请输入邮箱" />
                </Form.Item>

                <Form.Item
                  label="职务"
                  name="title"
                >
                  <Input placeholder="请输入职务" />
                </Form.Item>

                <Form.Item
                  label="手机号"
                  name="phone"
                >
                  <Input placeholder="请输入手机号" />
                </Form.Item>

                <Form.Item
                  label="部门"
                  name="department"
                >
                  <Input placeholder="请输入部门" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    icon={<SaveOutlined />}
                  >
                    保存个人资料
                  </Button>
                </Form.Item>
              </Form>

              <Divider />

              <Title level={4}>修改密码</Title>
              <Form
                layout="vertical"
                onFinish={handleChangePassword}
              >
                <Form.Item
                  label="当前密码"
                  name="currentPassword"
                  rules={[{ required: true, message: '请输入当前密码' }]}
                >
                  <Password 
                    placeholder="请输入当前密码"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>

                <Form.Item
                  label="新密码"
                  name="newPassword"
                  rules={[
                    { required: true, message: '请输入新密码' },
                    { min: 8, message: '密码长度至少8位' }
                  ]}
                >
                  <Password 
                    placeholder="请输入新密码"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>

                <Form.Item
                  label="确认新密码"
                  name="confirmPassword"
                  dependencies={['newPassword']}
                  rules={[
                    { required: true, message: '请确认新密码' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('newPassword') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('两次输入的密码不一致'));
                      },
                    }),
                  ]}
                >
                  <Password 
                    placeholder="请确认新密码"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>

                <Form.Item>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    loading={loading}
                  >
                    修改密码
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </TabPane>

          <TabPane tab={<span><SettingOutlined />系统配置</span>} key="system">
            <div className="max-w-2xl">
              <Form
                layout="vertical"
                initialValues={systemSettings}
                onFinish={handleSaveSystem}
              >
                <Title level={4}>AI分析设置</Title>
                <Form.Item
                  label="启用AI分析"
                  name="enableAI"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>

                <Form.Item
                  label="AI服务地址"
                  name="aiServiceUrl"
                  rules={[{ required: true, message: '请输入AI服务地址' }]}
                >
                  <Input placeholder="http://localhost:5000" />
                </Form.Item>

                <Divider />

                <Title level={4}>考试设置</Title>
                <Form.Item
                  label="最大并发考试数"
                  name="maxConcurrentExams"
                  rules={[{ required: true, message: '请设置最大并发考试数' }]}
                >
                  <InputNumber min={1} max={100} className="w-full" />
                </Form.Item>

                <Form.Item
                  label="默认考试时长（分钟）"
                  name="defaultExamDuration"
                  rules={[{ required: true, message: '请设置默认考试时长' }]}
                >
                  <InputNumber min={5} max={180} className="w-full" />
                </Form.Item>

                <Form.Item
                  label="自动归档天数"
                  name="autoArchiveDays"
                  rules={[{ required: true, message: '请设置自动归档天数' }]}
                >
                  <InputNumber min={1} max={365} className="w-full" />
                </Form.Item>

                <Form.Item
                  label="最大文件大小（MB）"
                  name="maxFileSize"
                  rules={[{ required: true, message: '请设置最大文件大小' }]}
                >
                  <InputNumber min={1} max={100} className="w-full" />
                </Form.Item>

                <Divider />

                <Title level={4}>通知设置</Title>
                <Form.Item
                  label="启用邮件通知"
                  name="enableEmailNotifications"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>

                <Form.Item
                  label="启用短信通知"
                  name="enableSMSNotifications"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>

                <Form.Item>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    loading={loading}
                    icon={<SaveOutlined />}
                  >
                    保存系统设置
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </TabPane>

          <TabPane tab={<span><SecurityScanOutlined />安全设置</span>} key="security">
            <div className="max-w-2xl">
              <Alert
                message="安全提醒"
                description="为了账户安全，建议启用双因子认证并定期修改密码。"
                type="info"
                showIcon
                className="mb-6"
              />

              <Form
                layout="vertical"
                initialValues={securitySettings}
                onFinish={handleSaveSecurity}
              >
                <Title level={4}>认证设置</Title>
                <Form.Item
                  label="启用双因子认证"
                  name="enableTwoFactor"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>

                <Form.Item
                  label="会话超时时间（分钟）"
                  name="sessionTimeout"
                  rules={[{ required: true, message: '请设置会话超时时间' }]}
                >
                  <InputNumber min={5} max={120} className="w-full" />
                </Form.Item>

                <Divider />

                <Title level={4}>密码策略</Title>
                <Form.Item
                  label="密码最小长度"
                  name="passwordMinLength"
                  rules={[{ required: true, message: '请设置密码最小长度' }]}
                >
                  <InputNumber min={6} max={20} className="w-full" />
                </Form.Item>

                <Form.Item
                  label="强制定期修改密码"
                  name="requirePasswordChange"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>

                <Divider />

                <Title level={4}>登录安全</Title>
                <Form.Item
                  label="最大登录失败次数"
                  name="maxLoginAttempts"
                  rules={[{ required: true, message: '请设置最大登录失败次数' }]}
                >
                  <InputNumber min={3} max={10} className="w-full" />
                </Form.Item>

                <Form.Item>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    loading={loading}
                    icon={<SaveOutlined />}
                  >
                    保存安全设置
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
}