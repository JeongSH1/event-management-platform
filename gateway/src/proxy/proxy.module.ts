import { Module } from '@nestjs/common';
import { AuthProxyModule } from './auth/auth.module';
import { EventProxyModule } from './event/event.module';
import { UserProxyModule } from './user/user.module';

@Module({
  imports: [AuthProxyModule, EventProxyModule, UserProxyModule],
})
export class ProxyModule {}
