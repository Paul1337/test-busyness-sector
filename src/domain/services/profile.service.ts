import { dataSource } from '../../data/data-source';
import { UpdateProfileInputDto } from '../../dto/profile/input/update-profile-input-dto';
import { ProfileOutputDto } from '../../dto/profile/output/profile-output-dto';
import { User } from '../entities/User.entity';
import { UserNotFoundError } from '../busynessExceptions/userNotFound.exception';

const PageCount = 10;

export class ProfileService {
    async getProfileInfo(userId: number): Promise<ProfileOutputDto> {
        const userRepository = dataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { id: userId } });
        if (!user) throw new UserNotFoundError();
        return user.toProfileOuputDto();
    }

    async getProfiles(page: number): Promise<ProfileOutputDto[]> {
        const userRepository = dataSource.getRepository(User);
        const users = await userRepository.find({
            take: PageCount,
            skip: (page - 1) * PageCount,
            order: {
                createdAt: 'ASC',
            },
        });
        return users.map(user => user.toProfileOuputDto());
    }

    async updateProfile(userId: number, dto: UpdateProfileInputDto) {
        const userRepository = dataSource.getRepository(User);
        await userRepository.update(
            { id: userId },
            {
                email: dto.email,
                firstName: dto.firstName,
                lastName: dto.lastName,
                gender: dto.gender,
                photo: dto.photo,
            }
        );
    }
}

export const profileService = new ProfileService();
