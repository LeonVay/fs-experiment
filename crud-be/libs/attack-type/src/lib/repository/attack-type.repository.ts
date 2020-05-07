import { EntityRepository, Repository } from 'typeorm';
import { AttackType,  } from './attack-type.entity';
import { CreateAttackTypeDto } from '../dto/create-attack-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Impact, ImpactsRepository } from '@backend/impacts';
import { UpdateAttackTypeDto } from '../dto/update-attack-type.dto';


@EntityRepository(AttackType)
export class AttackTypeRepository extends Repository<AttackType>{
    constructor() {
        super();

        return this;
    }

    async getAll(): Promise<AttackType[]> {
        return this.find();
    }

    async getOne(id: number): Promise<AttackType> {
        return this.findOne({id});
    }

    async createOne(name, impacts): Promise<AttackType> {

        const attackType = new AttackType()

        attackType.name = name;
        attackType.impacts = impacts;

        return attackType.save();
    }

    async updateOne(id: number, name, impacts): Promise<AttackType> {
        const attackType = await this.findOne({id});

        if (name) {
            attackType.name = name;
        }

        if (impacts) {
            attackType.impacts = impacts;
        }

        return attackType.save();
    }

}