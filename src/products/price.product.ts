import Stripe from "stripe";
import { StripeProductDto } from "../stripe/domain/product/product.dto";

export class StripePriceService{

  price:Stripe.Price;

  constructor(private stripe:Stripe) {}


  async createPrice(stripeProductDto:StripeProductDto, product:Stripe.Product){

      const price = await this.stripe.prices.create({
        currency: 'eur',
        unit_amount: 100,
        product: product.id,
      })
    this.price = price;
    return price;

  }
}
