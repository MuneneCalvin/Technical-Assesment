// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  // Configuration
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  // Logger
  app.useLogger(app.get(Logger));

  // Global validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('Data Ingestion API')
    .setDescription('API for ingesting and querying JSON data from S3')
    .setVersion('1.0')
    .addTag('data')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // CORS (adjust as needed)
  app.enableCors();

  await app.listen(port);
  app.get(Logger).log(`Application is running on port ${port}`);
}

bootstrap();