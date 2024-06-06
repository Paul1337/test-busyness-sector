import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProfileOutputDto } from '../../dto/profile/output/profile-output-dto';

export enum GenderType {
    Male = 'male',
    Female = 'female',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 128 })
    firstName: string;

    @Column('varchar', { length: 128, nullable: true })
    lastName?: string;

    @Column('varchar', { length: 128 })
    email: string;

    @Column('varchar', { length: 2048 })
    passwordHash: string;

    @Column({
        type: 'enum',
        enum: GenderType,
        nullable: true,
    })
    gender?: GenderType;

    @Column('varchar', { length: 1024, nullable: true })
    photo?: string;

    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date;

    toProfileOuputDto(): ProfileOutputDto {
        return {
            createdAt: this.createdAt,
            email: this.email,
            firstName: this.firstName,
            gender: this.gender,
            id: this.id,
            lastName: this.lastName,
            photo: this.photo,
        };
    }
}
