import { Impact } from './impacts.entity';
import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AttackType, AttackTypeRepository } from '@backend/attack-type';
import { CreateImpactDto } from '../dto/create-impact.dto';
import { UpdateImpactDto } from '../dto/update-impact.dto';


@EntityRepository(Impact)
export class ImpactsRepository extends Repository<Impact> {
    constructor(@InjectRepository(AttackType)
                private attackTypesRepository: AttackTypeRepository) {
        super();

        return this;
    }

    async getAllRecords(): Promise<Impact[]> {
        return this.find();
    }

    async getById(id: number): Promise<Impact | null> {
        return this.findOne({id});
    }

    async createOne(createImpactDto: CreateImpactDto): Promise<Impact> {
        let {name, attackTypes} = createImpactDto;

        const impact = new Impact();
        impact.name = name;

        if (attackTypes) {
            impact.attackTypes = await this.attackTypesRepository.findByIds(attackTypes)
        }

        return impact.save();
    }

    async updateOne(id: number, updateImpactDto: UpdateImpactDto): Promise<Impact | null> {
        const impact = await this.findOne({id});

        if (impact) {
            impact.attackTypes = await this.attackTypesRepository.findByIds(updateImpactDto.attackTypes)
        }

        return impact.save();

    }

    async deleteById(id: number): Promise<DeleteResult> {
        return this.softDelete({id});
    }

}