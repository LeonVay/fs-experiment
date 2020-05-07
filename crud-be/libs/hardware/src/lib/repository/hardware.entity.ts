import {
    BaseEntity,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { User } from '@backend/users';
import { ConnectionEntity } from '@backend/connections';

@Entity()
export class HardwareEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    deviceType: string;

    @Column()
    status: string;

    @Column()
    inUse: boolean;

    @ManyToOne(type => User, user => user.devices)
    ownerId: number;

    @ManyToMany(type => ConnectionEntity)
    @JoinTable()
    connections: ConnectionEntity[];
}