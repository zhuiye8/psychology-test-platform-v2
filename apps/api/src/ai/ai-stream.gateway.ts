/**
 * AI实时数据流WebSocket网关
 *
 * 功能：
 * - 订阅Redis Pub/Sub频道（ai:session:{sessionId}）
 * - 将AI服务推送的实时分析结果转发给前端
 * - 支持多会话并发
 */

import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

// ============================================================================
// 类型定义
// ============================================================================

interface SessionSubscription {
  sessionId: string;
  redisSubscriber: Redis;
}

// ============================================================================
// WebSocket网关
// ============================================================================

@WebSocketGateway({
  namespace: 'ai-stream',
  cors: {
    origin: '*', // 开发环境允许所有来源，生产环境应配置具体域名
    credentials: true,
  },
})
export class AiStreamGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(AiStreamGateway.name);
  private readonly subscriptions = new Map<string, SessionSubscription>();
  private readonly redisHost: string;
  private readonly redisPort: number;

  constructor(private readonly configService: ConfigService) {
    this.redisHost = this.configService.get<string>('REDIS_HOST') || 'localhost';
    this.redisPort = this.configService.get<number>('REDIS_PORT') || 6379;
  }

  // ==========================================================================
  // 连接生命周期
  // ==========================================================================

  /**
   * 客户端连接时触发
   */
  async handleConnection(client: Socket) {
    const sessionId = client.handshake.query.sessionId as string;

    if (!sessionId) {
      this.logger.warn(
        `Client ${client.id} connected without sessionId, disconnecting`,
      );
      client.disconnect();
      return;
    }

    this.logger.log(
      `Client ${client.id} connected for session: ${sessionId}`,
    );

    try {
      // 为该客户端创建独立的Redis订阅者
      const redisSubscriber = new Redis({
        host: this.redisHost,
        port: this.redisPort,
      });

      // 订阅对应的channel
      const channel = `ai:session:${sessionId}`;
      await redisSubscriber.subscribe(channel);

      // 监听Redis消息并转发给WebSocket客户端
      redisSubscriber.on('message', (ch, message) => {
        if (ch === channel) {
          try {
            const data = JSON.parse(message);
            client.emit('ai-data', data);

            this.logger.debug(
              `Forwarded message to client ${client.id} for session ${sessionId}`,
            );
          } catch (error) {
            this.logger.error(
              `Failed to parse Redis message: ${error.message}`,
            );
          }
        }
      });

      // 保存订阅信息
      this.subscriptions.set(client.id, {
        sessionId,
        redisSubscriber,
      });

      this.logger.log(
        `Subscribed to Redis channel: ${channel} for client ${client.id}`,
      );

      // 发送连接成功消息
      client.emit('connected', {
        sessionId,
        message: 'Successfully subscribed to AI stream',
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      this.logger.error(
        `Failed to setup Redis subscription for client ${client.id}: ${error.message}`,
      );
      client.emit('error', {
        message: 'Failed to setup real-time stream',
      });
      client.disconnect();
    }
  }

  /**
   * 客户端断开连接时触发
   */
  async handleDisconnect(client: Socket) {
    const subscription = this.subscriptions.get(client.id);

    if (subscription) {
      const { sessionId, redisSubscriber } = subscription;

      try {
        // 取消订阅并关闭Redis连接
        await redisSubscriber.unsubscribe(`ai:session:${sessionId}`);
        await redisSubscriber.quit();

        this.subscriptions.delete(client.id);

        this.logger.log(
          `Client ${client.id} disconnected, unsubscribed from session: ${sessionId}`,
        );
      } catch (error) {
        this.logger.error(
          `Error during disconnect for client ${client.id}: ${error.message}`,
        );
      }
    } else {
      this.logger.log(`Client ${client.id} disconnected (no subscription)`);
    }
  }

  // ==========================================================================
  // 消息处理
  // ==========================================================================

  /**
   * 客户端心跳检测
   */
  @SubscribeMessage('ping')
  handlePing(client: Socket): void {
    client.emit('pong', {
      timestamp: new Date().toISOString(),
    });
  }

  // ==========================================================================
  // 工具方法
  // ==========================================================================

  /**
   * 获取当前活跃连接数
   */
  getActiveConnectionsCount(): number {
    return this.subscriptions.size;
  }

  /**
   * 获取指定会话的连接数
   */
  getSessionConnectionsCount(sessionId: string): number {
    let count = 0;
    for (const subscription of this.subscriptions.values()) {
      if (subscription.sessionId === sessionId) {
        count++;
      }
    }
    return count;
  }

  /**
   * 清理所有连接（用于应用关闭时）
   */
  async cleanup(): Promise<void> {
    this.logger.log('Cleaning up all WebSocket subscriptions...');

    const cleanupPromises = Array.from(this.subscriptions.entries()).map(
      async ([clientId, { sessionId, redisSubscriber }]) => {
        try {
          await redisSubscriber.unsubscribe(`ai:session:${sessionId}`);
          await redisSubscriber.quit();
          this.logger.log(`Cleaned up subscription for client ${clientId}`);
        } catch (error) {
          this.logger.error(
            `Error cleaning up client ${clientId}: ${error.message}`,
          );
        }
      },
    );

    await Promise.all(cleanupPromises);
    this.subscriptions.clear();

    this.logger.log('All WebSocket subscriptions cleaned up');
  }
}
