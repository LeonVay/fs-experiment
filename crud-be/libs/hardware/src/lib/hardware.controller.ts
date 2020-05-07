import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, ValidationPipe } from '@nestjs/common';
import { CreateHardwareDto } from './dto/create-hardware.dto';
import { UpdateHardwareDto } from './dto/update-hardware.dto';
import { HardwareEntity } from './repository/hardware.entity';
import { HardwareService } from './hardware.service';

@Controller('/hardware')
export class HardwareController {
    constructor(private hardwareService: HardwareService) {}

    @Get()
    async getHardwareList(): Promise<HardwareEntity[]> {
        return this.hardwareService.getAll();
    }

    @Get('/:id')
    async getHardwareById(@Param('id', ParseIntPipe) id: number): Promise<HardwareEntity | null> {
        return this.hardwareService.getHardwareById(id);
    }

    @Post()
    async createHardwareItem(@Body(ValidationPipe) createHardwareItemDto: CreateHardwareDto): Promise<HardwareEntity> {
        return this.hardwareService.createHardwareItem(createHardwareItemDto);
    }

    @Put('/:id')
    async updateHardwareItem(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateHardwareItem: UpdateHardwareDto): Promise<HardwareEntity> {
        return this.hardwareService.updateHardwareItem(id, updateHardwareItem);
    }

    @Delete('/:id')
    async deleteSelected(@Param('id', ParseIntPipe) id: number): Promise<any> {
        return this.deleteSelected(id);
    }
}