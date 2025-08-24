import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Series } from '../../entities/series.entity';
import { Repository } from 'typeorm';
import { Genre } from '../../entities/genre.entity';

@Injectable()
export class SeriesService {
    constructor(@InjectRepository(Series)
    private readonly seriesRepo: Repository<Series>,
    @InjectRepository(Genre)
    private readonly genreRepo:Repository<Genre>) {
        
    }

    async seedSeries() {
       const seriesList = [
  {
    title: 'Resident Evil',
    description: 'Series game kinh dị sinh tồn nổi tiếng của Capcom.',
    poster: 'https://placehold.co/600x900',
    trailerSource: 'https://youtube.com/watch?v=dummy1',
    publisher: 'Capcom',
    developer: 'Capcom',
  },
  {
    title: 'Forza',
    description: 'Series game đua xe nổi tiếng của Microsoft.',
    poster: 'https://placehold.co/600x900',
    trailerSource: 'https://youtube.com/watch?v=dummy2',
    publisher: 'Xbox Game Studios',
    developer: 'Playground Games',
  },
  {
    title: 'Marvel Avengers',
    description: 'Game hành động nhập vai lấy bối cảnh vũ trụ Marvel.',
    poster: 'https://placehold.co/600x900',
    trailerSource: 'https://youtube.com/watch?v=dummy3',
    publisher: 'Square Enix',
    developer: 'Crystal Dynamics',
  },
  {
    title: 'Final Fantasy',
    description: 'Series JRPG kinh điển với nhiều phần được yêu thích toàn cầu.',
    poster: 'https://placehold.co/600x900',
    trailerSource: 'https://youtube.com/watch?v=dummy4',
    publisher: 'Square Enix',
    developer: 'Square Enix',
  },
  {
    title: 'Call of Duty',
    description: 'Series FPS nổi tiếng với lối chơi hành động kịch tính.',
    poster: 'https://placehold.co/600x900',
    trailerSource: 'https://youtube.com/watch?v=dummy5',
    publisher: 'Activision',
    developer: 'Infinity Ward / Treyarch',
  },
  {
    title: 'Halo',
    description: 'Biểu tượng game bắn súng sci-fi của Xbox.',
    poster: 'https://placehold.co/600x900',
    trailerSource: 'https://youtube.com/watch?v=dummy6',
    publisher: 'Xbox Game Studios',
    developer: '343 Industries',
  },
  {
    title: 'The Legend of Zelda',
    description: 'Huyền thoại phiêu lưu nhập vai của Nintendo.',
    poster: 'https://placehold.co/600x900',
    trailerSource: 'https://youtube.com/watch?v=dummy7',
    publisher: 'Nintendo',
    developer: 'Nintendo',
  },
  {
    title: 'Assassin’s Creed',
    description: 'Game hành động lén lút lấy bối cảnh lịch sử.',
    poster: 'https://placehold.co/600x900',
    trailerSource: 'https://youtube.com/watch?v=dummy8',
    publisher: 'Ubisoft',
    developer: 'Ubisoft',
  },
  {
    title: 'The Witcher',
    description: 'Series nhập vai hành động dựa trên tiểu thuyết Ba Lan.',
    poster: 'https://placehold.co/600x900',
    trailerSource: 'https://youtube.com/watch?v=dummy9',
    publisher: 'CD Projekt',
    developer: 'CD Projekt Red',
  },
  {
    title: 'Elden Ring',
    description: 'Bom tấn nhập vai thế giới mở của FromSoftware.',
    poster: 'https://placehold.co/600x900',
    trailerSource: 'https://youtube.com/watch?v=dummy10',
    publisher: 'Bandai Namco',
    developer: 'FromSoftware',
  },
];


        for (const series of seriesList) {
            const exist = await this.seriesRepo.findOneBy({
                title:series.title
            })
            if (!exist) {
                const seriesData = this.seriesRepo.create(
                   series
                )
                await this.seriesRepo.save(series)
                console.log(`Thanh cong : ${series.title}`)
            } else[
                console.log(`${series.title} da co trong database`)
            ]
        }
    }

     async seedSeriesGenres() {
    const action = await this.genreRepo.findOneBy({ title: 'Action' });
    const rpg = await this.genreRepo.findOneBy({ title: 'RPG' });
    const fps = await this.genreRepo.findOneBy({ title: 'FPS' });
    const openWorld = await this.genreRepo.findOneBy({ title: 'OpenWorld' });

    const updateSeriesGenres = async (title: string, genres: Genre[]) => {
      const series = await this.seriesRepo.findOne({
        where: { title },
        relations: ['genre'],
      });
      if (series) {
        series.genre = genres;
        await this.seriesRepo.save(series);
        console.log(
          `✅ Updated ${title} with genres: ${genres
            .map((g) => g.title)
            .join(', ')}`,
        );
      }
    };

    await updateSeriesGenres('Resident Evil', [action!, fps!]);
    await updateSeriesGenres('Final Fantasy', [rpg!]);
    await updateSeriesGenres('Mass Effect', [rpg!, openWorld!]);
    await updateSeriesGenres('The Witcher', [rpg!, openWorld!]);
    await updateSeriesGenres('Call of Duty', [fps!, action!]);
    await updateSeriesGenres('Halo', [fps!, openWorld!]);
    await updateSeriesGenres('Elder Scrolls', [rpg!, openWorld!]);
    await updateSeriesGenres('Grand Theft Auto', [openWorld!, action!]);
    await updateSeriesGenres('Dark Souls', [rpg!, action!]);
    await updateSeriesGenres('Cyberpunk 2077', [rpg!, openWorld!, action!]);

    console.log('🎉 All series updated with genres!');
  }


}
