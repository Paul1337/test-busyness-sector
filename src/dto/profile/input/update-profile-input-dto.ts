import { IsEmail, IsEnum, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { GenderType } from '../../../domain/entities/User.entity';

export class UpdateProfileInputDto {
    @IsEmail({}, { message: 'email всё-таки должен быть валидный' })
    @IsOptional()
    email?: string;

    @Length(5, undefined, { message: 'минимальная длина имени - 5 символов' })
    @IsOptional()
    firstName?: string;

    @Length(5, undefined, { message: 'минимальная длина фамилии - 5 символов' })
    @IsOptional()
    lastName?: string;

    @IsOptional()
    @IsEnum(GenderType, { message: 'некорректный пол, должно быть: "male" / "female"' })
    gender?: GenderType;

    // вообще приходит через express-multer но здесь нужен, чтобы не создавать ещё одно dto и устанавливается в контроллере
    @IsOptional()
    photo?: string;
}
