import { EntityRepository, Repository, DeleteResult } from "typeorm";
import { User } from "./users.entity";
import { NotFoundException, ConflictException, InternalServerErrorException } from "@nestjs/common";
import { CreateUsersDto } from "../dto/create-user.dto";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
    
    async getAllUsers(): Promise<User[]> {
        return await this.find();
    }

    async getUser(id: number): Promise<User> {
        const found = await this.findOne({id});

        if (!found) {
            throw new NotFoundException(`No data found.`);
        }

        return found;
    }

    async createUser(createUserDto: CreateUsersDto): Promise<User> {
        const {firstName, lastName, login, passwd} = createUserDto;
        // const exist = await this.find({login});

        // if (exist) {
        //     throw new ConflictException(`Error occurred.`);
        // }

        const newUser = new User();

        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.login = login;
        newUser.passwd = passwd;

        try {
            await newUser.save();
        } catch(error) { // duplication case - check on error code 23505
            throw new InternalServerErrorException('Something wrong.')
        }

        return newUser;
    }

    async updateUser(id: number, firstName:string, passwd: string, lastName?: string): Promise<User> {
        const found = await this.getUser(id);

        found.firstName = firstName;
        found.passwd = passwd;
        
        if (lastName) {
            found.lastName = lastName;
        }

        await found.save();

        return found;
    }

    async deleteUsers(id: number[]): Promise<DeleteResult> {
        return await this.delete(id);
    }
}