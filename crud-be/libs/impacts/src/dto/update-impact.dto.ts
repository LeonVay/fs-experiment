import { IsArray, IsNotEmpty } from 'class-validator';

export class UpdateImpactDto {
    @IsArray()
    @IsNotEmpty()
    attackTypes: number[];
}