import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AttackType } from '@backend/attack-type';


@Entity()
export class Impact extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text'})
    name: string;

    @ManyToMany(type => AttackType, (attackType) => attackType.impacts)
    attackTypes: AttackType[];
}