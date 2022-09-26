import { Module } from '@nestjs/common';
import { StripeModule } from "./stripe/infrastructure/stripe.module";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HealthController } from "./health.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.dev.env']
    }),
    StripeModule
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {

}
