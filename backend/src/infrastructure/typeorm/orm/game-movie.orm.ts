import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Genre } from "./genre.orm";
import { SeriesOrmEntity } from "./series.orm";

@Entity({
    name:'game_movie'
})
export class GameMovieOrmEntity{
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({ type: 'varchar' })
    title: string
    
    @Column({ type: 'varchar' })
    poster: string
    
    @Column({ type: 'varchar' })
    backdrop: string
    
    @Column({ type: 'varchar' })
    desciption: string
    
    @Column({ type: 'float' })
    rating: number
    
    @Column({ type: 'varchar' })
    year: string
    
    @Column({ type: 'varchar' })
    mainSource: string
    
    @Column({ type: 'varchar' })
    trailerSource: string

    @Column({ type: 'varchar' })
    developer: string
    
    @Column({ type: 'varchar' })
    publisher: string
    
    
  
    
    @ManyToOne(() => SeriesOrmEntity, (series) => series.games)
    series: SeriesOrmEntity

    @ManyToMany(() => Genre)
    @JoinTable()
    genre:Genre[]

    @CreateDateColumn()
    createdAt: Date
    
    @UpdateDateColumn()
    updatedAt: Date
    
    @DeleteDateColumn()
    deleteAt:Date
}