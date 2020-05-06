import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { AttackType } from '@backend/attack-type';
import { CreateAttackTypeDto } from './dto/create-attack-type.dto';
import { UpdateAttackTypeDto } from './dto/update-attack-type.dto';
import { AttackTypeService } from './attack-type.service';

@Controller('/attack-type')
export class AttackTypeController {

    constructor(private attackTypeService: AttackTypeService) {}

    @Get()
    fetchAll(): Promise<AttackType[]> {
        return this.attackTypeService.getAll();
    }

    @Get('/:id')
    fetchById(@Param('id', ParseIntPipe) id: number): Promise<AttackType> {
        return this.attackTypeService.getById(id);
    }

    @Post()
    createByDto(@Body() createAttackTypeDto: CreateAttackTypeDto): Promise<AttackType> {
        return this.attackTypeService.createByDto(createAttackTypeDto);
    }

    @Put('/:id')
    updateById(@Param('id', ParseIntPipe) id: number,
               @Body() updateAttackTypeDto: UpdateAttackTypeDto): Promise<AttackType> {
        return this.attackTypeService.updateById(id, updateAttackTypeDto);
    }

}