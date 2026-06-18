import { Module, ValidationPipe } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { APP_GUARD, APP_PIPE } from "@nestjs/core";
import { AuthGuard, TokenService } from "../common";
import { UserRepository } from "src/DB/Models/user/user.repository";
import { JwtService } from "@nestjs/jwt";
import { UserModel } from "src/DB/Models/user/user.model";

@Module({
    imports:[UserModel],
    controllers:[UserController],
    providers:[
        UserService,
        TokenService,
        UserRepository,
        JwtService

    ]
})
export class UserModule {}