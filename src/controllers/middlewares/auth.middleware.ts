import { NextFunction, Request, Response } from 'express';
import { userService } from '../../domain/services/user.service';
import { extractTokenFromRequest } from '../utils/authUtils';
import { IncorrectTokenError } from '../../domain/busynessExceptions/IncorrenctToken.exception';
import { RequestWithUser } from '../models/requestWithUser.model';
import { UserDataDto } from '../../dto/users/userData.dto';

export const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const token = extractTokenFromRequest(req);
    if (!token) return next(new IncorrectTokenError());
    const userData = await userService.verifyToken({ jwt: token });
    req.userData = userData;
    next();
};
