import { createParamDecorator } from "@nestjs/common";
import { AuthEntity } from "../repository/auth.entity.dto";

export const GetUser = createParamDecorator((data, request): AuthEntity => {
    return request.user;
});
