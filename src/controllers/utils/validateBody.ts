import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationError } from '../../domain/exceptions/Validation.exception';

export const validateBody = async <T extends object>(Class: ClassConstructor<T>, body: T) => {
    const dto = plainToClass(Class, body);
    await validate(dto).then(errors => {
        if (errors.length > 0) {
            throw new ValidationError(Object.values(errors[0]?.constraints ?? {})[0]);
        }
    });
};
