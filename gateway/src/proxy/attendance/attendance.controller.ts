import {Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { sanitizeHeaders } from '../common/util/header.util';
import { AttendanceApiService } from './attendance-api.service';

@Controller('attendance')
export class AttendanceProxyController {
  constructor(private readonly attendanceApiService: AttendanceApiService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async makeAttendance(@Req() req: Request) {
    return await this.attendanceApiService.proxyMakeAttendance(
      req.query,
      req.body,
      sanitizeHeaders(req.headers, req.user),
    );
  }
}
