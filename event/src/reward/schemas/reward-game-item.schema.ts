import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RewardGameItemDocument = RewardGameItem & Document;

@Schema({ collection: 'reward_game_items' })
export class RewardGameItem {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true, unique: true })
  name: string;
}

export const RewardGameItemSchema =
  SchemaFactory.createForClass(RewardGameItem);
