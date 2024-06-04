import express, { Request, Response } from 'express';

export const profileController = express.Router();

profileController.put('/:userId', (req: Request, res: Response) => {
    res.send('update user');
});

profileController.get('/:userId', (req: Request, res: Response) => {
    res.send('get user');
});

profileController.get('s', (req: Request, res: Response) => {
    res.send('get users');
});
