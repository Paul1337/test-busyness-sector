export class ErrorWithStatus extends Error {
    constructor(public status: number, message: string) {
        super(message);
    }
}
