import * as bcrypt from 'bcrypt';
import { User } from "@backend/users";
import { Column, Entity } from "typeorm";

@Entity()
export class AuthEntity extends User {
    @Column()
    passwd: string;

    @Column()
    salt: string;

    private validatePassword() {
        const secret = bcrypt.hash(this.passwd, this.salt);
        return secret === this.hash;
    }
}