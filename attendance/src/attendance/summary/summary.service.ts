import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  AttendanceSummary,
  AttendanceSummaryDocument,
} from './schemas/summary.schema';
import { Model } from 'mongoose';
import * as dayjs from 'dayjs';

@Injectable()
export class SummaryService {
  constructor(
    @InjectModel(AttendanceSummary.name)
    private readonly summaryModel: Model<AttendanceSummaryDocument>,
  ) {}

  async increment(userId: string): Promise<void> {
    const today = dayjs().format('YYYY-MM-DD');

    await this.summaryModel.updateOne(
      { userId },
      {
        $inc: { totalAttendanceCount: 1 },
        $set: { lastAttendanceDate: today },
      },
      { upsert: true },
    );
  }

  async getSummary(userId: string): Promise<AttendanceSummary | null> {
    return this.summaryModel.findOne({ userId }).lean();
  }
}
