import { Body, Controller, Get, Post, Request } from "@nestjs/common";
import { PaymentLinkService } from "../app/payment.link.service";
import { PaymentLinkDto } from "../../stripe/domain/payment.link.dto";
import { StripePaymentLinkService } from "../../stripe/infrastructure/service/stripe.paymentLink.service";



@Controller('payment/link')
export class PaymentLinkController{

  constructor(private paymentLinkService:PaymentLinkService) {}

  @Post('')
  async createLink(@Request() req,@Body() paymentLinkDto:PaymentLinkDto){
      return await this.paymentLinkService.create(paymentLinkDto)
  }



}

