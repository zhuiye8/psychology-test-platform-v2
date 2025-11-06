import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreatePaperDto, UpdatePaperDto, QueryPapersDto } from './dto';

@Injectable()
export class PapersService {
  constructor(private readonly db: DatabaseService) {}

  async findAll(teacherId: string, query: QueryPapersDto = {}) {
    const { page = 1, limit = 20, search, category } = query;
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
      ...(category && { category }),
    };

    const [papers, total] = await Promise.all([
      this.db.paper.findMany({
        where,
        include: {
          _count: {
            select: { questions: true, exams: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.db.paper.count({ where }),
    ]);

    return {
      data: papers,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string, teacherId: string) {
    const paper = await this.db.paper.findUnique({
      where: { id, deletedAt: null },
      include: {
        questions: {
          where: { deletedAt: null },
          orderBy: { order: 'asc' },
        },
        teacher: {
          select: { id: true, name: true }
        }
      }
    });

    if (!paper) {
      throw new NotFoundException('Paper not found');
    }

    if (paper.teacherId !== teacherId) {
      throw new ForbiddenException('Access denied');
    }

    return paper;
  }

  async create(teacherId: string, createPaperDto: CreatePaperDto) {
    return this.db.paper.create({
      data: {
        ...createPaperDto,
        teacherId,
      },
      include: {
        _count: {
          select: { questions: true, exams: true }
        }
      }
    });
  }

  async update(id: string, teacherId: string, updatePaperDto: UpdatePaperDto) {
    // Verify ownership
    await this.findById(id, teacherId);

    return this.db.paper.update({
      where: { id },
      data: updatePaperDto,
      include: {
        questions: {
          where: { deletedAt: null },
          orderBy: { order: 'asc' },
        },
        _count: {
          select: { questions: true, exams: true }
        }
      }
    });
  }

  async bulkDelete(ids: string[], teacherId: string) {
    // Verify all papers belong to teacher
    const papers = await this.db.paper.findMany({
      where: { id: { in: ids }, teacherId, deletedAt: null },
      select: { id: true }
    });

    if (papers.length !== ids.length) {
      throw new ForbiddenException('Some papers not found or access denied');
    }

    return this.db.paper.updateMany({
      where: { id: { in: ids } },
      data: { deletedAt: new Date() }
    });
  }

  async getCategories(teacherId: string) {
    const papers = await this.db.paper.findMany({
      where: { teacherId, deletedAt: null, category: { not: null } },
      select: { category: true },
      distinct: ['category'],
    });

    return papers.map(p => p.category).filter(Boolean);
  }

  async delete(id: string, teacherId: string) {
    // Verify ownership
    await this.findById(id, teacherId);

    return this.db.paper.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }

  async duplicate(id: string, teacherId: string) {
    const paper = await this.findById(id, teacherId);
    
    return this.db.$transaction(async (tx) => {
      // Create new paper
      const newPaper = await tx.paper.create({
        data: {
          title: `${paper.title} (副本)`,
          description: paper.description,
          category: paper.category,
          timeLimit: paper.timeLimit,
          allowRetake: paper.allowRetake,
          showResultsImmediately: paper.showResultsImmediately,
          randomizeQuestions: paper.randomizeQuestions,
          teacherId: teacherId,
        }
      });

      // Copy questions
      for (const question of paper.questions) {
        await tx.question.create({
          data: {
            paperId: newPaper.id,
            title: question.title,
            type: question.type,
            description: question.description,
            explanation: question.explanation,
            order: question.order,
            required: question.required,
            points: question.points,
            displayCondition: question.displayCondition,
            options: question.options,
          }
        });
      }

      return newPaper;
    });
  }
}