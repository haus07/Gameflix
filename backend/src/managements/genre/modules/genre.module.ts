import { Module } from '@nestjs/common';
import { GenreService } from '../services/genre.service';
import { GenreController } from '../controllers/genre.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from '../entities/genre.entity';
import { LoggerService } from 'src/utils/log_service.service';

@Module({
  imports:[TypeOrmModule.forFeature([Genre])],
  controllers: [GenreController],
  providers: [GenreService,LoggerService],
})
export class GenreModule {}
