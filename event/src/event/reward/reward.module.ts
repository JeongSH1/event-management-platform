import { Module } from '@nestjs/common';
import { RewardService } from './reward.service';
import { RewardController } from './reward.controller';
import { RewardItemCategoryInitializerService } from './reward-item-category-initializer.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RewardItemCategory,
  RewardItemCategorySchema,
} from './schemas/reward-item-category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RewardItemCategory.name, schema: RewardItemCategorySchema },
    ]),
  ],
  controllers: [RewardController],
  providers: [RewardService, RewardItemCategoryInitializerService],
})
export class RewardModule {}
