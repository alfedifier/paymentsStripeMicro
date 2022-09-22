import Stripe from "stripe";
import { StripeProductDto } from "../../../domain/product/product.dto";

export class StripeProductService{

  constructor(private stripe:Stripe) {}


  async createProduct(stripeProductDto:StripeProductDto){

      const product = await this.stripe.products.create({
      name: stripeProductDto.description,
      active:true,
      metadata:stripeProductDto.product
    })
    return product;


  }
}
