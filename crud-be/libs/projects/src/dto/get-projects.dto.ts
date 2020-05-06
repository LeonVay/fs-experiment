import { ProjectsStatus } from "../project.interface";
import { IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class GetCretariaDto {

    @IsNotEmpty()
    status: ProjectsStatus;

    @IsNotEmpty()
    @ApiProperty({type: String, isArray: true})
    search: string[];
}