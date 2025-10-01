import { GameMovie } from "../../game-movie/entities/game_movie.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Developer{
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    title: string
    
    @Column()
    logo: string
    
    @Column()
    linkWebsite: string
    
    //********Phan moi quan he***************/
    


    @Column()
    createdAt: Date
    
    @Column()
    updatedAt: Date


    //********** *********************************/
}