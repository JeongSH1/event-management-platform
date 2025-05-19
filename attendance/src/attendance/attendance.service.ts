import { Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { LogService } from './log/log.service';
import { SummaryService } from './summary/summary.service';
import { FindAttendanceDto } from './dto/find-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(
    private readonly logService: LogService,
    private readonly summaryService: SummaryService,
  ) {}

  async makeAttendance(userId: string): Promise<void> {
    const interval = parseInt(process.env.ATTENDANCE_INTERVAL ?? '10');

    await this.logService.checkOverlap(userId, interval);
    await this.logService.create(userId);
    await this.summaryService.increment(userId);
  }

  async findUserAttendanceByDuration(
    userId: string,
    findAttendanceDto: FindAttendanceDto,
  ) {
    const { startAt, endAt } = findAttendanceDto;
    return await this.logService.findAllByDuration(userId, startAt, endAt);
  }
}
