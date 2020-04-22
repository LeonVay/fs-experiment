import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ProjectsStatus } from '../project.interface';
import { User } from '@backend/users';

@Entity()
export class Projects extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    status: ProjectsStatus;

    @ManyToOne(type => User, user => user.projects, { eager: false})
    owner: User

    @Column()
    userId: number;
}
