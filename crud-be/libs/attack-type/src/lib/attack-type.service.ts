import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttackType } from '@backend/attack-type';
import { CreateAttackTypeDto } from './dto/create-attack-type.dto';
import { UpdateAttackTypeDto } from './dto/update-attack-type.dto';
import { AttackTypeRepository } from './repository/attack-type.repository';
import { getRepository } from 'typeorm';
import { Impact } from '@backend/impacts';

@Injectable()
export class AttackTypeService {
    constructor(@InjectRepository(AttackTypeRepository)
                private attackTypeRepository: AttackTypeRepository) {
    }

    async getAll(): Promise<AttackType[]> {
        return this.attackTypeRepository.getAll();
    }

    async getById(id: number): Promise<AttackType> {
        return this.attackTypeRepository.getOne(id);
    }

    async createByDto(createAttackTypeDto: CreateAttackTypeDto): Promise<AttackType> {
        let {name, impacts} = createAttackTypeDto;
        const impactsRepo = getRepository<Impact>(Impact);
        let impactsList = await impactsRepo.findByIds(impacts);
        return this.attackTypeRepository.createOne(name, impactsList);
    }

    async updateById(id: number, updateAttackTypeDto: UpdateAttackTypeDto): Promise<AttackType> {
        let {name, impacts} = updateAttackTypeDto;
        const impactsRepo = getRepository<Impact>(Impact);
        let impactsList = await impactsRepo.findByIds(impacts);
        return this.attackTypeRepository.updateOne(id, name, impactsList);
    }
}