import { IsString, IsOptional } from 'class-validator';

export class UpdateAttackTypeDto {
    @IsString()
    name: string;

    @IsOptional()
    impacts: number[];
}