import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { GenreService } from '../services/genre.service';
import { LoggerService } from 'src/utils/log_service.service';
import { Genre } from '../entities/genre.entity';

@Controller({
  path: 'genres',
  version: '1',
})
export class GenreController {
  constructor(
    private readonly genreService: GenreService,
    private readonly logger: LoggerService,
  ) {}

  @Get('home')
  async handleGetAllGenresWithMovies(@Res() res) {
    try {
      const dataGetAllGenresWithMovies =
        await this.genreService.fetchAllGenresWithMovies();
      return res.status(HttpStatus.OK).json({
        message: 'success',
        data: dataGetAllGenresWithMovies,
      });
    } catch (error) {
      this.logger.error('Error in GET/home genres', error);
    }
  }

  @Get('home/series')
  async handleGetAllGenresWithSeries(@Res() res):Promise<void>{
    try {
      const dataGetAllGenresWithSeries =await this.genreService.fetchAllWithSeries();
      return res.status(HttpStatus.OK).json({
        message: 'success',
        data: dataGetAllGenresWithSeries,
      });
    } catch (error) {}
  }
}
