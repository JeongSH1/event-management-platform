import { Body, Controller, Post } from '@nestjs/common';
import { EventRewardService } from './event-reward.service';
import { CreateRewardDto } from './dto/create-reward.dto';

@Controller('event-reward')
export class EventRewardController {
  constructor(private readonly eventRewardService: EventRewardService) {}

  @Post()
  async create(@Body() createRewardDto: CreateRewardDto) {
    return await this.eventRewardService.makeRewardAttachToEvent(
      createRewardDto,
    );
  }
}
