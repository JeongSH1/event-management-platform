import { Module } from '@nestjs/common';
import { EventProxyController } from './event.controller';
import { EventApiService } from './event-api.service';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [EventProxyController],
  providers: [EventApiService],
})
export class EventProxyModule {}
