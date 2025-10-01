import { Controller, Get, HttpStatus, Param, ParseIntPipe, Res } from '@nestjs/common';
import { GameMovieService } from '../services/game_movie.service';
import { LoggerService } from 'src/utils/log_service.service';

@Controller({
  path: 'game-movie',
  version:'1'
})
export class GameMovieController {
  constructor(private readonly gameMovieService: GameMovieService,
              private readonly logger:LoggerService
  ) {
    
  }

  @Get('')
  async handleGameData(@Res() res) {
    try {
      const gameInfomation = await this.gameMovieService.getDataGames()
    return res.status(HttpStatus.OK).json({
      message: 'success',
      data:gameInfomation
    })
    } catch (error) {
      this.logger.error("Error in get game data ",error)
    }
  }
  
  @Get('random-movie')
  async handleGetRandomMovie(@Res() res) {
    try {
      const randomGameInformation = await this.gameMovieService.getRandomMovie()
      return res.status(HttpStatus.OK).json({
        message: "success",
        data:randomGameInformation
      })
    }catch(error) {
      this.logger.error("Error in GET/random-movie game-movie",error)
    }
  }

  @Get(':id')
  async handleOneGameDataById(@Param('id', ParseIntPipe) id:number,
                              @Res() res) {
    try {
      const gameInfomation = await this.gameMovieService.getOneDataGameById(id)
      return res.status(HttpStatus.OK).json({
        message: "success",
        data:gameInfomation
      })
    } catch(error) {
      this.logger.error("Error in GET/:id gameData",error)
    }
  }
  
}
