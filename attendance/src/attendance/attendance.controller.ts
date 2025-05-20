import { Controller, Post, Get, Param, Query, Headers } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { FindAttendanceDto } from './dto/find-attendance.dto';
import { AttendanceLogResponse } from './types/attendance-log-response.type';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  makeAttendance(@Headers('x-user-id') userId: string) {
    return this.attendanceService.makeAttendance(userId);
  }

  @Get()
  findAllAttendance() {
    return this.attendanceService.findAll();
  }

  @Get('my')
  findMyAttendance(
    @Headers('x-user-id') userId: string,
    @Query() dto: FindAttendanceDto,
  ): Promise<AttendanceLogResponse[]> {
    const startAt = dto.startAt ?? new Date('2000-01-01');
    const endAt = dto.endAt ?? new Date('2999-01-01');

    return this.attendanceService.findUserAttendanceByDuration(userId, {
      startAt,
      endAt,
    });
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
