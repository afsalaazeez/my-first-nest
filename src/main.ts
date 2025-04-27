import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; // 👈 import Swagger

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 👉 Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('Cats Example') // Title of API
    .setDescription('The Cats API description') // Description
    .setVersion('1.0') // Version
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // serve at /api

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new AllExceptionsFilter()); // 👈 Apply custom error filter

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
