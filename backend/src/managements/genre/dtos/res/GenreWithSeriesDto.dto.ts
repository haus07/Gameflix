export class SeriesDto{
    id: number
    poster:string
}

export class GenreWithSeriesDto{
    id: number
    title: string
    series:SeriesDto[]
}

