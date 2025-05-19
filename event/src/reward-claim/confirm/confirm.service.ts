import {
  Injectable,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { CLAIM_RESULT_STATUS } from '../log/constants/claim-result-status.constant';
import { CONDITION_CATEGORY_CODE } from '../../event/condition/constants/condition-category.constant';
import { Event } from '../../event/schemas/event.schema';
import { LogService } from '../log/log.service';
import { UserApiService } from '../external/user-api.service';
import { Condition } from '../../event/condition/schemas/condition.schema';
import { EVENT_STATUS } from '../../event/constants/event-status.constant';
import { AttendanceApiService } from '../external/attendance-api.service';

@Injectable()
export class ConfirmService {
  constructor(
    private readonly logService: LogService,
    private readonly userApiService: UserApiService,
    private readonly attendanceApiService: AttendanceApiService,
  ) {}

  private async checkCommonConditionCheck(
    userId: string,
    event: Event,
  ): Promise<void> {
    if (event.status !== EVENT_STATUS.ACTIVE) {
      throw new ForbiddenException({
        statusCode: 403,
        message: '해당 이벤트는 비활성 상태입니다.',
        error: 'Forbidden',
        resultState: CLAIM_RESULT_STATUS.EVENT_INACTIVE,
      });
    }

    const existing = await this.logService.findLogs({
      userId,
      eventId: event.id,
      status: CLAIM_RESULT_STATUS.SUCCESS,
    });

    if (existing.length > 0) {
      throw new ForbiddenException({
        statusCode: 403,
        message: '이미 해당 이벤트 보상을 수령했습니다.',
        error: 'Forbidden',
        resultState: CLAIM_RESULT_STATUS.DUPLICATE,
      });
    }
  }

  async confirmClaimEligibility(userId: string, event: Event): Promise<void> {
    await this.checkCommonConditionCheck(userId, event);

    for (const condition of event.conditions) {
      const checker = this.conditionCheckers[condition.category.code];
      if (!checker) {
        throw new BadRequestException({
          statusCode: 400,
          message: `지원되지 않는 조건 유형입니다: ${condition.category.code}`,
          error: 'Bad Request',
          resultState: CLAIM_RESULT_STATUS.FAILED,
        });
      }

      const passed = await checker(userId, condition);
      if (!passed) {
        throw new ForbiddenException({
          statusCode: 403,
          message: `조건을 만족하지 않습니다: ${condition.category.code}`,
          error: 'Forbidden',
          resultState: CLAIM_RESULT_STATUS.CONDITION_NOT_MET,
        });
      }
    }
  }


  private conditionCheckers: Record<
    CONDITION_CATEGORY_CODE,
    (userId: string, condition: any) => Promise<boolean>
  > = {
    [CONDITION_CATEGORY_CODE.CHECK_ATTENDANCE]: this.checkAttendance.bind(this),
    [CONDITION_CATEGORY_CODE.CHANGE_NAME]: this.checkNameChange.bind(this),
    [CONDITION_CATEGORY_CODE.CHANGE_EMAIL]: this.checkEmailChange.bind(this),
    [CONDITION_CATEGORY_CODE.HAS_RECOMMENDER]:
      this.checkHasRecommender.bind(this),
  };

  private async checkAttendance(
    userId: string,
    condition: Condition,
  ): Promise<boolean> {
    const attendanceLogs = await this.attendanceApiService.getAttendanceLogs(
      userId,
      condition.startAt,
      condition.endAt,
    );
    return attendanceLogs.length >= (condition.threshold ?? 1);
  }

  private async checkNameChange(
    userId: string,
    condition: Condition,
  ): Promise<boolean> {
    const { startAt, endAt } = condition;

    const userLogs = await this.userApiService.getUserEditInfoLogs(userId);

    return userLogs.some((log) => {
      const createdAt = new Date(log.createdAt);
      return (
        log.before.name !== log.after.name &&
        createdAt >= (startAt ?? new Date('2000-01-01')) &&
        createdAt <= (endAt ?? new Date('9999-12-31'))
      );
    });
  }

  private async checkEmailChange(
    userId: string,
    condition: any,
  ): Promise<boolean> {
    const { startAt, endAt } = condition;

    const userLogs = await this.userApiService.getUserEditInfoLogs(userId);

    return userLogs.some((log) => {
      const createdAt = new Date(log.createdAt);
      return (
        log.before.email !== log.after.email &&
        createdAt >= (startAt ?? new Date('2000-01-01')) &&
        createdAt <= (endAt ?? new Date('9999-12-31'))
      );
    });
  }

  private async checkHasRecommender(
    userId: string,
    condition: Condition,
  ): Promise<boolean> {
    const { startAt, endAt } = condition;

    const userLogs = await this.userApiService.getRecommendedLogs(userId);

    const filtered = userLogs.filter((log) => {
      const createdAt = new Date(log.createdAt);
      return (
        createdAt >= (startAt ?? new Date('2000-01-01')) &&
        createdAt <= (endAt ?? new Date('9999-12-31'))
      );
    });

    return filtered.length >= condition.threshold;
  }
}
