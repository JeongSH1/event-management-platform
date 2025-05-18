import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { FindAttendanceDto } from './dto/find-attendance.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  makeAttendance(@Body() createAttendanceDto: CreateAttendanceDto) {
    return this.attendanceService.makeAttendance(createAttendanceDto);
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
