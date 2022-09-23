import { Injectable } from "@nestjs/common";
import Stripe from 'stripe';
import * as Process from "process";

@Injectable()
export class StripeConnectionService{

  public stripe:Stripe;

  constructor() {
    this.stripe = new Stripe(Process.env.STRIPE_SECRET_KEY,{apiVersion:'2022-08-01'});
  }


}