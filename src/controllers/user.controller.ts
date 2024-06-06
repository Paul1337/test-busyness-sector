import express, { NextFunction, Request, Response } from 'express';
import { IncorrectTokenError } from '../domain/exceptions/IncorrenctToken.exception';
import { userService } from '../domain/services/user.service';
import { LoginUserInputDto } from '../dto/users/input/login-user-input.dto';
import { RegisterUserInputDto } from '../dto/users/input/register-user-input.dto';
import { handleAsyncErrors } from './utils/handleAsyncErrors';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationError } from '../domain/exceptions/Validation.exception';
import { validateBody } from './utils/validateBody';
import { extractTokenFromRequest } from './utils/authUtils';

export const userController = express.Router();

userController.post(
    '/user/register',
    handleAsyncErrors(
        async (req: Request<{}, {}, RegisterUserInputDto>, res: Response, next: NextFunction) => {
            await validateBody(RegisterUserInputDto, req.body);
            await userService.register(req.body);
            res.sendStatus(200);
        }
    )
);

userController.post(
    '/user/login',
    handleAsyncErrors(
        async (req: Request<{}, {}, LoginUserInputDto>, res: Response, next: NextFunction) => {
            await validateBody(LoginUserInputDto, req.body);
            const jwtToken = await userService.login(req.body);
            res.send({
                jwt: jwtToken,
            });
        }
    )
);

userController.get(
    '/user/me',
    handleAsyncErrors(
        async (req: Request<{}, {}, LoginUserInputDto>, res: Response, next: NextFunction) => {
            const token = extractTokenFromRequest(req);
            if (!token) return next(new IncorrectTokenError());
            const userData = await userService.verifyToken({ jwt: token });
            res.send({ userData });
        }
    )
);
