import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { UsersModule } from 'src/managements/users/modules/users.module';
import { LoggerService } from 'src/utils/log_service.service';
import { Users } from 'src/managements/users/entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerifyLoginMiddleware } from 'src/middlewares/verify_user.middleware';
import { JwtStrategy } from '../strategy/jwt.strategy';

@Module({
  imports:[UsersModule,TypeOrmModule.forFeature([Users])],
  controllers: [AuthController],
  providers: [AuthService,LoggerService,JwtStrategy],
})
export class AuthModule {} 
