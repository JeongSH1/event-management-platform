import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { EventModule } from './event/event.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RewardClaimModule } from './reward-claim/reward-claim.module';
import { RewardModule } from './reward/reward.module';
import { EventRewardModule } from './event-reward/event-reward.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'test' ? '.env.for.test' : '.env.for.submit',
      ignoreEnvFile: process.env.IS_DOCKER === 'true',
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    EventModule,
    RewardModule,
    EventRewardModule,
    RewardClaimModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
