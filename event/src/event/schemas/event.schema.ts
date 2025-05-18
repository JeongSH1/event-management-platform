import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { EVENT_STATUS } from '../constants/event-status.constant';
import {
  Condition,
  ConditionSchema,
} from '../condition/schemas/condition.schema';
import { generateEventId } from '../../util/uuid.util';

export type EventDocument = Event & Document;

@Schema({ collection: 'events', timestamps: true })
export class Event {
  @Prop({
    type: String,
    required: true,
    unique: true,
    default: () => generateEventId(),
  })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ type: Date, required: true })
  startAt: Date;

  @Prop({ type: Date, required: true })
  endAt: Date;

  @Prop({ enum: EVENT_STATUS, required: true })
  status: EVENT_STATUS;

  @Prop({ type: [ConditionSchema], default: [] })
  conditions: Condition[];

  @Prop({ type: String, required: false })
  rewardId?: string; // 예: 'rew_3f8a9c61-df56-41b8-bdea-02323d832a6f'
}

export const EventSchema = SchemaFactory.createForClass(Event);
