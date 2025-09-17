import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { LoggerService } from './utils/log_service.service';
import { ManagementPortalImports } from './config/import.config';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true
  }),
    TypeOrmModule.forRoot(databaseConfig()),
    ...ManagementPortalImports],
  controllers: [AppController],
  providers: [AppService,LoggerService],
})
export class AppModule {}
