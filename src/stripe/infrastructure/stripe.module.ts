


import { Module } from '@nestjs/common';
import { StripeCustomerService } from "./service/stripe.customer.service";
import { StripePaymentLinkService } from "./service/stripe.paymentLink.service";
import { StripeConnectionService } from "./service/stripe.connection.service";
import { StripeHookService } from "./service/stripe.hook.service";
import { PaymentLinkController } from "../../paymentsLinks/infrastructure/payment.link.controller";
import { PaymentLinkService } from "../../paymentsLinks/app/payment.link.service";
import { PaymentLinkMongoService } from "../../paymentsLinks/infrastructure/mongo/payment.link.mongo.service";


@Module({
  imports: [],
  controllers: [],
  providers: [StripeCustomerService,StripePaymentLinkService,StripeConnectionService,StripeHookService],
  exports:[StripePaymentLinkService]
})
export class StripeModule {

}

