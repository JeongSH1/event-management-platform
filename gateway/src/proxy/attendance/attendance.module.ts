import { Module } from '@nestjs/common';
import { AttendanceProxyController } from './attendance.controller';
import { AttendanceApiService } from './attendance-api.service';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [AttendanceProxyController],
  providers: [AttendanceApiService],
})
export class AttendanceProxyModule {}
