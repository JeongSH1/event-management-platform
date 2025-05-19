import { Controller, Get } from '@nestjs/common';
import { ConditionService } from './condition.service';
import { ConditionCategoryResponse } from './types/condition-category.type';

@Controller('/event/condition')
export class ConditionController {
  constructor(private readonly conditionService: ConditionService) {}

  @Get('category')
  findAllConditionCategory(): Promise<ConditionCategoryResponse[]> {
    return this.conditionService.findAllConditionCategory();
  }
}
