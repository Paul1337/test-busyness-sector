import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserInputDto {
    @IsEmail({}, { message: 'email всё-таки должен быть валидный' })
    email: string;

    @IsNotEmpty({ message: 'пароль должен быть' })
    password: string;
}
