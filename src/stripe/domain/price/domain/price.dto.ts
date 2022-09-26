import Stripe from "stripe";

export class StripePriceDto{
    description:string;
    product:Stripe.Product;
    price:number;
    unit:string;


}
