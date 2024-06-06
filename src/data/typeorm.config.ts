import { DataSourceOptions } from 'typeorm';
import { User } from '../domain/entities/User.entity';
import 'dotenv/config';

export const getTypeormConfig = (): DataSourceOptions => ({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User],
    subscribers: [],
    migrations: [],
});
