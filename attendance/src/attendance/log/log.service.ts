import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AttendanceLog, AttendanceLogDocument } from './schemas/log.schema';
import { Model } from 'mongoose';
import * as dayjs from 'dayjs';
import { convertSecondToFormattedTime } from '../util/time.util';

@Injectable()
export class LogService {
  constructor(
    @InjectModel(AttendanceLog.name)
    private readonly attendanceLogModel: Model<AttendanceLogDocument>,
  ) {}

  async create(userId: string): Promise<AttendanceLog> {
    const date = dayjs().format('YYYY-MM-DD');
    return this.attendanceLogModel.create({ userId, date });
  }

  async getMostRecent(userId: string): Promise<AttendanceLog | null> {
    return this.attendanceLogModel
      .findOne({ userId })
      .sort({ createdAt: -1 })
      .lean();
  }

  async checkOverlap(userId: string, intervalSeconds: number): Promise<void> {
    const recent = await this.getMostRecent(userId);
    if (!recent?.date) return;

    const now = dayjs();
    const last = dayjs(recent.createdAt);
    const diff = now.diff(last, 'second');

    if (diff < intervalSeconds) {
      const wait = intervalSeconds - diff;
      const formatted = convertSecondToFormattedTime(wait);
      throw new HttpException(
        {
          statusCode: HttpStatus.TOO_MANY_REQUESTS,
          message: `중복 출석입니다. ${formatted} 후 다시 시도하세요.`,
          retryAfter: wait,
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
  }

  async findAllByDuration(
    userId: string,
    startAt: Date,
    endAt: Date,
  ): Promise<AttendanceLog[]> {
    return this.attendanceLogModel
      .find({
        userId,
        createdAt: { $gte: startAt, $lte: endAt },
      })
      .sort({ date: -1 })
      .lean();
  }

  async findAll(): Promise<AttendanceLog[]> {
    return this.attendanceLogModel
      .find()
      .sort({ createdAt: -1 })
      .select('-_id -__v')
      .lean();
  }

  async removeAll(userId: string): Promise<{ deletedCount?: number }> {
    return this.attendanceLogModel.deleteMany({ userId });
  }
}
