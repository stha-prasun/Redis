import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  COURSE_PURCHASED_EVENT,
  RABBITMQ_SERVICE,
} from './rabbitmq.constants';

@Injectable()
export class PurchasePublisher {
  constructor(
    @Inject(RABBITMQ_SERVICE)
    private readonly client: ClientProxy,
  ) {}

  async publishPurchase(data: any) {
    return this.client.emit(COURSE_PURCHASED_EVENT, data);
  }
}