import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersRepository } from "./repository/users.repository";

@Module({
    imports: [TypeOrmModule.forFeature([UsersRepository])],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
