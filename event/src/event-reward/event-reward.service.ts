import { Injectable, NotFoundException } from "@nestjs/common";
import { EventService } from '../event/event.service';
import { RewardService } from '../reward/reward.service';
import { CreateRewardDto } from './dto/create-reward.dto';
import { Reward } from '../reward/schemas/reward.schema';
import { Event } from '../event/schemas/event.schema';

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

  async getEventWithReward(eventId: string): Promise<{
    event: Event;
    reward?: Reward;
  }> {
    const event = await this.eventService.findOne(eventId);

    if (!event) {
      throw new NotFoundException(`이벤트를 찾을 수 없습니다: ${eventId}`);
    }

    let reward: Reward | undefined;

    if (event.rewardId) {
      reward = await this.rewardService.findOne(event.rewardId);
      if (!reward) {
        throw new NotFoundException(`보상을 찾을 수 없습니다: ${event.rewardId}`);
      }
    }

    return {
      event,
      reward,
    };
  }
}
