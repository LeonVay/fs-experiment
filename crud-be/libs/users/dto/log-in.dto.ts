import { IsNotEmpty } from "class-validator";

export class LogInDto {
    @IsNotEmpty()
    login: string;

    @IsNotEmpty()
    passwd: string;
}