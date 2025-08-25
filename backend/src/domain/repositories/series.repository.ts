import { Series } from "../models/series.entity"

export const ISeriesRepositoryToken = Symbol('ISeriesRepository')


export interface ISeriesRepository{
    getAllSeries():Promise<Series[]>
}

