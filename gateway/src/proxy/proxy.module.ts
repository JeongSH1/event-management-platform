import { Module } from '@nestjs/common';
import { AuthProxyModule } from './auth/auth.module';
import { EventProxyModule } from './event/event.module';

@Module({
  imports: [AuthProxyModule, EventProxyModule],
})
export class ProxyModule {}
