import { Column, Entity, PrimaryGeneratedColumn,DeleteDateColumn,UpdateDateColumn,CreateDateColumn } from "typeorm";

@Entity({
    name:'genre'
})
export class Genre{
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({type:'varchar'})
    title: string
    
    @Column()
        createdAt: Date
        
    @Column()
        updatedAt: Date
        
    @Column()
        deleteAt:Date
}