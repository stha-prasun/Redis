import { Module } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT } from './constants/redis.constants';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: (configService: ConfigService) =>
        new Redis({
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
        }),
      inject: [ConfigService],
    },
    RedisService,
  ],
  exports: [RedisService],
  controllers: [RedisController],
})
export class RedisModule {}
