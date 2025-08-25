import { Module } from '@nestjs/common';
import { SeriesService } from './series.service';
import { SeriesController } from './series.controller';
import { TypeormModule } from 'src/infrastructure/typeorm/typeorm.module';

@Module({
  imports:[TypeormModule],
controllers: [SeriesController],
  providers: [SeriesService],
})
export class SeriesModule {}


