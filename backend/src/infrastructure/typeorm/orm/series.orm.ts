import { Column, Entity, OneToMany, PrimaryGeneratedColumn ,CreateDateColumn,UpdateDateColumn,DeleteDateColumn, ManyToMany, JoinTable} from "typeorm";
import {  GameMovieOrmEntity } from "./game-movie.orm";
import { Genre } from "./genre.orm";

@Entity({
    name:'series'
})
export class SeriesOrmEntity {
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
    
    @OneToMany(() => GameMovieOrmEntity, (game) => game.series)
    games: GameMovieOrmEntity[]
    
    @CreateDateColumn()
    createdAt: Date
        
    @UpdateDateColumn()
    updatedAt: Date
        
    @DeleteDateColumn()
    deleteAt:Date
}