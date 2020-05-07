import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CreateHardwareDto } from './dto/create-hardware.dto';
import { UpdateHardwareDto } from './dto/update-hardware.dto';
import { HardwareEntity } from './repository/hardware.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HardwareRepository } from './repository/hardware.repository';

@Injectable()
export class HardwareService {

    constructor(@InjectRepository(HardwareRepository)
                private hardwareRepository: HardwareRepository
    ) {}

    async getAll(): Promise<HardwareEntity[]> {
        return this.hardwareRepository.getAllHardware();
    }

    async getHardwareById(id: number): Promise<HardwareEntity | null> {
        return this.hardwareRepository.getSingleHardware(id);
    }

    async createHardwareItem(createHardwareItemDto: CreateHardwareDto): Promise<HardwareEntity> {
        return this.createHardwareItem(createHardwareItemDto);
    }

    async updateHardwareItem(id: number, updateHardware: UpdateHardwareDto): Promise<HardwareEntity> {
        return this.updateHardwareItem(id, updateHardware);
    }

    async deleteSelectedHardware(ids: number): Promise<DeleteResult> {
        return this.deleteSelectedHardware(ids);
    }
}