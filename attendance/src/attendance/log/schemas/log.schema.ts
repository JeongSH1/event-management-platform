import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AttendanceLogDocument = AttendanceLog & Document;

@Schema({ collection: 'attendance_log', timestamps: true })
export class AttendanceLog {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  date: string;

  createdAt: Date;
}

export const LogSchema = SchemaFactory.createForClass(AttendanceLog);
