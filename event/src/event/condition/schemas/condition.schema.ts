import { Prop, Schema } from '@nestjs/mongoose';
import { ConditionCategory, ConditionCategorySchema } from './condition-category.schema';

@Schema({ _id: false })
export class Condition {
  @Prop({ type: ConditionCategorySchema, required: true })
  category: ConditionCategory;

  @Prop({ required: false })
  threshold?: number;

  @Prop({ type: Date })
  startAt?: Date;

  @Prop({ type: Date })
  endAt?: Date;

}