import { Request } from 'express';

export const extractTokenFromRequest = (req: Request): string | undefined => {
    const token = req.headers['authorization']?.split(' ')[1];
    return token;
};
