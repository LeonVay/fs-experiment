import { IsNotEmpty } from 'class-validator';

export class DeleteAttackTypeDto {
    @IsNotEmpty()
    id: number | number[];
}