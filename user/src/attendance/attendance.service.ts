import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { AuditService } from '../audit/audit.service';
import { USER_ACTION } from '../audit/constants/user-action';
import { UserLog } from '../audit/schemas/user-log.schema';
import * as dayjs from 'dayjs';
import { convertSecondToFormattedTime } from "./util/time.util";

@Injectable()
export class AttendanceService {
  constructor(private readonly auditService: AuditService) {}

  async _checkOverlapAttendance(userId: string): Promise<void> {
    const recentLog = await this.findOneRecentUserAttendance(userId);
    const attendanceInterval = parseInt(process.env.ATTENDANCE_INTERVAL);

    // 최근 출석이 있고, 설정한 주기 이내면 중복 출석 차단
    if (recentLog?.createdAt) {
      const now = dayjs();
      const last = dayjs(recentLog.createdAt);

      const diffInSeconds = now.diff(last, 'second');

      if (diffInSeconds < attendanceInterval) {
        const waitSeconds = attendanceInterval - diffInSeconds;
        const formatted = convertSecondToFormattedTime(waitSeconds);

        throw new HttpException(
          {
            statusCode: HttpStatus.TOO_MANY_REQUESTS,
            message: `중복 출석입니다. ${formatted} 후 다시 시도하세요.`,
            retryAfter: waitSeconds,
          },
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }
    }
  }

  async makeAttendance(
    createAttendanceDto: CreateAttendanceDto,
  ): Promise<UserLog> {
    const { userId } = createAttendanceDto;

    await this._checkOverlapAttendance(userId);

    return this.auditService.createUserLog({
      userId,
      action: USER_ACTION.ATTENDANCE,
    });
  }

  findAllAttendance(): Promise<UserLog[]> {
    return this.auditService.findAllLog(USER_ACTION.ATTENDANCE);
  }

  findAllUserAttendance(userId: string): Promise<UserLog[]> {
    return this.auditService.findAllUserLog(userId, USER_ACTION.ATTENDANCE);
  }

  findOneRecentUserAttendance(userId: string): Promise<UserLog | null> {
    return this.auditService.findOneRecentUserLog(
      userId,
      USER_ACTION.ATTENDANCE,
    );
  }

  remove(userId: string): Promise<{ deletedCount?: number }> {
    return this.auditService.removeUserLog(userId);
  }
}