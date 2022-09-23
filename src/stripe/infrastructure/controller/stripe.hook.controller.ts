import { Body, Controller, Get, Post, Request } from "@nestjs/common";
import { PaymentLinkDto } from "../../domain/payment.link.dto";
import { StripeHookService } from "../service/stripe.hook.service";


@Controller('payment/link')
export class StripeHookController{

  constructor(private stripeHook:StripeHookService) {}


  @Post('')
  async createLink(@Request() req,@Body() paymentLinkDto:PaymentLinkDto){

  }


}

