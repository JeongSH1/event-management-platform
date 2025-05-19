import { Controller, Headers, Param, Post } from '@nestjs/common';
import { RewardClaimService } from './reward-claim.service';

@Controller('event/reward-claim')
export class RewardClaimController {
  constructor(private readonly rewardClaimService: RewardClaimService) {}

  @Post(':eventId')
  async createClaim(
    @Param('eventId') eventId: string,
    @Headers('x-user-id') userId: string,
  ) {
    return this.rewardClaimService.create(eventId, userId);
  }
}
