import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";

@Entity()

export class Role{
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    title: string
    
    @OneToMany(()=>Users, ((users) => users.role))
    users:Users[]
    
}