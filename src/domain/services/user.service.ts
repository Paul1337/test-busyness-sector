import { dataSource } from '../../data/data-source';
import { VerifyTokenInputDto } from '../../dto/users/input/verify-token-input.dto';
import { LoginUserInputDto } from '../../dto/users/input/login-user-input.dto';
import { RegisterUserInputDto } from '../../dto/users/input/register-user-input.dto';
import { User } from '../entities/User.entity';
import { UserExistsError } from '../busynessExceptions/userExists.exception';
import bcrypt from 'bcrypt';
import { UserNotFoundError } from '../busynessExceptions/userNotFound.exception';
import { IncorrectPasswordError } from '../busynessExceptions/IncorrectPassword.exception';
import jwt from 'jsonwebtoken';
import { UserDataDto } from '../../dto/users/userData.dto';
import { IncorrectTokenError } from '../busynessExceptions/IncorrenctToken.exception';

export class UserService {
    async register(registerDto: RegisterUserInputDto): Promise<void> {
        const userRepository = dataSource.getRepository(User);
        const userWithSameEmail = await userRepository.findOne({ where: { email: registerDto.email } });
        if (userWithSameEmail) {
            throw new UserExistsError();
        }

        const passwordHash = await bcrypt.hash(registerDto.password, 5);
        const newUser = userRepository.create({
            firstName: registerDto.firstName,
            email: registerDto.email,
            passwordHash,
        });
        await userRepository.save(newUser);
    }

    async login(loginDto: LoginUserInputDto): Promise<string> {
        const userRepository = dataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { email: loginDto.email } });
        if (!user) {
            throw new UserNotFoundError();
        }

        const passwordOk = await bcrypt.compare(loginDto.password, user.passwordHash);
        if (!passwordOk) {
            throw new IncorrectPasswordError();
        }

        const userData: UserDataDto = {
            id: user.id,
            email: user.email,
        };
        if (!process.env.APP_SECRET) {
            throw new Error('No APP_SECRET key found in .env');
        }
        const jwtToken = jwt.sign(userData, process.env.APP_SECRET);
        return jwtToken;
    }

    async verifyToken(dto: VerifyTokenInputDto): Promise<UserDataDto> {
        if (!process.env.APP_SECRET) {
            throw new Error('No APP_SECRET key found in .env');
        }
        try {
            const userData = jwt.verify(dto.jwt, process.env.APP_SECRET) as UserDataDto;
            return userData;
        } catch (err) {
            throw new IncorrectTokenError();
        }
    }
}

export const userService = new UserService();
