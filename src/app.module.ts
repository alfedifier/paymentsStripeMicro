import { Module } from '@nestjs/common';
import { StripeModule } from "./stripe/infrastructure/stripe.module";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HealthController } from "./health.controller";
import { PaymentLinkMongoService } from "./paymentsLinks/infrastructure/mongo/payment.link.mongo.service";
import { MongooseModule } from "@nestjs/mongoose";
import { PaymentLink, PaymentLinkSchema } from "./paymentsLinks/domain/payment.link.schema";
import { PaymentLinkModule } from "./paymentsLinks/infrastructure/payment.link.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env']
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri:
          'mongodb://' +
          configService.get('MONGO_HOST') +
          ':' +
          configService.get('MONGO_PORT'),
        user: configService.get('MONGOUSER'),
        pass: configService.get('MONGOPASS'),
        dbName: configService.get('MONGODB')

      }),
      inject: [ConfigService]
    }),
    PaymentLinkModule
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {

}
