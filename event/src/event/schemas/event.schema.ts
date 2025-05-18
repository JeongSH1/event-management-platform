import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EVENT_STATUS } from '../constants/event-status.constant';
import {
  Condition,
  ConditionSchema,
} from '../condition/schemas/condition.schema';
import { Reward, RewardSchema } from '../reward/schemas/reward.schema';

export type EventDocument = Event & Document;

@Schema({ collection: 'events', timestamps: true })
export class Event {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ type: Date, required: true })
  startAt: Date;

  @Prop({ type: Date, required: true })
  endAt: Date;

  @Prop({ enum: EVENT_STATUS, required: true })
  status: EVENT_STATUS;

  @Prop({ type: [ConditionSchema], default: [] })
  conditions: Condition[];

  @Prop({ type: RewardSchema })
  reward: Reward;
}

export const EventSchema = SchemaFactory.createForClass(Event);
