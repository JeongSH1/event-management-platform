import { Controller, Get } from '@nestjs/common';
import { RewardService } from './reward.service';

@Controller('reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Get('item-category')
  findAllItemRewardCategory() {
    return this.rewardService.findAllItemRewardCategory();
  }
}
