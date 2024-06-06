import 'dotenv/config';
import express from 'express';
import 'reflect-metadata';
import { profileController } from './controllers/profile.controller';
import { userController } from './controllers/user.controller';
import './data/data-source';
import { handleErrorsMiddleware } from './controllers/middlewares/errors.middleware';
import { staticDirPath } from './utils/pathes';

const app = express();

// parsers
app.use(express.json());

// controllers
app.use(userController);
app.use(profileController);

// serve static
app.use('/static', express.static(staticDirPath));

// handle errors
app.use(handleErrorsMiddleware);

app.listen(process.env.SERVER_PORT ?? 3000);
