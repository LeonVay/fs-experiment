import { IsNotEmpty, MinLength, MaxLength, IsOptional } from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    firstName: string;

    @IsOptional()
    lastName: string;

    @IsOptional()
    @MinLength(6)
    @MaxLength(50)
    passwd: string;
}