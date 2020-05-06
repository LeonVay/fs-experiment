import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateImpactDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsArray()
    attackTypes: number[];
}