import { Module } from '@nestjs/common';
import { RewardService } from './reward.service';
import { RewardController } from './reward.controller';
import { RewardInitializerService } from './reward-initializer.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RewardItemCategory,
  RewardItemCategorySchema,
} from './schemas/reward-item-category.schema';
import {
  RewardGameItem,
  RewardGameItemSchema,
} from './schemas/reward-game-item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RewardItemCategory.name, schema: RewardItemCategorySchema },
    ]),
    MongooseModule.forFeature([
      { name: RewardGameItem.name, schema: RewardGameItemSchema },
    ]),
  ],
  controllers: [RewardController],
  providers: [RewardService, RewardInitializerService],
  exports: [RewardService],
})
export class RewardModule {}
