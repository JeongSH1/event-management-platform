import { Controller, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { sanitizeHeaders } from '../common/util/header.util';
import { EventApiService } from './event-api.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/constants/role.constant';

@Controller('event')
export class EventProxyController {
  constructor(private readonly eventApiService: EventApiService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.OPERATOR, Role.ADMIN)
  @Get('condition/category')
  async conditionCategory(@Req() req: Request) {
    return await this.eventApiService.proxyConditionCategory(
      req.body,
      sanitizeHeaders(req.headers),
    );
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.OPERATOR, Role.ADMIN)
  @Post()
  async createEvent(@Req() req: Request) {
    return await this.eventApiService.proxyCreateEvent(
      req.body,
      sanitizeHeaders(req.headers),
    );
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.OPERATOR, Role.ADMIN)
  @Get('reward/item-category')
  async rewardItemCategory(@Req() req: Request) {
    return await this.eventApiService.proxyRewardItemCategory(
      req.body,
      sanitizeHeaders(req.headers),
    );
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.OPERATOR, Role.ADMIN)
  @Get('reward/game-item')
  async gameItemCategory(@Req() req: Request) {
    return await this.eventApiService.proxyGameItemCategory(
      req.body,
      sanitizeHeaders(req.headers),
    );
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.OPERATOR, Role.ADMIN)
  @Post('reward')
  async createReward(@Req() req: Request) {
    return await this.eventApiService.proxyCreateReward(
      req.body,
      sanitizeHeaders(req.headers),
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findEvent(@Req() req: Request) {
    return await this.eventApiService.proxyFindEvent(
      req.query,
      req.body,
      sanitizeHeaders(req.headers),
    );
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.OPERATOR, Role.ADMIN)
  @Patch(':eventId')
  async changeEvent(@Req() req: Request) {
    return await this.eventApiService.proxyChangeEventStatus(
      req.params,
      req.query,
      req.body,
      sanitizeHeaders(req.headers),
    );
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.OPERATOR, Role.ADMIN, Role.AUDITOR)
  @Get('log/reward-claim')
  async findRewardClaims(@Req() req: Request) {
    return await this.eventApiService.proxyFindRewardClaims(
      req.query,
      req.body,
      sanitizeHeaders(req.headers),
    );
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.OPERATOR, Role.ADMIN, Role.AUDITOR)
  @Get('log/reward-provision')
  async findRewardProvisions(@Req() req: Request) {
    return await this.eventApiService.proxyFindRewardProvisions(
      req.query,
      req.body,
      sanitizeHeaders(req.headers),
    );
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.USER)
  @Post('reward-claim/:eventId')
  async createRewardClaim(@Req() req: Request) {
    return await this.eventApiService.proxyCreateRewardClaim(
      req.params,
      req.query,
      req.body,
      sanitizeHeaders(req.headers, req.user),
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('log/reward-claim/my')
  async getMyRewardClaim(@Req() req: Request) {
    return await this.eventApiService.proxyFindMyRewardClaim(
      req.query,
      req.body,
      sanitizeHeaders(req.headers, req.user),
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('log/reward-provision/my')
  async getMyRewardProvision(@Req() req: Request) {
    return await this.eventApiService.proxyFindMyRewardProvision(
      req.query,
      req.body,
      sanitizeHeaders(req.headers, req.user),
    );
  }
}
