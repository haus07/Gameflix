import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { LoggerService } from './utils/log_service.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LoggerService(),
    bufferLogs:true
  });
  
  app.use(helmet())
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials:true
  })

  app.enableVersioning({
    type: VersioningType.URI,
    prefix:'api/v'
  })

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform:true
  }))


  
  await app.listen(process.env.PORT ?? 3000);


}
bootstrap();
