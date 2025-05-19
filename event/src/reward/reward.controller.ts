import { Controller, Get } from '@nestjs/common';
import { RewardService } from './reward.service';
import { RewardItemCategoryResponse } from './types/reward-item-category.response';

@Controller('event/reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Get('game-item')
  findAllRewardGameItem() {
    return this.rewardService.findAllRewardGameItem();
  }

  @Get('item-category')
  async findAllItemRewardCategory(): Promise<RewardItemCategoryResponse[]> {
    return await this.rewardService.findAllItemRewardCategory();
  }
}
