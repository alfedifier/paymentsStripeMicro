import { Body, Controller, Get, Post, Request } from "@nestjs/common";
import { StripeHookService } from "../service/stripe.hook.service";
import { PaymentLinkDto } from "../../../paymentsLinks/domain/payment.link.dto";


@Controller('payment/link')
export class StripeHookController{

  constructor(private stripeHook:StripeHookService) {}


  @Post('')
  async createLink(@Request() req,@Body() paymentLinkDto:PaymentLinkDto){

  }


}

