import { Module } from '@nestjs/common';
import { AuthProxyModule } from "./auth/auth.module";

@Module({
  imports: [AuthProxyModule],
})
export class ProxyModule {}
