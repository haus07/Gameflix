import { AppDataSource } from "../data-source";
import { Series } from "../managements/series/entities/series.entity";
import { Genre } from "../managements/genre/entities/genre.entity";


const now = new Date();

async function seedSeries() {
  await AppDataSource.initialize();
  const seriesRepo = AppDataSource.getRepository(Series);
  const genreRepo = AppDataSource.getRepository(Genre);

  // Lấy tất cả genre trước
  const genres = await genreRepo.find();

  // Map dễ lấy genre theo title
  const genreMap: Record<string, Genre> = {};
  genres.forEach(g => { genreMap[g.title] = g });

  const seriesList: Partial<Series>[] = [
    {
      title: 'Resident Evil',
      description: 'Series game kinh dị sinh tồn nổi tiếng của Capcom.',
      poster: 'https://placehold.co/600x900',
      trailerSource: 'https://youtube.com/watch?v=dummy1',
      createdAt: now,
      updatedAt: now,
      genres: [genreMap['Action'], genreMap['Shooter']].filter(Boolean),
    },
    {
      title: 'Red Dead Redemption',
      description: 'Series JRPG kinh điển với nhiều phần được yêu thích toàn cầu.',
      poster: 'https://placehold.co/600x900',
      trailerSource: 'https://youtube.com/watch?v=dummy4',
      createdAt: now,
      updatedAt: now,
      genres: [genreMap['Adventure']].filter(Boolean),
    },
    {
      title: 'Call of Duty',
      description: 'Series FPS nổi tiếng với lối chơi hành động kịch tính.',
      poster: 'https://placehold.co/600x900',
      trailerSource: 'https://youtube.com/watch?v=dummy5',
      createdAt: now,
      updatedAt: now,
      genres: [genreMap['Shooter'], genreMap['Action']].filter(Boolean),
    },
    {
      title: 'Grand Threft Auto',
      description: 'Biểu tượng game bắn súng sci-fi của Xbox.',
      poster: 'https://placehold.co/600x900',
      trailerSource: 'https://youtube.com/watch?v=dummy6',
      createdAt: now,
      updatedAt: now,
      genres: [genreMap['Shooter'], genreMap['Adventure']].filter(Boolean),
    },
    {
      title: 'The Witcher',
      description: 'Series nhập vai hành động dựa trên tiểu thuyết Ba Lan.',
      poster: 'https://placehold.co/600x900',
      trailerSource: 'https://youtube.com/watch?v=dummy9',
      createdAt: now,
      updatedAt: now,
      genres: [genreMap['RPG'], genreMap['Adventure']].filter(Boolean),
    },
    {
      title: 'Elden Ring',
      description: 'Bom tấn nhập vai thế giới mở của FromSoftware.',
      poster: 'https://placehold.co/600x900',
      trailerSource: 'https://youtube.com/watch?v=dummy10',
      createdAt: now,
      updatedAt: now,
      genres: [genreMap['RPG'], genreMap['Adventure']].filter(Boolean),
    },
    {
      title: 'Forza',
      description: 'Series game đua xe nổi tiếng của Microsoft.',
      poster: 'https://placehold.co/600x900',
      trailerSource: 'https://youtube.com/watch?v=dummy2',
      createdAt: now,
      updatedAt: now,
      genres: [genreMap['Racing']].filter(Boolean),
    },
    {
      title: 'Marvel Avengers',
      description: 'Game hành động nhập vai lấy bối cảnh vũ trụ Marvel.',
      poster: 'https://placehold.co/600x900',
      trailerSource: 'https://youtube.com/watch?v=dummy3',
      createdAt: now,
      updatedAt: now,
      genres: [genreMap['Superhero']].filter(Boolean),
    },
    {
      title: 'DC',
      description: 'Huyền thoại phiêu lưu nhập vai của Nintendo.',
      poster: 'https://placehold.co/600x900',
      trailerSource: 'https://youtube.com/watch?v=dummy7',
      createdAt: now,
      updatedAt: now,
      genres: [genreMap['Superhero']].filter(Boolean),
    },
    {
      title: 'Assassin’s Creed',
      description: 'Game hành động lén lút lấy bối cảnh lịch sử.',
      poster: 'https://placehold.co/600x900',
      trailerSource: 'https://youtube.com/watch?v=dummy8',
      createdAt: now,
      updatedAt: now,
      genres: [genreMap['Adventure']].filter(Boolean),
    },
  ];

  for (const s of seriesList) {
    const exist = await seriesRepo.findOneBy({ title: s.title });
    if (!exist) {
      await seriesRepo.save(s);
      console.log(`✅ Created series: ${s.title}`);
    } else {
      console.log(`ℹ️ Series already exists: ${s.title}`);
    }
  }

  await AppDataSource.destroy();
}

seedSeries();
