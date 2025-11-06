/**
 * Database seeding script
 * Creates initial data for development and testing
 */

import { PrismaClient } from './generated/client';
import { hashSync } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create test teacher
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

  // Create sample paper
  const paper = await prisma.paper.upsert({
    where: { id: 'sample-paper-id' },
    update: {},
    create: {
      id: 'sample-paper-id',
      title: '心理健康评估量表',
      description: '用于评估学生心理健康状况的标准化量表',
      category: '心理评估',
      timeLimit: 30,
      teacherId: teacher.id,
      allowRetake: false,
      showResultsImmediately: true,
      randomizeQuestions: false,
    },
  });

  console.log('✅ Created sample paper:', paper.title);

  // Create sample questions
  const questions = [
    {
      id: 'q1',
      title: '您最近一周的心情如何？',
      type: 'SINGLE_CHOICE',
      options: [
        { id: 'a', text: '非常好', isCorrect: false },
        { id: 'b', text: '比较好', isCorrect: false },
        { id: 'c', text: '一般', isCorrect: false },
        { id: 'd', text: '比较差', isCorrect: false },
        { id: 'e', text: '非常差', isCorrect: false },
      ],
      order: 1,
      points: 1,
    },
    {
      id: 'q2', 
      title: '您觉得自己有以下哪些情况？（可多选）',
      type: 'MULTIPLE_CHOICE',
      options: [
        { id: 'a', text: '注意力难以集中', isCorrect: false },
        { id: 'b', text: '容易感到疲劳', isCorrect: false },
        { id: 'c', text: '睡眠质量不好', isCorrect: false },
        { id: 'd', text: '情绪波动较大', isCorrect: false },
        { id: 'e', text: '以上都没有', isCorrect: false },
      ],
      order: 2,
      points: 1,
    },
    {
      id: 'q3',
      title: '请简述您认为影响心理健康的主要因素。',
      type: 'TEXT',
      order: 3,
      points: 2,
    },
  ];

  for (const questionData of questions) {
    await prisma.question.upsert({
      where: { id: questionData.id },
      update: {},
      create: {
        ...questionData,
        paperId: paper.id,
        options: questionData.options,
      },
    });
  }

  console.log('✅ Created sample questions:', questions.length);

  // Create sample students
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
  ];

  for (const studentData of students) {
    await prisma.student.upsert({
      where: { participantId: studentData.participantId },
      update: {},
      create: studentData,
    });
  }

  console.log('✅ Created sample students:', students.length);

  // Create system config
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
  ];

  for (const config of configs) {
    await prisma.systemConfig.upsert({
      where: { key: config.key },
      update: {},
      create: config,
    });
  }

  console.log('✅ Created system configs:', configs.length);

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Database seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });