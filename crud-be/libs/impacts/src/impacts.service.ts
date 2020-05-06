import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, getRepository } from 'typeorm';
import { ImpactsRepository } from './repository/imacts.repository';
import { Impact } from './repository/impacts.entity';
import { CreateImpactDto } from './dto/create-impact.dto';
import { UpdateImpactDto } from './dto/update-impact.dto';
import { AttackType } from '@backend/attack-type';


@Injectable()
export class ImpactsService {

    constructor(@InjectRepository(ImpactsRepository)
                private impactsRepository: ImpactsRepository) {}

    async getAll(): Promise<Impact[]> {
        return this.impactsRepository.getAllRecords();
    }

    async getById(id: number): Promise<Impact | null> {
        return this.impactsRepository.getById(id);
    }

    async createImpactFromDto(createImpactDto: CreateImpactDto): Promise<Impact> {
        const attacksRepo = getRepository<AttackType>(AttackType)
        const typesList = await attacksRepo.findByIds(createImpactDto.attackTypes);
        return this.impactsRepository.createOne(createImpactDto.name, typesList);
    }

    async updateByIdFromDto(id: number, updateImpactDro: UpdateImpactDto): Promise<Impact> {
        const attacksRepo = getRepository<AttackType>(AttackType);
        const typesList = await attacksRepo.findByIds(updateImpactDro.attackTypes);
        return this.impactsRepository.updateOne(id, typesList);
    }

    async deleteImpact(id: number): Promise<DeleteResult> {
        return this.impactsRepository.deleteById(id);
    }
}