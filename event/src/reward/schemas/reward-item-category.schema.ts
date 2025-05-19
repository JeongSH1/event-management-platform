import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RewardItemCategoryDocument = RewardItemCategory & Document;

@Schema({ collection: 'reward_item_categories' })
export class RewardItemCategory {
  @Prop({ required: true, unique: true, index: true })
  code: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;
}

export const RewardItemCategorySchema =
  SchemaFactory.createForClass(RewardItemCategory);
