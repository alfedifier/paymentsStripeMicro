import { Injectable } from "@nestjs/common";
import { StripePaymentLinkService } from "../../stripe/infrastructure/service/stripe.paymentLink.service";
import { PaymentLinkDto } from "../../stripe/domain/payment.link.dto";


@Injectable()
export class PaymentLinkService {

  constructor(private stripePaymentLink:StripePaymentLinkService,) {}

  async getProduct(productId:string,type:string){

  }

  async create(paymentLinkDto: PaymentLinkDto):Promise<string> {


    const paymentLink =  await this.stripePaymentLink.create(paymentLinkDto);
    console.log("the payment link is ->",paymentLink);
    return paymentLink.url;
  }


}