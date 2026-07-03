import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis/redis.module';
import { CourseModule } from './course/course.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',

        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),

        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),

        database: config.get<string>('DB_DATABASE'),

        autoLoadEntities: true,

        synchronize: true,
      }),
    }),

    RedisModule,
    CourseModule,
    RabbitmqModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
