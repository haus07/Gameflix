import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { LoggerService } from 'src/utils/log_service.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly logger:LoggerService
  ) { }
  
 
}

