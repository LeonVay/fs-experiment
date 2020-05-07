import { Module } from '@nestjs/common';
import { HardwareController } from './hardware.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HardwareEntity } from './repository/hardware.entity';
import { HardwareService } from './hardware.service';
import { HardwareRepository } from './repository/hardware.repository';

@Module({
    imports: [TypeOrmModule.forFeature([HardwareEntity])],
    controllers: [HardwareController],
    providers: [HardwareService, HardwareRepository]
})
export class HardwareModule {}
