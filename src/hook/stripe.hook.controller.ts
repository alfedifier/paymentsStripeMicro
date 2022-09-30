import { Body, Controller, Get, Post, Request } from "@nestjs/common";
import { StripeHookService } from "../stripe/infrastructure/service/stripe.hook.service";
import { PaymentLinkDto } from "../paymentsLinks/domain/payment.link.dto";
import Stripe from "stripe";
import { HookService } from "./app/hook.service";


@Controller('stripe')
export class StripeHookController{

  constructor(private hookService:HookService) {}


  @Post('hook')
  async hookEvent(@Request() req,@Body() stripeHook:Stripe.Event){
    return await this.hookService.processHook(stripeHook);
  }


}

