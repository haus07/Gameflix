import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Users } from "./users.entity";

@Entity()

export class Role{
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    title: string
    
    @OneToMany(()=>Users, ((users) => users.role))
    users:Users[]
    
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedAt?: Date | null;
}