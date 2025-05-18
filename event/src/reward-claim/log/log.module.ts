import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RewardClaimLog,
  RewardClaimLogSchema,
} from './entities/reward-claim-log';
import { EventRewardModule } from '../../event-reward/event-reward.module';

@Module({
  imports: [
    EventRewardModule,
    MongooseModule.forFeature([
      { name: RewardClaimLog.name, schema: RewardClaimLogSchema },
    ]),
  ],
  controllers: [LogController],
  providers: [LogService],
  exports: [LogService],
})
export class LogModule {}
