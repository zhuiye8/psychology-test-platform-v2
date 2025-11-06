'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  App,
  Popconfirm,
  Tag,
  Statistic,
  Row,
  Col,
  Avatar,
  Input,
  Select,
  Modal,
  Form,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  KeyOutlined,
  UserOutlined,
  ReloadOutlined,
  TeamOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

// 组件和服务导入
import { PageHeader } from '@/components/ui-kit';
import teachersApi, {
  type Teacher,
  type TeacherStats,
  type CreateTeacherDto,
  type UpdateTeacherDto,
  type ResetPasswordDto,
} from '@/services/teachers';

const { Search } = Input;

// ============================================================================
// 主组件
// ============================================================================

export default function TeachersPage() {
  const { message } = App.useApp();

  // --------------------------------------------------------------------------
  // State 状态管理
  // --------------------------------------------------------------------------

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [stats, setStats] = useState<TeacherStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  // 搜索和筛选
  const [searchValue, setSearchValue] = useState('');
  const [statusFilter, setStatusFilter] = useState<boolean | undefined>();

  // 模态框状态
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [resetPasswordModalVisible, setResetPasswordModalVisible] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState<Teacher | null>(null);

  // 表单实例
  const [createForm] = Form.useForm<CreateTeacherDto>();
  const [editForm] = Form.useForm<UpdateTeacherDto>();
  const [resetPasswordForm] = Form.useForm<ResetPasswordDto>();

  // --------------------------------------------------------------------------
  // 数据加载函数
  // --------------------------------------------------------------------------

  /** 加载教师列表 */
  const loadTeachers = async (page = 1, pageSize = 10) => {
    try {
      setLoading(true);
      const response = await teachersApi.findAll({
        page,
        limit: pageSize,
        search: searchValue || undefined,
        is_active: statusFilter,
      });

      setTeachers(response.data);
      setPagination({
        current: page,
        pageSize,
        total: response.meta.total,
      });
    } catch (error) {
      message.error('加载教师列表失败');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /** 加载统计数据 */
  const loadStats = async () => {
    try {
      const statsData = await teachersApi.getStatistics();
      setStats(statsData);
    } catch (error) {
      console.error('加载统计信息失败:', error);
    }
  };

  // --------------------------------------------------------------------------
  // 生命周期 Effects
  // --------------------------------------------------------------------------

  /** 初始化加载 */
  useEffect(() => {
    loadTeachers();
    loadStats();
  }, [searchValue, statusFilter]);

  // --------------------------------------------------------------------------
  // 事件处理函数
  // --------------------------------------------------------------------------

  /** 创建教师 */
  const handleCreateTeacher = async (values: CreateTeacherDto) => {
    try {
      await teachersApi.create(values);
      message.success('创建教师账户成功');
      setCreateModalVisible(false);
      createForm.resetFields();
      loadTeachers(pagination.current, pagination.pageSize);
      loadStats();
    } catch (error: any) {
      message.error(error.response?.data?.message || '创建教师账户失败');
    }
  };

  /** 更新教师 */
  const handleUpdateTeacher = async (values: UpdateTeacherDto) => {
    if (!currentTeacher) return;

    try {
      await teachersApi.update(currentTeacher.id, values);
      message.success('更新教师信息成功');
      setEditModalVisible(false);
      editForm.resetFields();
      setCurrentTeacher(null);
      loadTeachers(pagination.current, pagination.pageSize);
      loadStats();
    } catch (error: any) {
      message.error(error.response?.data?.message || '更新教师信息失败');
    }
  };

  /** 删除教师 */
  const handleDeleteTeacher = async (teacher: Teacher) => {
    try {
      await teachersApi.delete(teacher.id);
      message.success('删除教师账户成功');
      loadTeachers(pagination.current, pagination.pageSize);
      loadStats();
    } catch (error: any) {
      message.error(error.response?.data?.message || '删除教师账户失败');
    }
  };

  /** 重置密码 */
  const handleResetPassword = async (values: ResetPasswordDto) => {
    if (!currentTeacher) return;

    try {
      await teachersApi.resetPassword(currentTeacher.id, values);
      message.success('重置密码成功');
      setResetPasswordModalVisible(false);
      resetPasswordForm.resetFields();
      setCurrentTeacher(null);
    } catch (error: any) {
      message.error(error.response?.data?.message || '重置密码失败');
    }
  };

  /** 打开编辑模态框 */
  const handleEditClick = (teacher: Teacher) => {
    setCurrentTeacher(teacher);
    editForm.setFieldsValue({
      name: teacher.name,
      email: teacher.email,
      phone_number: teacher.phoneNumber,
      department: teacher.department,
      title: teacher.title,
      is_active: teacher.isActive,
    });
    setEditModalVisible(true);
  };

  /** 打开重置密码模态框 */
  const handleResetPasswordClick = (teacher: Teacher) => {
    setCurrentTeacher(teacher);
    setResetPasswordModalVisible(true);
  };

  // --------------------------------------------------------------------------
  // 表格列定义
  // --------------------------------------------------------------------------

  const columns: ColumnsType<Teacher> = [
    {
      title: '教师信息',
      key: 'teacher',
      render: (_, record) => (
        <Space>
          <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
          <div>
            <div className="font-medium">{record.name}</div>
            <div className="text-xs text-gray-500">用户名: {record.username}</div>
          </div>
        </Space>
      ),
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
      render: (text) => text || '-',
    },
    {
      title: '职称',
      dataIndex: 'title',
      key: 'title',
      render: (text) => text || '-',
    },
    {
      title: '状态',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) => (
        <Tag
          icon={<CheckCircleOutlined />}
          color={isActive ? 'success' : 'error'}
        >
          {isActive ? '启用' : '禁用'}
        </Tag>
      ),
    },
    {
      title: '数据统计',
      key: 'stats',
      render: (_, record) => (
        <div className="text-xs text-gray-600">
          <div>试卷: {record._count?.papers || 0}</div>
          <div>考试: {record._count?.exams || 0}</div>
        </div>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString('zh-CN'),
    },
    {
      title: '操作',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEditClick(record)}
            size="small"
          >
            编辑
          </Button>
          <Button
            type="text"
            icon={<KeyOutlined />}
            onClick={() => handleResetPasswordClick(record)}
            size="small"
          >
            重置密码
          </Button>
          <Popconfirm
            title="确定删除这个教师账户吗？"
            description="删除后无法恢复，请谨慎操作"
            onConfirm={() => handleDeleteTeacher(record)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="text" danger icon={<DeleteOutlined />} size="small">
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // --------------------------------------------------------------------------
  // 渲染 JSX
  // --------------------------------------------------------------------------

  return (
    <div className="space-y-6">
      {/* 页面头部 */}
      <PageHeader
        title="教师管理"
        description="管理教师账户、权限和数据"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setCreateModalVisible(true)}
            size="large"
          >
            添加教师
          </Button>
        }
      />

      {/* 统计卡片 */}
      {stats && (
        <Row gutter={16}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="总教师数"
                value={stats.totalTeachers}
                prefix={<TeamOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="启用账户"
                value={stats.activeTeachers}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="禁用账户"
                value={stats.inactiveTeachers}
                valueStyle={{ color: '#cf1322' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="近7天新增"
                value={stats.recentlyCreated}
                prefix={<PlusOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
        </Row>
      )}

      {/* 操作栏 */}
      <Card size="small">
        <Space size="middle">
          <Search
            placeholder="搜索教师姓名、用户名或邮箱"
            style={{ width: 300 }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            prefix={<SearchOutlined />}
            allowClear
          />
          <Select
            placeholder="全部状态"
            style={{ width: 120 }}
            value={statusFilter}
            onChange={setStatusFilter}
            allowClear
          >
            <Select.Option value={true}>启用</Select.Option>
            <Select.Option value={false}>禁用</Select.Option>
          </Select>
          <Button
            icon={<ReloadOutlined />}
            onClick={() => loadTeachers(pagination.current, pagination.pageSize)}
          >
            刷新
          </Button>
        </Space>
      </Card>

      {/* 教师列表表格 */}
      <Card>
        <Table
          columns={columns}
          dataSource={teachers}
          rowKey="id"
          loading={loading}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
            onChange: (page, pageSize) => {
              loadTeachers(page, pageSize);
            },
          }}
        />
      </Card>

      {/* 创建教师模态框 */}
      <Modal
        title="添加教师"
        open={createModalVisible}
        onCancel={() => {
          setCreateModalVisible(false);
          createForm.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form
          form={createForm}
          layout="vertical"
          onFinish={handleCreateTeacher}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="username"
                label="用户名"
                rules={[
                  { required: true, message: '请输入用户名' },
                  { pattern: /^[a-zA-Z0-9_]+$/, message: '只能包含字母、数字和下划线' },
                ]}
              >
                <Input placeholder="如: teacher001" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="name"
                label="教师姓名"
                rules={[{ required: true, message: '请输入教师姓名' }]}
              >
                <Input placeholder="请输入教师姓名" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="邮箱"
                rules={[
                  { required: true, message: '请输入邮箱' },
                  { type: 'email', message: '请输入有效的邮箱地址' },
                ]}
              >
                <Input placeholder="teacher@example.com" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="password"
                label="初始密码"
                rules={[
                  { required: true, message: '请输入初始密码' },
                  { min: 6, message: '密码长度至少6位' },
                ]}
              >
                <Input.Password placeholder="请输入初始密码" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="phone_number" label="手机号">
                <Input placeholder="请输入手机号" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="department" label="部门">
                <Input placeholder="请输入部门" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="title" label="职称">
            <Input placeholder="请输入职称" />
          </Form.Item>
          <div className="text-right">
            <Space>
              <Button
                onClick={() => {
                  setCreateModalVisible(false);
                  createForm.resetFields();
                }}
              >
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                创建
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>

      {/* 编辑教师模态框 */}
      <Modal
        title="编辑教师信息"
        open={editModalVisible}
        onCancel={() => {
          setEditModalVisible(false);
          editForm.resetFields();
          setCurrentTeacher(null);
        }}
        footer={null}
        width={600}
      >
        <Form form={editForm} layout="vertical" onFinish={handleUpdateTeacher}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="教师姓名"
                rules={[{ required: true, message: '请输入教师姓名' }]}
              >
                <Input placeholder="请输入教师姓名" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="邮箱"
                rules={[
                  { required: true, message: '请输入邮箱' },
                  { type: 'email', message: '请输入有效的邮箱地址' },
                ]}
              >
                <Input placeholder="teacher@example.com" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="phone_number" label="手机号">
                <Input placeholder="请输入手机号" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="department" label="部门">
                <Input placeholder="请输入部门" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="title" label="职称">
                <Input placeholder="请输入职称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="is_active" label="账户状态" valuePropName="checked">
                <Select>
                  <Select.Option value={true}>启用</Select.Option>
                  <Select.Option value={false}>禁用</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="password"
            label="新密码（选填）"
            rules={[{ min: 6, message: '密码长度至少6位' }]}
          >
            <Input.Password placeholder="留空则不修改密码" />
          </Form.Item>
          <div className="text-right">
            <Space>
              <Button
                onClick={() => {
                  setEditModalVisible(false);
                  editForm.resetFields();
                  setCurrentTeacher(null);
                }}
              >
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>

      {/* 重置密码模态框 */}
      <Modal
        title="重置密码"
        open={resetPasswordModalVisible}
        onCancel={() => {
          setResetPasswordModalVisible(false);
          resetPasswordForm.resetFields();
          setCurrentTeacher(null);
        }}
        footer={null}
        width={400}
      >
        <Form
          form={resetPasswordForm}
          layout="vertical"
          onFinish={handleResetPassword}
        >
          <Form.Item
            name="new_password"
            label="新密码"
            rules={[
              { required: true, message: '请输入新密码' },
              { min: 6, message: '密码长度至少6位' },
            ]}
          >
            <Input.Password placeholder="请输入新密码" />
          </Form.Item>
          <div className="text-right">
            <Space>
              <Button
                onClick={() => {
                  setResetPasswordModalVisible(false);
                  resetPasswordForm.resetFields();
                  setCurrentTeacher(null);
                }}
              >
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                重置
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
