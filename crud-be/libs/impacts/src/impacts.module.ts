import { ImpactsService } from './impacts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Impact } from './repository/impacts.entity';
import { ImpactsRepository } from './repository/imacts.repository';
import { ImpactsController } from './impacts.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Impact])],
    controllers: [ImpactsController],
    providers: [ImpactsService, ImpactsRepository]
})
export class ImpactsModule {}
