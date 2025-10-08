import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { UsersModule } from 'src/managements/users/modules/users.module';
import { LoggerService } from 'src/utils/log_service.service';

@Module({
  imports:[UsersModule],
  controllers: [AuthController],
  providers: [AuthService,LoggerService],
})
export class AuthModule {}
