import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SeriesOrmEntity } from "./orm/series.orm";
import { TypeormSeriesRepository } from "./repositories/typeorm-series.repository";
import { ISeriesRepository, ISeriesRepositoryToken } from 'src/domain/repositories/series.repository';


@Module({
    imports: [
        TypeOrmModule.forFeature([
            SeriesOrmEntity
        ])
    ],
    providers: [
        {
            provide: ISeriesRepositoryToken,
            useClass: TypeormSeriesRepository
        }
    ],
    exports: [
        ISeriesRepositoryToken
    ]
})

export class TypeormModule {}