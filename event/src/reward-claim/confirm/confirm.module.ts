import { Module } from '@nestjs/common';
import { ConfirmService } from './confirm.service';

@Module({
  providers: [ConfirmService],
})
export class ConfirmModule {}
