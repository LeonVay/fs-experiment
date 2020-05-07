import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionEntity } from './repository/connection.entity';
import { ConnectionController } from './connection.controller';
import { ConnectionService } from './connection.service';
import { ConnectionRepository } from './repository/connection.repository';


@Module({
    imports: [TypeOrmModule.forFeature([ConnectionEntity])],
    controllers: [ConnectionController],
    providers: [ConnectionService, ConnectionRepository]
})
export class ConnectionModule {}
