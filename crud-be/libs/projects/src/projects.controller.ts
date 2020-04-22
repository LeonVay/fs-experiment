import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, Query, UsePipes, ValidationPipe, UseGuards } from "@nestjs/common";
import { CreateProjectDto } from "./dto/create-project.dto";
import { Projects } from "./repository/projects.entity";
import { ProjectsService } from "./projects.service";
import { GetCretariaDto } from "./dto/get-projects.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { DeleteProjectDto } from "./dto/delete-project.dto";
import { DeleteResult } from "typeorm";
import { ProjectsStatusesValidationPipe } from "libs/pipes/projects-statuses-validation.pipe";
import { ProjectsStatus } from "./project.interface";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "@backend/auth";
import { User } from "@backend/users";

@Controller('/projects')
@UseGuards(AuthGuard())
export class ProjectsController {

    constructor(private projectsService: ProjectsService) {}

    @Get()
    @UsePipes(ValidationPipe)
    getProjects(
        @Query() getCretariaDto: GetCretariaDto,
        @GetUser() user: User
        ): Promise<Projects[]> {
        return this.projectsService.getByCriteria(getCretariaDto, user);
    }

    @Get('/:id')
    getProjectById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
        ): Promise<Projects> {
        return this.projectsService.getById(id, user);
    }

    @Post('/save')
    @UsePipes(ValidationPipe)
    createProject(
        @Body() createProjectDto: CreateProjectDto,
        @GetUser() user: User): Promise<Projects> {
        return this.projectsService.create(createProjectDto, user);
    }

    @Put(':/id')
    @UsePipes(ValidationPipe)
    updateProject(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateProjectDto: UpdateProjectDto,
        @GetUser() user: User
        ): Promise<Projects> {
        return this.projectsService.updateProject(id, updateProjectDto, user);
    }

    @Put('/:id/status')
    updateProjectStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', ProjectsStatusesValidationPipe) status: ProjectsStatus,
        @GetUser() user: User
    ): Promise<Projects> {
        return this.projectsService.updateProjectStatus(id, status, user);
    }

    @Delete()
    @UsePipes(ValidationPipe)
    deleteProjects(
        @Body() deleteProjectDto: DeleteProjectDto,
        @GetUser() user: User
        ) {
        return this.projectsService.deleteProjects(deleteProjectDto, user);
    }

    @Delete('/:id')
    deleteById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
        ): Promise<DeleteResult> {
        return this.projectsService.deleteById(id, user);
    }
}
