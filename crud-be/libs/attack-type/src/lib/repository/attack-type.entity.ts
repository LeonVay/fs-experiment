import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Impact } from '@backend/impacts';

@Entity()
export class AttackType extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(type => Impact, impact => impact.attackTypes, {cascade: true})
    @JoinTable()
    impacts: Impact[];
}