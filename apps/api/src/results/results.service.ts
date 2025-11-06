import { Injectable, NotFoundException, ForbiddenException, BadRequestException, StreamableFile, Logger } from '@nestjs/common';
import { PassThrough } from 'stream';
import { DatabaseService } from '../database/database.service';
import { StartExamDto, SubmitAnswerDto, SubmitExamDto, QueryResultsDto } from './dto';
import * as ExcelJS from 'exceljs';

@Injectable()
export class ResultsService {
  private readonly logger = new Logger(ResultsService.name);

  constructor(private readonly db: DatabaseService) {}

  // ===== Student Endpoints (Public) =====

  async startExam(examId: string, startExamDto: StartExamDto, ipAddress?: string, userAgent?: string) {
    const { participantId, participantName, accessCode } = startExamDto;

    // Get exam with paper and questions
    const exam = await this.db.exam.findUnique({
      where: { id: examId, deletedAt: null },
      include: {
        paper: {
          include: {
            questions: {
              where: { deletedAt: null },
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });

    if (!exam) {
      throw new NotFoundException('Exam not found');
    }

    // Validate exam status
    if (exam.status !== 'PUBLISHED') {
      throw new BadRequestException('Exam is not available');
    }

    // Validate time window
    const now = new Date();
    if (now < exam.startTime) {
      throw new BadRequestException('Exam has not started yet');
    }
    if (now > exam.endTime) {
      throw new BadRequestException('Exam has ended');
    }

    // Validate access code
    if (exam.accessCode && exam.accessCode !== accessCode) {
      throw new ForbiddenException('Invalid access code');
    }

    // Validate allowed students
    if (exam.allowedStudents && Array.isArray(exam.allowedStudents)) {
      if (!exam.allowedStudents.includes(participantId)) {
        throw new ForbiddenException('You are not allowed to take this exam');
      }
    }

    // Check if already started (查找未完成的会话，防止并发访问)
    const existingResult = await this.db.examResult.findFirst({
      where: {
        examId,
        participantId,
        isCompleted: false,
      },
      orderBy: { startedAt: 'desc' },
    });

    if (existingResult) {
      // 存在未完成的会话，返回现有结果（防止并发访问）
      return {
        examResult: existingResult,
        questions: exam.paper.questions,
        exam: {
          id: exam.id,
          title: exam.title,
          description: exam.description,
          timeLimit: exam.timeLimit,
          requireCamera: exam.requireCamera,
          requireMicrophone: exam.requireMicrophone,
        },
      };
    }

    // 检查是否达到最大尝试次数（支持重复参加）
    const completedCount = await this.db.examResult.count({
      where: { examId, participantId, isCompleted: true },
    });

    if (completedCount >= exam.maxAttempts) {
      throw new BadRequestException(
        `Maximum attempts (${exam.maxAttempts}) reached for this exam`,
      );
    }

    // Calculate max score
    const maxScore = exam.paper.questions.reduce((sum, q) => sum + q.points, 0);

    // Create new exam result
    const examResult = await this.db.examResult.create({
      data: {
        examId,
        participantId,
        participantName,
        startedAt: new Date(),
        ipAddress,
        userAgent,
        maxScore,
      },
    });

    // Return standardized response format
    return {
      examResult,
      questions: exam.paper.questions,
      exam: {
        id: exam.id,
        title: exam.title,
        description: exam.description,
        timeLimit: exam.timeLimit,
        requireCamera: exam.requireCamera,
        requireMicrophone: exam.requireMicrophone,
      },
    };
  }

  async submitAnswer(examResultId: string, submitAnswerDto: SubmitAnswerDto) {
    const {
      questionId,
      selectedOptions,
      textAnswer,
      questionDisplayedAt,
      firstInteractionAt,
      lastModifiedAt,
      totalViewTime,
      interactionCount,
      hesitationScore,
    } = submitAnswerDto;

    // Verify exam result exists and is not completed
    const examResult = await this.db.examResult.findUnique({
      where: { id: examResultId },
      include: {
        exam: {
          include: {
            paper: {
              include: {
                questions: { where: { deletedAt: null } },
              },
            },
          },
        },
      },
    });

    if (!examResult) {
      throw new NotFoundException('Exam result not found');
    }

    if (examResult.isCompleted) {
      throw new BadRequestException('Exam already submitted');
    }

    // Find question
    const question = examResult.exam.paper.questions.find(q => q.id === questionId);
    if (!question) {
      throw new NotFoundException('Question not found in this exam');
    }

    // Auto-score if possible
    let isCorrect: boolean | null = null;
    let points = 0;

    if (question.type === 'SINGLE_CHOICE' || question.type === 'MULTIPLE_CHOICE') {
      const correctOptions = (question.options as any[])
        ?.filter(opt => opt.isCorrect)
        .map(opt => opt.id) || [];

      if (selectedOptions) {
        const selectedSet = new Set(selectedOptions);
        const correctSet = new Set(correctOptions);

        isCorrect = selectedSet.size === correctSet.size &&
          [...selectedSet].every(opt => correctSet.has(opt));

        if (isCorrect) {
          points = question.points;
        }
      }
    }
    // TEXT and ESSAY questions: isCorrect = null, need manual grading

    // Upsert answer
    return this.db.answer.upsert({
      where: {
        examResultId_questionId: { examResultId, questionId },
      },
      create: {
        examResultId,
        questionId,
        selectedOptions: selectedOptions as any,
        textAnswer,
        isCorrect,
        points,
        // ⭐ Answer timing fields (for AI analysis correlation)
        questionDisplayedAt: questionDisplayedAt ? new Date(questionDisplayedAt) : undefined,
        firstInteractionAt: firstInteractionAt ? new Date(firstInteractionAt) : undefined,
        lastModifiedAt: lastModifiedAt ? new Date(lastModifiedAt) : undefined,
        totalViewTime,
        interactionCount: interactionCount || 0,
        hesitationScore,
      },
      update: {
        selectedOptions: selectedOptions as any,
        textAnswer,
        isCorrect,
        points,
        answeredAt: new Date(),  // 记录最后修改时间
        // ⭐ Update timing fields on subsequent saves
        lastModifiedAt: lastModifiedAt ? new Date(lastModifiedAt) : new Date(),
        totalViewTime,
        interactionCount: interactionCount || 0,
        hesitationScore,
      },
    });
  }

  async submitExam(examResultId: string, submitExamDto: SubmitExamDto) {
    // ✅ 使用事务确保原子性和幂等性
    const result = await this.db.$transaction(async (tx) => {
      // 1. 检查考试结果是否存在
      const examResult = await tx.examResult.findUnique({
        where: { id: examResultId },
      });

      if (!examResult) {
        throw new NotFoundException('Exam result not found');
      }

      // 2. ✅ 幂等性检查：如果已完成，直接返回现有结果
      if (examResult.isCompleted) {
        this.logger.log(`[submitExam] 检测到已提交，返回现有结果: ${examResultId}`);
        return await tx.examResult.findUnique({
          where: { id: examResultId },
          include: {
            answers: {
              include: {
                question: true,
              },
            },
          },
        });
      }

      // 3. 提交所有答案
      for (const answer of submitExamDto.answers) {
        await this.submitAnswer(examResultId, answer);
      }

      // 4. 获取所有答案计算总分
      const answers = await tx.answer.findMany({
        where: { examResultId },
      });

      const totalScore = answers.reduce((sum, a) => sum + a.points, 0);

      const percentage = examResult.maxScore > 0
        ? (totalScore / examResult.maxScore) * 100
        : 0;

      const timeSpent = Math.floor(
        (new Date().getTime() - examResult.startedAt.getTime()) / 1000
      );

      // 5. ✅ CAS更新：仅当isCompleted=false时才更新
      const updated = await tx.examResult.updateMany({
        where: {
          id: examResultId,
          isCompleted: false,  // ⭐ 关键条件：CAS模式
        },
        data: {
          isCompleted: true,
          submittedAt: new Date(),
          totalScore,
          percentage,
          timeSpent,
        },
      });

      if (updated.count === 0) {
        // 并发冲突：其他请求已经完成了提交
        this.logger.warn(`[submitExam] 并发冲突：考试已被其他请求提交: ${examResultId}`);
        return await tx.examResult.findUnique({
          where: { id: examResultId },
          include: {
            answers: {
              include: {
                question: true,
              },
            },
          },
        });
      }

      // 6. 更新AI会话状态
      await tx.aiSession.updateMany({
        where: { examResultId },
        data: {
          status: 'COMPLETED',
          endTime: new Date(),
        },
      });

      // 7. 返回更新后的结果
      return await tx.examResult.findUnique({
        where: { id: examResultId },
        include: {
          answers: {
            include: {
              question: true,
            },
          },
        },
      });
    });

    this.logger.log(`[submitExam] ✅ 考试提交成功: ${examResultId}`);
    return result;
  }

  // ===== Teacher Endpoints =====

  async findAll(teacherId: string, query: QueryResultsDto = {}) {
    const { page = 1, limit = 20, examId, search, isCompleted, sortBy = 'startedAt', sortOrder = 'desc' } = query;
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {
      deletedAt: null,
      exam: {
        teacherId,
        deletedAt: null,
      },
      ...(examId && { examId }),
      ...(search && {
        OR: [
          { participantName: { contains: search, mode: 'insensitive' as const } },
          { participantId: { contains: search, mode: 'insensitive' as const } },
        ],
      }),
      ...(isCompleted !== undefined && { isCompleted }),
    };

    // 构建动态排序
    const orderByMap: Record<string, string> = {
      score: 'totalScore',
      timeSpent: 'timeSpent',
      submittedAt: 'submittedAt',
      startedAt: 'startedAt',
    };
    const orderByField = orderByMap[sortBy] || 'startedAt';
    const orderBy: any = { [orderByField]: sortOrder };

    const [results, total] = await Promise.all([
      this.db.examResult.findMany({
        where,
        include: {
          exam: { select: { id: true, title: true } },
          _count: { select: { answers: true } },
        },
        orderBy,
        skip,
        take: limit,
      }),
      this.db.examResult.count({ where }),
    ]);

    return {
      data: results,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string, teacherId: string) {
    const result = await this.db.examResult.findUnique({
      where: { id, deletedAt: null },
      include: {
        exam: {
          include: {
            paper: {
              include: {
                questions: {
                  where: { deletedAt: null },
                  orderBy: { order: 'asc' },
                },
              },
            },
          },
        },
        answers: {
          include: {
            question: true,
          },
        },
        student: true,
      },
    });

    if (!result) {
      throw new NotFoundException('Result not found');
    }

    if (result.exam.teacherId !== teacherId) {
      throw new ForbiddenException('Access denied');
    }

    return result;
  }

  async updateScore(id: string, teacherId: string, questionId: string, points: number, isCorrect: boolean) {
    // Verify ownership
    const result = await this.findById(id, teacherId);

    // Find answer
    const answer = result.answers.find(a => a.questionId === questionId);
    if (!answer) {
      throw new NotFoundException('Answer not found');
    }

    // Update answer score
    await this.db.answer.update({
      where: { id: answer.id },
      data: { points, isCorrect },
    });

    // Recalculate total score
    const answers = await this.db.answer.findMany({
      where: { examResultId: id },
    });

    const totalScore = answers.reduce((sum, a) => sum + a.points, 0);
    const percentage = result.maxScore > 0
      ? (totalScore / result.maxScore) * 100
      : 0;

    // Update exam result
    return this.db.examResult.update({
      where: { id },
      data: { totalScore, percentage },
    });
  }

  async flagAsInvalid(id: string, teacherId: string) {
    await this.findById(id, teacherId);

    return this.db.examResult.update({
      where: { id },
      data: { isValid: false },
    });
  }

  async delete(id: string, teacherId: string) {
    await this.findById(id, teacherId);

    return this.db.examResult.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  // ===== Statistics =====

  async getStats(teacherId: string, examId?: string) {
    // 如果指定了examId，返回该考试的统计
    if (examId) {
      return this.getExamStatistics(examId, teacherId);
    }

    // 否则返回该教师所有考试的汇总统计
    const results = await this.db.examResult.findMany({
      where: {
        exam: {
          teacherId,
          deletedAt: null,
        },
        deletedAt: null,
      },
      select: {
        id: true,
        participantId: true,
        totalScore: true,
        maxScore: true,
        percentage: true,
        timeSpent: true,
        isCompleted: true,
        submittedAt: true,
      },
    });

    const total = results.length;
    const completed = results.filter(r => r.isCompleted).length;

    // 统计唯一参与者数量
    const uniqueParticipants = new Set(results.map(r => r.participantId)).size;

    const completedResults = results.filter(r => r.isCompleted);
    const averageScore = completed > 0
      ? completedResults.reduce((sum, r) => sum + r.percentage, 0) / completed
      : 0;

    const averageTime = completed > 0
      ? completedResults.filter(r => r.timeSpent).reduce((sum, r) => sum + (r.timeSpent || 0), 0) / completed
      : 0;

    // 分数分布
    const scoreRanges = [
      { range: '0-60', count: 0 },
      { range: '60-70', count: 0 },
      { range: '70-80', count: 0 },
      { range: '80-90', count: 0 },
      { range: '90-100', count: 0 },
    ];

    completedResults.forEach(r => {
      const score = r.percentage;
      if (score < 60) scoreRanges[0].count++;
      else if (score < 70) scoreRanges[1].count++;
      else if (score < 80) scoreRanges[2].count++;
      else if (score < 90) scoreRanges[3].count++;
      else scoreRanges[4].count++;
    });

    return {
      totalResults: total,
      totalParticipants: uniqueParticipants,
      averageScore: Math.round(averageScore * 100) / 100,
      averageTimeSpent: Math.round(averageTime),
      passRate: completed > 0
        ? Math.round((completedResults.filter(r => r.percentage >= 60).length / completed) * 10000) / 100
        : 0,
      scoreDistribution: scoreRanges,
    };
  }

  async getExamStatistics(examId: string, teacherId: string) {
    // Verify exam ownership
    const exam = await this.db.exam.findUnique({
      where: { id: examId, teacherId, deletedAt: null },
    });

    if (!exam) {
      throw new NotFoundException('Exam not found');
    }

    const results = await this.db.examResult.findMany({
      where: { examId, deletedAt: null },
      select: {
        id: true,
        participantName: true,
        participantId: true,
        totalScore: true,
        maxScore: true,
        percentage: true,
        timeSpent: true,
        isCompleted: true,
        submittedAt: true,
      },
    });

    const total = results.length;
    const completed = results.filter(r => r.isCompleted).length;
    const inProgress = total - completed;

    const completedResults = results.filter(r => r.isCompleted);
    const averageScore = completed > 0
      ? completedResults.reduce((sum, r) => sum + r.percentage, 0) / completed
      : 0;

    const averageTime = completed > 0
      ? completedResults.filter(r => r.timeSpent).reduce((sum, r) => sum + (r.timeSpent || 0), 0) / completed
      : 0;

    // Score distribution
    const scoreRanges = {
      '0-60': 0,
      '60-70': 0,
      '70-80': 0,
      '80-90': 0,
      '90-100': 0,
    };

    completedResults.forEach(r => {
      const score = r.percentage;
      if (score < 60) scoreRanges['0-60']++;
      else if (score < 70) scoreRanges['60-70']++;
      else if (score < 80) scoreRanges['70-80']++;
      else if (score < 90) scoreRanges['80-90']++;
      else scoreRanges['90-100']++;
    });

    return {
      examId,
      totalParticipants: total,
      completedParticipants: completed,
      inProgressParticipants: inProgress,
      averageScore: Math.round(averageScore * 100) / 100,
      averageTimeSpent: Math.round(averageTime),
      scoreDistribution: scoreRanges,
      passRate: completed > 0
        ? Math.round((completedResults.filter(r => r.percentage >= 60).length / completed) * 10000) / 100
        : 0,
    };
  }

  // ===== Excel Export =====

  async exportResultsToExcel(teacherId: string, query: QueryResultsDto = {}): Promise<StreamableFile> {
    // 获取results数据（不分页，获取所有数据）
    const { examId, search, isCompleted, sortBy = 'submittedAt', sortOrder = 'desc' } = query;

    const where: any = {
      deletedAt: null,
      exam: {
        teacherId,
        deletedAt: null,
      },
      ...(examId && { examId }),
      ...(search && {
        OR: [
          { participantName: { contains: search, mode: 'insensitive' as const } },
          { participantId: { contains: search, mode: 'insensitive' as const } },
        ],
      }),
      ...(isCompleted !== undefined && { isCompleted }),
    };

    // 构建动态排序
    const orderByMap: Record<string, string> = {
      score: 'totalScore',
      timeSpent: 'timeSpent',
      submittedAt: 'submittedAt',
      startedAt: 'startedAt',
    };
    const orderByField = orderByMap[sortBy] || 'submittedAt';
    const orderBy: any = { [orderByField]: sortOrder };

    const results = await this.db.examResult.findMany({
      where,
      include: {
        exam: {
          select: {
            id: true,
            title: true,
            paper: {
              select: {
                title: true,
              },
            },
          },
        },
      },
      orderBy,
    });

    // 创建Excel工作簿
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('考试结果');

    // 设置列定义
    worksheet.columns = [
      { header: '考试标题', key: 'examTitle', width: 30 },
      { header: '试卷名称', key: 'paperTitle', width: 25 },
      { header: '学号', key: 'participantId', width: 15 },
      { header: '姓名', key: 'participantName', width: 15 },
      { header: '总分', key: 'totalScore', width: 10 },
      { header: '满分', key: 'maxScore', width: 10 },
      { header: '正确率(%)', key: 'percentage', width: 12 },
      { header: '用时(秒)', key: 'timeSpent', width: 12 },
      { header: '开始时间', key: 'startedAt', width: 20 },
      { header: '提交时间', key: 'submittedAt', width: 20 },
      { header: '状态', key: 'status', width: 10 },
    ];

    // 设置表头样式
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE0E0E0' },
    };

    // 添加数据行
    results.forEach((result) => {
      worksheet.addRow({
        examTitle: result.exam?.title || '',
        paperTitle: result.exam?.paper?.title || '',
        participantId: result.participantId,
        participantName: result.participantName,
        totalScore: result.totalScore || 0,
        maxScore: result.maxScore || 0,
        percentage: result.percentage ? result.percentage.toFixed(2) : '0.00',
        timeSpent: result.timeSpent || 0,
        startedAt: result.startedAt ? new Date(result.startedAt).toLocaleString('zh-CN') : '',
        submittedAt: result.submittedAt ? new Date(result.submittedAt).toLocaleString('zh-CN') : '',
        status: result.isCompleted ? '已完成' : '进行中',
      });
    });

    // 生成Excel Buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // 使用PassThrough stream包装Buffer
    const stream = new PassThrough();
    stream.end(buffer);

    // 返回StreamableFile
    return new StreamableFile(stream, {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      disposition: `attachment; filename="exam-results-${Date.now()}.xlsx"`,
    });
  }

  /**
   * 清理考试会话
   *
   * 两种清理模式：
   * - 未完成考试：删除ExamResult和所有关联数据（Answer、AI会话）
   * - 已完成考试：仅删除AI会话数据，保留ExamResult和Answer
   *
   * 用于：大屏断开、提交失败、学生离开页签
   */
  async cleanupExamSession(examResultId: string) {
    const examResult = await this.db.examResult.findUnique({
      where: { id: examResultId },
    });

    if (!examResult) {
      return { success: true, message: 'Already cleaned' };
    }

    // ✅ 修复竞态条件：已完成考试的AI session必须保留！
    // 原因：
    // 1. AI服务在后台异步计算聚合数据（需要1-2秒）
    // 2. 如果立即删除session，保存aggregate时会触发Foreign Key约束错误
    // 3. Session是AI分析的元数据，应该永久保留供后续查询
    if (examResult.isCompleted) {
      // 已完成考试：不删除AI session，仅返回成功（幂等性）
      this.logger.log(`[cleanupExamSession] 已完成考试，保留AI session: ${examResultId}`);

      return {
        success: true,
        message: 'Completed exam cleanup skipped (AI session preserved)',
        examResultDeleted: false
      };
    }

    // 未完成考试：删除全部数据
    this.logger.log(`[cleanupExamSession] 清理未完成考试的所有数据: ${examResultId}`);

    // 1. 删除关联的AI会话（如果存在）
    await this.db.aiSession.deleteMany({
      where: { examResultId },
    });

    // 2. 删除ExamResult（级联删除Answer）
    await this.db.examResult.delete({
      where: { id: examResultId },
    });

    return {
      success: true,
      message: 'Session cleaned',
      examResultDeleted: true
    };
  }
}
