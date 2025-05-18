import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { ConditionModule } from './condition/condition.module';
import { RewardModule } from './reward/reward.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './schemas/event.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    ConditionModule,
    RewardModule,
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
