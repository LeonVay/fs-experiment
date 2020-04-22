import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SignInDto } from "./dto/signin.dto";
import { AuthRepository } from "./repository/auth.repository";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthRepository)
        private authRepository: AuthRepository,
        private jwtService: JwtService
        ) {}

    async signIn(signInDto: SignInDto): Promise<{accessToken: string}> {
        const {login} = signInDto;
        const validated = await this.authRepository.signIn(signInDto);
        if(!validated) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { userName: login };
        const accessToken = await this.jwtService.sign(payload);

        return { accessToken };
    }

    signOut() {
        return;
    }
}