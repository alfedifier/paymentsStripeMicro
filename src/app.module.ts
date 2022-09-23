import { Module } from '@nestjs/common';
import { StripeModule } from "./stripe/infrastructure/stripe.module";
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.dev.env']
    }),
    StripeModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {

}
