import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  create(@Body() createAttendanceDto: CreateAttendanceDto) {
    return this.attendanceService.makeAttendance(createAttendanceDto);
  }

  @Get()
  findAllAttendance() {
    return this.attendanceService.findAllAttendance();
  }

  @Get(':userId')
  findAllUserAttendance(@Param('userId') userId: string) {
    return this.attendanceService.findAllUserAttendance(userId);
  }

  @Get(':userId')
  findOneRecentUserAttendance(@Param('userId') userId: string) {
    return this.attendanceService.findOneRecentUserAttendance(userId);
  }

  @Delete(':userId')
  remove(@Param('userId') userId: string) {
    return this.attendanceService.remove(userId);
  }
}
