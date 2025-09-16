import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Genre } from "src/managements/genre/entities/genre.entity";
import { Series } from "src/managements/series/entities/series.entity";

@Entity({
    name:'game_movie'
})
export class GameMovie{
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
    
    
  
    
    @ManyToOne(() => Series, (series) => series.games)
    series: Series

    @ManyToMany(() => Genre)
    @JoinTable()
    genre:Genre[]

    @CreateDateColumn()
    createdAt: Date
    
    @UpdateDateColumn()
    updatedAt: Date
    
    @DeleteDateColumn()
    deletedAt:Date
}