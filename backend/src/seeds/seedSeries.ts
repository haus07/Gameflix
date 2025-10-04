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
      title: 'Mario Kart',
      description: 'Series game kinh dị sinh tồn nổi tiếng của Capcom.',
      poster: 'https://placehold.co/600x900',
      trailerSource: 'https://youtube.com/watch?v=dummy1',
      createdAt: now,
      updatedAt: now,
      genres: [ genreMap['Racing']].filter(Boolean),
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
