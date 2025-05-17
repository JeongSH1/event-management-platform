import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RewardItem, RewardItemSchema } from './reward-item.schema';

export type RewardDocument = Reward & Document;

@Schema({ _id: false })
export class Reward {
  @Prop()
  description?: string;

  @Prop({ type: [RewardItemSchema], required: true })
  rewardItems: RewardItem[];
}

export const RewardSchema = SchemaFactory.createForClass(Reward);
