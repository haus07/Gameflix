import { Column, Entity, PrimaryGeneratedColumn,DeleteDateColumn,UpdateDateColumn,CreateDateColumn } from "typeorm";
import { Series } from "./series.entity";

@Entity()
export class Genre{
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({type:'varchar'})
    title: string
    
    @CreateDateColumn()
        createdAt: Date
        
    @UpdateDateColumn()
        updatedAt: Date
        
    @DeleteDateColumn()
        deleteAt:Date
}