/**
 * Database seeding script
 * Creates initial data for development and testing
 */

import { PrismaClient } from './generated/client';
import { hashSync } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // ============================================================================
  // 创建测试教师
  // ============================================================================
  const teacher = await prisma.teacher.upsert({
    where: { username: 'T2025001' },
    update: {},
    create: {
      username: 'T2025001',
      email: 'teacher@psychology.test',
      name: '测试教师',
      password: hashSync('123456', 10),
      department: '心理学系',
      title: '教授',
      phoneNumber: '13800000001',
    },
  });

  console.log('✅ Created test teacher:', teacher.username);

  // ============================================================================
  // 创建ASQ青少年压力量表（20题简化版）
  // ============================================================================
  const asqPaper = await prisma.paper.upsert({
    where: { id: 'asq-paper-20' },
    update: {},
    create: {
      id: 'asq-paper-20',
      title: 'ASQ青少年压力量表（简化版）',
      description:
        '用于评估青少年在日常生活中各个领域所承受的压力水平。本版本包含20题，涵盖家庭生活、学业表现、上学出勤、同伴压力等维度。',
      category: '心理评估',
      timeLimit: 30,
      teacherId: teacher.id,
      allowRetake: true,
      showResultsImmediately: true,
      randomizeQuestions: false,
    },
  });

  console.log('✅ Created ASQ paper:', asqPaper.title);

  // ASQ 5点量表选项（A-E，分数1-5）
  const asqOptions = [
    { id: 'a', text: '完全不压力／与我无关', score: 1 },
    { id: 'b', text: '稍微有点压力', score: 2 },
    { id: 'c', text: '中等压力', score: 3 },
    { id: 'd', text: '比较大压力', score: 4 },
    { id: 'e', text: '非常大压力', score: 5 },
  ];

  // ASQ题目（选取20题，覆盖多个维度）
  const asqQuestions = [
    // 家庭生活维度 (7题)
    { id: 'asq-q1', text: '与父亲的意见不合', dimension: '家庭生活' },
    { id: 'asq-q2', text: '父母不把你当回事', dimension: '家庭生活' },
    { id: 'asq-q3', text: '对自己生活缺乏或毫无掌控', dimension: '家庭生活' },
    { id: 'asq-q4', text: '在家遵守琐碎规矩', dimension: '家庭生活' },
    { id: 'asq-q5', text: '父母之间的争执', dimension: '家庭生活' },
    { id: 'asq-q6', text: '与母亲的意见不合', dimension: '家庭生活' },
    { id: 'asq-q7', text: '父母对你期望过高', dimension: '家庭生活' },

    // 学业表现维度 (5题)
    { id: 'asq-q8', text: '需要学习你不理解的内容', dimension: '学业表现' },
    { id: 'asq-q9', text: '老师对你期望过高', dimension: '学业表现' },
    { id: 'asq-q10', text: '跟上学业进度', dimension: '学业表现' },
    { id: 'asq-q11', text: '某些学科的学习困难', dimension: '学业表现' },
    { id: 'asq-q12', text: '学习压力', dimension: '学业表现' },

    // 上学出勤维度 (2题)
    { id: 'asq-q13', text: '早起去上学', dimension: '上学出勤' },
    { id: 'asq-q14', text: '强制性上学规定', dimension: '上学出勤' },

    // 同伴压力维度 (4题)
    { id: 'asq-q15', text: '因不合群而被同伴刁难', dimension: '同伴压力' },
    { id: 'asq-q16', text: '被朋友评头论足', dimension: '同伴压力' },
    { id: 'asq-q17', text: '为融入同龄群体而承受的压力', dimension: '同伴压力' },
    { id: 'asq-q18', text: '对自己外表的满意度', dimension: '同伴压力' },

    // 对未来的不确定感维度 (2题)
    { id: 'asq-q19', text: '对未来的担忧', dimension: '对未来的不确定感' },
    { id: 'asq-q20', text: '必须决定未来工作或教育', dimension: '对未来的不确定感' },
  ];

  for (let i = 0; i < asqQuestions.length; i++) {
    const q = asqQuestions[i];
    await prisma.question.upsert({
      where: { id: q.id },
      update: {},
      create: {
        id: q.id,
        paperId: asqPaper.id,
        title: q.text,
        dimension: q.dimension, // ✨ 使用独立维度字段
        type: 'SINGLE_CHOICE',
        options: asqOptions,
        order: i + 1,
        points: 5, // 最高分5分
        required: true,
      },
    });
  }

  console.log('✅ Created ASQ questions:', asqQuestions.length);

  // ============================================================================
  // 创建知识测试试卷（演示自定义评分）
  // ============================================================================
  const knowledgePaper = await prisma.paper.upsert({
    where: { id: 'knowledge-test-paper' },
    update: {},
    create: {
      id: 'knowledge-test-paper',
      title: '心理学基础知识测试',
      description: '测试心理学基础概念的理解程度，采用自定义评分系统。',
      category: '知识测试',
      timeLimit: 15,
      teacherId: teacher.id,
      allowRetake: true,
      showResultsImmediately: true,
      randomizeQuestions: false,
    },
  });

  console.log('✅ Created knowledge test paper:', knowledgePaper.title);

  // 知识测试题目（演示不同的评分方式）
  const knowledgeQuestions = [
    {
      id: 'know-q1',
      title: '根据弗洛伊德的人格理论，人格结构包括哪些部分？',
      type: 'SINGLE_CHOICE',
      options: [
        { id: 'a', text: '意识、前意识、潜意识', score: 2 }, // 部分正确
        { id: 'b', text: '本我、自我、超我', score: 10 }, // 完全正确
        { id: 'c', text: '感觉、知觉、记忆', score: 0 }, // 错误
        { id: 'd', text: '思维、情感、意志', score: 0 }, // 错误
      ],
      points: 10,
      order: 1,
    },
    {
      id: 'know-q2',
      title: '以下哪些因素会影响记忆效果？（可多选）',
      type: 'MULTIPLE_CHOICE',
      options: [
        { id: 'a', text: '注意力集中程度', score: 3 }, // 正确
        { id: 'b', text: '情绪状态', score: 3 }, // 正确
        { id: 'c', text: '复习策略', score: 3 }, // 正确
        { id: 'd', text: '鞋子的颜色', score: -2 }, // 错误（负分）
      ],
      points: 9, // 注意：全选正确得9分，但选了d会扣分
      order: 2,
    },
    {
      id: 'know-q3',
      title: '斯金纳的操作条件反射理论中，"强化"的类型包括哪些？（可多选）',
      type: 'MULTIPLE_CHOICE',
      options: [
        { id: 'a', text: '正强化', score: 4 }, // 正确
        { id: 'b', text: '负强化', score: 4 }, // 正确
        { id: 'c', text: '惩罚', score: 2 }, // 相关但不完全准确
        { id: 'd', text: '消退', score: 1 }, // 相关但不是强化类型
      ],
      points: 8, // 最佳答案a+b=8分，但允许超分（全选得11分）
      order: 3,
    },
  ];

  for (const questionData of knowledgeQuestions) {
    await prisma.question.upsert({
      where: { id: questionData.id },
      update: {},
      create: {
        ...questionData,
        paperId: knowledgePaper.id,
      },
    });
  }

  console.log('✅ Created knowledge test questions:', knowledgeQuestions.length);

  // ============================================================================
  // 创建示例学生
  // ============================================================================
  const students = [
    {
      participantId: 'S2025001',
      name: '张三',
      email: 'zhangsan@student.test',
      grade: '2024级',
      class: '心理学1班',
      studentId: '20240001',
    },
    {
      participantId: 'S2025002',
      name: '李四',
      email: 'lisi@student.test',
      grade: '2024级',
      class: '心理学1班',
      studentId: '20240002',
    },
    {
      participantId: 'S2025003',
      name: '王五',
      email: 'wangwu@student.test',
      grade: '2024级',
      class: '心理学2班',
      studentId: '20240003',
    },
  ];

  for (const studentData of students) {
    await prisma.student.upsert({
      where: { participantId: studentData.participantId },
      update: {},
      create: studentData,
    });
  }

  console.log('✅ Created sample students:', students.length);

  // ============================================================================
  // 创建系统配置
  // ============================================================================
  const configs = [
    {
      key: 'system.max_exam_duration',
      value: 180, // 3 hours in minutes
      description: '考试最大时长限制（分钟）',
    },
    {
      key: 'ai.enable_emotion_analysis',
      value: true,
      description: '是否启用情绪分析',
    },
    {
      key: 'ai.enable_attention_tracking',
      value: true,
      description: '是否启用注意力追踪',
    },
    {
      key: 'security.max_login_attempts',
      value: 5,
      description: '最大登录尝试次数',
    },
    {
      key: 'scoring.allow_negative_points',
      value: true,
      description: '是否允许负分（错误答案扣分）',
    },
    {
      key: 'scoring.allow_over_max',
      value: true,
      description: '是否允许多选题总分超过题目最大分数',
    },
  ];

  for (const config of configs) {
    await prisma.systemConfig.upsert({
      where: { key: config.key },
      update: {},
      create: config,
    });
  }

  console.log('✅ Created system configs:', configs.length);

  // ============================================================================
  // 输出汇总信息
  // ============================================================================
  console.log('\n📊 Seed Data Summary:');
  console.log('  - Teachers: 1');
  console.log('  - Papers: 2 (ASQ量表 + 知识测试)');
  console.log('  - Questions: 23 (ASQ 20题 + 知识测试 3题)');
  console.log('  - Students: 3');
  console.log('  - System Configs: 6');
  console.log('\n💡 Score System Examples:');
  console.log('  - ASQ量表: 5点Likert量表 (1-5分/题, 总分100分)');
  console.log('  - 知识测试单选: 自定义分值 (0/2/10分)');
  console.log('  - 知识测试多选: 允许负分和超分 (-2至11分)');
  console.log('\n🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Database seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
