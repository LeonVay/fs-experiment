import * as bcrypt from 'bcrypt';
import { UsersRepository } from "@backend/users";
import { SignInDto } from "../dto/signin.dto";
import { CreateUsersDto } from '@backend/users';
import { AuthEntity } from './auth.entity.dto';
import { EntityRepository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(AuthEntity)
export class AuthRepository extends UsersRepository {
    constructor() {
        super();
    }

    async getUserByName(name: string): Promise<AuthEntity> {
        return await this.find({login: name})[0];
    }

    async signIn(signInDto: SignInDto): Promise<{userName: string}> {
        const {login, password} = signInDto;
        const exist = await this.getUserByName(login);

        if (exist && this.validatePassword(password, exist)) {
            return {userName: exist.login};
        }
    }

    async createSecuredUser(createUserDto: CreateUsersDto): Promise<{userName: string}> {
        const created = await this.createUser(createUserDto) as AuthEntity;
        const salt = bcrypt.genSalt();
        created.salt = salt;
        const hash = this.hashPassword(created.passwd, created.salt);
        created.hash = hash;

        try{
            await created.save();
        } catch(error) {
            throw new InternalServerErrorException('Something wrong.');
        }

        return {userName: created.login};
    }

    private hashPassword(password, salt): string {
        return bcrypt.hash(password, salt);
    }

    private validatePassword(password: string, user: AuthEntity): boolean {
        const hash = bcrypt.hash(password, user.salt);
        return hash === user.hash;
    }
}