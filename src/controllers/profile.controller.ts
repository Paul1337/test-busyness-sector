import express, { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import { profileService } from '../domain/services/profile.service';
import { UpdateProfileInputDto } from '../dto/profile/input/update-profile-input-dto';
import { uploadsPath } from '../utils/pathes';
import { handleAsyncErrors } from './utils/handleAsyncErrors';
import { validateBody } from './utils/validateBody';
import { authMiddleware } from './middlewares/auth.middleware';
import { RequestWithUser } from './models/requestWithUser.model';
import { UserDataDto } from '../dto/users/userData.dto';
import { ErrorWithStatus } from '../domain/exceptions/ErrorWithStatus.exception';

export const profileController = express.Router();

const upload = multer({ dest: uploadsPath });

profileController.put(
    '/profile/:userId',
    upload.single('photo'),
    authMiddleware,
    handleAsyncErrors(
        async (
            req: RequestWithUser<{ userId: string }, {}, UpdateProfileInputDto>,
            res: Response,
            next: NextFunction
        ) => {
            await validateBody(UpdateProfileInputDto, req.body);
            const userId = Number(req.params.userId);
            if (userId !== req.userData?.id) {
                return next(new ErrorWithStatus(403, 'Нет досутпа редактировать этот профиль'));
            }
            await profileService.updateProfile(userId, {
                ...req.body,
                photo: req.file?.filename,
            });
            res.sendStatus(200);
        }
    )
);

profileController.get(
    '/profiles',
    handleAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
        const pageNumber = Number(req.query.page);
        console.log(req.query.page);
        const profilesInfos = await profileService.getProfiles(pageNumber);
        res.send(profilesInfos);
    })
);

profileController.get(
    '/profile/:userId',
    handleAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
        const userId = Number(req.params.userId);
        const profileInfo = await profileService.getProfileInfo(userId);
        res.send(profileInfo);
    })
);
