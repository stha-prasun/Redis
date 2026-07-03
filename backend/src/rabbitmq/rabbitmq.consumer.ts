import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { COURSE_PURCHASED_EVENT } from './rabbitmq.constants';

@Controller()
export class PurchaseConsumer {
  @EventPattern(COURSE_PURCHASED_EVENT)
  async handlePurchase(data: any) {
    console.log('Received purchase');

    console.log(data);
  }
}
