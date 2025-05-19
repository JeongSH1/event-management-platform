import { Injectable } from '@nestjs/common';
import { LogService } from './log/log.service';
import { SummaryService } from './summary/summary.service';
import { FindAttendanceDto } from './dto/find-attendance.dto';
import { AttendanceLogResponse } from './types/attendance-log-response.type';
import { toAttendanceLogResponse } from '../util/mapper.util';

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
  ): Promise<AttendanceLogResponse[]> {
    const { startAt, endAt } = findAttendanceDto;
    const attendanceLogs = await this.logService.findAllByDuration(
      userId,
      startAt,
      endAt,
    );
    return attendanceLogs.map(toAttendanceLogResponse);
  }
}
