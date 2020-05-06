import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AttackType } from '@backend/attack-type';


@Entity()
export class Impact extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'string'})
    name: string;

    @ManyToMany(type => AttackType, (attackType) => attackType.impacts)
    attackTypes: AttackType[];
}