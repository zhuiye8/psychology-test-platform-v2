import { Injectable, NotFoundException, ForbiddenException, BadRequestException, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DatabaseService } from '../database/database.service';
import { CreateExamDto, UpdateExamDto, QueryExamsDto, ExamStatus } from './dto';

@Injectable()
export class ExamsService {
  private readonly logger = new Logger(ExamsService.name);

  constructor(private readonly db: DatabaseService) {}

  async findAll(teacherId: string, query: QueryExamsDto = {}) {
    const { page = 1, limit = 20, search, status, paperId } = query;
    const skip = (page - 1) * limit;

    const where = {
      teacherId,
      deletedAt: null,
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' as const } },
          { description: { contains: search, mode: 'insensitive' as const } },
        ],
      }),
      ...(status && { status }),
      ...(paperId && { paperId }),
    };

    const [exams, total] = await Promise.all([
      this.db.exam.findMany({
        where,
        include: {
          paper: { select: { id: true, title: true } },
          _count: { select: { examResults: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.db.exam.count({ where }),
    ]);

    return {
      data: exams,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string, teacherId: string) {
    const exam = await this.db.exam.findUnique({
      where: { id, deletedAt: null },
      include: {
        paper: {
          include: {
            questions: {
              where: { deletedAt: null },
              orderBy: { order: 'asc' },
            },
          },
        },
        teacher: { select: { id: true, name: true } },
        _count: { select: { examResults: true } },
      },
    });

    if (!exam) {
      throw new NotFoundException('Exam not found');
    }

    if (exam.teacherId !== teacherId) {
      throw new ForbiddenException('Access denied');
    }

    return exam;
  }

  async create(teacherId: string, createExamDto: CreateExamDto) {
    const { paperId, allowedStudents, ...examData } = createExamDto;

    // Verify paper exists and belongs to teacher, and fetch all questions
    const paper = await this.db.paper.findUnique({
      where: { id: paperId, deletedAt: null },
      include: {
        questions: {
          where: { deletedAt: null },
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!paper) {
      throw new NotFoundException('Paper not found');
    }

    if (paper.teacherId !== teacherId) {
      throw new ForbiddenException('Access denied to this paper');
    }

    // Validate exam has questions
    if (!paper.questions || paper.questions.length === 0) {
      throw new BadRequestException('Cannot create exam from paper without questions');
    }

    // Validate dates
    const startTime = new Date(examData.startTime);
    const endTime = new Date(examData.endTime);

    if (endTime <= startTime) {
      throw new BadRequestException('End time must be after start time');
    }

    // ✨ Create snapshots (independent copy for this exam)
    const paperSnapshot = {
      id: paper.id,
      title: paper.title,
      description: paper.description,
      category: paper.category,
      timeLimit: paper.timeLimit,
      allowRetake: paper.allowRetake,
      showResultsImmediately: paper.showResultsImmediately,
      randomizeQuestions: paper.randomizeQuestions,
    };

    const questionsSnapshot = paper.questions.map((q) => ({
      id: q.id,
      title: q.title,
      description: q.description,
      dimension: q.dimension, // ✨ 维度字段（用于心理测试分类）
      type: q.type,
      options: q.options, // Including score field
      order: q.order,
      points: q.points,
      required: q.required,
      displayCondition: q.displayCondition,
    }));

    const snapshotCreatedAt = new Date();

    this.logger.log(
      `Creating exam "${examData.title}" with snapshot: ${questionsSnapshot.length} questions`,
    );

    return this.db.exam.create({
      data: {
        ...examData,
        paperId,
        teacherId,
        startTime,
        endTime,
        allowedStudents: allowedStudents as any,
        status: ExamStatus.DRAFT,
        // ✨ Snapshot fields
        paperSnapshot,
        questionsSnapshot,
        snapshotCreatedAt,
      },
      include: {
        paper: { select: { id: true, title: true } },
        _count: { select: { examResults: true } },
      },
    });
  }

  async update(id: string, teacherId: string, updateExamDto: UpdateExamDto) {
    const exam = await this.findById(id, teacherId);

    // Only DRAFT exams can be fully edited
    if (exam.status !== ExamStatus.DRAFT) {
      throw new BadRequestException('Only draft exams can be edited');
    }

    const { allowedStudents, ...examData } = updateExamDto;

    // Validate dates if provided
    if (examData.startTime || examData.endTime) {
      const startTime = examData.startTime ? new Date(examData.startTime) : exam.startTime;
      const endTime = examData.endTime ? new Date(examData.endTime) : exam.endTime;

      if (endTime <= startTime) {
        throw new BadRequestException('End time must be after start time');
      }
    }

    return this.db.exam.update({
      where: { id },
      data: {
        ...examData,
        ...(examData.startTime && { startTime: new Date(examData.startTime) }),
        ...(examData.endTime && { endTime: new Date(examData.endTime) }),
        ...(allowedStudents && { allowedStudents: allowedStudents as any }),
      },
      include: {
        paper: { select: { id: true, title: true } },
        _count: { select: { examResults: true } },
      },
    });
  }

  async delete(id: string, teacherId: string) {
    const exam = await this.findById(id, teacherId);

    // Cannot delete published exams
    if (exam.status === ExamStatus.PUBLISHED) {
      throw new BadRequestException('Cannot delete published exam. Stop or finish it first.');
    }

    // DRAFT: 直接硬删除（彻底删除，需要级联删除关联数据）
    if (exam.status === ExamStatus.DRAFT) {
      // 使用事务确保级联删除
      return this.db.$transaction(async (tx) => {
        // 1. 删除AI分析数据
        await tx.aiAnalysisAggregate.deleteMany({
          where: {
            examResult: {
              examId: id,
            },
          },
        });

        // 2. 删除考试结果（answers会通过onDelete: Cascade自动删除）
        await tx.examResult.deleteMany({
          where: { examId: id },
        });

        // 3. 删除考试本身
        return tx.exam.delete({
          where: { id },
        });
      });
    }

    // ARCHIVED: 软删除（7天后自动硬删除）
    if (exam.status === ExamStatus.ARCHIVED) {
      const now = new Date();
      const scheduledDeletion = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days later

      return this.db.exam.update({
        where: { id },
        data: {
          status: ExamStatus.DELETED,
          deletedAt: now,
          scheduledDeletionAt: scheduledDeletion,
        },
      });
    }

    // SUCCESS: 需要先归档才能删除
    throw new BadRequestException('Please archive the exam before deleting');
  }

  // ===== Status Management =====

  async publish(id: string, teacherId: string) {
    const exam = await this.findById(id, teacherId);

    if (exam.status !== ExamStatus.DRAFT) {
      throw new BadRequestException('Only draft exams can be published');
    }

    // ✨ Validate exam has snapshot (created during exam creation)
    if (!exam.questionsSnapshot || (exam.questionsSnapshot as any[]).length === 0) {
      throw new BadRequestException('Cannot publish exam without questions snapshot');
    }

    return this.db.exam.update({
      where: { id },
      data: { status: ExamStatus.PUBLISHED },
    });
  }

  async markSuccess(id: string, teacherId: string) {
    const exam = await this.findById(id, teacherId);

    if (exam.status !== ExamStatus.PUBLISHED) {
      throw new BadRequestException('Only published exams can be marked as success');
    }

    return this.db.exam.update({
      where: { id },
      data: { status: ExamStatus.SUCCESS },
    });
  }

  async stop(id: string, teacherId: string) {
    const exam = await this.findById(id, teacherId);

    if (exam.status !== ExamStatus.PUBLISHED) {
      throw new BadRequestException('Only published exams can be stopped');
    }

    return this.db.exam.update({
      where: { id },
      data: { status: ExamStatus.DRAFT },
    });
  }

  async archive(id: string, teacherId: string) {
    const exam = await this.findById(id, teacherId);

    // Can only archive SUCCESS exams
    if (exam.status !== ExamStatus.SUCCESS) {
      throw new BadRequestException('Only completed exams (SUCCESS) can be archived');
    }

    return this.db.exam.update({
      where: { id },
      data: { status: ExamStatus.ARCHIVED },
    });
  }

  async restore(id: string, teacherId: string) {
    const exam = await this.findById(id, teacherId);

    if (exam.status !== ExamStatus.ARCHIVED) {
      throw new BadRequestException('Only archived exams can be restored');
    }

    // Restore to SUCCESS status
    return this.db.exam.update({
      where: { id },
      data: { status: ExamStatus.SUCCESS },
    });
  }

  // ===== Student Access Management =====

  async addAllowedStudents(id: string, teacherId: string, studentIds: string[]) {
    const exam = await this.findById(id, teacherId);

    const currentAllowed = (exam.allowedStudents as string[]) || [];
    const newAllowed = [...new Set([...currentAllowed, ...studentIds])];

    return this.db.exam.update({
      where: { id },
      data: { allowedStudents: newAllowed as any },
    });
  }

  async removeAllowedStudents(id: string, teacherId: string, studentIds: string[]) {
    const exam = await this.findById(id, teacherId);

    const currentAllowed = (exam.allowedStudents as string[]) || [];
    const newAllowed = currentAllowed.filter(sid => !studentIds.includes(sid));

    return this.db.exam.update({
      where: { id },
      data: { allowedStudents: newAllowed as any },
    });
  }

  // ===== Statistics =====

  async getStatistics(id: string, teacherId: string) {
    const exam = await this.findById(id, teacherId);

    const results = await this.db.examResult.findMany({
      where: { examId: id },
      select: {
        totalScore: true,
        maxScore: true,
        percentage: true,
        timeSpent: true,
        submittedAt: true,
      },
    });

    const totalParticipants = results.length;
    const completedParticipants = results.filter(r => r.submittedAt).length;
    const averageScore = totalParticipants > 0
      ? results.reduce((sum, r) => sum + r.percentage, 0) / totalParticipants
      : 0;
    const averageTimeSpent = completedParticipants > 0
      ? results.filter(r => r.timeSpent).reduce((sum, r) => sum + (r.timeSpent || 0), 0) / completedParticipants
      : 0;

    return {
      examId: id,
      status: exam.status,
      totalParticipants,
      completedParticipants,
      inProgressParticipants: totalParticipants - completedParticipants,
      averageScore: Math.round(averageScore * 100) / 100,
      averageTimeSpent: Math.round(averageTimeSpent),
    };
  }

  // ===== Scheduled Tasks =====

  /**
   * 定时清理已删除的考试
   * 每天凌晨2点执行
   * 清理已过期的删除计划（scheduledDeletionAt <= now）
   */
  @Cron('0 2 * * *')
  async cleanupDeletedExams() {
    this.logger.log('开始执行已删除考试清理任务');

    try {
      const now = new Date();

      // 查找需要清理的考试
      const examsToDelete = await this.db.exam.findMany({
        where: {
          status: ExamStatus.DELETED,
          scheduledDeletionAt: {
            lte: now,
          },
        },
        select: {
          id: true,
          title: true,
        },
      });

      if (examsToDelete.length === 0) {
        this.logger.log('没有需要清理的考试');
        return;
      }

      this.logger.log(`找到 ${examsToDelete.length} 个需要清理的考试`);

      // 使用事务批量删除
      let successCount = 0;
      let failCount = 0;

      for (const exam of examsToDelete) {
        try {
          await this.db.$transaction(async (tx) => {
            // 1. 删除所有答案（通过examResult级联）
            // 2. 删除AI分析数据
            await tx.aiAnalysisAggregate.deleteMany({
              where: {
                examResult: {
                  examId: exam.id,
                },
              },
            });

            // 3. 删除考试结果
            await tx.examResult.deleteMany({
              where: {
                examId: exam.id,
              },
            });

            // 4. 删除考试本身
            await tx.exam.delete({
              where: {
                id: exam.id,
              },
            });
          });

          successCount++;
          this.logger.log(`成功删除考试: ${exam.title} (${exam.id})`);
        } catch (error) {
          failCount++;
          this.logger.error(`删除考试失败: ${exam.title} (${exam.id})`, error);
        }
      }

      this.logger.log(
        `考试清理任务完成: 成功 ${successCount} 个, 失败 ${failCount} 个`,
      );
    } catch (error) {
      this.logger.error('考试清理任务执行失败', error);
    }
  }
}
