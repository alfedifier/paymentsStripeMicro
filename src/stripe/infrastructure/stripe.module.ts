


import { Module } from '@nestjs/common';
import { StripeCustomerService } from "./service/stripe.customer.service";
import { StripePaymentLinkService } from "./service/stripe.paymentLink.service";
import { StripeConnectionService } from "./service/stripe.connection.service";
import { StripeHookService } from "./service/stripe.hook.service";
import { PaymentLinkController } from "../../paymentsLinks/infrastructure/payment.link.controller";
import { PaymentLinkService } from "../../paymentsLinks/app/payment.link.service";


@Module({
  imports: [],
  controllers: [PaymentLinkController],
  providers: [PaymentLinkService,StripeCustomerService,StripePaymentLinkService,StripeConnectionService,StripeHookService],
})
export class StripeModule {

}

