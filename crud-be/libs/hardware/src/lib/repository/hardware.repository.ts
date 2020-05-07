import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { HardwareEntity } from './hardware.entity';
import { CreateHardwareDto } from '../dto/create-hardware.dto';
import { UpdateHardwareDto } from '../dto/update-hardware.dto';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(HardwareEntity)
export class HardwareRepository extends Repository<HardwareEntity> {

    async getAllHardware(): Promise<HardwareEntity[]> {
        return await this.find();
    }

    async getSingleHardware(id: number): Promise<HardwareEntity> {
        return await this.findOne({id});
    }

    async createHardware(createHardwareDto: CreateHardwareDto): Promise<HardwareEntity> {
        let {name, ownerId, deviceType, status, inUse} = createHardwareDto;
        const hrdwr = this.create();

        hrdwr.name = name;
        hrdwr.ownerId = ownerId;
        hrdwr.deviceType = deviceType;
        hrdwr.status = status;
        hrdwr.inUse = inUse;

        return await hrdwr.save();
    }

    async updateHardware(id: number, updateHardwareDto: UpdateHardwareDto): Promise<HardwareEntity> {
        let { name, ownerId, deviceType, inUse, status } = updateHardwareDto;

        const hardware = await this.findOne({id});

        if (hardware) {
            hardware.name = name;
            hardware.ownerId = ownerId;
            hardware.deviceType = deviceType;
            hardware.inUse = inUse;
            hardware.status = status;
        }

        return await hardware.save()
    }

    async deleteHardware(id: number): Promise<DeleteResult> {
        let result = await this.delete({id});

        if (result) {
            return result;
        } else {
            throw new NotFoundException('Device was not found.');
        }
    }

}