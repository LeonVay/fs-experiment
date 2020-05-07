import { IsNotEmpty } from 'class-validator';

export class GetHardwareDto {
    @IsNotEmpty()
    ids: number[];
}