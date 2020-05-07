import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Optional } from '@nestjs/common';

export class CreateHardwareDto {

    @IsString()
    name: string;

    @IsNumber()
    @Optional()
    ownerId: number;

    @IsString()
    @IsNotEmpty()
    deviceType: string;

    @IsNotEmpty()
    status: string;

    @IsNotEmpty()
    @IsBoolean()
    inUse: boolean;

    previousOwners: string[];
}