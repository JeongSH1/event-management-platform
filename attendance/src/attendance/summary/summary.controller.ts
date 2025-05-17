import { Controller, Get, Param } from '@nestjs/common';
import { SummaryService } from './summary.service';
import { AttendanceSummary } from './schemas/summary.schema';

@Controller('summary')
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  @Get(':userId')
  async getSummary(
    @Param('userId') userId: string,
  ): Promise<AttendanceSummary | null> {
    return this.summaryService.getSummary(userId);
  }
}
