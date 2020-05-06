import { ImpactsService } from './impacts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Impact } from './repository/impacts.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Impact])],
    controllers: [ImpactsModule],
    providers: [ImpactsService]
})
export class ImpactsModule {}
