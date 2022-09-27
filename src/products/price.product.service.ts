import Stripe from "stripe";
import { StripeProductDto } from "../stripe/domain/product/product.dto";
import { StripePriceDto } from "../stripe/domain/price/domain/price.dto";

export class StripePriceService{

  price:Stripe.Price;

  constructor(private stripe:Stripe) {}


  async createPrice(stripeProductDto:StripePriceDto){

      const price = await this.stripe.prices.create({
        currency: 'eur',
        unit_amount: stripeProductDto.price * 100,
        product: stripeProductDto.product.id,
      })
    this.price = price;
    return price;

  }
}
