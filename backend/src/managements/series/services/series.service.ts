import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Series } from '../entities/series.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeriesService {

    constructor(@InjectRepository(Series)
                private readonly seriesRepo:Repository<Series>) {
        
    }

    async getDataSeries() {
        try {
            const seriesData = await this.seriesRepo.find()
            return {
                data:seriesData
            }
        } catch(error) {
            console.error(error)
            throw new InternalServerErrorException({
                message:"service bi loi"
            })
        }
    }
}
