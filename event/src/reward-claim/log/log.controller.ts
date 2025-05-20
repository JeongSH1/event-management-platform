import { Controller, Get, Headers, Query } from '@nestjs/common';
import { LogService } from './log.service';
import { FindRewardClaimLogDto } from './dto/find-reward-claim-log.dto';
import { RewardClaimLogResponse } from './types/reward-claim-log-response.type';
import { FindRewardProvisionLogDto } from './dto/find-reward-provision-log.dto';
import { RewardProvisionLogResponse } from './types/reward-provision-log-response.type';

@Controller('event/log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get('reward-claim')
  async getRewardClaimLogs(
    @Query() query: FindRewardClaimLogDto,
  ): Promise<RewardClaimLogResponse[]> {
    return this.logService.findRewardClaimLogs(query);
  }

  @Get('reward-claim/my')
  async getMyRewardClaimLogs(
    @Headers('x-user-id') userId: string,
  ): Promise<RewardClaimLogResponse[]> {
    return this.logService.findMyRewardClaimLogs(userId);
  }

  @Get('reward-provision')
  async getMyRewardProvisionLogs(
    @Query() query: FindRewardProvisionLogDto,
  ): Promise<RewardProvisionLogResponse[]> {
    return this.logService.findRewardProvisionLogs(query);
  }

  @Get('reward-provision/my')
  async getRewardProvisionLogs(
    @Headers('x-user-id') userId: string,
  ): Promise<RewardProvisionLogResponse[]> {
    return this.logService.findMyRewardProvisionLogs(userId);
  }
}
