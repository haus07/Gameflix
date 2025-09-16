import { Column, Entity, OneToMany, PrimaryGeneratedColumn ,CreateDateColumn,UpdateDateColumn,DeleteDateColumn, ManyToMany, JoinTable} from "typeorm";
import { GameMovie } from "src/managements/game-movie/entities/game_movie.entity";
import { Genre } from "src/managements/genre/entities/genre.entity";

@Entity({
    name:'series'
})
export class Series {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar' })
    title:string
    
    @Column({ type: 'varchar' })
    description: string

    @Column({ type: 'varchar' })
    poster: string
    
    @Column({ type: 'varchar' })
    trailerSource: string
    
    @Column({ type: 'varchar' })
    publisher: string
    
    @Column({ type: 'varchar' })
    developer: string
    
    @ManyToMany(() => Genre)
    @JoinTable()
    genre:Genre[]
    
    @OneToMany(() => GameMovie, (game) => game.series)
    games: GameMovie[]
    
    @Column()
    createdAt: Date
        
    @Column()
    updatedAt: Date
        
    @Column()
    deletedAt:Date
}