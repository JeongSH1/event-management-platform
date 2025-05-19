import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseEnumPipe,
  Patch,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { EventDetailResponse } from './types/event-detail-resposne.type';
import { EVENT_STATUS } from './constants/event-status.constant';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto): Promise<EventDetailResponse> {
    return this.eventService.create(createEventDto);
  }

  @Patch(':id')
  async updateStatus(
    @Param('id') id: string,
    @Query('status', new ParseEnumPipe(EVENT_STATUS))
    status?: EVENT_STATUS,
  ): Promise<EventDetailResponse> {
    return this.eventService.updateStatus(id, status);
  }
}
