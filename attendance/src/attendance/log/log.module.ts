import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogService } from './log.service';
import { AttendanceLog, LogSchema } from './schemas/log.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AttendanceLog.name, schema: LogSchema },
    ]),
  ],
  providers: [LogService],
  exports: [LogService],
})
export class LogModule {}