import { GameMovieModule } from "src/managements/game-movie/modules/game_movie.module";
import { GenreModule } from "src/managements/genre/modules/genre.module";
import { SeriesModule } from "src/managements/series/modules/series.module";

export const ManagementPortalImports = [
    SeriesModule,
    GameMovieModule,
    GenreModule
]