import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameMovie } from '../entities/game_movie.entity';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';

@Injectable()
export class GameMovieService {

    constructor(@InjectRepository(GameMovie)
    private readonly gameRepo: Repository<GameMovie>) {
        
    }

    async getDataGames() {
        try {
            const gamesData = await this.gameRepo
                .createQueryBuilder("game_movie")
                .orderBy("RANDOM()")
                .limit(10)
                .getMany()
            return {
                data: gamesData
            }
        } catch (error) {
            throw new InternalServerErrorException("Server error")
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
            throw new InternalServerErrorException("Server error")
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
            throw new InternalServerErrorException("Server error")
        }
    }
}
