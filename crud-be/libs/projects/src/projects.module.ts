import { Module } from "@nestjs/common";
import { ProjectsController } from "./projects.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectsRepository } from "./repository/projects.repository";
import { ProjectsService } from "./projects.service";
import { AuthModule } from "@backend/auth";

@Module({
    imports: [
        TypeOrmModule.forFeature([ProjectsRepository]),
        AuthModule
    ],
    controllers: [ProjectsController],
    providers: [ProjectsService],
})
export class ProjectsModule {}
