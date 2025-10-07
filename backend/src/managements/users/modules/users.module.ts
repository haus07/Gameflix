import { Module } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UsersController } from '../controlers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../entities/users.entity';
import { Role } from '../entities/role.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Users,Role])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
