import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from './schemas/event.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { ConditionService } from './condition/condition.service';
import { EventDetailResponse } from './types/event-detail-resposne.type';
import { toEventDetailResponse } from '../util/mapper.util';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name)
    private readonly eventModel: Model<EventDocument>,

    private readonly conditionService: ConditionService,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<EventDetailResponse> {
    const { title, description, startAt, endAt, status, conditions } =
      createEventDto;

    const conditionObjects = await Promise.all(
      conditions.map((conditionDto) =>
        this.conditionService.createConditionObject(conditionDto),
      ),
    );

    const created: Event = await this.eventModel.create({
      title,
      description,
      startAt,
      endAt,
      status,
      conditions: conditionObjects,
    });

    return toEventDetailResponse(created);
  }

  async checkEventExists(eventId: string): Promise<void> {
    const exists = await this.eventModel.exists({ id: eventId });

    if (!exists) {
      throw new NotFoundException(`이벤트를 찾을 수 없습니다: ${eventId}`);
    }
  }

  async attachReward(eventId: string, rewardId: string): Promise<void> {
    const result = await this.eventModel.updateOne(
      { id: eventId },
      { $set: { rewardId } },
    );

    if (result.matchedCount === 0) {
      throw new NotFoundException(`이벤트를 찾을 수 없습니다: ${eventId}`);
    }
  }

  async findAll({ status }): Promise<EventDetailResponse[]> {
    const filter = status ? { status } : {};
    console.log(status);
    const event = await this.eventModel
      .find(filter)
      .sort({ startAt: -1 })
      .lean();
    return event.map(toEventDetailResponse);
  }

  async findOne(id: string): Promise<Event> {
    const event = await this.eventModel.findOne({ id }).lean();
    if (!event) {
      throw new NotFoundException(`이벤트 ID ${id} 를 찾을 수 없습니다.`);
    }
    return event;
  }

  async find(ids: string[]): Promise<Event[]> {
    return this.eventModel.find({ id: { $in: ids } }).lean();
  }
}
