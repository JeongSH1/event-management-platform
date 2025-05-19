import { Injectable } from '@nestjs/common';
import { CreateConditionDto } from './dto/create-condition.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  ConditionCategory,
  ConditionCategoryDocument,
} from './schemas/condition-category.schema';
import { Model } from 'mongoose';
import { Condition } from './schemas/condition.schema';
import { ConditionCategoryResponse } from './types/condition-category.type';

@Injectable()
export class ConditionService {
  constructor(
    @InjectModel(ConditionCategory.name)
    private readonly conditionCategoryModel: Model<ConditionCategoryDocument>,
  ) {}

  async createConditionObject(dto: CreateConditionDto): Promise<Condition> {
    const conditionCategory: ConditionCategory =
      await this.conditionCategoryModel.findOne({
        code: dto.conditionCategoryCode,
      });

    return {
      category: {
        code: dto.conditionCategoryCode,
        description: conditionCategory.description,
      },
      threshold: dto.threshold,
      startAt: dto.startAt,
      endAt: dto.endAt,
    };
  }

  async findAllConditionCategory(): Promise<ConditionCategoryResponse[]> {
    return this.conditionCategoryModel
      .find({}, { code: 1, description: 1, _id: 0 }) // 필드 projection
      .sort({ code: 1 })
      .lean();
  }
}
