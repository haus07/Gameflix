import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreModule } from './managements/genre/genre.module'
import { SeriesModule } from './managements/series/series.module';

@Module({
  imports: [ConfigModule.forRoot({
              isGlobal:true
          }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: Number(config.get<string>('DB_PORT'))||5432,
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
        entities: [__dirname + '/**/*.orm{.ts,.js}'],
      })
    }),GenreModule,SeriesModule],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
