import { Controller, Post, Body } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  makeAttendance(@Body() createAttendanceDto: CreateAttendanceDto) {
    return this.attendanceService.makeAttendance(createAttendanceDto);
  }
}
