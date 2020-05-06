import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateAttackTypeDto {
    @IsString()
    name: string;

    @IsArray()
    @IsNotEmpty()
    impacts: string[];
}