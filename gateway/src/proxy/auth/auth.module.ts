import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthApiService } from './auth-api.service';
import { AuthProxyController } from './auth.controller';
import { HttpUtilService } from '../common/util/http-util.service';

@Module({
  imports: [HttpModule],
  controllers: [AuthProxyController],
  providers: [AuthApiService, HttpUtilService],
})
export class AuthProxyModule {}
