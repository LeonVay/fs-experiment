import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ImpactsService } from './impacts.service';
import { Impact } from './repository/impacts.entity';
import { CreateImpactDto } from './dto/create-impact.dto';
import { UpdateImpactDto } from './dto/update-impact.dto';

@Controller('impacts')
export class ImpactsController {
    constructor(private impactsService: ImpactsService) {}

    @Get()
    async fetchAll(): Promise<Impact[]> {
        return this.impactsService.getAll();
    }

    @Get(':id')
    async fetchOne(@Param('id', ParseIntPipe) id: number): Promise<Impact> {
        return this.impactsService.getById(id);
    }

    @Post()
    async createImpact(@Body() createImpactDto: CreateImpactDto): Promise<Impact> {
        return this.impactsService.createImpactFromDto(createImpactDto);
    }

    @Put(':id')
    async updateImpact(@Param('id', ParseIntPipe) id: number,
                       @Body() updateImpactDto: UpdateImpactDto): Promise<Impact> {
        return this.impactsService.updateByIdFromDto(id, updateImpactDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async deleteImpact(@Param('id', ParseIntPipe) id: number) {
        return this.impactsService.deleteImpact(id);
    }
}