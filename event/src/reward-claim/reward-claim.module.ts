import { Module } from '@nestjs/common';
import { RewardClaimService } from './reward-claim.service';
import { RewardClaimController } from './reward-claim.controller';
import { EventRewardModule } from '../event-reward/event-reward.module';

@Module({
  controllers: [RewardClaimController],
  providers: [RewardClaimService],
  imports: [EventRewardModule],
})
export class RewardClaimModule {}
