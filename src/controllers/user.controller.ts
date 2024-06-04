import express, { Request, Response } from 'express';

export const userController = express.Router();

userController.get('/register', (req: Request, res: Response) => {
    res.send('register');
});

userController.post('/login', (req: Request, res: Response) => {
    res.send('login');
});
