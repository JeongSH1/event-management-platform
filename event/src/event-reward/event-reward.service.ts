import { Injectable } from '@nestjs/common';
import { EventService } from '../event/event.service';
import { RewardService } from '../reward/reward.service';
import { CreateRewardDto } from './dto/create-reward.dto';
import { Reward } from '../reward/schemas/reward.schema';

@Injectable()
export class EventRewardService {
  constructor(
    private readonly eventService: EventService,
    private readonly rewardService: RewardService,
  ) {}

  async makeRewardAttachToEvent(rewardDto: CreateRewardDto): Promise<Reward> {
    const { eventId } = rewardDto;

    await this.eventService.checkEventExists(eventId);

    const reward = await this.rewardService.createReward(rewardDto);

    await this.eventService.attachReward(eventId, reward.id);

    return reward;
  }
}
