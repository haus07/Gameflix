import { AuthModule } from "src/managements/auth/modules/auth.module";
import { ChatGatewayModule } from "src/managements/chat-gateway/chat-gateway.module";
import { GameMovieModule } from "src/managements/game-movie/modules/game_movie.module";
import { GenreModule } from "src/managements/genre/modules/genre.module";
import { SeriesModule } from "src/managements/series/modules/series.module";
import { UsersModule } from "src/managements/users/modules/users.module";

export const ManagementPortalImports = [
    SeriesModule,
    GameMovieModule,
    GenreModule,
    ChatGatewayModule,
    UsersModule,
    AuthModule
]