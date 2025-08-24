import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../src/app.module';
import { GenreService } from '../../src/managements/genre/genre.service';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const configService = app.get(ConfigService);
console.log('DB_PASSWORD:', configService.get<string>('DB_PASSWORD'));

  const genreService = app.get(GenreService);
  await genreService.seedGenres();

  console.log('Seed genres completed!');
  await app.close();
}

bootstrap();
