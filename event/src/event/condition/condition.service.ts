import { Injectable } from '@nestjs/common';
import { CreateConditionDto } from './dto/create-condition.dto';
import { UpdateConditionDto } from './dto/update-condition.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  ConditionCategory,
  ConditionCategoryDocument,
} from './schemas/condition-category.schema';
import { Model } from 'mongoose';
import { Condition } from './schemas/condition.schema';

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

  async findAllConditionCategory(): Promise<ConditionCategory[]> {
    return this.conditionCategoryModel.find().sort({ code: 1 });
  }
}
