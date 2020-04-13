import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Projects } from 'libs/projects/repository/projects.entity';
import { User } from 'libs/users/repository/users.entity';
import { AuthEntity } from 'libs/auth/repository/auth.entity.dto';

export const typeOrmConfiguration: TypeOrmModuleOptions = {
    type: 'sqlite',
    database: 'tmp/db.sql',
    entities: [
        Projects,
        User,
        AuthEntity
    ],
    // entities: ["dist/**/*.entity{.ts,.js}"],
    logging: true,
    synchronize: true

    /*For PG 
    type: 'postgres',
    host: ...,
    port: ...,
    login: ...,
    password: ...,
    database: pgBaseName
    
    */
};