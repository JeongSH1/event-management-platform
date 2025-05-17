import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ConditionCategory,
  ConditionCategoryDocument,
} from './schemas/condition-category.schema';
import { ConditionCategorySeedData } from './constants/condition-category.constant';

@Injectable()
export class ConditionInitializerService implements OnModuleInit {
  constructor(
    @InjectModel(ConditionCategory.name)
    private readonly categoryModel: Model<ConditionCategoryDocument>,
  ) {}

  async onModuleInit() {
    const count = await this.categoryModel.countDocuments();
    if (count > 0) return;

    await this.categoryModel.insertMany(ConditionCategorySeedData);
    Logger.log('[Seed] Condition categories seeded into MongoDB');
  }
}
