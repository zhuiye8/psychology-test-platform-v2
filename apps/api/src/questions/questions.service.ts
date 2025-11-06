import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateQuestionDto, UpdateQuestionDto, BatchImportQuestionsDto, BatchImportResult } from './dto';

@Injectable()
export class QuestionsService {
  constructor(private readonly db: DatabaseService) {}

  async findAllByPaper(paperId: string, teacherId: string) {
    // Verify paper ownership
    await this.verifyPaperOwnership(paperId, teacherId);

    return this.db.question.findMany({
      where: { paperId, deletedAt: null },
      orderBy: { order: 'asc' },
    });
  }

  async findById(id: string, teacherId: string) {
    const question = await this.db.question.findUnique({
      where: { id, deletedAt: null },
      include: { paper: true },
    });

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    if (question.paper.teacherId !== teacherId) {
      throw new ForbiddenException('Access denied');
    }

    return question;
  }

  async create(paperId: string, teacherId: string, createQuestionDto: CreateQuestionDto) {
    // Verify paper ownership
    await this.verifyPaperOwnership(paperId, teacherId);

    // Get next order number
    const maxOrder = await this.db.question.aggregate({
      where: { paperId, deletedAt: null },
      _max: { order: true },
    });

    const order = createQuestionDto.order ?? (maxOrder._max.order ?? -1) + 1;

    return this.db.question.create({
      data: {
        ...createQuestionDto,
        paperId,
        order,
        options: createQuestionDto.options as any,
        displayCondition: createQuestionDto.displayCondition as any,
      },
    });
  }

  async update(id: string, teacherId: string, updateQuestionDto: UpdateQuestionDto) {
    // Verify ownership
    await this.findById(id, teacherId);

    return this.db.question.update({
      where: { id },
      data: {
        ...updateQuestionDto,
        options: updateQuestionDto.options as any,
        displayCondition: updateQuestionDto.displayCondition as any,
      },
    });
  }

  async delete(id: string, teacherId: string) {
    // Verify ownership
    await this.findById(id, teacherId);

    return this.db.question.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async bulkDelete(ids: string[], teacherId: string) {
    // Verify all questions belong to teacher's papers
    const questions = await this.db.question.findMany({
      where: { id: { in: ids }, deletedAt: null },
      include: { paper: true },
    });

    if (questions.some(q => q.paper.teacherId !== teacherId)) {
      throw new ForbiddenException('Some questions not found or access denied');
    }

    return this.db.question.updateMany({
      where: { id: { in: ids } },
      data: { deletedAt: new Date() },
    });
  }

  async reorder(paperId: string, teacherId: string, questionIds: string[]) {
    // Verify paper ownership
    await this.verifyPaperOwnership(paperId, teacherId);

    // Update order for each question
    await this.db.$transaction(
      questionIds.map((id, index) =>
        this.db.question.update({
          where: { id },
          data: { order: index },
        })
      )
    );

    return { success: true };
  }

  async duplicate(id: string, teacherId: string) {
    const question = await this.findById(id, teacherId);

    // Get next order number
    const maxOrder = await this.db.question.aggregate({
      where: { paperId: question.paperId, deletedAt: null },
      _max: { order: true },
    });

    return this.db.question.create({
      data: {
        paperId: question.paperId,
        title: `${question.title} (副本)`,
        type: question.type,
        description: question.description,
        explanation: question.explanation,
        order: (maxOrder._max.order ?? 0) + 1,
        required: question.required,
        points: question.points,
        displayCondition: question.displayCondition,
        options: question.options,
      },
    });
  }

  async batchImport(paperId: string, teacherId: string, batchImportDto: BatchImportQuestionsDto): Promise<BatchImportResult> {
    // 验证试卷所有权
    await this.verifyPaperOwnership(paperId, teacherId);

    // 获取当前最大order值
    const maxOrder = await this.db.question.aggregate({
      where: { paperId, deletedAt: null },
      _max: { order: true },
    });

    let currentOrder = (maxOrder._max.order ?? -1) + 1;
    const questionIds: string[] = [];
    const errors: Array<{ index: number; title: string; error: string }> = [];
    let successCount = 0;

    // 使用事务批量创建题目
    try {
      await this.db.$transaction(async (tx) => {
        for (let i = 0; i < batchImportDto.questions.length; i++) {
          const questionDto = batchImportDto.questions[i];

          try {
            // 验证题型和选项匹配
            if ((questionDto.type === 'SINGLE_CHOICE' || questionDto.type === 'MULTIPLE_CHOICE')
                && (!questionDto.options || questionDto.options.length < 2)) {
              throw new Error('选择题至少需要2个选项');
            }

            const question = await tx.question.create({
              data: {
                ...questionDto,
                paperId,
                order: currentOrder++,
                options: questionDto.options as any,
                displayCondition: questionDto.displayCondition as any,
              },
            });

            questionIds.push(question.id);
            successCount++;
          } catch (error) {
            errors.push({
              index: i + 1,
              title: questionDto.title,
              error: error.message || '创建失败',
            });
          }
        }
      });
    } catch (error) {
      throw new BadRequestException('批量导入失败: ' + error.message);
    }

    return {
      successCount,
      failedCount: errors.length,
      questionIds,
      errors: errors.length > 0 ? errors : undefined,
    };
  }

  private async verifyPaperOwnership(paperId: string, teacherId: string) {
    const paper = await this.db.paper.findUnique({
      where: { id: paperId, deletedAt: null },
    });

    if (!paper) {
      throw new NotFoundException('Paper not found');
    }

    if (paper.teacherId !== teacherId) {
      throw new ForbiddenException('Access denied');
    }

    return paper;
  }
}
