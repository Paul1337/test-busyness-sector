import { Request } from 'express';
import { UserDataDto } from '../../dto/users/userData.dto';
import { ParamsDictionary } from 'express-serve-static-core';

export interface RequestWithUser<P = ParamsDictionary, ResBody = any, ReqBody = any>
    extends Request<P, ReqBody, ReqBody> {
    userData?: UserDataDto;
}
