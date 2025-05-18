import { Module } from '@nestjs/common';
import { UserApiService } from './user-api-service';
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule.register({ timeout: 3000 })],
  providers: [UserApiService],
  exports: [UserApiService],
})
export class ExternalModule {}
