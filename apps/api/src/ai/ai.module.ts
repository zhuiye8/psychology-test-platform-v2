import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { AiStreamGateway } from './ai-stream.gateway';

@Module({
  controllers: [AiController],
  providers: [AiService, AiStreamGateway],
  exports: [AiService],
})
export class AiModule {}