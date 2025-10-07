import { GameMovie } from "src/managements/game-movie/entities/game_movie.entity";
import { Series } from "src/managements/series/entities/series.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'genre' })
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  title: string;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt?: Date | null;
  
  @ManyToMany(() => GameMovie, (game) => game.genre)
  games:GameMovie[]

  @ManyToMany(() => Series, (series) => series.genres)
  series:Series[]

}
