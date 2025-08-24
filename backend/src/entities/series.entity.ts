import { Column, Entity, OneToMany, PrimaryGeneratedColumn ,CreateDateColumn,UpdateDateColumn,DeleteDateColumn, ManyToMany, JoinTable} from "typeorm";
import { GameMovie } from "./game-movie.entity";
import { Genre } from "./genre.entity";

@Entity()
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
    
    @CreateDateColumn()
    createdAt: Date
        
    @UpdateDateColumn()
    updatedAt: Date
        
    @DeleteDateColumn()
    deleteAt:Date
}