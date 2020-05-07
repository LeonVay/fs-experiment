import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConnectionEntity } from './repository/connection.entity';
import { ConnectionRepository } from './repository/connection.repository';
import { CreateConnectionDto } from './dto/create-connection.dto';

@Injectable()
export class ConnectionService {
    constructor(@InjectRepository(ConnectionEntity)
                private connectionRepository: ConnectionRepository
    ) {}

    async fetchAllConnections(): Promise<ConnectionEntity[]> {
        return this.connectionRepository.getAllConnections();
    }

    async fetchSingleConnection(id: number): Promise<ConnectionEntity> {
        return this.connectionRepository.getConnectionById(id);
    }

    async createConnection(createConnectionDto: CreateConnectionDto) {
        let {name} = createConnectionDto;

        return this.connectionRepository.createNewConnection(name);
    }

    async updateConnection(id: number, updateConnectionDto: CreateConnectionDto): Promise<ConnectionEntity> {
        let {name} = updateConnectionDto;

        return this.connectionRepository.updateConnection(id, name);
    }

    async deleteConnection(id: number): Promise<ConnectionEntity> {
        return this.connectionRepository.deleteConnection(id);
    }
}