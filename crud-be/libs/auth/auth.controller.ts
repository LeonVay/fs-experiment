import { Controller, Post, Body, ValidationPipe, UseGuards } from "@nestjs/common";
import { SignInDto } from "./dto/signin.dto";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";

@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signin')
    async signIn(@Body(ValidationPipe) signInDto: SignInDto): Promise<{accessToken: string}> {
        return this.authService.signIn(signInDto);
    }

    @Post('/signout')
    //@UseGuards(AuthGuard())
    async signOut() {
        return this.authService.signOut();
    }
}
