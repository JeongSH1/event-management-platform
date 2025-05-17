import { Module } from '@nestjs/common';
import { ConditionService } from './condition.service';
import { ConditionController } from './condition.controller';
import {
  ConditionCategory,
  ConditionCategorySchema,
} from './schemas/condition-category.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ConditionInitializerService } from './condition-initializer.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ConditionCategory.name, schema: ConditionCategorySchema },
    ]),
  ],
  controllers: [ConditionController],
  providers: [ConditionService, ConditionInitializerService],
})
export class ConditionModule {}
