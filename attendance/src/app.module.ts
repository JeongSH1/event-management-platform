import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AttendanceModule } from './attendance/attendance.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
          process.env.NODE_ENV === 'test' ? '.env.for.test' : '.env.for.submit',
      ignoreEnvFile: process.env.IS_DOCKER === 'true',
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AttendanceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
