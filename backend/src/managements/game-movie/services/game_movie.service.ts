import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameMovie } from '../entities/game_movie.entity';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';
import { LoggerService } from 'src/utils/log_service.service';

@Injectable()
export class GameMovieService {

    constructor(@InjectRepository(GameMovie)
    private readonly gameRepo: Repository<GameMovie>,
    private readonly logger:LoggerService) {
        
    }

    async getDataGames():Promise<GameMovie[]> {
        try {
            const gamesData = await this.gameRepo
                .createQueryBuilder("game_movie")
                .orderBy("RANDOM()")
                .limit(10)
                .getMany()
            return gamesData ?? null
        } catch (error) {
            this.logger.error(error)
            return []
        }
    }

    async getOneDataGameById(id: number): Promise<GameMovie | null> {
        try {
            const gameData = await this.gameRepo.findOne({
                where: {
                    id
                }
            })
            if (!gameData) {
                throw new NotFoundError("Không tìm thấy game ")
            }
            return gameData
        } catch (error) {
            this.logger.error(error)
            return null
        }
    }

    async getRandomMovie(): Promise<GameMovie | null>{
        try {
            const count = await this.gameRepo.count()
            if (count === 0) return null
            const randomIndex = Math.floor(Math.random() * count)
            const [movie] = await this.gameRepo.find({
                skip: randomIndex,
                take:1
            })
            return movie
        } catch (error) {
            this.logger.error(error)
            return null
        }
    }
}
