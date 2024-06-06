import { GenderType } from '../../../domain/entities/User.entity';

export interface ProfileOutputDto {
    id: number;
    firstName: string;
    lastName?: string;
    email: string;
    gender?: GenderType;
    photo?: string;
    createdAt: Date;
}
