import { Controller, Get, Req, SetMetadata, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { Request } from "express";
import { AuthGuard } from "src/common/index";
import { RoleGuard } from "src/common/Guards/role.guard";
import { Roles } from "src/common/Decorators/role.decorator";
import { Auth } from "src/common/Decorators/auth.decorator";

@Controller("user")

// @UseGuards(AuthGuard)
export class UserController{
    constructor(private userService:UserService){}

    @Get()
    @Auth('user','admin')
    // @Roles('user')
    // @SetMetadata("roles", ["user", "admin"])
    // @UseGuards(AuthGuard,RoleGuard)
    profile(@Req() req:Request){
        return{message:"done", data: req["user"]};
    }

    @Get()
    @SetMetadata("roles", ["user", "admin"])
    @UseGuards(AuthGuard,RoleGuard)
    profile2(@Req() req:Request){
        return{message:"done", data: req["user"]};
    }
}