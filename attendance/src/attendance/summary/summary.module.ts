import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SummaryService } from './summary.service';
import {
  AttendanceSummary,
  AttendanceSummarySchema,
} from './schemas/summary.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AttendanceSummary.name, schema: AttendanceSummarySchema },
    ]),
  ],
  providers: [SummaryService],
  exports: [SummaryService],
})
export class SummaryModule {}
