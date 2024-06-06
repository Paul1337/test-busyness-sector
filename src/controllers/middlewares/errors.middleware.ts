import { NextFunction, Request, Response } from 'express';
import { ErrorWithStatus } from '../../domain/exceptions/ErrorWithStatus.exception';

export const handleErrorsMiddleware = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof ErrorWithStatus) {
        res.status(err.status).send(err.message);
    } else {
        res.status(500).send((err as any)?.message ?? 'Server error');
    }
};
