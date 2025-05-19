import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { sanitizeHeaders } from '../common/util/header.util';
import { EventApiService } from './event-api.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../guards/roles.guard';

@Controller('event')
export class EventProxyController {
  constructor(private readonly eventApiService: EventApiService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('condition/category')
  async conditionCategory(@Req() req: Request) {
    return await this.eventApiService.proxyConditionCategory(
      req.body,
      sanitizeHeaders(req.headers),
    );
  }
}
