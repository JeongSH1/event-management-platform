import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RewardProvisionLogDocument = RewardProvisionLog & Document;

@Schema({ collection: 'reward_provision_logs', timestamps: true })
export class RewardProvisionLog {
  @Prop({ required: true, index: true })
  userId: string;

  @Prop({ required: true, index: true })
  eventId: string;

  @Prop({ required: false, index: true })
  rewardId: string;

  createdAt: Date;
}

export const RewardProvisionLogSchema =
  SchemaFactory.createForClass(RewardProvisionLog);
