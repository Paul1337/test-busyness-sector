import { ErrorWithStatus } from './ErrorWithStatus.exception';

export class ValidationError extends ErrorWithStatus {
    constructor(message: string) {
        super(400, message);
    }
}
