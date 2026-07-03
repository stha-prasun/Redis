import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PURCHASE_QUEUE, RABBITMQ_SERVICE } from './rabbitmq.constants';
import { PurchasePublisher } from './rabbitmq.publisher';
import { PurchaseConsumer } from './rabbitmq.consumer';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: RABBITMQ_SERVICE,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('RABBITMQ_URL')],
            queue: PURCHASE_QUEUE,
            queueOptions: {
              durable: true,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [PurchasePublisher],

  controllers: [PurchaseConsumer],

  exports: [PurchasePublisher],
})
export class RabbitmqModule {}
