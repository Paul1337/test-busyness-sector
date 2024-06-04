import express from 'express';
import 'dotenv/config';
import { userController } from './controllers/user.controller';
import { profileController } from './controllers/profile.controller';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { getTypeormConfig } from './configs/typeorm.config';
import path from 'path';

export const AppDataSource = new DataSource(getTypeormConfig());
AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch(error => console.log(error));

const app = express();

app.use('/user', userController);
app.use('/profile', profileController);

app.use('/static', express.static(path.join(__dirname, '..', 'static')));

app.listen(process.env.SERVER_PORT ?? 3000);
