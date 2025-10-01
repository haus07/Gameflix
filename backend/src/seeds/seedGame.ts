import { AppDataSource } from "../data-source";
import { GameMovie } from "../managements/game-movie/entities/game_movie.entity";
import { Series } from "../managements/series/entities/series.entity";
import { Genre } from "../managements/genre/entities/genre.entity";

export const spiderManSeed = async () => {
  await AppDataSource.initialize();
  const gameMovieRepo = AppDataSource.getRepository(GameMovie);
  const seriesRepo = AppDataSource.getRepository(Series);
  const genreRepo = AppDataSource.getRepository(Genre);

  // Kiểm tra có series Spider-Man chưa, nếu chưa thì tạo
  let series = await seriesRepo.findOne({ where: { title: "Elden Ring" } });
  if (!series) {
    series = seriesRepo.create({
      title: "Spider-Man",
      description: "Series game hành động siêu anh hùng dựa trên Marvel Spider-Man.",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    series = await seriesRepo.save(series);
  }

  // Kiểm tra có genre Superhero chưa, nếu chưa thì tạo
  let superhero = await genreRepo.findOne({ where: { title: "RPG" } });
  if (!superhero) {
    superhero = genreRepo.create({
      title: "Adventure",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    superhero = await genreRepo.save(superhero);
  }

  // Spider-Man 2 demo
  const spiderMan2 = {
    title: "Elden Ring",
    poster: "https://placehold.co/600x900",
    backdrop: "spiderman2-backdrop.jpg",
    description: "Tiếp tục hành trình của Người Nhện trong một cuộc phiêu lưu mới.",
    rating: 9.0,
    year: "2023",
    mainSource: "spiderman-2.exe",
    trailerSource: "https://youtube.com/watch?v=dummy_spiderman2",
  };

  // Tạo entity
  const gameEntity = gameMovieRepo.create({
    ...spiderMan2,
    series: series,
    genre: [superhero],
  });

  await gameMovieRepo.save(gameEntity);

  console.log("✅ RS4 thành công!");
};

spiderManSeed();
