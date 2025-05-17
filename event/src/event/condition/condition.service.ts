import { Injectable } from '@nestjs/common';
import { CreateConditionDto } from './dto/create-condition.dto';
import { UpdateConditionDto } from './dto/update-condition.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  ConditionCategory,
  ConditionCategoryDocument,
} from './schemas/condition-category.schema';
import { Model } from 'mongoose';

@Injectable()
export class ConditionService {
  constructor(
    @InjectModel(ConditionCategory.name)
    private readonly conditionCategoryModel: Model<ConditionCategoryDocument>,
  ) {}

  create(createConditionDto: CreateConditionDto) {
    return 'This action adds a new condition';
  }

  async findAllCategory(): Promise<ConditionCategory[]> {
    return this.conditionCategoryModel.find().sort({ code: 1 });
  }

  findAll() {
    return `This action returns all condition`;
  }

  findOne(id: number) {
    return `This action returns a #${id} condition`;
  }

  update(id: number, updateConditionDto: UpdateConditionDto) {
    return `This action updates a #${id} condition`;
  }

  remove(id: number) {
    return `This action removes a #${id} condition`;
  }
}
