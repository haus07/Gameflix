import { Module } from '@nestjs/common';
import { SeriesService } from './series.service';
import { SeriesController } from './series.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Series } from '../../entities/series.entity';
import { Genre } from '../../entities/genre.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Series,Genre])],
controllers: [SeriesController],
  providers: [SeriesService],
})
export class SeriesModule {}


