import {
  Body,
  Controller,
  Get,
  Param,
  ParseEnumPipe,
  Post,
  Query,
} from '@nestjs/common';
import { EventRewardService } from './event-reward.service';
import { CreateRewardDto } from './dto/create-reward.dto';
import { CreateRewardResponse } from './types/create-reward-response.type';
import { EVENT_STATUS } from '../event/constants/event-status.constant';
import { EventDetailResponse } from '../event/types/event-detail-resposne.type';

@Controller('event')
export class EventRewardController {
  constructor(private readonly eventRewardService: EventRewardService) {}

  @Post('reward')
  async create(
    @Body() createRewardDto: CreateRewardDto,
  ): Promise<CreateRewardResponse> {
    return await this.eventRewardService.makeRewardAttachToEvent(
      createRewardDto,
    );
  }

  @Get()
  findAll(
    @Query('status', new ParseEnumPipe(EVENT_STATUS, { optional: true }))
    status?: EVENT_STATUS,
  ): Promise<EventDetailResponse[]> {
    return this.eventRewardService.getAllEventWithReward({ status });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventRewardService.getEventWithReward(id);
  }
}
