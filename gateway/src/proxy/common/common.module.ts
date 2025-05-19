import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessStrategy } from '../../strategies/jwt-access.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpUtilService } from './util/http-util.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [HttpUtilService, JwtAccessStrategy],
  exports: [HttpModule, HttpUtilService, PassportModule, JwtModule],
})
export class CommonModule {}
