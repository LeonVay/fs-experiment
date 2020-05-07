import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttackTypeController } from './attack-type.controller';
import { AttackTypeService } from './attack-type.service';
import { AttackTypeRepository } from './repository/attack-type.repository';

@Module({
    imports: [TypeOrmModule.forFeature([AttackTypeRepository])],
    controllers: [AttackTypeController],
    providers: [AttackTypeService]
})
export class AttackTypeModule {}