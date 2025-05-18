import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ExternalModule } from '../external/external.module';
import {
  UserCredential,
  UserCredentialSchema,
} from './schemas/user-credential.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserCredential.name, schema: UserCredentialSchema },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
    ExternalModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
