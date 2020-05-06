import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import { ImpactsRepository } from './repository/imacts.repository';
import { Impact } from './repository/impacts.entity';
import { CreateImpactDto } from './dto/create-impact.dto';
import { UpdateImpactDto } from './dto/update-impact.dto';

@Injectable()
export class ImpactsService {

    constructor(@InjectRepository(ImpactsRepository) private impactsRepository: ImpactsRepository) {}

    async getAll(): Promise<Impact[]> {
        return this.impactsRepository.getAllRecords();
    }

    async getById(id: number): Promise<Impact | null> {
        return this.impactsRepository.getById(id);
    }

    async createImpactFromDto(createImpactDto: CreateImpactDto): Promise<Impact> {
        return this.impactsRepository.createOne(createImpactDto);
    }

    async updateByIdFromDto(id: number, updateImpactDro: UpdateImpactDto): Promise<Impact> {
        return this.impactsRepository.updateOne(id, updateImpactDro);
    }

    async deleteImpact(id: number): Promise<DeleteResult> {
        return this.impactsRepository.deleteById(id);
    }
}