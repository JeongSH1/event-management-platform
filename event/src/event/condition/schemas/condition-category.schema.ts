import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConditionCategoryDocument = ConditionCategory & Document;

@Schema({ collection: 'condition_categories' })
export class ConditionCategory {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  description: string;
}

export const ConditionCategorySchema =
  SchemaFactory.createForClass(ConditionCategory);
