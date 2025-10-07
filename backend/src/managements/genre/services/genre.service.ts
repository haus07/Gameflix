import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from '../entities/genre.entity';
import { Repository } from 'typeorm';
import { LoggerService } from 'src/utils/log_service.service';
import { GenreWithSeriesDto } from '../dtos/res/GenreWithSeriesDto.dto';
import { GenreWithGameMovieDto } from '../dtos/res/GenreWithGameMovieDto';

@Injectable()
export class GenreService {

    constructor(@InjectRepository(Genre)
    private readonly genreRepo: Repository<Genre>,
    private readonly logger:LoggerService) {
        
    }

    async fetchAllGenresWithMovies():Promise<GenreWithGameMovieDto[]> {
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
                    'game_movie.seriesId'
                ])
                .getMany()
            return dataAllGenresWithMovie ?? []
        } catch (error) {
            this.logger.error(error)
            return []
      }
    }

    async fetchAllWithSeries():Promise<GenreWithSeriesDto[]> {
        try {
            const dataAllGenreWithSeries = await this.genreRepo
            .createQueryBuilder('genre')
            .leftJoin('genre.series', 'series')
            .addSelect([
                'series.id',
                'series.poster'
            ])    
            .getMany()
        return dataAllGenreWithSeries ?? []
        } catch (error) {
            this.logger.error(error)
            return []
        }
    }
    
}
