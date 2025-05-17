import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { USER_ACTION } from '../constants/user-action';

export type UserLogDocument = UserLog & Document;

@Schema({ collection: 'user_logs', timestamps: true })
export class UserLog {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, enum: USER_ACTION })
  action: USER_ACTION;

  @Prop({ type: Object })
  before?: Record<string, any>;

  @Prop({ type: Object })
  after?: Record<string, any>;

  createdAt?: Date;
}

export const UserLogSchema = SchemaFactory.createForClass(UserLog);
