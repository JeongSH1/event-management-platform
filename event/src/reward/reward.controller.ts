import { Controller, Get } from '@nestjs/common';
import { RewardService } from './reward.service';
import { RewardItemCategoryResponse } from './types/reward-item-category.response';
import {RewardGameItemResponse} from "./types/reward-game-item.response";

@Controller('event/reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Get('game-item')
  async findAllRewardGameItem(): Promise<RewardGameItemResponse[]> {
    return this.rewardService.findAllRewardGameItem();
  }

  @Get('item-category')
  async findAllItemRewardCategory(): Promise<RewardItemCategoryResponse[]> {
    return this.rewardService.findAllItemRewardCategory();
  }
}
