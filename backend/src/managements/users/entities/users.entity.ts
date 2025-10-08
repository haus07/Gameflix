import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserStatus } from "../enums/userStatus.enum";
import { ProviderLogin } from "../enums/proviederLogin.enum";
import { Role } from "./role.entity";

@Entity()

export class Users{
    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @Column({
        unique: true,
        type: 'varchar',
        length:256
    })
    username: string
    
    @Exclude()
    @Column({
        type: 'varchar',
        default:null
    })
    password: string
    
    @Column({
        unique: true,
        type: 'varchar',
        default:null
    })
    email: string
    
    @Column({
        unique: true,
        type: 'varchar',
        default:null
    })
    phone: string
    
    @Column({
        type: 'enum',
        enum: UserStatus,
        default:UserStatus.ACTIVE
    })
    status: UserStatus
    
    @Column({
        type: 'varchar',
        default:null
    })
    googleId: string
    
    @Column({
        type: 'varchar',
        default:null
    })
    githubId: string
    
    @Column({
        type: 'enum',
        enum: ProviderLogin,
        default:ProviderLogin.LOCAL
    })
    provider: ProviderLogin

    @ManyToOne(()=>Role,((role) => role.users))
    role:Role

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedAt?: Date | null;
}