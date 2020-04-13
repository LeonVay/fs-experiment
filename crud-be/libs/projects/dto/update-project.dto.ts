import { ProjectsStatus } from "../project.interface";
import { IsNotEmpty } from "class-validator";

export class UpdateProjectDto {

    @IsNotEmpty()
    status: ProjectsStatus;

    @IsNotEmpty()
    description: string;
};
