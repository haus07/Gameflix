import { AppDataSource } from "../data-source";
import { GameMovie } from "../managements/game-movie/entities/game_movie.entity";
import { Genre } from "../managements/genre/entities/genre.entity";

export const updateEldenRingGenre = async () => {
  await AppDataSource.initialize();

  const gameRepo = AppDataSource.getRepository(GameMovie);
  const genreRepo = AppDataSource.getRepository(Genre);

  // Lấy game Elden Ring
  const eldenRing = await gameRepo.findOne({
    where: { title: "Grand Threft Auto V" },
    relations: ["genre"],
  });

  if (!eldenRing) {
    console.log("⚠️ Không tìm thấy game Elden Ring!");
    return;
  }

  // Lấy genre Adventure
  let adventure = await genreRepo.findOne({ where: { title: "RPG" } });

  if (!adventure) {
    // Nếu chưa có, tạo mới
    adventure = genreRepo.create({
      title: "Adventure",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    adventure = await genreRepo.save(adventure);
  }

  // Kiểm tra xem game đã có genre Adventure chưa
  const hasAdventure = eldenRing.genre.some((g) => g.id === adventure!.id);
  if (!hasAdventure) {
    eldenRing.genre.push(adventure);
    await gameRepo.save(eldenRing);
    console.log("✅ Đã thêm genre!");
  } else {
    console.log("ℹ️ Elden Ring đã có genre Adventure.");
  }
};

updateEldenRingGenre();
