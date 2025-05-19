import { Injectable } from '@nestjs/common';
import { EventService } from '../event/event.service';
import { RewardService } from '../reward/reward.service';
import { CreateRewardDto } from './dto/create-reward.dto';
import { CreateRewardResponse } from './types/create-reward-response.type';
import {
  toCreateRewardResponse,
  toEventDetailResponse,
} from '../util/mapper.util';
import { EventDetailResponse } from '../event/types/event-detail-resposne.type';
import { Reward } from '../reward/schemas/reward.schema';
import { Event } from '../event/schemas/event.schema';

@Injectable()
export class EventRewardService {
  constructor(
    private readonly eventService: EventService,
    private readonly rewardService: RewardService,
  ) {}

  async makeRewardAttachToEvent(
    rewardDto: CreateRewardDto,
  ): Promise<CreateRewardResponse> {
    const { eventId } = rewardDto;

    await this.eventService.checkEventExists(eventId);

    const reward = await this.rewardService.createReward(rewardDto);

    await this.eventService.attachReward(eventId, reward.id);

    return toCreateRewardResponse(reward);
  }

  async findEvent(eventId: string): Promise<Event> {
    return this.eventService.findOne(eventId);
  }

  async findReward(rewardId: string): Promise<Reward> {
    return this.rewardService.findOne(rewardId);
  }

  async getEventWithReward(eventId: string): Promise<EventDetailResponse> {
    const [event]: Event[] = await this.eventService.aggregate([
      {
        $match: { id: eventId },
      },
      {
        $lookup: {
          from: 'rewards',
          localField: 'rewardId',
          foreignField: 'id',
          as: 'reward',
        },
      },
      {
        $unwind: {
          path: '$reward',
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);

    return toEventDetailResponse(event);
  }

  async getAllEventWithReward({
    status,
  }: {
    status?: string;
  }): Promise<EventDetailResponse[]> {
    const pipeline: any[] = [];

    if (status) {
      pipeline.push({ $match: { status } });
    }

    pipeline.push(
      {
        $lookup: {
          from: 'rewards',
          localField: 'rewardId',
          foreignField: 'id',
          as: 'reward',
        },
      },
      {
        $unwind: {
          path: '$reward',
          preserveNullAndEmptyArrays: true,
        },
      },
    );

    const events: Event[] = await this.eventService.aggregate(pipeline);
    return events.map(toEventDetailResponse);
  }
}
