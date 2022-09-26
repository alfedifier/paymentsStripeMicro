import Stripe from "stripe";
import { StripeProductDto } from "../stripe/domain/product/product.dto";

export class StripeProductService{

  constructor(private stripe:Stripe) {}


  async createProduct(stripeProductDto:StripeProductDto,id:string){

      const product = await this.stripe.products.create({
      name: stripeProductDto.description,
      active:true,
      metadata:{
        documentId:id
      }
    })
    return product;


  }
}
