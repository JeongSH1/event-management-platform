import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { ConditionModule } from './condition/condition.module';

@Module({
  imports: [ConditionModule],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
