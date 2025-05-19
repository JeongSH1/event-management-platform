import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CLAIM_RESULT_STATUS } from '../constants/claim-result-status.constant';

export type RewardClaimLogDocument = RewardClaimLog & Document;

@Schema({ collection: 'reward_claim_logs', timestamps: true })
export class RewardClaimLog {
  @Prop({ required: true, index: true })
  userId: string;

  @Prop({ required: true, index: true })
  eventId: string;

  @Prop({ required: false, index: true })
  rewardId: string;

  @Prop({ required: true, enum: CLAIM_RESULT_STATUS })
  status: CLAIM_RESULT_STATUS;

  createdAt: Date;
}

export const RewardClaimLogSchema =
  SchemaFactory.createForClass(RewardClaimLog);