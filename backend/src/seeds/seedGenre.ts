import { AppDataSource } from "../data-source"
import { Genre } from "../managements/genre/entities/genre.entity";

const now = new Date();

const genresData = [
  { title: "Horror", createdAt: now, updatedAt: now, deletedAt: null },
  { title: "Racing", createdAt: now, updatedAt: now, deletedAt: null },
  { title: "Superhero", createdAt: now, updatedAt: now, deletedAt: null },
  { title: "Adventure", createdAt: now, updatedAt: now, deletedAt: null },
  { title: "Shooter", createdAt: now, updatedAt: now, deletedAt: null },
  { title: "RPG", createdAt: now, updatedAt: now, deletedAt: null },
];

async function seedGenres() {
  await AppDataSource.initialize();
  const genreRepo = AppDataSource.getRepository(Genre);

  await genreRepo.save(genresData);

  console.log("Seed genres done!");
  await AppDataSource.destroy();
}

seedGenres();