import { Injectable } from "@nestjs/common";
import { StripeConnectionService } from "./stripe.connection.service";
import Stripe from "stripe";
import { StripeProductService } from "../../../products/stripe.product.service";
import { StripePriceService } from "../../../products/price.product.service";
import { PaymentLinkDto } from "../../../paymentsLinks/domain/payment.link.dto";
import { PaymentLinkMongoService } from "../../../paymentsLinks/infrastructure/mongo/payment.link.mongo.service";
import { PaymentLink } from "../../../paymentsLinks/domain/payment.link.schema";



@Injectable()
export class StripePaymentLinkService {

  stripe:Stripe;
  constructor(private stripeConnectionService:StripeConnectionService) {
    this.stripe = this.stripeConnectionService.stripe;
  }

  async create(paymentLinkDto:PaymentLinkDto):Promise<Stripe.PaymentLink> {

    const product = await (new StripeProductService(await this.stripeConnectionService.stripe).createProduct({description:paymentLinkDto.description,product:paymentLinkDto.metadata},paymentLinkDto.metadata['_id']));
    const price = await (new StripePriceService(await this.stripeConnectionService.stripe).createPrice({description:paymentLinkDto.description,product:product,price:paymentLinkDto.price,unit:'€'}));

    try{
      const paymentLink = await this.stripeConnectionService.stripe.paymentLinks.create({
        line_items: [{price: price.id, quantity: 1}],
        after_completion:{
          type: 'redirect',
          redirect:{
            url:process.env.APP +'documents/payment_success?documentid='+paymentLinkDto.ref
          }
        }

      })
      return paymentLink;
    }
    catch (e){
      console.log(e);
      return null;
    }



  }



}