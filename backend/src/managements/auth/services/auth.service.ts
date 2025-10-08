import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/managements/users/dtos/req/createUserDto.dto';
import { UsersService } from 'src/managements/users/services/users.service';
import { LoggerService } from 'src/utils/log_service.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly logger:LoggerService
    ) { }
    async register(RegiterManagementDto: CreateUserDto) {
        const username = RegiterManagementDto.username
        const isUsernameExisting = await this.usersService.checkExistingUsername(username)
        if (isUsernameExisting) {
            throw new BadRequestException("Tên người dùng này đã tồn tại")
        }
        await this.usersService.createUser(RegiterManagementDto)
    }
    

}
