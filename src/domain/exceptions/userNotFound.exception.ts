import { ErrorWithStatus } from './ErrorWithStatus.exception';

export class UserNotFoundError extends ErrorWithStatus {
    constructor() {
        super(404, 'Пользователь не найден');
    }
}
