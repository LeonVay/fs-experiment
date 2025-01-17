import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from "typeorm";
import { Projects } from "@backend/projects";
import { HardwareEntity } from '@backend/hardware';

@Entity()
@Unique(['login'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    login: string;

    @Column()
    hash: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    activated: boolean;
    
    @Column()
    passwd: string;

    @OneToMany(type => Projects, project => project.owner, { eager: true })
    projects: Projects[]

    @OneToMany(type => HardwareEntity, hardware => hardware.ownerId)
    devices: HardwareEntity[]
}