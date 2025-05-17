import { Module } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { User, UserSchema } from '../schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  exports: [RecommendationService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [RecommendationService],
})
export class RecommendationModule {}
