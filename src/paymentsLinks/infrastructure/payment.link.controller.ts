import { Body, Controller, Get, Post, Request } from "@nestjs/common";
import { PaymentLinkService } from "../app/payment.link.service";
import { PaymentLinkDto } from "../../stripe/domain/payment.link.dto";
import { MessagePattern, Payload } from "@nestjs/microservices";



@Controller('')
//@Controller('payment/link')
export class PaymentLinkController{

  constructor(private paymentLinkService:PaymentLinkService) {}


  @MessagePattern('payment.link')
  async sendNotification(@Payload() paymentLinkDto: PaymentLinkDto) {
    return await this.paymentLinkService.create(paymentLinkDto)
  }


  /*
  @Post('')
  async createLink(@Request() req,@Body() paymentLinkDto:PaymentLinkDto){
      return await this.paymentLinkService.create(paymentLinkDto)
  }*/



}

