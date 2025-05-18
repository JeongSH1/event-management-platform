import { Controller, Post, Body } from '@nestjs/common';
import { RewardClaimService } from './reward-claim.service';
import { CreateRewardClaimDto } from './dto/create-reward-claim.dto';

@Controller('reward-claim')
export class RewardClaimController {
  constructor(private readonly rewardClaimService: RewardClaimService) {}

  @Post()
  async createClaim(@Body() dto: CreateRewardClaimDto) {
    return this.rewardClaimService.create(dto);
  }
}
