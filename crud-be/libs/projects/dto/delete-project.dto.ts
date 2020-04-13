import { IsArray, IsNotEmpty } from "class-validator";

export class DeleteProjectDto {

    @IsArray()
    @IsNotEmpty()
    ids: number[]
};
