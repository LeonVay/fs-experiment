import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttackType } from './repository/attack-type.entity';
import { AttackTypeController } from './attack-type.controller';
import { AttackTypeService } from './attack-type.service';

@Module({
    imports: [TypeOrmModule.forFeature([AttackType])],
    controllers: [AttackTypeController],
    providers: [AttackTypeService]
})
export class AttackTypeModule {}