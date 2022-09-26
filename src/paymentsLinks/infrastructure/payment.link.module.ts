import { Module } from "@nestjs/common";
import { PaymentLinkController } from "./payment.link.controller";
import { PaymentLinkService } from "../app/payment.link.service";
import { StripeModule } from "../../stripe/infrastructure/stripe.module";
import { PaymentLinkMongoService } from "./mongo/payment.link.mongo.service";
import { MongooseModule } from "@nestjs/mongoose";
import { PaymentLink, PaymentLinkSchema } from "../domain/payment.link.schema";


//prueba2
@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: PaymentLink.name,
        useFactory: () => {
          return PaymentLinkSchema;
        }
      }
    ]),
    StripeModule
  ],
  controllers: [PaymentLinkController],
  providers: [PaymentLinkService,PaymentLinkMongoService],
})
export class PaymentLinkModule {}
