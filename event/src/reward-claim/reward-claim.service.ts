import { ConfirmService } from './confirm/confirm.service';
import { LogService } from './log/log.service';
import { Injectable } from '@nestjs/common';
import { EventRewardService } from '../event-reward/event-reward.service';
import { CLAIM_RESULT_STATUS } from './log/constants/claim-result-status.constant';

@Injectable()
export class RewardClaimService {
  constructor(
    private readonly eventRewardService: EventRewardService,
    private readonly confirmService: ConfirmService,
    private readonly logService: LogService,
  ) {}

  async create(eventId: string, userId: string) {
    const event = await this.eventRewardService.findEvent(eventId);
    const reward = await this.eventRewardService.findReward(
      event?.rewardId || '',
    );

    let status: CLAIM_RESULT_STATUS = CLAIM_RESULT_STATUS.FAILED;

    try {
      await this.confirmService.confirmClaimEligibility(userId, event);
      status = CLAIM_RESULT_STATUS.SUCCESS;
    } catch (error) {
      // 예외에 담긴 resultState 가 있으면 그대로 사용
      if (error?.response?.resultState) {
        status = error.response.resultState;
      } else {
        console.log(error);
        status = CLAIM_RESULT_STATUS.FAILED;
      }
      await this.logService.createRewardClaimLog(
        userId,
        eventId,
        status,
        reward?.id,
      );
      return {
        success: status === CLAIM_RESULT_STATUS.SUCCESS,
        message: error.message,
      };
    }

    await this.logService.createRewardClaimLog(
      userId,
      eventId,
      status,
      reward?.id,
    );
    if (event?.rewardId) {
      await this.logService.createRewardProvisionLog(
        userId,
        eventId,
        event.rewardId,
      );
    }

    return { success: status === CLAIM_RESULT_STATUS.SUCCESS };
  }
}
