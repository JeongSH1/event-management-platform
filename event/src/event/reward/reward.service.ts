import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  RewardItemCategory,
  RewardItemCategoryDocument,
} from './schemas/reward-item-category.schema';

@Injectable()
export class RewardService {
  constructor(
    @InjectModel(RewardItemCategory.name)
    private readonly rewardItemCategoryModel: Model<RewardItemCategoryDocument>,
  ) {}

  async findAllItemRewardCategory(): Promise<RewardItemCategory[]> {
    return this.rewardItemCategoryModel.find().sort({ code: 1 });
  }
}
