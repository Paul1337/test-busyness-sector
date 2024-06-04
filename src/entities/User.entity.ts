import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum GenderType {
    Male,
    Female,
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 128 })
    firstName: string;

    @Column('varchar', { length: 128 })
    lastName: string;

    @Column('varchar', { length: 128 })
    email: string;

    @Column('varchar', { length: 2048 })
    passwordHash: string;

    @Column({
        type: 'enum',
        enum: GenderType,
    })
    gender: GenderType;

    @Column('varchar', { length: 1024 })
    photo: string;

    @CreateDateColumn()
    createdAt: Date;
}
