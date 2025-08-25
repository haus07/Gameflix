import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from '../../infrastructure/typeorm/orm/genre.orm';

@Module({
  imports:[TypeOrmModule.forFeature([Genre])],
  controllers: [GenreController],
  providers: [GenreService],
  exports:[GenreService]
})
export class GenreModule {}
