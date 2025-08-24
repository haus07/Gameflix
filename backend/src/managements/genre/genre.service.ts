import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from '../../entities/genre.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GenreService {
    constructor(@InjectRepository(Genre)
    private readonly genreRepo: Repository<Genre>) {
        
    }

    async seedGenres() {
        const genres = ['Action', 'RPG', 'FPS', 'OpenWorld', 'Sport'];

        for (const title of genres) {
            const exist = await this.genreRepo.findOneBy({ title });
            if (!exist) {
                const gerne = this.genreRepo.create({ title });
                await this.genreRepo.save(gerne);
                console.log(`Inserted genre: ${title}`);
            } else {
                console.log(`Genre exists: ${title}`);
            }
        }
    }
}
