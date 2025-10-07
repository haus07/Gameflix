export class GameMovieDto {
    id: number
    title: string
    poster: string
    seriesId: number
}

export class GenreWithGameMovieDto{
    id: number
    title: string
    games: GameMovieDto[]   
}