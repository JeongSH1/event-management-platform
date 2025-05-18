import { Module } from '@nestjs/common';
import { EventRewardService } from './event-reward.service';
import { EventModule } from '../event/event.module';
import { RewardModule } from '../reward/reward.module';
import { EventRewardController } from './event-reward.controller';

@Module({
  imports: [EventModule, RewardModule],
  providers: [EventRewardService],
  exports: [EventRewardService],
  controllers: [EventRewardController],
})
export class EventRewardModule {}