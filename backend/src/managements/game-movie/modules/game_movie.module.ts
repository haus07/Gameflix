import { Module } from '@nestjs/common';
import { GameMovieService } from '../services/game_movie.service';
import { GameMovieController } from '../controllers/game_movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameMovie } from '../entities/game_movie.entity';
import { LoggerService } from 'src/utils/log_service.service';

@Module({
  imports:[TypeOrmModule.forFeature([GameMovie])],
  controllers: [GameMovieController],
  providers: [GameMovieService,LoggerService],
})
export class GameMovieModule {}
