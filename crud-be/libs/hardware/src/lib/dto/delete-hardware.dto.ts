import { IsNotEmpty } from 'class-validator';

export class DeleteHardwareDto {
    @IsNotEmpty()
    ids: number[];
}