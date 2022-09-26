import { Injectable } from "@nestjs/common";
import { StripePaymentLinkService } from "../../stripe/infrastructure/service/stripe.paymentLink.service";
import { PaymentLinkDto } from "../domain/payment.link.dto";
import { PaymentLink } from "../domain/payment.link.schema";
import { PaymentLinkMongoService } from "../infrastructure/mongo/payment.link.mongo.service";


@Injectable()
export class PaymentLinkService {

  constructor(private stripePaymentLink:StripePaymentLinkService,private paymentLinkMongo:PaymentLinkMongoService) {}

  async getProduct(productId:string,type:string){
  }

  async create(paymentLinkDto: PaymentLinkDto):Promise<string> {


    const paymentLink =  await this.stripePaymentLink.create(paymentLinkDto);

    const paymentLinkSchema:PaymentLink = {
      stripePaymentLink:paymentLink,
      type:paymentLinkDto.type,
      ref:paymentLinkDto.ref,
      user:paymentLinkDto.user,
      updatedBy:paymentLinkDto.user
    }

    await this.paymentLinkMongo.createPaymentLink(paymentLinkSchema);

    return paymentLink.url;

  }


}