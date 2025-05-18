import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  RewardItemCategory,
  RewardItemCategoryDocument,
} from './schemas/reward-item-category.schema';
import { RewardItemCategorySeedData } from './constants/reward-item-category.constant';

import {
  RewardGameItem,
  RewardGameItemDocument,
} from './schemas/reward-game-item.schema';
import { REWARD_GAME_ITEM_SEED } from './constants/reward-game-item.constant';

@Injectable()
export class RewardInitializerService implements OnModuleInit {
  constructor(
    @InjectModel(RewardItemCategory.name)
    private readonly rewardItemCategoryModel: Model<RewardItemCategoryDocument>,

    @InjectModel(RewardGameItem.name)
    private readonly rewardGameItemModel: Model<RewardGameItemDocument>,
  ) {}

  async onModuleInit() {
    await this.insertMockRewardItemCategory();
    await this.insertMockRewardGameItem();
  }

  async insertMockRewardItemCategory() {
    const count = await this.rewardItemCategoryModel.countDocuments();
    if (count === 0) {
      await this.rewardItemCategoryModel.insertMany(RewardItemCategorySeedData);
      Logger.log('[Seed] RewardItemCategory inserted successfully.');
    }
  }

  async insertMockRewardGameItem() {
    const existingCount = await this.rewardGameItemModel.countDocuments();
    if (existingCount === 0) {
      await this.rewardGameItemModel.insertMany(REWARD_GAME_ITEM_SEED);
      Logger.log('[Seed] RewardGameItem inserted successfully.');
    }
  }
}
