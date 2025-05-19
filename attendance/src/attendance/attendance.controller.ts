import { Controller, Post, Get, Param, Query, Headers } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { FindAttendanceDto } from './dto/find-attendance.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  makeAttendance(@Headers('x-user-id') userId: string) {
    return this.attendanceService.makeAttendance(userId);
  }

  @Get(':userId')
  findAttendance(
    @Param('userId') userId: string,
    @Query() findAttendanceDto: FindAttendanceDto,
  ) {
    return this.attendanceService.findUserAttendanceByDuration(
      userId,
      findAttendanceDto,
    );
  }
}
