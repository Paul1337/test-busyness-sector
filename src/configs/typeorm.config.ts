import { DataSourceOptions } from 'typeorm';
import { User } from '../entities/User.entity';

export const getTypeormConfig = (): DataSourceOptions => ({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '3232',
    database: 'test-bysyness-sector',
    synchronize: true,
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [],
});
