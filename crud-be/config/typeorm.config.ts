import * as config from 'config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Projects } from '@backend/projects';
import { User } from '@backend/users';
import { AuthEntity } from '@backend/auth';
import { Impact } from '@backend/impacts';
import { AttackType } from '@backend/attack-type';
import { ConnectionEntity } from '@backend/connections';
import { HardwareEntity } from '@backend/hardware';


const dbConfig = config.get('db');

export const typeOrmConfiguration: TypeOrmModuleOptions = {
    type: process.env.DB_TYPE || dbConfig.type,
    database: process.env.DB_LOCATION || dbConfig.database,
    entities: [
        Projects,
        User,
        AuthEntity,
        Impact,
        AttackType,
        ConnectionEntity,
        HardwareEntity

    ],
    // entities: ["dist/**/*.entity{.ts,.js}"],
    logging: process.env.DB_LOGGING || dbConfig.logging,
    synchronize: process.env.DB_SYNC || dbConfig.synchronize

    /*For PG 
    type: 'postgres',
    host: ...,
    port: ...,
    login: ...,
    password: ...,
    database: pgBaseName
    
    */
};