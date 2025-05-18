import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {
  ConditionCategory,
  ConditionCategorySchema,
} from './condition-category.schema';

@Schema({ _id: false })
export class Condition {
  @Prop({ type: ConditionCategorySchema, required: true })
  category: ConditionCategory;

  @Prop({ default: 1 })
  threshold?: number;

  @Prop({ type: Date })
  startAt?: Date;

  @Prop({ type: Date })
  endAt?: Date;
}

export const ConditionSchema = SchemaFactory.createForClass(Condition);
