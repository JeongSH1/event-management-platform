import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RewardItem, RewardItemSchema } from './reward-item.schema';
import { generateRewardId } from '../../util/uuid.util';

export type RewardDocument = Reward & Document;

@Schema({ collection: 'rewards', timestamps: true })
export class Reward {
  @Prop({
    type: String,
    required: true,
    unique: true,
    default: () => generateRewardId(),
  })
  id: string;

  @Prop()
  description?: string;

  @Prop({ type: [RewardItemSchema], required: true, default: [] })
  rewardItems: RewardItem[];
}

export const RewardSchema = SchemaFactory.createForClass(Reward);
