import { AppDataSource } from "../data-source";
import { GameMovie } from "../managements/game-movie/entities/game_movie.entity";
import { Series } from "../managements/series/entities/series.entity";
import { Genre } from "../managements/genre/entities/genre.entity";

export const spiderManSeed = async () => {
  await AppDataSource.initialize();
  const gameMovieRepo = AppDataSource.getRepository(GameMovie);
  const seriesRepo = AppDataSource.getRepository(Series);
  const genreRepo = AppDataSource.getRepository(Genre);

  // Kiểm tra có series DC chưa, nếu chưa thì tạo
  let series = await seriesRepo.findOne({ where: { title: "Grand Threft Auto" } });
  if (!series) {
    series = seriesRepo.create({
      title: "DC",
      description: "Series game hành động siêu anh hùng.",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    series = await seriesRepo.save(series);
  }

  // Kiểm tra / tạo genres
  const genreTitles = ["Shooter","RPG"];
  const genres: Genre[] = [];

  for (const title of genreTitles) {
    let genre = await genreRepo.findOne({ where: { title } });
    if (!genre) {
      genre = genreRepo.create({
        title,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      genre = await genreRepo.save(genre);
    }
    genres.push(genre);
  }

  // Game demo
  const spiderMan2 = {
    title: "Grand Threft Auto IV",
    poster: "https://placehold.co/600x900",
    backdrop: "spiderman2-backdrop.jpg",
    description: "Tiếp tục hành trình của Người Nhện trong một cuộc phiêu lưu mới.",
    rating: 9.0,
    year: "2023",
    mainSource: "spiderman-2.exe",
    trailerSource: "https://youtube.com/watch?v=dummy_spiderman2",
  };

  // Tạo entity với nhiều genre
  const gameEntity = gameMovieRepo.create({
    ...spiderMan2,
    series,
    genre: genres,
  });

  await gameMovieRepo.save(gameEntity);

  console.log("✅ seed game 2 genre thành công!");
};

spiderManSeed();
