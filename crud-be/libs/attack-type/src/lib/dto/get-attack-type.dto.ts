import { IsNotEmpty } from 'class-validator';

export class GetAttackTypeDto {
    @IsNotEmpty()
    id: number;
}