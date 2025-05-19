import { Module } from '@nestjs/common';
import { AuthProxyModule } from './auth/auth.module';
import { EventProxyModule } from './event/event.module';
import { UserProxyModule } from './user/user.module';
import { AttendanceProxyModule } from './attendance/attendance.module';

@Module({
  imports: [
    AuthProxyModule,
    EventProxyModule,
    UserProxyModule,
    AttendanceProxyModule,
  ],
})
export class ProxyModule {}
