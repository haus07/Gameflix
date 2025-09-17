import { DataSource } from 'typeorm';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';

dotenv.config();


export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_SERVER,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + "/../**/*.entity{.ts,.js}"],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    synchronize: true,
    cache:true
});
