import { Controller, Get } from '@nestjs/common';
import { RewardService } from './reward.service';

@Controller('reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Get('game-item')
  findAllRewardGameItem() {
    return this.rewardService.findAllRewardGameItem();
  }

  @Get('item-category')
  findAllItemRewardCategory() {
    return this.rewardService.findAllItemRewardCategory();
  }
}
