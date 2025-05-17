import { Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { LogService } from './log/log.service';
import { SummaryService } from './summary/summary.service';

@Injectable()
export class AttendanceService {
  constructor(
    private readonly logService: LogService,
    private readonly summaryService: SummaryService,
  ) {}

  async makeAttendance(
    createAttendanceDto: CreateAttendanceDto,
  ): Promise<void> {
    const { userId } = createAttendanceDto;
    const interval = parseInt(process.env.ATTENDANCE_INTERVAL ?? '10');

    await this.logService.checkOverlap(userId, interval);
    await this.logService.create(userId);
    await this.summaryService.increment(userId);
  }
}
