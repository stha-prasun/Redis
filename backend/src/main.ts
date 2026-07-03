import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

import { ConfigService } from '@nestjs/config';
import { PURCHASE_QUEUE } from './rabbitmq/rabbitmq.constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [config.getOrThrow<string>('RABBITMQ_URL')],
      queue: PURCHASE_QUEUE,
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
