import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseEnumPipe,
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

  @Get()
  findAll(
    @Query('status')
    status?: EVENT_STATUS,
  ): Promise<EventDetailResponse[]> {
    return this.eventService.findAll({ status });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }
}
