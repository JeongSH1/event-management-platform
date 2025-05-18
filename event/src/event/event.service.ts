import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from './schemas/event.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { ConditionService } from './condition/condition.service';
import { RewardService } from './reward/reward.service';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name)
    private readonly eventModel: Model<EventDocument>,

    private readonly conditionService: ConditionService,
    private readonly rewardService: RewardService,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const { title, description, startAt, endAt, status, conditions, reward } =
      createEventDto;

    const conditionObjects = await Promise.all(
      conditions.map((conditionDto) =>
        this.conditionService.createConditionObject(conditionDto),
      ),
    );

    const rewardObject = await this.rewardService.createRewardObject(reward);

    return await this.eventModel.create({
      title,
      description,
      startAt,
      endAt,
      status,
      conditions: conditionObjects,
      reward: rewardObject,
    });
  }

  async findAll(): Promise<Event[]> {
    return this.eventModel.find().sort({ startAt: -1 }).lean();
  }

  async findOne(id: string): Promise<Event> {
    const event = await this.eventModel.findById(id).lean();
    if (!event) {
      throw new NotFoundException(`이벤트 ID ${id} 를 찾을 수 없습니다.`);
    }
    return event;
  }
}
