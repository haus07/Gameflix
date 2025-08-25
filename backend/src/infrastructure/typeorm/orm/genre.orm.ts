import { Column, Entity, PrimaryGeneratedColumn,DeleteDateColumn,UpdateDateColumn,CreateDateColumn } from "typeorm";

@Entity({
    name:'genre'
})
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