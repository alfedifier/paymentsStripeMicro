import { Injectable } from "@nestjs/common";
import Stripe from "stripe";

@Injectable()
export class HookService{

  constructor() {}

  processHook(stripeHook:Stripe.Event){


    let event = stripeHook.type.split('.');
    let type = event[0];
    let secondType = event[1];
    let method = event[2];


    switch (type) {
      case 'payment_intent':
        const paymentIntent = stripeHook.data.object;

        break;
      case 'invoice':
        const paymentMethod = stripeHook.data.object;
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod);
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${type}`);
    }

    // Return a response to acknowledge receipt of the event

      return true;
  }
}