import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProxyModule } from './proxy/proxy.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'test' ? '.env.for.test' : '.env.for.submit',
      ignoreEnvFile: process.env.IS_DOCKER === 'true',
    }),
    ProxyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
