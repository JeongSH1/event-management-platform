import { Module } from '@nestjs/common';
import { LogModule } from '../log/log.module';
import { ProvisionService } from './provision.service';

@Module({
  imports: [LogModule],
  providers: [ProvisionService],
  exports: [ProvisionService],
})
export class ProvisionModule {}
