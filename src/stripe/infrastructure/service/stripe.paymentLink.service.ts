import { Injectable } from "@nestjs/common";
import { PaymentLinkDto } from "../../domain/payment.link.dto";
import { StripeConnectionService } from "./stripe.connection.service";
import Stripe from "stripe";
import { StripeProductService } from "../../../products/stripe.product";
import { StripePriceService } from "../../../products/price.product";



@Injectable()
export class StripePaymentLinkService {

  stripe:Stripe;
  constructor(private stripeConnectionService:StripeConnectionService) {
    this.stripe = this.stripeConnectionService.stripe;
  }

  async create(paymentLinkDto:PaymentLinkDto):Promise<Stripe.PaymentLink> {

    const product = await (new StripeProductService(await this.stripeConnectionService.stripe).createProduct(paymentLinkDto));
    const price = await (new StripePriceService(await this.stripeConnectionService.stripe).createPrice(paymentLinkDto,product));

    const paymentLink = await this.stripeConnectionService.stripe.paymentLinks.create({
      line_items: [{price: price.id, quantity: 1}],
    })

    return paymentLink;

  }



}