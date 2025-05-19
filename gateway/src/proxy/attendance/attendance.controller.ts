import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { sanitizeHeaders } from '../common/util/header.util';
import { AttendanceApiService } from './attendance-api.service';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/constants/role.constant';

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

  @UseGuards(AuthGuard('jwt'))
  @Get('my')
  async findMyAttendanceLog(@Req() req: Request) {
    return await this.attendanceApiService.proxyFindMyAttendanceLog(
      req.query,
      req.body,
      sanitizeHeaders(req.headers, req.user),
    );
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  @Get(':userId')
  async findAttendanceLog(@Req() req: Request) {
    return await this.attendanceApiService.proxyFindAttendanceLog(
      req.params,
      req.query,
      req.body,
      sanitizeHeaders(req.headers, req.user),
    );
  }
}
