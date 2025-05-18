import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CLAIM_RESULT_STATUS } from '../constants/claim-result-status.constant';

export type RewardClaimLogDocument = RewardClaimLog & Document;

@Schema({ collection: 'reward_claim_logs', timestamps: true })
export class RewardClaimLog {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  eventId: string;

  @Prop({ required: false })
  rewardId: string;

  @Prop({ required: true, enum: CLAIM_RESULT_STATUS })
  status: CLAIM_RESULT_STATUS;
}

export const RewardClaimLogSchema = SchemaFactory.createForClass(RewardClaimLog);