import { EntityRepository, Repository } from 'typeorm';
import { AttackType,  } from './attack-type.entity';
import { CreateAttackTypeDto } from '../dto/create-attack-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Impact, ImpactsRepository } from '@backend/impacts';
import { UpdateAttackTypeDto } from '../dto/update-attack-type.dto';


@EntityRepository()
export class AttackTypeRepository extends Repository<AttackType>{
    constructor(@InjectRepository(Impact) private impactsRepository: ImpactsRepository) {
        super();

        return this;
    }

    async getAll(): Promise<AttackType[]> {
        return this.find();
    }

    async getOne(id: number): Promise<AttackType> {
        return this.findOne({id});
    }

    async createOne(createAttackTypeDto: CreateAttackTypeDto): Promise<AttackType> {
        let {name, impacts} = createAttackTypeDto;

        const attackType = new AttackType()

        attackType.name = name;
        attackType.impacts = await this.impactsRepository.findByIds(impacts);

        return attackType.save();
    }

    async updateOne(id: number, updateAttackTypeDto: UpdateAttackTypeDto): Promise<AttackType> {
        let {name, impacts} = updateAttackTypeDto;
        const attackType = await this.findOne({id});

        if (name) {
            attackType.name = name;
        }

        if (impacts) {
            let newImpacts = await this.impactsRepository.findByIds(impacts);
            attackType.impacts = newImpacts;
        }

        return attackType.save();
    }

}