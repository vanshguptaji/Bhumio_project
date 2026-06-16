import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { appConfig, redisConfig, aiConfig } from './index';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      load: [appConfig, redisConfig, aiConfig],
      cache: true,
      expandVariables: true,
    }),
  ],
})
export class ConfigModule {}
