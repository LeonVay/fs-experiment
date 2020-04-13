import { Projects } from "./projects.entity";
import { EntityRepository, Repository, DeleteResult } from "typeorm";
import { ProjectsStatus } from "../project.interface";
import { CreateProjectDto } from "../dto/create-project.dto";
import { UpdateProjectDto } from "../dto/update-project.dto";
import { NotFoundException } from "@nestjs/common";
import { DeleteProjectDto } from "../dto/delete-project.dto";
import { User } from "libs/users/repository/users.entity";


@EntityRepository(Projects)
export class ProjectsRepository extends Repository<Projects>{

    constructor() {
        super();

        return this;
    }
    
    async getAllProjects(user: User): Promise<Projects[]> {
        return (await this.find()).filter((project) => project.userId === user.id);
    }

    async getProjectsByCriteria(status: ProjectsStatus, search: string, user: User): Promise<Projects[]> {
        const query = this.createQueryBuilder('projects');

        query.where('projects.userId = :userId', {userId: user.id});

        if (status) {
            await query.andWhere('projects.status = :status', {status});
        }

        if (search) {
            await query.andWhere('(projects.name LIKE :search OR projects.description)', {search: `%${search}%`});
        }

        const projects = await query.getMany();

        return projects;
    }

    async getProjectById(id: number, user: User): Promise<Projects> {
        let requestResult = this.findOne({where: {id, userId: user.id}});

        if (!requestResult) {
            throw new NotFoundException(`Project with ID: ${id} not found.`);
        }

        return requestResult;
    }

    async createProject(createProjectDto: CreateProjectDto, user: User): Promise<Projects> {
        let { name, description } = createProjectDto;

        let newProject = new Projects();
        newProject.name = name;
        newProject.description = description;
        newProject.status = ProjectsStatus.OPEN;
        newProject.owner = user;

        await newProject.save();

        delete newProject.owner;

        return newProject;
    }

    async updateProject(id: number, updateProjectDto: UpdateProjectDto, user: User): Promise<Projects> {
        let { status, description } = updateProjectDto;

        let projectToUpdate = await this.getProjectById(id, user);

        projectToUpdate.status = status;
        projectToUpdate.description = description;

        await projectToUpdate.save();

        return projectToUpdate;
    }

    async updateProjectStatus(id: number, status: ProjectsStatus, user: User): Promise<Projects> {
        let projectToUpdate = await this.getProjectById(id, user);

        projectToUpdate.status = status;
        await projectToUpdate.save();

        return projectToUpdate;
    }

    async deleteProjects(deleteProjectsDto: DeleteProjectDto, user: User): Promise<DeleteResult> {
        let { ids } = deleteProjectsDto;
        ids.forEach((id: number) => this.deleteById(id, user));
        return ;
    }

    async deleteById(id: number, user: User): Promise<DeleteResult> {
        return this.delete({id, userId: user.id});
    }
}