import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AttendanceSummaryDocument = AttendanceSummary & Document;

@Schema({ collection: 'attendance_summaries', timestamps: true })
export class AttendanceSummary {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ default: 0 })
  totalAttendanceCount: number;

  @Prop({ default: 0 })
  weeklyAttendanceCount: number;

  @Prop({ default: 0 })
  consecutiveDays: number;

  @Prop()
  lastAttendanceDate: string;
}

export const AttendanceSummarySchema =
  SchemaFactory.createForClass(AttendanceSummary);
