import { Controller, Get, Query } from '@nestjs/common';
import { LogService } from './log.service';
import { FindRewardClaimLogDto } from './dto/find-log.dto';
import {RewardClaimLogResponse} from "./types/reward-claim-log-response.type";

@Controller('event/reward-claim/log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get()
  async getLogs(@Query() query: FindRewardClaimLogDto): Promise<RewardClaimLogResponse[]> {
    return this.logService.findLogs(query);
  }
}
