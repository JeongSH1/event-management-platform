import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  RewardItemCategory,
  RewardItemCategoryDocument,
} from './schemas/reward-item-category.schema';
import { RewardItemCategorySeedData } from './constants/reward-item-category.constant';

@Injectable()
export class RewardItemCategoryInitializerService implements OnModuleInit {
  constructor(
    @InjectModel(RewardItemCategory.name)
    private readonly model: Model<RewardItemCategoryDocument>,
  ) {}

  async onModuleInit() {
    const count = await this.model.countDocuments();
    if (count === 0) {
      await this.model.insertMany(RewardItemCategorySeedData);
    }
  }
}