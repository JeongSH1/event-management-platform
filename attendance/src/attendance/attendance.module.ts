import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { LogModule } from './log/log.module';
import { SummaryModule } from './summary/summary.module';

@Module({
  imports: [LogModule, SummaryModule],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule {}