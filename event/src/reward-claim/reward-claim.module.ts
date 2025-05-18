import { Module } from '@nestjs/common';
import { RewardClaimService } from './reward-claim.service';
import { RewardClaimController } from './reward-claim.controller';
import { EventRewardModule } from '../event-reward/event-reward.module';
import { ConfirmModule } from './confirm/confirm.module';
import { LogModule } from './log/log.module';

@Module({
  controllers: [RewardClaimController],
  providers: [RewardClaimService],
  imports: [EventRewardModule, ConfirmModule, LogModule],
})
export class RewardClaimModule {}
