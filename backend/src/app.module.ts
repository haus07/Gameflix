import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { LoggerService } from './utils/log_service.service';
import { ManagementPortalImports } from './config/import.config';
import { HttpExceptionFilter } from './utils/http-exception.filter';
import { validationSchema } from './config/validation';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath:'.env',
    validationSchema:validationSchema
  }),
    TypeOrmModule.forRoot(databaseConfig()),
    ...ManagementPortalImports],
  controllers: [AppController],
  providers: [AppService,LoggerService,HttpExceptionFilter],
})
export class AppModule {}
