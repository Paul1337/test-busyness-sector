import { ErrorWithStatus } from './ErrorWithStatus.exception';

export class UserExistsError extends ErrorWithStatus {
    constructor() {
        super(400, 'Пользователь уже существует');
    }
}
