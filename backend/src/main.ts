import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as dotenv from 'dotenv'
import {  ConfigService } from '@nestjs/config';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)

  app.enableCors({
    origin: configService.get<string>('FRONTEND_URL')||'http://localhost:3000',
    credentials: true
  })

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v'
  })
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }))
  await app.listen(configService.get<number>('PORT') || 4000);
}
bootstrap();
