/**
 * Checkpoint文件读取服务
 *
 * 职责：
 * - 从数据库查询checkpoint文件路径
 * - 读取并解析JSON文件
 * - 内存缓存提升性能
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from '../../database/database.service';
import { CheckpointFile } from '../types/ai-analysis.types';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class CheckpointReaderService {
  private cache = new Map<string, { data: CheckpointFile; timestamp: number }>();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5分钟缓存
  private readonly storageRoot: string;

  constructor(
    private readonly db: DatabaseService,
    private readonly config: ConfigService,
  ) {
    this.storageRoot = this.config.get<string>('CHECKPOINT_STORAGE_ROOT', '/tmp/ai_checkpoints');
  }

  // ==========================================================================
  // 公开方法
  // ==========================================================================

  /**
   * 根据examResultId读取checkpoint数据
   */
  async readByExamResultId(examResultId: string): Promise<CheckpointFile> {
    const session = await this.db.aiSession.findFirst({
      where: { examResultId },
      select: { id: true, sessionId: true, checkpointFilePath: true },
    });

    if (!session?.checkpointFilePath) {
      throw new NotFoundException(
        `No checkpoint file found for exam result: ${examResultId}`,
      );
    }

    return this.readCheckpointFile(session.sessionId, session.checkpointFilePath);
  }

  /**
   * 根据sessionId读取checkpoint数据
   */
  async readBySessionId(sessionId: string): Promise<CheckpointFile> {
    const session = await this.db.aiSession.findUnique({
      where: { sessionId },
      select: { checkpointFilePath: true },
    });

    if (!session?.checkpointFilePath) {
      throw new NotFoundException(
        `No checkpoint file found for session: ${sessionId}`,
      );
    }

    return this.readCheckpointFile(sessionId, session.checkpointFilePath);
  }

  /**
   * 清除缓存（用于测试或强制刷新）
   */
  clearCache(sessionId?: string): void {
    if (sessionId) {
      this.cache.delete(sessionId);
    } else {
      this.cache.clear();
    }
  }

  // ==========================================================================
  // 私有方法
  // ==========================================================================

  /**
   * 读取checkpoint文件（带缓存）
   */
  private async readCheckpointFile(
    sessionId: string,
    relativePath: string,
  ): Promise<CheckpointFile> {
    // 检查缓存
    const cached = this.cache.get(sessionId);
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.data;
    }

    // 构建绝对路径
    const absolutePath = path.join(this.storageRoot, relativePath);

    // 读取文件
    const fileContent = await fs.readFile(absolutePath, 'utf-8');
    const data: CheckpointFile = JSON.parse(fileContent);

    // 缓存数据
    this.cache.set(sessionId, { data, timestamp: Date.now() });

    return data;
  }
}
