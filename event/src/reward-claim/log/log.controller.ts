import { Controller, Get, Query } from '@nestjs/common';
import { LogService } from './log.service';
import { FindRewardClaimLogDto } from './dto/find-log.dto';

@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get()
  async getLogs(@Query() query: FindRewardClaimLogDto) {
    return this.logService.findLogs(query);
  }
}
