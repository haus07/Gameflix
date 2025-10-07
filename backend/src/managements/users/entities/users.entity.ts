import { Exclude } from "class-transformer";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { UserStatus } from "../enums/userStatus.enum";
import { ProviderLogin } from "../enums/proviederLogin.enum";
import { Role } from "./role.entity";

@Entity()

export class Users{
    @PrimaryColumn('uuid')
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

    @Column({ type: 'timestamp' })
    createdAt: Date;

    @Column({ type: 'timestamp' })
    updatedAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    deletedAt?: Date | null;
}