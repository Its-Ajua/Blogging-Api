export class CustomError extends Error {
    status;
    constructor(message, statusCode = 500) {
        super(message);

        this.name = this.constructor.name;
        this.status = statusCode;
    }
}