import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { ConnectionEntity } from './connection.entity';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(ConnectionEntity)
export class ConnectionRepository extends Repository<ConnectionEntity> {

    constructor() {
        super();
    }

    async getAllConnections(): Promise<ConnectionEntity[]> {
        return this.find();
    }

    async getConnectionById(id: number): Promise<ConnectionEntity|null> {
        return this.findOne({id});
    }

    async createNewConnection(name: string): Promise<ConnectionEntity> {
        return this.create().save();
    }

    async updateConnection(id: number, name: string): Promise<ConnectionEntity> {
        const connection = await this.findOne({id});

        if (connection) {
            connection.name = name;
            return connection.save();
        } else {
            throw new NotFoundException('Connection not found.');
        }
    }

    async deleteConnection(id: number): Promise<ConnectionEntity> {
        try {
            const connection = await this.findOne({id});

            if (connection) {
                return this.softRemove(connection);
            } else {
                throw new NotFoundException('Connection not found.');
            }
        } catch (error) {
            throw new NotFoundException('Connection not found.');
        }
    }
}