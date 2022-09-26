import { Body, Controller, Get, Post, Request } from "@nestjs/common";
import { PaymentLinkService } from "../app/payment.link.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { PaymentLinkDto } from "../domain/payment.link.dto";



@Controller('')
export class PaymentLinkController{

  constructor(private paymentLinkService:PaymentLinkService) {}

  @MessagePattern('payment.link')
  async sendNotification(@Payload() paymentLinkDto: PaymentLinkDto) {
    console.log(paymentLinkDto);
    return await this.paymentLinkService.create(paymentLinkDto)
  }

}

