import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Series } from '../entities/series.entity';
import { Repository } from 'typeorm';
import { LoggerService } from 'src/utils/log_service.service';

@Injectable()
export class SeriesService {

    constructor(@InjectRepository(Series)
    private readonly seriesRepo: Repository<Series>,
    private readonly logger:LoggerService) {
        
    }

    async getDataSeries() {
        try {
            const data = await this.seriesRepo
                .createQueryBuilder('series')
                .orderBy("RANDOM()")
                .limit(10)
                .getMany()
          
            return {
                data
            }
        } catch(error) {
            this.logger.error(error)
            throw new InternalServerErrorException({
                message:"service bi loi"
            })
        }
    }

    async getDataSeriesById(id) {
        try {
            const data = this.seriesRepo
                .createQueryBuilder('series')
                .leftJoin('series.games', 'game_movie')
                .addSelect([
                    'game_movie.id',
                    'game_movie.title',
                    'game_movie.poster',
                    'game_movie.description'
                ])
                .where('series.id = :id', { id })
                .getMany()
            return data
        } catch (error) {
            this.logger.error(error)
        }
    }
}
