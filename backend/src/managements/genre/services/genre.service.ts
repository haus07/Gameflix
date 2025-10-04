import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from '../entities/genre.entity';
import { Repository } from 'typeorm';
import { LoggerService } from 'src/utils/log_service.service';

@Injectable()
export class GenreService {

    constructor(@InjectRepository(Genre)
    private readonly genreRepo: Repository<Genre>,
    private readonly logger:LoggerService) {
        
    }

    async fetchAllGenresWithMovies() {
        try {
            const dataAllGenresWithMovie = await this.genreRepo
                .createQueryBuilder('genre')
                .leftJoinAndSelect('genre.games', 'game_movie')
                .select([
                    'genre.id',
                    'genre.title',
                    'game_movie.id',
                    'game_movie.title',
                    'game_movie.poster',
                    'game_movie.seriesId',
                    'game_movie.updatedAt'
                ])
                .getMany()
            return dataAllGenresWithMovie.length === 0 ? [] : dataAllGenresWithMovie
        } catch (error) {
            this.logger.error(error)
      }
    }
    
}
