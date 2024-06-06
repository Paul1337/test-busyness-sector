import { NextFunction, Request, Response } from 'express';
import { ErrorWithStatus } from '../httpExceptions/ErrorWithStatus.exception';
import { IncorrectPasswordError } from '../../domain/busynessExceptions/IncorrectPassword.exception';
import { IncorrectTokenError } from '../../domain/busynessExceptions/IncorrenctToken.exception';
import { UserExistsError } from '../../domain/busynessExceptions/userExists.exception';
import { UserNotFoundError } from '../../domain/busynessExceptions/userNotFound.exception';

interface ExceptionResponse {
    message: string;
    status: number;
}

const exceptionsMap = new Map<string, ExceptionResponse>([
    [IncorrectPasswordError.name, { message: 'Пароль неверный', status: 403 }],
    [IncorrectTokenError.name, { message: 'Токен невалидный', status: 403 }],
    [UserExistsError.name, { message: 'Пользователь уже существует', status: 400 }],
    [UserNotFoundError.name, { message: 'Пользователь не найден', status: 404 }],
]);

export const handleErrorsMiddleware = (err: object, req: Request, res: Response, next: NextFunction) => {
    const expectionResult = exceptionsMap.get(err.constructor.name);

    if (expectionResult) {
        res.status(expectionResult.status).send(expectionResult.message);
    } else {
        if (err instanceof ErrorWithStatus) {
            res.status(err.status).send(err.message);
        } else {
            res.status(500).send((err as any)?.message ?? 'Internal server error');
        }
    }
};
