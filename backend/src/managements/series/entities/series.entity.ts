import { Column, Entity, OneToMany, PrimaryGeneratedColumn , ManyToMany, JoinTable} from "typeorm";
import { GameMovie } from "../../game-movie/entities/game_movie.entity";
import { Genre } from "../../genre/entities/genre.entity";

@Entity({
    name:'series'
})
export class Series {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar' })
    title:string
    
    @Column({ type: 'varchar' })
    description: string;

    @Column({ type: 'varchar' })
    poster: string
    
    @Column({ type: 'varchar' })
    trailerSource: string
      
    @ManyToMany(() => Genre,(genre)=>genre.series)
    @JoinTable()
    genres:Genre[]
    
    @OneToMany(() => GameMovie, (game) => game.series)
    games: GameMovie[]
    
    @Column()
    createdAt: Date
        
    @Column()
    updatedAt: Date
        
   
}