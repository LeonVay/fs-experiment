import { ProjectsStatus } from "../project.interface";
import { IsNotEmpty } from "class-validator";

export class GetCretariaDto {

    @IsNotEmpty()
    status: ProjectsStatus;

    @IsNotEmpty()
    search: string;
}