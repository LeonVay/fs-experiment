import { IsNotEmpty, MinLength, MaxLength, IsOptional, Matches } from "class-validator";

export class CreateUsersDto {

    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    firstName: string;

    @IsOptional()
    lastName: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    login: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(30)
    @Matches(/[a-zA-Z0-9#!]/, {message: 'Password is too weak.'})
    passwd: string;
}