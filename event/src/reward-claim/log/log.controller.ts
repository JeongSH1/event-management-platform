import { Controller, Get, Headers, Query } from '@nestjs/common';
import { LogService } from './log.service';
import { FindRewardClaimLogDto } from './dto/find-log.dto';
import { RewardClaimLogResponse } from './types/reward-claim-log-response.type';

@Controller('event/reward-claim/log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get()
  async getLogs(
    @Query() query: FindRewardClaimLogDto,
  ): Promise<RewardClaimLogResponse[]> {
    return this.logService.findLogs(query);
  }

  @Get('my')
  async getMyLogs(
    @Headers('x-user-id') userId: string,
  ): Promise<RewardClaimLogResponse[]> {
    return this.logService.findMyLogs(userId);
  }
}
