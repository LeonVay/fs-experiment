import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateConnectionDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    name: string;
}