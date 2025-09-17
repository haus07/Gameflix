import { Module } from '@nestjs/common';
import { SeriesService } from '../services/series.service';
import { SeriesController } from '../controllers/series.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Series } from '../entities/series.entity';
import { LoggerService } from 'src/utils/log_service.service';

@Module({
    imports: [TypeOrmModule.forFeature([Series])],
    controllers:[SeriesController],
    providers: [SeriesService,LoggerService],
    exports:[SeriesService]
})
export class SeriesModule {

}
