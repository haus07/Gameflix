import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/managements/users/dtos/req/createUserDto.dto';
import { UsersService } from 'src/managements/users/services/users.service';
import { LoggerService } from 'src/utils/log_service.service';
import { LoginRequestDto } from '../dtos/AuthManagementDto.dto';
import { comparePassword } from 'src/utils/bcrypt';
import { Users } from 'src/managements/users/entities/users.entity';
import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config()
console.log(process.env);
const JWT_SECRET:string = process.env.SECRET_KEY as string

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly logger: LoggerService, 
    ) { }

    private generataAccessToken(user:Users):string {
        const payload = {
            sub: user.id,
            username: user.username,
            role:user.role.title
        }
        return jwt.sign(payload,JWT_SECRET,{expiresIn:'15m'})
    }

    async register(RegisterManagementDto: CreateUserDto):Promise<any> {
        const username = RegisterManagementDto.username
        const isUsernameExisting = await this.usersService.checkExistingUsername(username)
        if (isUsernameExisting) {
            throw new BadRequestException("Tên người dùng này đã tồn tại")
        }
        await this.usersService.createUser(RegisterManagementDto)
    }


    async login(loginManagementDto: LoginRequestDto):Promise<any>{
        const { username, password } = loginManagementDto
        const user = await this.usersService.findUserByUsername(username)
        const checkPassword = await comparePassword(password, user.password)
        if (!checkPassword) {
            throw new UnauthorizedException("Tên người dùng hoặc mật khẩu không đúng")
        }
        const accessToken = this.generataAccessToken(user)
        const { password: _, ...userWithoutPassword } = user
        return {
            user: userWithoutPassword,
            accessToken
        }
    }

    

}
