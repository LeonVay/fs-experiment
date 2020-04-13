import { Injectable, NotFoundException } from "@nestjs/common";
import { ProjectsRepository } from "./repository/projects.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Projects } from "./repository/projects.entity";
import { GetCretariaDto } from "./dto/get-projects.dto";
import { ProjectsStatus } from "./project.interface";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { DeleteProjectDto } from "./dto/delete-project.dto";
import { DeleteResult } from "typeorm";
import { User } from "libs/users/repository/users.entity";

@Injectable()
export class ProjectsService {

    constructor(@InjectRepository(ProjectsRepository) private projectsRepository: ProjectsRepository) {}

    async getByCriteria(getCriteriaDto: GetCretariaDto, user: User): Promise<Projects[]> {
        let { status, search } = getCriteriaDto;
        let requestResult = [];

        if (!status && search.length === 0) {
            requestResult = await this.projectsRepository.getAllProjects(user);
        }
        requestResult = await this.projectsRepository.getProjectsByCriteria(status, search, user);

        return requestResult;
    }

    async getById(id: number, user: User): Promise<Projects> {
        return this.projectsRepository.getProjectById(id, user);
    }

    async create(createProjectDto: CreateProjectDto, user: User): Promise<Projects> {
        return this.projectsRepository.createProject(createProjectDto, user);
    }

    async updateProject(id: number, patch: UpdateProjectDto, user: User) {
        return this.projectsRepository.updateProject(id, patch, user);
    }

    async updateProjectStatus(id: number, status: ProjectsStatus, user: User) {
        return this.projectsRepository.updateProjectStatus(id, status, user);
    }

    async deleteProjects(ids: DeleteProjectDto, user: User) {
        return this.projectsRepository.deleteProjects(ids, user);
    }

    async deleteById(id: number, user: User): Promise<DeleteResult> {
        return this.projectsRepository.deleteById(id, user);
    }
}
