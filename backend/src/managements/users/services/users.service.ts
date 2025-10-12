import { Injectable,NotFoundException ,UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/users.entity';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { CreateUserDto } from '../dtos/req/createUserDto.dto';
import { hashPashword } from 'src/utils/bcrypt';
import { LoggerService } from 'src/utils/log_service.service';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(Users)
                private readonly usersRepo: Repository<Users>,
                @InjectRepository(Role)
                private readonly roleRepo: Repository<Role>,
                private readonly logger:LoggerService
    ) { }
    
    async createUser(RegisterManagementDto:CreateUserDto){
            const { username, password, email, phone } = RegisterManagementDto
            const userRole = await this.roleRepo.findOne({
                where: {
                    title:"user"
                }
            })
            if (!userRole) {
                throw new NotFoundException("Không tìm thấy role này")
            }
            const userHashPassword = await hashPashword(password)
            const userData = this.usersRepo.create({
                username,
                password: userHashPassword,
                email,
                phone,
                role:userRole
            })
            const userDataSaved = await this.usersRepo.save(userData)
            return userDataSaved 
    }

    async checkExistingUsername(username:string):Promise<boolean> {
        const isExisting = await this.usersRepo.findOne({
            where: {
                username
            }
        })
        if (isExisting) {
            return true
        }
        return false
    }

    async findUserByUsername(username: string): Promise<Users>{
        const user = await this.usersRepo.findOne({
            where: {
                username
            },
            relations:['role']
        })
        if (!user) {
            throw new UnauthorizedException("Tên người hoặc mật khẩu nhập sai")
        }
        return user
    }

     async findUserById(id: string): Promise<Users>{
        const user = await this.usersRepo.findOne({
            where: {
                id
            },
            relations:['role']
        })
        if (!user) {
            throw new UnauthorizedException("Tên người hoặc mật khẩu nhập sai")
        }
        return user
    }

}
