import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttackType } from '@backend/attack-type';
import { CreateAttackTypeDto } from './dto/create-attack-type.dto';
import { UpdateAttackTypeDto } from './dto/update-attack-type.dto';
import { AttackTypeRepository } from './repository/attack-type.repository';

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
        return this.attackTypeRepository.createOne(createAttackTypeDto);
    }

    async updateById(id: number, updateAttackTypeDto: UpdateAttackTypeDto): Promise<AttackType> {
        return this.attackTypeRepository.updateOne(id, updateAttackTypeDto);
    }
}