import { NextFunction, Request, Response } from 'express';

export function handleAsyncErrors<T>(
    fn: (req: Request<T>, res: Response, next: NextFunction) => Promise<any>
) {
    return (req: Request<T>, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next);
    };
}
