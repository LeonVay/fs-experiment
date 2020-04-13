import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.iterface';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from '../repository/auth.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(AuthRepository)
        private authRepository: AuthRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'ptsecret!'
        });
    }

    async validate(payload: JwtPayload) {
        const {userName} = payload;
        const user = await this.authRepository.getUserByName(userName);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}