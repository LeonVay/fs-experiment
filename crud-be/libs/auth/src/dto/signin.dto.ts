import { IsString, MinLength, MaxLength, IsNotEmpty, Matches } from "class-validator";

export class SignInDto {

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    login: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(50)
    @Matches(/[a-zA-Z0-9#!]/, {message: 'Password is too weak.'})
    password: string;
}