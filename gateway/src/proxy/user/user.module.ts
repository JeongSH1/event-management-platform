import { Module } from '@nestjs/common';
import { UserProxyController } from './user.controller';
import { CommonModule } from '../common/common.module';
import { UserApiService } from './user-api.service';

@Module({
  imports: [CommonModule],
  controllers: [UserProxyController],
  providers: [UserApiService],
})
export class UserProxyModule {}
