import { ErrorWithStatus } from './ErrorWithStatus.exception';

export class IncorrectTokenError extends ErrorWithStatus {
    constructor() {
        super(403, 'Токен не валидный');
    }
}
