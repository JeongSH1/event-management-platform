import { Module } from '@nestjs/common';
import { AuthApiService } from './auth-api.service';
import { AuthProxyController } from './auth.controller';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [AuthProxyController],
  providers: [AuthApiService],
})
export class AuthProxyModule {}
