import { Body, Controller, Get, Post, Request } from "@nestjs/common";
import { PaymentLinkDto } from "../../domain/payment.link.dto";
import { PaymentLinkService } from "../../app/payment.link.service";


@Controller('payment/link')
export class PaymentLinkController{

  constructor(private StripePaymentLink:PaymentLinkService) {}


  @Post('')
  async createLink(@Request() req,@Body() paymentLinkDto:PaymentLinkDto){
      return await this.StripePaymentLink.create(paymentLinkDto)
  }


}

