import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, ValidationPipe } from '@nestjs/common';
import { ConnectionEntity } from './repository/connection.entity';
import { CreateConnectionDto } from './dto/create-connection.dto';
import { ConnectionService } from './connection.service';

@Controller('/connections')
export class ConnectionController {
    constructor(private connectionService: ConnectionService) {}

    @Get()
    async fetchConnections(): Promise<ConnectionEntity[]> {
        return this.connectionService.fetchAllConnections();
    }

    @Get('/:id')
    async fetchConnection(@Param('id', ParseIntPipe) id: number): Promise<ConnectionEntity|null> {
        return this.connectionService.fetchSingleConnection(id);
    }

    @Post('/save')
    async createConnection(@Body() createConnectionDto: CreateConnectionDto): Promise<ConnectionEntity> {
        return this.connectionService.createConnection(createConnectionDto);
    }

    @Put('/save')
    async updateConnection(
        @Body('id', ParseIntPipe) id: number,
        @Body('name', ValidationPipe) updateConnectionDto: CreateConnectionDto
    ): Promise<ConnectionEntity> {
        return this.connectionService.updateConnection(id, updateConnectionDto);
    }

    @Delete('/:id')
    async removeConnection(@Param('id', ParseIntPipe) id: number): Promise<ConnectionEntity> {
        return this.connectionService.deleteConnection(id);
    }
}