import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { ConditionModule } from './condition/condition.module';
import { RewardModule } from './reward/reward.module';

@Module({
  imports: [ConditionModule, RewardModule],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
