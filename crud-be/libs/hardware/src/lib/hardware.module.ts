import { Module } from '@nestjs/common';
import { HardwareController } from './hardware.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HardwareService } from './hardware.service';
import { HardwareRepository } from './repository/hardware.repository';

@Module({
    imports: [TypeOrmModule.forFeature([HardwareRepository])],
    controllers: [HardwareController],
    providers: [HardwareService]
})
export class HardwareModule {}
