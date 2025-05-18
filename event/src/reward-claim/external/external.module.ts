import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UserApiService } from './user-api.service';
import { AttendanceApiService } from './attendance-api.service';

@Module({
  imports: [HttpModule.register({ timeout: 3000 })],
  providers: [UserApiService, AttendanceApiService],
  exports: [UserApiService, AttendanceApiService],
})
export class ExternalModule {}