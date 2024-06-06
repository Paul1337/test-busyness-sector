import { ErrorWithStatus } from './ErrorWithStatus.exception';

export class IncorrectPasswordError extends ErrorWithStatus {
    constructor() {
        super(403, 'Пароль неверный');
    }
}
