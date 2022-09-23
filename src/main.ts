import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from "@nestjs/platform-express";
import { ValidationPipe, VersioningType } from "@nestjs/common";
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import * as bodyParser from 'body-parser';
import * as basicAuth from 'express-basic-auth';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';



async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );


  app.useGlobalPipes(new ValidationPipe({ whitelist: false,transform: true }));
  //app.use(timeout('10000'));
  //app.use(haltOnTimedout);

  const microserviceTcp = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options:{
      host:'0.0.0.0',
      port:3003
    }
  });


  const options = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true
  };

  app.enableCors(options);
  app.use(bodyParser.json({ limit: '5000mb' }));
  app.use(bodyParser.urlencoded({ limit: '5000mb', extended: true }));


  app.enableVersioning({
    type: VersioningType.URI,
  });

  const config = new DocumentBuilder()
    .setTitle('Edify')
    .setDescription('Edify API DOCS')
    .addTag('Edify')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header'
      },
      'JWT-auth' // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build();


  //prueba

  app.use(
    ['/v1/docs', 'docs-json'],
    basicAuth({
        challenge: true,
        users: {
          [process.env.SWAGGER_USER]: process.env.SWAGGER_PASS
        }
      }
    )
  );


  const document = SwaggerModule.createDocument(app, config, {
    "deepScanRoutes": true,
  });


  SwaggerModule.setup('/v1/docs', app, document);

  await app.startAllMicroservices();

  await app.listen(3004);
}

bootstrap();
