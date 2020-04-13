import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./repository/users.entity";
import { CreateUsersDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { DeleteResult } from "typeorm";
import { DeleteUserDto } from "./dto/delete-user.dto";
import { UsersRepository } from "./repository/users.repository";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository
    ) {}

    async getAllUsers(): Promise<User[]> {
        return await this.usersRepository.getAllUsers();
    }

    async getUser(id: number): Promise<User> {
        return this.usersRepository.getUser(id);
    }

    async createUser(createUserDto: CreateUsersDto): Promise<User> {
        return await this.usersRepository.createUser(createUserDto);
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<{firstName: string, login: string}> {
        const { firstName, lastName, passwd } = updateUserDto;
        const found = await this.usersRepository.updateUser(id, firstName, passwd, lastName);

        return { firstName: found.firstName, login: found.login};
    }

    async deleteUsers(deleteUsersDto: DeleteUserDto): Promise<DeleteResult> {
        const {id} = deleteUsersDto;
        return await this.usersRepository.deleteUsers(id);
    }

}
