import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { AuditModule } from '../audit/audit.module';
import { ProfileModule } from './profile/profile.module';
import { RecommendationModule } from './recommendation/recommendation.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuditModule,
    ProfileModule,
    RecommendationModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
