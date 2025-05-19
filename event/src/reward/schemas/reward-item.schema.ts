import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { REWARD_ITEM_CATEGORY_CODE } from '../constants/reward-item-category.constant';

@Schema({ _id: false })
export class RewardItem {
  @Prop({ required: true, enum: REWARD_ITEM_CATEGORY_CODE })
  rewardItemCategoryCode: REWARD_ITEM_CATEGORY_CODE;

  @Prop({ required: true, type: Number, min: 1 })
  quantity: number;

  @Prop({ required: false })
  itemId?: string;

  @Prop({ required: false })
  itemName?: string;
}

export const RewardItemSchema = SchemaFactory.createForClass(RewardItem);
