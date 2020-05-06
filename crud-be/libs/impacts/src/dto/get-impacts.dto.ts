import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetImpactsDto {

    @IsNotEmpty()
    @ApiProperty({type: String, isArray: true})
    search: string[];
}