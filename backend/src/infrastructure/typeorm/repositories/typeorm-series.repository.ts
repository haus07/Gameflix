import { Injectable } from "@nestjs/common";
import { ISeriesRepository } from "src/domain/repositories/series.repository";
import { Repository } from "typeorm";
import { SeriesOrmEntity } from "../orm/series.orm";
import { Series } from "src/domain/models/series.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()

export class TypeormSeriesRepository implements ISeriesRepository{
    constructor(@InjectRepository(SeriesOrmEntity) private readonly seriesRepo:Repository<SeriesOrmEntity>) {
        
    }

    private toDomain(e: SeriesOrmEntity): Series{
        return new Series(
            e.id, e.title,e.description, e.poster, e.trailerSource, e.publisher, e.developer
        )
    }

    async getAllSeries(): Promise<Series[]> {
        const rows = await this.seriesRepo.find()
        return rows.map((e)=>this.toDomain(e))
    }
}