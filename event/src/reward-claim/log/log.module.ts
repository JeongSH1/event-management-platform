import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RewardClaimLog,
  RewardClaimLogSchema,
} from './schemas/reward-claim-log.schema';
import {
  RewardProvisionLog,
  RewardProvisionLogSchema,
} from './schemas/reward-provision-log.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RewardClaimLog.name, schema: RewardClaimLogSchema },
    ]),
    MongooseModule.forFeature([
      { name: RewardProvisionLog.name, schema: RewardProvisionLogSchema },
    ]),
  ],
  controllers: [LogController],
  providers: [LogService],
  exports: [LogService],
})
export class LogModule {}
