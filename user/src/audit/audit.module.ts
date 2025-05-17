import { Module } from '@nestjs/common';
import { AuditService } from './audit.service';
import { AuditController } from './audit.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserLog, UserLogSchema } from './schemas/user-log.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserLog.name, schema: UserLogSchema }]),
  ],
  controllers: [AuditController],
  providers: [AuditService],
})
export class AuditModule {}
