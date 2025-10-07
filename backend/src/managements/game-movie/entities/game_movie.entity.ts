import { Column, CreateDateColumn,  Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Genre } from "../../genre/entities/genre.entity"
import { Series } from "../../series/entities/series.entity";

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
    description: string
    
    @Column({
        type: 'float',
        default:0
    })
    rating: number
    
    @Column({ type: 'varchar' })
    year: string
    
    @Column({ type: 'varchar' })
    mainSource: string
    
    @Column({ type: 'varchar' })
    trailerSource: string


    //Phan nay them vao de lay seriesId
    @Column({ nullable: true })
    seriesId:number

    //********Phan moi quan he***************/
    @ManyToOne(() => Series, (series) => series.games)
    @JoinColumn({ name:'seriesId' })
    series: Series

    @ManyToMany(() => Genre, (genre) => genre.games, {cascade:true})
    @JoinTable()
    genre: Genre[] 
//*******************************************/
    @CreateDateColumn()
    createdAt: Date
    
    @UpdateDateColumn()
    updatedAt: Date
    
}