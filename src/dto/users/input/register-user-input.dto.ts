import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class RegisterUserInputDto {
    @Length(5, undefined, { message: 'минимальная длина имени - 5 символов' })
    firstName: string;

    @IsEmail({}, { message: 'email всё-таки должен быть валидный' })
    email: string;

    @IsNotEmpty({ message: 'пароль должен быть' })
    @Length(6, undefined, { message: 'минимальная длина пароля - 6 символов' })
    password: string;
}
