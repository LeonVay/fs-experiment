import { Optional } from '@nestjs/common';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class UpdateHardwareDto {

    @Optional()
    @IsString()
    name: string;

    @Optional()
    @IsNumber()
    ownerId: number;

    @Optional()
    @IsString()
    deviceType: string;

    @Optional()
    @IsBoolean()
    inUse: boolean;

    @Optional()
    status: string;
}