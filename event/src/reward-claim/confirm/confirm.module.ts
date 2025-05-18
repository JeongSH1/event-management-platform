import { Module } from '@nestjs/common';
import { ConfirmService } from './confirm.service';
import { ExternalModule } from '../external/external.module';
import { LogModule } from '../log/log.module';

@Module({
  imports: [ExternalModule, LogModule],
  providers: [ConfirmService],
  exports: [ConfirmService],
})
export class ConfirmModule {}
