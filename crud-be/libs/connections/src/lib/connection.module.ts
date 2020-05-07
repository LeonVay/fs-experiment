import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionController } from './connection.controller';
import { ConnectionService } from './connection.service';
import { ConnectionRepository } from './repository/connection.repository';


@Module({
    imports: [TypeOrmModule.forFeature([ConnectionRepository])],
    controllers: [ConnectionController],
    providers: [ConnectionService]
})
export class ConnectionModule {}
